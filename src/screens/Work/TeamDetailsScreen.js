// src/screens/Work/TeamDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const TeamDetailsScreen = () => {
  const teamName = 'Team Alpha';
  const leader = { id: 'l1', name: 'John', surname: 'Doe' };
  const members = [
    { id: 'm1', name: 'Ion', surname: 'Popescu' },
    { id: 'm2', name: 'Maria', surname: 'Ionescu' },
    { id: 'm3', name: 'Alex', surname: 'Vasilescu' },
  ];

  const renderMember = ({ item }) => (
    <Text style={styles.memberText}>{item.name} {item.surname}</Text>
  );

  const handleEdit = () => {
    // Navigate to team edit screen if implemented
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Team Details</Text>
      <Text style={styles.info}>Team Name: {teamName}</Text>
      <Text style={styles.info}>Leader: {leader.name} {leader.surname}</Text>
      <Text style={styles.info}>Members:</Text>
      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        style={styles.membersList}
      />
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Edit Team</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center'
  },
  info: {
    color: '#ecf0f1',
    fontSize: 16,
    marginVertical: 5
  },
  membersList: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#34495e',
    borderRadius: 5,
    padding: 10
  },
  memberText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginVertical: 3
  },
  editButton: {
    backgroundColor: '#e67e22',
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  editButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default TeamDetailsScreen;
