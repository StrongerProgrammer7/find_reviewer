import { Octokit } from 'octokit';
import { SetStateAction } from 'react';
import { Dispatch } from 'redux';
import { loadingsControls } from '../models/loading';
import { reviewerControls } from '../models/reviewer';
import { UserControls } from '../models/user';
import { IAction } from '../store/interfaces/Action/IAction';
import { IActionReviewer } from '../store/interfaces/Action/IActionReviewer';
import { IActionLoadings } from '../store/interfaces/Action/IActionLoadings';
import { IContributor, IUser } from '../store/interfaces/IDataUser';
import { GITHUB_CLASSIS_TOKEN } from './const';

export const getLocalStorageItem = (key: string): string | undefined => {
  if (!window.localStorage || !window.localStorage.getItem(key)) return;

  try {
    const elem: string = window.localStorage.getItem(key) || '';
    return elem;
  } catch (error) {
    console.log('Error with get data from localstorage');
    console.error(error);
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

export const setDataFromLocalStorage = (dispatch: Dispatch<IAction>, key: string): void => {
  const elem: string | undefined = getLocalStorageItem(key);
  if (!elem) return;
  const arr = elem.split(';');
  const blackList = arr[2].split(',');
  dispatch(UserControls.changeLogin(arr[0]) as IAction);
  dispatch(UserControls.changeRepo(arr[1]) as IAction);
  dispatch(UserControls.changeBlackList(blackList) as IAction);
};


const octokit = new Octokit({
  auth: GITHUB_CLASSIS_TOKEN
});

const getDataFromGithubAPI = async (login: string, repo: string, whatGet = 'contributors') => {
  try {
    const result = octokit.request(`GET /repos/{owner}/{repo}/${whatGet}`, {
      owner: login,
      repo: repo
    });
    return result;
  } catch (error: any) {
    console.log(`Error! Status: ${error?.status}. Message: ${error?.response?.data?.message}`);
  }
};
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
  const result = await getDataFromGithubAPI(user.login, user.repo);
  if (!result) return [];
  console.log(result);
  const contributors: Array<IContributor> = result.data
    .map((contributor: IContributor) => {
      if (!contributor.login) return null;
      if (isContributorToBlacklist(contributor.login, user.blacklist))
        return { avatar_url: contributor.avatar_url, login: contributor.login } as IContributor;
      return null;
    })
    .filter((contributor: IContributor) => contributor !== null) as IContributor[];
  return contributors;
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

function setReviewer(dispatch:Dispatch<IActionReviewer>,contributor:IContributor)
{
  dispatch(reviewerControls.changeAvatarReviewer(contributor.avatar_url) as IActionReviewer);
  dispatch(reviewerControls.changeLoginReviewer(contributor.login) as IActionReviewer);
}

export const showAndChooseReviewer = async (
  user: IUser,
  generateReviewer: React.RefObject<HTMLImageElement>,
  dispatch:Dispatch<IActionReviewer | IActionLoadings>,
  maxIterations: number = 10,
  timeSlideShowImg: number = 200,
  timeUpIterationSlideShow: number = 500
) => {
  dispatch(loadingsControls.changeBaseLoad(true) as IActionLoadings);
  const contributors: Array<IContributor> = await getListContributors(user);
  if (contributors.length === 0) {
    setReviewer(dispatch,{login:'Not find reviewer so as not exists',avatar_url:''});
    return;
  }
  console.log(contributors);
  dispatch(loadingsControls.changeLoadShowReviewer(true) as IActionLoadings);

  let currentIndex: number = 0;

  const slideshowInterval = setInterval(() => {
    currentIndex = displayNextImage(generateReviewer, contributors, currentIndex);
  }, timeSlideShowImg);

  let currentIteration = 0;

  const iteration = setInterval(() => {
    currentIteration++;
    if (currentIteration >= maxIterations) {
      stopInterval(slideshowInterval);
      dispatch(loadingsControls.changeLoadShowReviewer(false) as IActionLoadings);
      dispatch(loadingsControls.changeBaseLoad(false) as IActionLoadings);
      setReviewer(dispatch,contributors[currentIndex]);
      stopInterval(iteration);
    }
  }, timeUpIterationSlideShow);
};
/*
export const asyncIncrement = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  dispatch(increment());
  dispatch(setLoading(false));
};*/
