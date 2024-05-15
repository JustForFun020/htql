'use client';

import React, { useState } from 'react';
import { UserContext } from './_userContext';
import { IUser } from '@/utils/interface/user';

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({ username: '' });

  const saveUser = (user: IUser) => {
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        username: user.username,
        saveUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
