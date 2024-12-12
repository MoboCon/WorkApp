// src/screens/Problems/WorkerAddProblemScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';

const WorkerAddProblemScreen = () => {
  const [problemText, setProblemText] = useState('');

  const handleAddProblem = () => {
    if (problemText.trim() === '') {
      Alert.alert('Error','Please enter problem details.');
      return;
    }
    Alert.alert('Success','Problem reported successfully.');
    setProblemText('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Problem</Text>
      <Text style={styles.label}>Problem Text:</Text>
      <TextInput
        style={[styles.input,{height:100}]}
        value={problemText}
        onChangeText={setProblemText}
        placeholder="Describe the problem"
        placeholderTextColor="#95a5a6"
        multiline
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProblem}>
        <Text style={styles.addButtonText}>Add Problem</Text>
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
    textAlign:'center',
    fontWeight:'bold'
  }
});

export default WorkerAddProblemScreen;
