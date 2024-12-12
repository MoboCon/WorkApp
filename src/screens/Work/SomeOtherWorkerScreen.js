// src/screens/Work/SomeOtherWorkerScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SomeOtherWorkerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Some Other Worker Screen</Text>
      {/* Adaugă aici componentele și funcționalitățile necesare */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SomeOtherWorkerScreen;
