import { ActionTypes } from '../../enums/ActionTypes';
import { IContributor } from '../IDataUser';

interface IActionContributor {
  type: ActionTypes.REVIEWER;
  payload: IContributor;
}


type IActionReviewer = IActionContributor;
export default IActionContributor;
