// src/screens/Work/ProjectDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProjectDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId, projectName, projectLocation } = route.params || {};
  const [assignedTeam, setAssignedTeam] = useState('None');
  const [status, setStatus] = useState('Pending');

  const handleEdit = () => {
    navigation.navigate('EditProject', {
      projectId,
      projectName,
      projectLocation,
      status
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Project',
      `Are you sure you want to delete "${projectName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
            Alert.alert('Deleted', `${projectName} has been deleted.`);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleChangeStatus = () => {
    const newStatus = status === 'Pending' ? 'In Progress' : status === 'In Progress' ? 'Completed' : 'Pending';
    setStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Project Details</Text>
      <Text style={styles.info}>ID: {projectId}</Text>
      <Text style={styles.info}>Name: {projectName}</Text>
      <Text style={styles.info}>Location: {projectLocation}</Text>
      <Text style={styles.info}>Assigned Team: {assignedTeam}</Text>
      <Text style={styles.info}>Status: {status}</Text>
      <TouchableOpacity style={styles.statusButton} onPress={handleChangeStatus}>
        <Text style={styles.statusButtonText}>Change Status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.editButtonText}>Edit Project</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Project</Text>
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
  statusButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  statusButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  editButton: {
    backgroundColor: '#e67e22',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  editButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  deleteButton: {
    backgroundColor: '#c0392b',
    padding: 15,
    borderRadius: 10,
    marginTop: 20
  },
  deleteButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default ProjectDetailsScreen;
