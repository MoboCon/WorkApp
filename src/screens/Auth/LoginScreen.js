import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const success = login(username, password);
    if (!success) {
      alert('Date de autentificare incorecte!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WorkApp Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nume utilizator"
        placeholderTextColor="#7f8c8d"
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Parola"
        placeholderTextColor="#7f8c8d"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Autentificare</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Ai uitat parola?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#34495e',
    backgroundColor: '#34495e',
    borderRadius: 5,
    padding: 10,
    color: '#ecf0f1',
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#ecf0f1',
    fontSize: 14,
    marginTop: 10,
  },
});
