// src/navigation/AdminWorkNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminWorkScreen from '../screens/Work/AdminWorkScreen';
import CreateProjectScreen from '../screens/Work/CreateProjectScreen';
import ProjectsListScreen from '../screens/Work/ProjectsListScreen';
import CreateTeamScreen from '../screens/Work/CreateTeamScreen';
import WorkersListScreen from '../screens/Work/WorkersListScreen';
import AssignTeamScreen from '../screens/Work/AssignTeamScreen';
import TeamDetailsScreen from '../screens/Work/TeamDetailsScreen';
import ProjectDetailsScreen from '../screens/Work/ProjectDetailsScreen';
import EditProjectScreen from '../screens/Work/EditProjectScreen';

const Stack = createNativeStackNavigator();

const AdminWorkNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminWork"
      screenOptions={{
        headerStyle: { backgroundColor: '#2c3e50' },
        headerTintColor: '#ecf0f1',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="AdminWork"
        component={AdminWorkScreen}
        options={{ title: 'Work Management' }}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProjectScreen}
        options={{ title: 'Create Project' }}
      />
      <Stack.Screen
        name="ProjectsList"
        component={ProjectsListScreen}
        options={{ title: 'Projects List' }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{ title: 'Project Details' }}
      />
      <Stack.Screen
        name="EditProject"
        component={EditProjectScreen}
        options={{ title: 'Edit Project' }}
      />
      <Stack.Screen
        name="CreateTeam"
        component={CreateTeamScreen}
        options={{ title: 'Create Team' }}
      />
      <Stack.Screen
        name="TeamDetails"
        component={TeamDetailsScreen}
        options={{ title: 'Team Details' }}
      />
      <Stack.Screen
        name="WorkersList"
        component={WorkersListScreen}
        options={{ title: 'Workers List' }}
      />
      <Stack.Screen
        name="AssignTeam"
        component={AssignTeamScreen}
        options={{ title: 'Assign Team' }}
      />
    </Stack.Navigator>
  );
};

export default AdminWorkNavigator;
