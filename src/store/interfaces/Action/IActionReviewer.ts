import { ActionTypes } from '../../enums/ActionTypes';

interface IActionReviewerLogin {
    type: ActionTypes.REVIEWER;
    payload: string;
  }
  
  interface IActionAvatar {
    type: ActionTypes.AVATAR;
    payload: string;
  }

  type IActionReviewer = IActionReviewerLogin | IActionAvatar;
  export default IActionReviewer;