
import { Action } from 'redux';

//TODO: Study
export type AsyncAction<ReturnType, State, BasicAction extends Action> = (
    dispatch: IAsyncDispatch<State, BasicAction>,
    getState: () => State
  ) => ReturnType;
  
  export interface IAsyncDispatch<State, BasicAction extends Action> {
    <ReturnType>(AsyncAction: AsyncAction<ReturnType, State, BasicAction>): ReturnType;
  
    <Action extends BasicAction>(action: Action): Action;
  
    <ReturnType, Action extends BasicAction>(
      action: Action | AsyncAction<ReturnType, State, BasicAction>
    ): Action | ReturnType;
  }