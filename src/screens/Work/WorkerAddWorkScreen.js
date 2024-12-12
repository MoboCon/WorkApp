// src/screens/Work/WorkerAddWorkScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';

const WorkerAddWorkScreen = () => {
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  const handleAddWork = () => {
    if (project.trim() === '' || location.trim() === '' || details.trim() === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    Alert.alert('Success', 'Work added successfully.');
    setProject('');
    setLocation('');
    setDetails('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Work</Text>
      <Text style={styles.label}>Project:</Text>
      <TextInput
        style={styles.input}
        value={project}
        onChangeText={setProject}
        placeholder="Project name"
        placeholderTextColor="#95a5a6"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Work location"
        placeholderTextColor="#95a5a6"
      />
      <Text style={styles.label}>Details:</Text>
      <TextInput
        style={[styles.input,{height:100}]}
        value={details}
        onChangeText={setDetails}
        placeholder="Work details"
        placeholderTextColor="#95a5a6"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddWork}>
        <Text style={styles.addButtonText}>Add Work</Text>
      </TouchableOpacity>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#2c3e50',
    padding:20
  },
  header:{
    fontSize:24,
    marginBottom:30,
    fontWeight:'bold',
    color:'#ecf0f1',
    textAlign:'center'
  },
  label:{
    fontSize:16,
    marginTop:15,
    color:'#ecf0f1'
  },
  input:{
    borderWidth:1,
    borderColor:'#34495e',
    padding:10,
    borderRadius:5,
    marginTop:5,
    color:'#ecf0f1'
  },
  addButton:{
    backgroundColor:'#27ae60',
    padding:15,
    borderRadius:10,
    marginTop:30,
    alignItems:'center'
  },
  addButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  }
});

export default WorkerAddWorkScreen;
