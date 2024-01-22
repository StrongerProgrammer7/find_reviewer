import { Octokit } from 'octokit';
import { Dispatch, SetStateAction } from 'react';
import { IContributor, IDataUser, IUser } from '../store/interfaces/IDataUser';
import { GITHUB_CLASSIS_TOKEN } from './const';

export const getLocalStorageItem = (key: string): string | undefined => {
  if (window.localStorage && window.localStorage.getItem(key)) {
    try {
      const elem: string = window.localStorage.getItem(key) || '';
      return elem;
    } catch (error) {
      console.log('Error with get data from localstorage');
      console.error(error);
    }
  }
};

export const setLocalStorageItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log('Error with set to local storage key:', key, ' value:', value);
    console.error(error);
  }
};

export const setDataContextFromLocalStorage = (user: IDataUser, key: string): void => {
  const elem: string | undefined = getLocalStorageItem(key);
  if (!elem) return;
  const arr = elem.split(';');

  user.setLogin(arr[0]);
  user.setRepo(arr[1]);
  const blackList = arr[2].split(',');
  user.setBlacklist(blackList);
};

const octokit = new Octokit({
  auth: GITHUB_CLASSIS_TOKEN
});
const isContributorToBlacklist = (contributor: string, blacklist: Array<string>) => {
  for (let i = 0; i < blacklist.length; i++) {
    if (contributor === blacklist[i]) return false;
  }
  return true;
};

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getListContributors = async (user: IUser): Promise<Array<IContributor>> => {
  try {
    const result = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
      owner: user.login,
      repo: user.repo
    });

    const contributors: Array<IContributor> = result.data
      .map((contributor) => {
        if (!contributor.login) return null;
        if (isContributorToBlacklist(contributor.login, user.blacklist))
          return { avatar_url: contributor.avatar_url, login: contributor.login } as IContributor;
        return null;
      })
      .filter((contributor) => contributor !== null) as IContributor[];
    return contributors;
  } catch (error: any) {
    console.log(`Error! Status: ${error?.status}. Message: ${error?.response?.data?.message}`);
    return [];
  }
};

function displayNextImage(
  generateReviewer: React.RefObject<HTMLImageElement>,
  contributors: Array<IContributor>,
  index: number
): number {
  if (generateReviewer.current) generateReviewer.current.src = contributors[index].avatar_url;

  return getRandomNumber(0, contributors.length - 1);
}
function stopInterval(interval: NodeJS.Timer) {
  clearInterval(interval);
}

export const showAndChooseReviewer = async (
  user: IDataUser,
  generateReviewer: React.RefObject<HTMLImageElement>,
  setReadyShowReviewers: Dispatch<SetStateAction<boolean>>,
  setReviewer: Dispatch<SetStateAction<IContributor | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  maxIterations: number = 10,
  timeSlideShowImg: number = 200,
  timeUpIterationSlideShow: number = 500
) => {
  const contributors: Array<IContributor> = await getListContributors(user);
  if (contributors.length === 0) {
    setReviewer({ login: 'Not exists reviewers', avatar_url: '' });
    return;
  }
  console.log(contributors);
  setReadyShowReviewers(true);
  let currentIndex: number = 0;

  const slideshowInterval = setInterval(() => {
    currentIndex = displayNextImage(generateReviewer, contributors, currentIndex);
  }, timeSlideShowImg);

  let currentIteration = 0;

  const iteration = setInterval(() => {
    currentIteration++;
    if (currentIteration >= maxIterations) {
      stopInterval(slideshowInterval);
      setReadyShowReviewers(false);
      setLoading(false);
      setReviewer(contributors[currentIndex]);
      stopInterval(iteration);
    }
  }, timeUpIterationSlideShow);
};
