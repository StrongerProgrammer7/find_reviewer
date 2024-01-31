import { ActionTypes } from '../store/enums/ActionTypes';
import IActionUser from '../store/interfaces/Action/IActionUser';
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
  ],
  loading:true
};

export function userReducer(state = initialState, action: IActionUser) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return { ...state, login: action.payload };
    case ActionTypes.REPO:
      return { ...state, repo: action.payload };
    case ActionTypes.BLACKLIST:
      return { ...state, blacklist: action.payload };
    case ActionTypes.TOTAL_DATA_USER:
      return {...action.payload};//{ ...state,login:action.payload.login, repo:action.payload.repo, blacklist:action.payload.blacklist}
    case ActionTypes.LOADING_DATA_USER:
      return {...state, loading:action.payload};
    default:
      return state;
  }
}

export const UserControls = {
  changeLogin: (value: string):IActionUser => ({
    type: ActionTypes.LOGIN,
    payload: value
  }),
  changeRepo: (value: string):IActionUser => ({
    type: ActionTypes.REPO,
    payload: value
  }),
  changeBlackList: (value: Array<string>):IActionUser => ({
    type: ActionTypes.BLACKLIST,
    payload: value
  }),
  setAllData: (value:IUser):IActionUser => ({
    type:ActionTypes.TOTAL_DATA_USER,
    payload:value
  }),
  setLoading: (value:boolean):IActionUser => ({
    type:ActionTypes.LOADING_DATA_USER,
    payload:value
  })
};
