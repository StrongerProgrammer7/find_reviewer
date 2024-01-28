import { Dispatch, Middleware } from 'redux';
import IAction from '../interfaces/Action/IAction';
import { RootState } from '../store';

export const asyncActionsMiddleware: Middleware<{}, RootState, Dispatch> =
  (store) => (next) => (action) => {
    if (typeof action === 'function') {
      console.log('ASYNC FUNCTION EXECUTION..',typeof action);
      return action(store.dispatch, store.getState); // Сюда никогда не попадает
    }
    return next(action);
  };

export const loggerMiddleware: Middleware<{}, RootState, Dispatch<IAction>> =
  (store) => (next) => (action) => {
    const myAction = action as IAction;
    console.groupCollapsed('despatching', myAction.type || typeof myAction);
    console.log('Prev state', store.getState());
    console.log('Action', action);
    const result = next(action);
    console.log('Next state', store.getState());
    console.groupEnd();
    return result;
  };
