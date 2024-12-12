// src/screens/Attendance/AttendanceStatsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AttendanceStatsScreen = () => {
  const statsData = [
    { id: '1', category: 'Present', count: 20, color: '#2ecc71' },
    { id: '2', category: 'Absent', count: 5, color: '#e74c3c' },
    { id: '3', category: 'Medical', count: 2, color: '#f1c40f' },
    { id: '4', category: 'Bad Weather', count: 1, color: '#3498db' },
  ];

  const renderStat = ({ item }) => (
    <View style={[styles.statItem, { backgroundColor: item.color }]}>
      <Text style={styles.statText}>{item.category}</Text>
      <Text style={styles.countText}>{item.count}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Statistics</Text>
      <FlatList
        data={statsData}
        keyExtractor={item => item.id}
        renderItem={renderStat}
        ListEmptyComponent={<Text style={styles.emptyText}>No stats available.</Text>}
      />
      <TouchableOpacity style={styles.exportButton}>
        <AntDesign name="download" size={20} color="#ecf0f1" />
        <Text style={styles.buttonText}> Export Stats</Text>
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
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  statText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countText: {
    color: '#ecf0f1',
    fontSize: 18,
  },
  emptyText: {
    color: '#ecf0f1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  exportButton: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AttendanceStatsScreen;
