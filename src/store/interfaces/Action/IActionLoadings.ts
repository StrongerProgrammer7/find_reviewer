import { ActionTypes } from '../../enums/ActionTypes';

interface IActionBaseLoad {
  type: ActionTypes.BASELOADING;
  payload: boolean;
}

interface IActionLoadShowReviewer {
  type: ActionTypes.LOADSHOWREVIEWER;
  payload: boolean;
}

type IActionLoadings = IActionBaseLoad | IActionLoadShowReviewer;
export default IActionLoadings;
