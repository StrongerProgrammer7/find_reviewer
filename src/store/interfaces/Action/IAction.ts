import IActionContributor from './IActionReviewer';
import IActionUser from './IActionUser';
type IAction = IActionUser | IActionContributor;
export default IAction;
