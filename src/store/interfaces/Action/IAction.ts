import IActionLoadings from './IActionLoadings';
import IActionReviewer from './IActionReviewer';
import IActionUser from './IActionUser';
type IAction = IActionUser | IActionReviewer | IActionLoadings;
export default IAction;
