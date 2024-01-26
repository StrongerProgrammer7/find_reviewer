import { setLocalStorageItem } from '../../../utils/helper';
import { IInputs, ISetInputs } from '../../../store/interfaces/IInputs';
import {  UserControls } from '../../../models/user';
import { IAction } from '../../../store/interfaces/Action/IAction';
import { Dispatch } from 'redux';
const dataFromStringToArray = (data: string, separator: string = ',') => {
  return data.split(separator);
};

export const saveChanges = (
  dispatch: Dispatch<IAction>,
  data: IInputs,
  handleClose: (() => void) | undefined
): void => {
  dispatch(UserControls.changeLogin(data.loginInput) as IAction);
  dispatch(UserControls.changeRepo(data.repoInput) as IAction);
  dispatch(UserControls.changeBlackList(dataFromStringToArray(data.blacklistInput)) as IAction);
  setLocalStorageItem(
    'userdata',
    data.loginInput + ';' + data.repoInput + ';' + data.blacklistInput
  );
  if (handleClose) handleClose();
};

