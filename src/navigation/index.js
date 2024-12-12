// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AdminTabNavigator from './AdminTabNavigator';
import WorkerTabNavigator from './WorkerTabNavigator';

const Navigation = () => {
  const { role } = useAuth();

  return (
    <NavigationContainer>
      {role === 'admin' && <AdminTabNavigator />}
      {role === 'worker' && <WorkerTabNavigator />}
      {!role && <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
