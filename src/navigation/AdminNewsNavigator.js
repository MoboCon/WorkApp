// src/navigation/AdminNewsNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminNewsScreen from '../screens/News/AdminNewsScreen';
import AdminAddNewsScreen from '../screens/News/AdminAddNewsScreen';

const Stack = createNativeStackNavigator();

const AdminNewsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminNews"
      screenOptions={{
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#ecf0f1',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="AdminNews"
        component={AdminNewsScreen}
        options={{ title: 'News' }}
      />
      <Stack.Screen
        name="AdminAddNews"
        component={AdminAddNewsScreen}
        options={{ title: 'Add News' }}
      />
    </Stack.Navigator>
  );
};

export default AdminNewsNavigator;
