// src/screens/Attendance/AttendanceDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const AttendanceDetailsScreen = () => {
  const route = useRoute();
  const [records] = useState([
    { id: '1', workerName: 'Ion Popescu', status: 'Present', color: '#2ecc71' },
    { id: '2', workerName: 'Maria Ionescu', status: 'Absent', color: '#e74c3c' },
    { id: '3', workerName: 'Alex Vasilescu', status: 'Medical', color: '#f1c40f' },
  ]);

  const renderRecord = ({ item }) => (
    <View style={[styles.recordItem, { backgroundColor: item.color }]}>
      <Text style={styles.recordName}>{item.workerName}</Text>
      <Text style={styles.recordStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Details</Text>
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={renderRecord}
        ListEmptyComponent={<Text style={styles.emptyText}>No records found.</Text>}
      />
      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="edit" size={24} color="#ecf0f1" />
        <Text style={styles.addButtonText}> Edit Records</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#ecf0f1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  recordName: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordStatus: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  emptyText: {
    color: '#ecf0f1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#e67e22',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AttendanceDetailsScreen;
