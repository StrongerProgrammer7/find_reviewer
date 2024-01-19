import { setLocalStorageItem } from "../../../utils/helper";
import { IUser } from "../../../store/interfaces/IDataUser";
import { IInputs } from '../../../store/interfaces/IInputs';
import { IDataUser } from '../../../store/interfaces/IDataUser';

const dataFromStringToArray = (data:string,separator:string=',') =>
{
    return data.split(separator);
}

function recordToLocalStorageStateSettings(user:IUser):void
{

    setLocalStorageItem('userdata',user.login + ';' + user.repo + '; ' + user.blacklist.toString());
}

export const saveChanges = (user:IDataUser,data:IInputs,handleClose:(() => void) | undefined):void =>
{
    user.setLogin(data.loginInput);
    user.setRepo(data.repoInput);
    user.setBlacklist(dataFromStringToArray(data.blacklistInput));
    recordToLocalStorageStateSettings(user);
    if(handleClose)
        handleClose();
}