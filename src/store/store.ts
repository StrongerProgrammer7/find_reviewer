import {  applyMiddleware, legacy_createStore as createStore } from 'redux';
import combine from "./combineReducer";

import { loggerMiddleware,asyncActionsMiddleware } from './middlewares/middleware';


export const store = createStore(combine,{},applyMiddleware(loggerMiddleware,asyncActionsMiddleware));
