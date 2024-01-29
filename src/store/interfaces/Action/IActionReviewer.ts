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
export type IActionReviewer = IActionContributor | IActionGenerateContributorImgSrc;
export default IActionContributor;
