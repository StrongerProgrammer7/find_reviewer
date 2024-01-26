import { Dispatch, SetStateAction } from 'react';

export interface IUser {
  login: string;
  repo: string;
  blacklist: Array<string>;
}
export interface IDataUser extends IUser {
  setLogin: Dispatch<SetStateAction<string>>;
  setRepo: Dispatch<SetStateAction<string>>;
  setBlacklist: Dispatch<SetStateAction<Array<string>>>;
}

export interface IContributor {
  avatar_url: string;
  login: string;
}

export interface IReviewer {
  login:string,
  avatar_url:string
}