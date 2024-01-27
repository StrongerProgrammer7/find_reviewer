import { setLocalStorageItem } from '../../../utils/helper';
import { IInputs } from '../../../store/interfaces/IInputs';
import {  UserControls } from '../../../models/user';
import IActionUser from '../../../store/interfaces/Action/IActionUser';
import { Dispatch } from 'redux';
const dataFromStringToArray = (data: string, separator: string = ',') => {
  return data.split(separator);
};

export const saveChanges = (
  dispatch: Dispatch<IActionUser>,
  data: IInputs,
  handleClose: (() => void) | undefined
): void => {
  dispatch(UserControls.changeLogin(data.loginInput) as IActionUser);
  dispatch(UserControls.changeRepo(data.repoInput) as IActionUser);
  dispatch(UserControls.changeBlackList(dataFromStringToArray(data.blacklistInput)) as IActionUser);
  setLocalStorageItem(
    'userdata',
    data.loginInput + ';' + data.repoInput + ';' + data.blacklistInput
  );
  if (handleClose) handleClose();
};

