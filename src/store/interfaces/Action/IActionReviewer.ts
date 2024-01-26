import { ActionTypes } from '../../enums/ActionTypes';

interface IActionReviewerLogin {
    type: ActionTypes.REVIEWER;
    payload: string;
  }
  
  interface IActionAvatar {
    type: ActionTypes.AVATAR;
    payload: string;
  }

  export type IActionReviewer = IActionReviewerLogin | IActionAvatar;