import { ActionTypes } from '../store/enums/ActionTypes';
import { IAction } from '../store/interfaces/IAction';
import { IUser } from '../store/interfaces/IDataUser';

const initialState: IUser = {
  login: 'hhru',
  repo: 'eslint-config-hh',
  blacklist: [
    'ipetropolsky',
    'prizemlenie',
    'Maxim-Do',
    'xtabay',
    'AndreyGladkov',
    'kirillgalushko'
  ]
};

export function userReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, login: action.payload };
    case ActionTypes.REPO:
      return { ...state, repo: action.payload };
    case ActionTypes.BLACKLIST:
      return { ...state, blacklist: action.payload };
    default:
      return state;
  }
}

export const UserControls = {
  changeLogin: (value: string) => ({
    type: ActionTypes.LOGIN,
    payload: value
  }),
  changeRepo: (value: string) => ({
    type: ActionTypes.REPO,
    payload: value
  }),
  changeBlackList: (value: Array<string>) => ({
    type: ActionTypes.BLACKLIST,
    payload: value
  })
};
