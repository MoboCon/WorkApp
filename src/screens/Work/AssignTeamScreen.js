// src/screens/Work/AssignTeamScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

const AssignTeamScreen = () => {
  const route = useRoute();
  const { projectId } = route.params || {};
  const [teams] = useState([
    { id: 'A', name: 'Team Alpha' },
    { id: 'B', name: 'Team Bravo' },
    { id: 'C', name: 'Team Charlie' },
  ]);

  const handleAssign = (team) => {
    Alert.alert('Success', `Project ${projectId} assigned to ${team.name}.`);
  };

  const renderTeam = ({ item }) => (
    <TouchableOpacity style={styles.teamItem} onPress={() => handleAssign(item)}>
      <Text style={styles.teamText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assign to a Team</Text>
      <Text style={styles.subHeader}>Project ID: {projectId}</Text>
      <FlatList
        data={teams}
        keyExtractor={item => item.id}
        renderItem={renderTeam}
        ListEmptyComponent={<Text style={styles.emptyText}>No teams found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20
  },
  header: {
    fontSize: 24,
    color: '#ecf0f1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  subHeader: {
    fontSize: 16,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20
  },
  teamItem: {
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  teamText: {
    color: '#ecf0f1',
    fontWeight: 'bold'
  },
  emptyText: {
    textAlign: 'center',
    color: '#ecf0f1',
    marginTop: 20
  }
});

export default AssignTeamScreen;
