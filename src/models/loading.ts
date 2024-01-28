import { ActionTypes } from '../store/enums/ActionTypes';
import IActionLoadings from '../store/interfaces/Action/IActionLoadings';
import { ILoadings } from '../store/interfaces/ILoadings';
const initialState: ILoadings = {
  baseLoad: true,
  loadReadyShowReviewer: false
};

export function loadingsReducer(state = initialState, action: IActionLoadings) {
  switch (action.type) {
    case ActionTypes.BASE_LOADING:
      return { ...state, baseLoad: action.payload };
    case ActionTypes.LOAD_SHOW_REVIEWER:
      return { ...state, loadReadyShowReviewer: action.payload };
    default:
      return state;
  }
}

export const loadingsControls = {
  changeBaseLoad: (value: boolean) => ({
    type: ActionTypes.BASE_LOADING,
    payload: value
  }),
  changeLoadShowReviewer: (value: boolean) => ({
    type: ActionTypes.LOAD_SHOW_REVIEWER,
    payload: value
  })
};
