import { ActionTypes } from '../../enums/ActionTypes';

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

type IActionUser = IActionLogin | IActionREPO | IActionBlackList;

export default IActionUser;
