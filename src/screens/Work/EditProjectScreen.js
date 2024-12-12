// src/screens/Work/EditProjectScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditProjectScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId, projectName, projectLocation, status } = route.params || {};
  const [name, setName] = useState(projectName || '');
  const [location, setLocation] = useState(projectLocation || '');
  const [projStatus, setProjStatus] = useState(status || 'Pending');

  const handleSave = () => {
    if (name.trim() === '' || location.trim() === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    Alert.alert('Success', `Project "${name}" updated successfully.`);
    navigation.goBack();
  };

  const handleChangeStatus = () => {
    const newStatus = projStatus === 'Pending' ? 'In Progress' : projStatus === 'In Progress' ? 'Completed' : 'Pending';
    setProjStatus(newStatus);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Project</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Project name"
        placeholderTextColor="#95a5a6"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Project location"
        placeholderTextColor="#95a5a6"
      />
      <Text style={styles.label}>Status: {projStatus}</Text>
      <TouchableOpacity style={styles.statusButton} onPress={handleChangeStatus}>
        <Text style={styles.statusButtonText}>Change Status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    color: '#ecf0f1'
  },
  input: {
    borderWidth: 1,
    borderColor: '#34495e',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    color: '#ecf0f1'
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
  saveButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  saveButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default EditProjectScreen;
