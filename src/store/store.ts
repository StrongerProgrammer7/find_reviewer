import {  createStore } from 'redux';
import combine from "./combineReducer";
import { asyncActionsMiddleware } from './middlewares/middleware';

export const store = createStore(combine);
