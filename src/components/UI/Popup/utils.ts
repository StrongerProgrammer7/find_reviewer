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
