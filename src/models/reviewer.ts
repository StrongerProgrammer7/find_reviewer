import { ActionTypes } from '../store/enums/ActionTypes';
import {IActionReviewer} from '../store/interfaces/Action/IActionReviewer';
import { IContributor } from '../store/interfaces/IDataUser';

const initialState: IContributor = {
  login: '',
  avatarUrl: '',
  generateReviewerImgSrc: '',
  loading:false
};

export function reviewerReducer(state = initialState, action: IActionReviewer) {
  switch (action.type) {
    case ActionTypes.REVIEWER:
      return { ...state, login: action.payload.login,avatarUrl:action.payload.avatarUrl };
    case ActionTypes.GENERATE_REVIEWER_IMGS:
      return { ...state, generateReviewerImgSrc:action.payload}
    case ActionTypes.LOAD_SHOW_REVIEWER:
      return { ... state, loading:action.payload};
    default:
      return state;
  }
}

export const reviewerControls = {
  changeReviewer: (value: IContributor) => ({
    type: ActionTypes.REVIEWER,
    payload: value
  }),
  changeGenerateReviewerSRC: (src:string) =>({
    type:ActionTypes.GENERATE_REVIEWER_IMGS,
    payload:src
  }),
  setLoading: (value:boolean) =>({
    type: ActionTypes.LOAD_SHOW_REVIEWER,
    payload:value
  })
};
