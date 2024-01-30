import { combineReducers } from 'redux';
import { userReducer } from '../models/user';
import { reviewerReducer } from '../models/reviewer';
export default combineReducers({
  userReducer,
  reviewerReducer
});
