import { setLocalStorageItem } from '../../../utils/helper';
import { IInputs, ISetInputs } from '../../../store/interfaces/IInputs';
import { Controls } from '../../../models/user';
import { IAction } from '../../../store/interfaces/IAction';
import { Dispatch } from 'redux';
import { IUser } from '../../../store/interfaces/IDataUser';
const dataFromStringToArray = (data: string, separator: string = ',') => {
  return data.split(separator);
};

export const saveChanges = (
  dispatch: Dispatch<IAction>,
  data: IInputs,
  handleClose: (() => void) | undefined
): void => {
  dispatch(Controls.changeLogin(data.loginInput) as IAction);
  dispatch(Controls.changeRepo(data.repoInput) as IAction);
  dispatch(Controls.changeBlackList(dataFromStringToArray(data.blacklistInput)) as IAction);
  setLocalStorageItem(
    'userdata',
    data.loginInput + ';' + data.repoInput + ';' + data.blacklistInput
  );
  if (handleClose) handleClose();
};

export const fillInputs = (user: IUser, data: ISetInputs) => {
  if (user.blacklist.length !== 0) {
    let blacklistText = '';
    for (let i = 0; i < user.blacklist.length; i++)
      if (i + 1 !== user.blacklist.length) blacklistText += user.blacklist[i] + ',';
      else blacklistText += user.blacklist[i];

    data.setBlacklistInput(blacklistText);
  }
  if (user.login !== '') data.setLoginInput(user.login);
  if (user.repo !== '') data.setRepoInput(user.repo);
};
