import { Dispatch, SetStateAction } from 'react';

export interface IInputs {
  loginInput: string;
  repoInput: string;
  blacklistInput: string;
}

export interface ISetInputs extends IInputs {
  setLoginInput: Dispatch<SetStateAction<string>>;
  setRepoInput: Dispatch<SetStateAction<string>>;
  setBlacklistInput: Dispatch<SetStateAction<string>>;
}
