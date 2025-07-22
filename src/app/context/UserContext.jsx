'use client';

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('deckcheckUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const logout = () => {
    localStorage.removeItem('deckcheckUser');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}