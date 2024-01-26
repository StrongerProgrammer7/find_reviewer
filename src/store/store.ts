import { createStore } from 'redux';
import combine from "./combineReducer";
export const store = createStore(combine);
