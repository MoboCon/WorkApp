// src/screens/Problems/AdminProblemsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const AdminProblemsScreen = () => {
  const [problems, setProblems] = useState([
    { id: '1', text: 'Machine broken in workshop.' },
    { id: '2', text: 'No protective gear available.' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProblems, setFilteredProblems] = useState(problems);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newProblem, setNewProblem] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState('');

  const handleDeleteAll = () => {
    Alert.alert(
      'Delete All Problems',
      'Are you sure you want to delete all reported problems?',
      [
        { text:'Cancel', style:'cancel'},
        { text:'OK', onPress:()=> {
            setProblems([]);
            setFilteredProblems([]);
          }}
      ]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProblems(problems);
    } else {
      const filtered = problems.filter(p =>
        p.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProblems(filtered);
    }
  };

  const handleAddProblem = () => {
    if (newProblem.trim() === '') {
      Alert.alert('Error','Please enter problem details.');
      return;
    }
    const newItem = { id: Date.now().toString(), text:newProblem };
    const updated = [...problems, newItem];
    setProblems(updated);
    setFilteredProblems(updated);
    setNewProblem('');
    setAddModalVisible(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditText(item.text);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editItem) return;
    if (editText.trim() === '') {
      Alert.alert('Error','Please enter problem details.');
      return;
    }
    const updated = problems.map(p => p.id === editItem.id ? { ...p, text:editText } : p);
    setProblems(updated);
    setFilteredProblems(updated);
    setEditModalVisible(false);
    setEditItem(null);
    setEditText('');
  };

  const renderProblemItem = ({ item }) => (
    <View style={styles.problemItem}>
      <Text style={styles.problemText}>{item.text}</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity style={styles.editButton} onPress={()=>handleEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.header}>Reported Problems</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search problems..."
        placeholderTextColor="#95a5a6"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredProblems}
        keyExtractor={item=>item.id}
        renderItem={renderProblemItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No problems reported.</Text>}
        style={{flex:1, marginBottom:20}}
      />
      <TouchableOpacity style={styles.addButton} onPress={()=>setAddModalVisible(true)}>
        <Entypo name="plus" size={20} color="#ecf0f1" />
        <Text style={styles.addButtonText}> Add Problem</Text>
      </TouchableOpacity>
      {problems.length > 0 && (
        <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAll}>
          <Text style={styles.deleteAllButtonText}>Delete All</Text>
        </TouchableOpacity>
      )}

      <Modal visible={addModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBackground}>
          <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Problem</Text>
            <Text style={styles.label}>Problem:</Text>
            <TextInput
              style={[styles.input,{height:100}]}
              value={newProblem}
              onChangeText={setNewProblem}
              placeholder="Describe the problem"
              placeholderTextColor="#95a5a6"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddProblem}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={()=>setAddModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={editModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Problem</Text>
            <Text style={styles.label}>Problem:</Text>
            <TextInput
              style={[styles.input,{height:100}]}
              value={editText}
              onChangeText={setEditText}
              placeholder="Describe the problem"
              placeholderTextColor="#95a5a6"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={()=>setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
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
    color:'#ecf0f1',
    marginBottom:10
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
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  addButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  },
  deleteAllButton:{
    backgroundColor:'#c0392b',
    padding:15,
    borderRadius:10,
    marginTop:10
  },
  deleteAllButtonText:{
    color:'#ecf0f1',
    textAlign:'center',
    fontWeight:'bold'
  },
  itemButtons:{
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  editButton:{
    backgroundColor:'#2980b9',
    padding:10,
    borderRadius:5,
    alignItems:'center'
  },
  buttonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  },
  modalBackground:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.7)',
    justifyContent:'center',
    alignItems:'center'
  },
  modalContainer:{
    backgroundColor:'#34495e',
    padding:20,
    borderRadius:10,
    width:'80%'
  },
  modalTitle:{
    fontSize:20,
    color:'#ecf0f1',
    fontWeight:'bold',
    marginBottom:20,
    textAlign:'center'
  },
  label:{
    fontSize:16,
    marginTop:15,
    color:'#ecf0f1'
  },
  input:{
    borderWidth:1,
    borderColor:'#2c3e50',
    padding:10,
    borderRadius:5,
    marginTop:5,
    color:'#ecf0f1'
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20
  },
  saveButton:{
    backgroundColor:'#27ae60',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  },
  cancelButton:{
    backgroundColor:'#7f8c8d',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  }
});

export default AdminProblemsScreen;
