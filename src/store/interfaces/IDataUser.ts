import { Dispatch, SetStateAction } from "react";

export interface IDataUser
{
  login:string,
  repo:string,
  blacklist:Array<string>,
  setLogin: Dispatch<SetStateAction<string>>,
  setRepo: Dispatch<SetStateAction<string>>,
  setBlacklist:Dispatch<SetStateAction<Array<string>>>
}