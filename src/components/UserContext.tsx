import React, { FC,PropsWithChildren, useState } from 'react';
import { Context } from '../';
import { IDataUser } from '../store/interfaces/IDataUser';

export const UserContext:FC<PropsWithChildren> = ({ children }:PropsWithChildren) => {
  const [loginUser, setLoginUser] = useState<string>('');
  const [repoUser, setRepoUser] = useState<string>('');
  const [blacklistUser, setBlacklistUser] = useState<Array<string>>([]);

  const user: IDataUser = {
    login: loginUser,
    setLogin: setLoginUser,
    repo: repoUser,
    setRepo: setRepoUser,
    blacklist: blacklistUser,
    setBlacklist: setBlacklistUser
  };
  
  return (
	<Context.Provider value={user}>
		{children}
		</Context.Provider>
  )
};
