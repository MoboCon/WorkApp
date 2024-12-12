// src/navigation/AdminAttendanceNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AttendanceScreen from '../screens/Attendance/AttendanceScreen';
import AttendanceDetailsScreen from '../screens/Attendance/AttendanceDetailsScreen';
import AttendanceStatsScreen from '../screens/Attendance/AttendanceStatsScreen';

const Stack = createNativeStackNavigator();

const AdminAttendanceNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Attendance"
      screenOptions={{
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#ecf0f1',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{ title: 'Attendance' }}
      />
      <Stack.Screen
        name="AttendanceDetails"
        component={AttendanceDetailsScreen}
        options={{ title: 'Attendance Details' }}
      />
      <Stack.Screen
        name="AttendanceStats"
        component={AttendanceStatsScreen}
        options={{ title: 'Attendance Stats' }}
      />
    </Stack.Navigator>
  );
};

export default AdminAttendanceNavigator;
