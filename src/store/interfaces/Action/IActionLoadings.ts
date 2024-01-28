import { ActionTypes } from '../../enums/ActionTypes';

interface IActionBaseLoad {
  type: ActionTypes.BASE_LOADING;
  payload: boolean;
}

interface IActionLoadShowReviewer {
  type: ActionTypes.LOAD_SHOW_REVIEWER;
  payload: boolean;
}

type IActionLoadings = IActionBaseLoad | IActionLoadShowReviewer;
export default IActionLoadings;
