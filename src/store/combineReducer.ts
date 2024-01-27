import { combineReducers } from 'redux';
import { userReducer } from '../models/user';
import { reviewerReducer } from '../models/reviewer';
import { loadingsReducer } from '../models/loading';
export default combineReducers({
  userReducer,
  reviewerReducer,
  loadingsReducer
});
