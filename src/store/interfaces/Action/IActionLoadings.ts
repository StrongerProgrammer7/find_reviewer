import { ActionTypes } from '../../enums/ActionTypes';


interface IActionBaseLoad {
    type: ActionTypes.BASELOADING;
    payload:boolean
  }
  
  interface IActionLoadShowReviewer {
    type: ActionTypes.LOADSHOWREVIEWER,
    payload:boolean
  }

  export type IActionLoadings = IActionBaseLoad | IActionLoadShowReviewer;
