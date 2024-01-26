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
interface IActionReviewerLogin {
  type: ActionTypes.REVIEWER;
  payload: Array<string>;
}

interface IActionAvatar {
  type: ActionTypes.AVATAR;
  payload: string;
}
export type IAction = IActionLogin | IActionREPO | IActionBlackList;
export type IActionReviewer = IActionReviewerLogin | IActionAvatar;

