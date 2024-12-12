import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null); // "admin" sau "worker"
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Verifică dacă există o sesiune salvată la pornirea aplicației
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const savedRole = await AsyncStorage.getItem('userRole');
      const savedUser = await AsyncStorage.getItem('username');
      if (savedRole) {
        setRole(savedRole);
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      // Logica de logare simplă
      if (username === 'administrator' && password === 'administrator') {
        await AsyncStorage.setItem('userRole', 'admin');
        await AsyncStorage.setItem('username', username);
        setRole('admin');
        setUser(username);
        return true;
      }
      if (username === 'muncitor' && password === 'muncitor') {
        await AsyncStorage.setItem('userRole', 'worker');
        await AsyncStorage.setItem('username', username);
        setRole('worker');
        setUser(username);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('username');
      setRole(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = () => role === 'admin';
  const isWorker = () => role === 'worker';
  const isAuthenticated = () => role !== null;

  return (
    <AuthContext.Provider 
      value={{ 
        role,
        user,
        login,
        logout,
        isLoading,
        isAdmin,
        isWorker,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 