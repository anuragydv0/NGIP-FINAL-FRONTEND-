import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  accountType: string;
}

interface UserContextValue {
  currentUser: CurrentUser;
  switchRole: (role: UserRole) => void;
}

const defaultUser: CurrentUser = {
  id: 'u0',
  name: 'Anurag Yadav',
  email: 'anurag.yadav@ngip.io',
  role: 'Individual',
  accountType: 'Individual • INR',
};

const UserContext = createContext<UserContextValue>({
  currentUser: defaultUser,
  switchRole: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultUser);

  const switchRole = (role: UserRole) => {
    if (role === 'Admin') {
      setCurrentUser({
        id: 'u1',
        name: 'Anurag Yadav Admin',
        email: 'anurag.admin@ngip.com',
        role: 'Admin',
        accountType: 'Administrator',
      });
    } else {
      setCurrentUser(defaultUser); // Individual
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, switchRole }}>
      {children}
    </UserContext.Provider>
  );
}

