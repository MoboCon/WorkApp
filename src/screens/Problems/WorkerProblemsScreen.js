// src/screens/Problems/WorkerProblemsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

const WorkerProblemsScreen = () => {
  const [problems, setProblems] = useState([
    { id:'1', text:'Need more paint brushes.' },
    { id:'2', text:'Scaffolding is unstable.' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredProblems = searchQuery.trim() === '' ? problems : problems.filter(p =>
    p.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProblemItem = ({ item }) => (
    <View style={styles.problemItem}>
      <Text style={styles.problemText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reported Problems</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search problems..."
        placeholderTextColor="#95a5a6"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProblems}
        keyExtractor={item=>item.id}
        renderItem={renderProblemItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No problems found.</Text>}
        style={{flex:1, marginBottom:20}}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Problem</Text>
      </TouchableOpacity>
    </View>
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
    color:'#ecf0f1',
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20
  },
  searchInput:{
    borderWidth:1,
    borderColor:'#34495e',
    padding:10,
    borderRadius:5,
    color:'#ecf0f1',
    marginBottom:15
  },
  problemItem:{
    backgroundColor:'#34495e',
    padding:15,
    borderRadius:5,
    marginBottom:10
  },
  problemText:{
    color:'#ecf0f1'
  },
  emptyText:{
    color:'#ecf0f1',
    textAlign:'center',
    marginTop:20
  },
  addButton:{
    backgroundColor:'#27ae60',
    padding:15,
    borderRadius:10,
    alignItems:'center'
  },
  addButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  }
});

export default WorkerProblemsScreen;
