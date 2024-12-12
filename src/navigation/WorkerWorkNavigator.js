import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkerWorkScreen from '../screens/Work/WorkerWorkScreen';
import WorkerAddWorkScreen from '../screens/Work/WorkerAddWorkScreen';
import WorkerWorkDetailsScreen from '../screens/Work/WorkerWorkDetailsScreen';
import WorkerSubmitWorkScreen from '../screens/Work/WorkerSubmitWorkScreen';

const Stack = createNativeStackNavigator();

const WorkerWorkNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkerWork"
      screenOptions={{
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#ecf0f1',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="WorkerWork"
        component={WorkerWorkScreen}
        options={{ title: 'Work Assigned' }}
      />
      <Stack.Screen
        name="WorkerAddWork"
        component={WorkerAddWorkScreen}
        options={{ title: 'Add Work' }}
      />
      <Stack.Screen
        name="WorkerWorkDetails"
        component={WorkerWorkDetailsScreen}
        options={{ title: 'Work Details' }}
      />
      <Stack.Screen
        name="WorkerSubmitWork"
        component={WorkerSubmitWorkScreen}
        options={{ title: 'Submit Work' }}
      />
    </Stack.Navigator>
  );
};

export default WorkerWorkNavigator;
