// src/navigation/AdminProblemsNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminProblemsScreen from '../screens/Problems/AdminProblemsScreen';
import AdminAddProblemScreen from '../screens/Problems/AdminAddProblemScreen';

const Stack = createNativeStackNavigator();

const AdminProblemsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminProblems"
      screenOptions={{
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#ecf0f1',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="AdminProblems"
        component={AdminProblemsScreen}
        options={{ title: 'Problems' }}
      />
      <Stack.Screen
        name="AdminAddProblem"
        component={AdminAddProblemScreen}
        options={{ title: 'Add Problem' }}
      />
    </Stack.Navigator>
  );
};

export default AdminProblemsNavigator;
