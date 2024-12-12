// src/navigation/WorkerProblemsNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkerProblemsScreen from '../screens/Problems/WorkerProblemsScreen';
import WorkerAddProblemScreen from '../screens/Problems/WorkerAddProblemScreen';

const Stack = createNativeStackNavigator();

const WorkerProblemsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkerProblems"
      screenOptions={{
        headerStyle:{ backgroundColor:'#2c3e50' },
        headerTintColor:'#ecf0f1',
        headerTitleStyle:{ fontWeight:'bold' },
      }}
    >
      <Stack.Screen
        name="WorkerProblems"
        component={WorkerProblemsScreen}
        options={{ title:'Problems' }}
      />
      <Stack.Screen
        name="WorkerAddProblem"
        component={WorkerAddProblemScreen}
        options={{ title:'Add Problem' }}
      />
    </Stack.Navigator>
  );
};

export default WorkerProblemsNavigator;
