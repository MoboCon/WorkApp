// src/screens/Work/WorkerSubmitWorkScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';

const WorkerSubmitWorkScreen = () => {
  const [details, setDetails] = useState('');
  const [metrics, setMetrics] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (details.trim() === '' || metrics.trim() === '') {
      Alert.alert('Error','Details and metrics are required.');
      return;
    }
    Alert.alert('Success','Work submitted successfully.');
    setDetails('');
    setMetrics('');
    setNotes('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Submit Work</Text>
      <Text style={styles.label}>Work Details:</Text>
      <TextInput
        style={[styles.input,{height:100}]}
        value={details}
        onChangeText={setDetails}
        placeholder="Describe the work done"
        placeholderTextColor="#95a5a6"
        multiline
      />
      <Text style={styles.label}>Metrics (e.g. sq meters):</Text>
      <TextInput
        style={styles.input}
        value={metrics}
        onChangeText={setMetrics}
        placeholder="Enter metrics"
        placeholderTextColor="#95a5a6"
      />
      <Text style={styles.label}>Additional Notes:</Text>
      <TextInput
        style={[styles.input,{height:100}]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Any additional notes"
        placeholderTextColor="#95a5a6"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Work</Text>
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
  submitButton:{
    backgroundColor:'#27ae60',
    padding:15,
    borderRadius:10,
    marginTop:30,
    alignItems:'center'
  },
  submitButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  }
});

export default WorkerSubmitWorkScreen;
