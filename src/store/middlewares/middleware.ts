import {  Dispatch, Middleware } from "redux";
import IAction from "../interfaces/Action/IAction";
import { RootState } from "../interfaces/IReducers";

export const asyncActionsMiddleware:Middleware<{}, RootState, Dispatch<IAction>> = (store) => (next) => (action) => {
    if (typeof action === "function") {
      console.log("ASYNC FUNCTION EXECUTION..")
      return action(store.dispatch, store.getState);
    }
    console.log("ASYNC ",action)
    return next(action);
  };
  
  export const loggerMiddleware:Middleware<{}, RootState, Dispatch<IAction>> =   
  (store) =>
  (next) =>
  (action) =>
  {
    const myAction = action as IAction;
    console.groupCollapsed("despatching",myAction.type);
    console.log("Prev state", store.getState());
    console.log("Action",action);
    const result = next(action);
    console.log("Next state",store.getState());
    console.groupEnd();
    return result;
  }

