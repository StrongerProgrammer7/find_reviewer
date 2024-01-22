import { setLocalStorageItem } from '../../../utils/helper';
import { IInputs, ISetInputs } from '../../../store/interfaces/IInputs';
import { IDataUser } from '../../../store/interfaces/IDataUser';

const dataFromStringToArray = (data: string, separator: string = ',') => {
  return data.split(separator);
};

export const saveChanges = (
  user: IDataUser,
  data: IInputs,
  handleClose: (() => void) | undefined
): void => {
  user.setLogin(data.loginInput);
  user.setRepo(data.repoInput);
  user.setBlacklist(dataFromStringToArray(data.blacklistInput));
  setLocalStorageItem(
    'userdata',
    data.loginInput + ';' + data.repoInput + ';' + data.blacklistInput
  );
  if (handleClose) handleClose();
};

export const fillInputs = (user: IDataUser, data: ISetInputs) => {
  if (user.blacklist.length !== 0) {
    let blacklistText = '';
    for (let i = 0; i < user.blacklist.length; i++)
      if (i + 1 !== user.blacklist.length) blacklistText += user.blacklist[i] + ',';
      else blacklistText += user.blacklist[i];

    data.setBlacklistInput(blacklistText);
  }
  if (user.login !== '') {
    data.setLoginInput(user.login);
  }
  if (user.repo !== '') {
    data.setRepoInput(user.repo);
  }
};
