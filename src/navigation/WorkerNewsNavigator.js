// src/navigation/WorkerNewsNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkerNewsScreen from '../screens/News/WorkerNewsScreen';

const Stack = createNativeStackNavigator();

const WorkerNewsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkerNews"
      screenOptions={{
        headerStyle: { backgroundColor:'#2c3e50' },
        headerTintColor:'#ecf0f1',
        headerTitleStyle:{ fontWeight:'bold' },
      }}
    >
      <Stack.Screen
        name="WorkerNews"
        component={WorkerNewsScreen}
        options={{ title:'News' }}
      />
    </Stack.Navigator>
  );
};

export default WorkerNewsNavigator;
