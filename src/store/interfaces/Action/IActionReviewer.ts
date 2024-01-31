import { ActionTypes } from '../../enums/ActionTypes';
import { IContributor } from '../IDataUser';

interface IActionContributor {
  type: ActionTypes.REVIEWER;
  payload: IContributor;
}

interface IActionGenerateContributorImgSrc {
  type:ActionTypes.GENERATE_REVIEWER_IMGS;
  payload: string
}

interface IActionLoadShowReviewer {
  type: ActionTypes.LOAD_SHOW_REVIEWER;
  payload: boolean;
}


export type IActionReviewer = IActionContributor | IActionGenerateContributorImgSrc | IActionLoadShowReviewer;
export default IActionContributor;
