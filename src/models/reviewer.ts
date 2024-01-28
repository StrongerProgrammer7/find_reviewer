import { ActionTypes } from '../store/enums/ActionTypes';
import IActionContributor from '../store/interfaces/Action/IActionReviewer';
import { IContributor } from '../store/interfaces/IDataUser';

const initialState: IContributor = {
  login: '',
  avatarUrl: ''
};

export function reviewerReducer(state = initialState, action: IActionContributor) {
  switch (action.type) {
    case ActionTypes.REVIEWER:
      return { ...state, login: action.payload.login,avatarUrl:action.payload.avatarUrl };
    default:
      return state;
  }
}

export const reviewerControls = {
  changeReviewer: (value: IContributor) => ({
    type: ActionTypes.REVIEWER,
    payload: value
  })
};
