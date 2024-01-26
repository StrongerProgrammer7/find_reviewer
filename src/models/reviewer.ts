import { ActionTypes } from '../store/enums/ActionTypes';
import { IActionReviewer } from '../store/interfaces/Action/IActionReviewer';
import { IReviewer } from '../store/interfaces/IDataUser';

const initialState: IReviewer = {
  login: '',
  avatar_url:'',
};

export function reviewerReducer(state = initialState, action: IActionReviewer) {
  switch (action.type) {
    case ActionTypes.REVIEWER:
      return { ...state, login: action.payload };
    case ActionTypes.AVATAR:
      return { ...state, avatar_url: action.payload };
    default:
      return state;
  }
}

export const reviewerControls = {
  changeLoginReviewer: (value: string) => ({
    type: ActionTypes.REVIEWER,
    payload: value
  }),
  changeAvatarReviewer: (value:string) => ({
    type:ActionTypes.AVATAR,
    payload:value
  })
};
