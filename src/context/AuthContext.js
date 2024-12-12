import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // "admin" sau "worker"

  const login = (username, password) => {
    // Logica de logare simplă
    if (username === 'administrator' && password === 'administrator') {
      setRole('admin');
      return true;
    }
    if (username === 'muncitor' && password === 'muncitor') {
      setRole('worker');
      return true;
    }
    return false;
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
