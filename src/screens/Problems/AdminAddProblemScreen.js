// src/screens/Problems/AdminAddProblemScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const AdminAddProblemScreen = () => {
  const [problemText, setProblemText] = useState('');

  const handleAddProblem = () => {
    if (problemText.trim() === '') {
      Alert.alert('Error', 'Please enter problem details.');
      return;
    }
    Alert.alert('Success', 'Problem reported successfully.');
    setProblemText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Problem</Text>
      <Text style={styles.label}>Problem Text:</Text>
      <TextInput
        style={styles.input}
        value={problemText}
        onChangeText={setProblemText}
        placeholder="Describe the problem"
        placeholderTextColor="#95a5a6"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProblem}>
        <Text style={styles.addButtonText}>Add Problem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2833',
    padding: 20,
  },
  header: {
    fontSize: 26,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#fdfefe',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    color: '#d5d8dc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#5d6d7e',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    color: '#fdfefe',
    backgroundColor: '#2e4053',
    height: 120,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#28b463',
    padding: 15,
    borderRadius: 12,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  addButtonText: {
    color: '#fdfefe',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AdminAddProblemScreen;
