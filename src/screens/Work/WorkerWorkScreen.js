// src/screens/Work/WorkerWorkScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput, Modal, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const WorkerWorkScreen = () => {
  const [works, setWorks] = useState([
    { id: '1', project: 'Project Alpha', location: 'Location A', details: 'Painting walls', status: 'Pending', date: '2024-07-10' },
    { id: '2', project: 'Project Beta', location: 'Location B', details: 'Floor installation', status: 'In Progress', date: '2024-07-11' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorks, setFilteredWorks] = useState(works);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editProject, setEditProject] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editDetails, setEditDetails] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(works, query, statusFilter, dateFilter);
  };

  const applyFilters = (data, query, status, date) => {
    let result = data;
    if (query.trim() !== '') {
      result = result.filter(w =>
        w.project.toLowerCase().includes(query.toLowerCase()) ||
        w.details.toLowerCase().includes(query.toLowerCase()) ||
        w.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (status.trim() !== '') {
      result = result.filter(w => w.status.toLowerCase() === status.toLowerCase());
    }
    if (date.trim() !== '') {
      result = result.filter(w => w.date === date);
    }
    setFilteredWorks(result);
  };

  const handleFilter = () => {
    applyFilters(works, searchQuery, statusFilter, dateFilter);
    setFilterModalVisible(false);
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setDateFilter('');
    applyFilters(works, searchQuery, '', '');
    setFilterModalVisible(false);
  };

  const handleSort = (criterion) => {
    let sorted = [...filteredWorks];
    if (criterion === 'project') {
      sorted.sort((a,b) => a.project.toLowerCase().localeCompare(b.project.toLowerCase()));
    } else if (criterion === 'status') {
      const order = ['Pending','In Progress','Completed'];
      sorted.sort((a,b) => order.indexOf(a.status) - order.indexOf(b.status));
    } else if (criterion === 'date') {
      sorted.sort((a,b) => new Date(a.date) - new Date(b.date));
    }
    setFilteredWorks(sorted);
    setSortModalVisible(false);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditProject(item.project);
    setEditLocation(item.location);
    setEditDetails(item.details);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editItem) return;
    if (editProject.trim() === '' || editLocation.trim() === '' || editDetails.trim() === '') {
      Alert.alert('Error','All fields are required.');
      return;
    }
    const updated = works.map(w => w.id === editItem.id ? { ...w, project:editProject, location:editLocation, details:editDetails } : w);
    setWorks(updated);
    applyFilters(updated, searchQuery, statusFilter, dateFilter);
    setEditModalVisible(false);
    setEditItem(null);
    setEditProject('');
    setEditLocation('');
    setEditDetails('');
  };

  const renderWorkItem = ({ item }) => (
    <View style={styles.workItem}>
      <Text style={styles.workTitle}>{item.project}</Text>
      <Text style={styles.workDetails}>{item.location} - {item.details}</Text>
      <Text style={styles.workStatus}>Status: {item.status} | Date: {item.date}</Text>
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
      <Text style={styles.header}>Assigned Works</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search works..."
        placeholderTextColor="#95a5a6"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.filterButton} onPress={()=>setFilterModalVisible(true)}>
          <Entypo name="filter" size={20} color="#ecf0f1" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={()=>setSortModalVisible(true)}>
          <Entypo name="arrow-bold-up" size={20} color="#ecf0f1" />
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredWorks}
        keyExtractor={item=>item.id}
        renderItem={renderWorkItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No works found.</Text>}
        style={{flex:1, marginBottom:20}}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Work</Text>
      </TouchableOpacity>

      <Modal visible={filterModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter Works</Text>
            <Text style={styles.label}>Status (Pending/In Progress/Completed):</Text>
            <TextInput
              style={styles.input}
              value={statusFilter}
              onChangeText={setStatusFilter}
              placeholder="Status"
              placeholderTextColor="#95a5a6"
            />
            <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
            <TextInput
              style={styles.input}
              value={dateFilter}
              onChangeText={setDateFilter}
              placeholder="e.g. 2024-07-10"
              placeholderTextColor="#95a5a6"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.applyButton} onPress={handleFilter}>
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={()=>setFilterModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={sortModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sort Works By</Text>
            <TouchableOpacity style={styles.applyButton} onPress={()=>handleSort('project')}>
              <Text style={styles.buttonText}>Project Name</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={()=>handleSort('status')}>
              <Text style={styles.buttonText}>Status</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={()=>handleSort('date')}>
              <Text style={styles.buttonText}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={()=>setSortModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={editModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBackground}>
          <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Work</Text>
            <Text style={styles.label}>Project:</Text>
            <TextInput
              style={styles.input}
              value={editProject}
              onChangeText={setEditProject}
              placeholder="Project name"
              placeholderTextColor="#95a5a6"
            />
            <Text style={styles.label}>Location:</Text>
            <TextInput
              style={styles.input}
              value={editLocation}
              onChangeText={setEditLocation}
              placeholder="Location"
              placeholderTextColor="#95a5a6"
            />
            <Text style={styles.label}>Details:</Text>
            <TextInput
              style={[styles.input,{height:100}]}
              value={editDetails}
              onChangeText={setEditDetails}
              placeholder="Work details"
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
          </ScrollView>
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
  actionsRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15
  },
  filterButton:{
    backgroundColor:'#2980b9',
    flexDirection:'row',
    padding:10,
    borderRadius:5,
    alignItems:'center'
  },
  filterButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold',
    marginLeft:5
  },
  sortButton:{
    backgroundColor:'#9b59b6',
    flexDirection:'row',
    padding:10,
    borderRadius:5,
    alignItems:'center'
  },
  sortButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold',
    marginLeft:5
  },
  workItem:{
    backgroundColor:'#34495e',
    padding:15,
    borderRadius:5,
    marginBottom:10
  },
  workTitle:{
    fontSize:18,
    color:'#ecf0f1',
    fontWeight:'bold',
    marginBottom:5
  },
  workDetails:{
    color:'#ecf0f1',
    marginBottom:5
  },
  workStatus:{
    color:'#ecf0f1',
    fontStyle:'italic',
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
    alignItems:'center'
  },
  addButtonText:{
    color:'#ecf0f1',
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
    alignItems:'center',
    flex:0.45
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
  applyButton:{
    backgroundColor:'#27ae60',
    padding:10,
    borderRadius:5,
    flex:0.3,
    alignItems:'center'
  },
  clearButton:{
    backgroundColor:'#c0392b',
    padding:10,
    borderRadius:5,
    flex:0.3,
    alignItems:'center'
  },
  cancelButton:{
    backgroundColor:'#7f8c8d',
    padding:10,
    borderRadius:5,
    flex:0.3,
    alignItems:'center'
  },
  saveButton:{
    backgroundColor:'#27ae60',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  }
});

export default WorkerWorkScreen;
