import { ActionTypes } from '../enums/ActionTypes';

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

export type IAction = IActionLogin | IActionREPO | IActionBlackList;
