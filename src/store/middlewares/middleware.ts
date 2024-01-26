import { AnyAction, Dispatch, Middleware } from "redux";
import { IAction } from "../interfaces/Action/IAction";
import { IActionLoadings } from "../interfaces/Action/IActionLoadings";
import { IActionReviewer } from "../interfaces/Action/IActionReviewer";
import { RootState } from "../interfaces/IReducers";

export const asyncActionsMiddleware = (store:{dispatch:any,getState:any}) => (next:any) => (action:any) => {
    if (typeof action === "function") {
      return action(store.dispatch, store.getState);
    }
  
    return next(action);
  };
  