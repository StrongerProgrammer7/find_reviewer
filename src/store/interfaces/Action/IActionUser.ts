import { ActionTypes } from '../../enums/ActionTypes';
import { IUser } from '../IDataUser';
interface IActionLogin {
  type: ActionTypes.LOGIN;
  payload: string;
}

interface IActionREPO {
  type: ActionTypes.REPO;
  payload: string;
}

interface IActionBlackList {
  type: ActionTypes.BLACKLIST;
  payload: Array<string>;
}

interface IActionTotalData {
  type: ActionTypes.TOTAL_DATA_USER;
  payload:IUser
}

interface IActionLoad {
  type: ActionTypes.LOADING_DATA_USER;
  payload: boolean;
}

type IActionUser = IActionLogin | IActionREPO | IActionBlackList | IActionTotalData | IActionLoad;

export default IActionUser;
