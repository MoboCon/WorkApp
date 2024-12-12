import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import WorkerWorkNavigator from './WorkerWorkNavigator';
import WorkerNewsScreen from '../screens/News/WorkerNewsScreen';
import WorkerProblemsScreen from '../screens/Problems/WorkerProblemsScreen';
import AttendanceScreen from '../screens/Attendance/AttendanceScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const WorkerTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#ecf0f1',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#2c3e50' },
        tabBarActiveTintColor: '#27ae60',
      }}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Work"
        component={WorkerWorkNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="briefcase-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="News"
        component={WorkerNewsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Problems"
        component={WorkerProblemsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="warning-outline" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default WorkerTabNavigator;
