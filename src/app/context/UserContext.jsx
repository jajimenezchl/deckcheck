'use client';

import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Al cargar la app, busca usuario en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('deckcheckUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para logout
  const logout = () => {
    localStorage.removeItem('deckcheckUser');
    setUser(null);
  };

  // Función para login (guardar usuario)
  const login = (userData) => {
    localStorage.setItem('deckcheckUser', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
