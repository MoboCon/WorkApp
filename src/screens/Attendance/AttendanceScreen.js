// src/screens/Attendance/AttendanceScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const AttendanceScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [statsModalVisible, setStatsModalVisible] = useState(false);
  const [viewMonth, setViewMonth] = useState(month);
  const [viewYear, setViewYear] = useState(year);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);

  const handleSelectDate = (day) => {
    setSelectedDate(day);
  };

  const handleMarkAttendance = (status) => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date first.');
      return;
    }
    // Stocăm datele după luna și anul curent, pentru a nu afișa selecțiile din luna precedentă
    const key = `${year}-${month}`;
    const prevData = attendance[key] || {};
    const updatedData = { ...prevData, [selectedDate]: status };
    setAttendance({...attendance, [key]: updatedData});
  };

  const getDayStyle = (day) => {
    const key = `${year}-${month}`;
    const monthData = attendance[key] || {};
    const status = monthData[day];
    
    const baseStyle = [styles.dayItem];
    
    if (selectedDate === day) {
      baseStyle.push(styles.selectedDay);
    }
    
    if (status === 'Present') baseStyle.push(styles.presentDay);
    if (status === 'Absent') baseStyle.push(styles.absentDay);
    if (status === 'Medical') baseStyle.push(styles.medicalDay);
    if (status === 'Bad Weather') baseStyle.push(styles.weatherDay);
    
    return baseStyle;
  };

  const prevMonth = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = year - 1;
    }
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = year + 1;
    }
    setMonth(newMonth);
    setYear(newYear);
    setSelectedDate(null);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

  const openStats = () => {
    setViewMonth(month);
    setViewYear(year);
    setStatsModalVisible(true);
  };

  const changeStatsMonth = (increment) => {
    let newMonth = viewMonth + increment;
    let newYear = viewYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setViewMonth(newMonth);
    setViewYear(newYear);
  };

  const getStats = () => {
    const key = `${viewYear}-${viewMonth}`;
    const monthData = attendance[key] || {};
    let present = 0;
    let absent = 0;
    let medical = 0;
    let badWeather = 0;
    for (let day in monthData) {
      if (monthData[day] === 'Present') present++;
      if (monthData[day] === 'Absent') absent++;
      if (monthData[day] === 'Medical') medical++;
      if (monthData[day] === 'Bad Weather') badWeather++;
    }
    return { present, absent, medical, badWeather };
  };

  const { present, absent, medical, badWeather } = getStats();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Attendance Calendar</Text>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={prevMonth} style={styles.navButton}>
          <Entypo name="chevron-left" size={24} color="#ecf0f1" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthNames[month]} {year}</Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Entypo name="chevron-right" size={24} color="#ecf0f1" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.calendarContainer}>
        <View style={styles.weekDaysContainer}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
            <Text key={day} style={styles.weekDayText}>{day}</Text>
          ))}
        </View>
        <FlatList
          data={daysArray}
          keyExtractor={(item) => item.toString()}
          numColumns={5}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={getDayStyle(item)}
              onPress={() => handleSelectDate(item)}
            >
              <Text style={[
                styles.dayText,
                selectedDate === item && styles.selectedDayText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.statusButton} onPress={() => handleMarkAttendance('Present')}>
          <MaterialCommunityIcons name="account-check" size={20} color="#ecf0f1" />
          <Text style={styles.buttonText}> Present</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton} onPress={() => handleMarkAttendance('Absent')}>
          <MaterialCommunityIcons name="account-remove" size={20} color="#ecf0f1" />
          <Text style={styles.buttonText}> Absent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton} onPress={() => handleMarkAttendance('Medical')}>
          <FontAwesome5 name="briefcase-medical" size={18} color="#ecf0f1" />
          <Text style={styles.buttonText}> Medical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton} onPress={() => handleMarkAttendance('Bad Weather')}>
          <Entypo name="cloud" size={20} color="#ecf0f1" />
          <Text style={styles.buttonText}> Bad Weather</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.statsButton} onPress={openStats}>
        <Entypo name="bar-graph" size={20} color="#ecf0f1" />
        <Text style={styles.buttonText}> View Stats</Text>
      </TouchableOpacity>

      <Modal visible={statsModalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Attendance Stats</Text>
            <View style={styles.statsNav}>
              <TouchableOpacity style={styles.navMonthButton} onPress={() => changeStatsMonth(-1)}>
                <Entypo name="chevron-left" size={24} color="#ecf0f1" />
              </TouchableOpacity>
              <Text style={styles.modalMonthText}>{monthNames[viewMonth]} {viewYear}</Text>
              <TouchableOpacity style={styles.navMonthButton} onPress={() => changeStatsMonth(1)}>
                <Entypo name="chevron-right" size={24} color="#ecf0f1" />
              </TouchableOpacity>
            </View>
            <Text style={styles.statText}>Present: {present}</Text>
            <Text style={styles.statText}>Absent: {absent}</Text>
            <Text style={styles.statText}>Medical: {medical}</Text>
            <Text style={styles.statText}>Bad Weather: {badWeather}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setStatsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: '#ecf0f1',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  navButton: {
    padding: 5
  },
  monthText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: 18
  },
  calendarContainer: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#34495e',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#465c74',
    marginBottom: 5,
  },
  weekDayText: {
    color: '#95a5a6',
    fontWeight: '600',
    width: 50,
    textAlign: 'center',
  },
  dayItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#465c74',
  },
  selectedDay: {
    borderWidth: 2,
    borderColor: '#3498db',
    transform: [{ scale: 1.1 }],
  },
  dayText: {
    color: '#ecf0f1',
    fontWeight: '600',
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  presentDay: {
    backgroundColor: '#2ecc71',
  },
  absentDay: {
    backgroundColor: '#e74c3c',
  },
  medicalDay: {
    backgroundColor: '#f1c40f',
  },
  weatherDay: {
    backgroundColor: '#3498db',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  statusButton: {
    backgroundColor: '#8e44ad',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#ecf0f1',
    fontWeight: 'bold'
  },
  statsButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  modalTitle: {
    fontSize: 20,
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  statText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginVertical: 5
  },
  closeButton: {
    backgroundColor: '#e67e22',
    padding: 15,
    borderRadius: 10,
    marginTop: 30
  },
  closeButtonText: {
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  statsNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  navMonthButton: {
    padding: 5
  },
  modalMonthText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default AttendanceScreen;
