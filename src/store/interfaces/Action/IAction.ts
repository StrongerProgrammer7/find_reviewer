import IActionLoadings from './IActionLoadings';
import IActionContributor from './IActionReviewer';
import IActionUser from './IActionUser';
type IAction = IActionUser | IActionContributor | IActionLoadings;
export default IAction;
