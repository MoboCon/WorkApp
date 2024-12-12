// src/screens/Profile/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Button, 
  Alert, 
  ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('Administrator');
  const [surname, setSurname] = useState('User');
  const [email, setEmail] = useState('admin@example.com');
  const [address, setAddress] = useState('Strada Exemplu, Nr. 123');
  const [phone, setPhone] = useState('0123-456-789');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisiune Necesara', 'Permisiunea de acces la galerie este necesară pentru a schimba poza de profil.');
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (E) {
      console.log(E);
      Alert.alert('Eroare', 'A apărut o problemă la selectarea pozei.');
    }
  };

  const handleChangePassword = () => {
    Alert.alert('Schimbare Parolă', 'Funcționalitatea de schimbare a parolei va fi implementată în curând.');
  };

  const handleSaveProfile = () => {
    Alert.alert('Succes', 'Profilul a fost actualizat cu succes.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Adaugă Poză</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.form}>
        <Text style={styles.label}>Nume:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Prenume:</Text>
        <TextInput
          style={styles.input}
          value={surname}
          onChangeText={setSurname}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Adresă:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Număr de Telefon:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.changePasswordButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Schimbă Parola</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveProfileButton} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Salvează Profilul</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#1c2833',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c2833',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#28b463',
  },
  placeholderImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#3498db',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  role: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#d5d8dc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#34495e',
    padding: 12,
    borderRadius: 8,
    color: '#fdfefe',
    backgroundColor: '#2e4053',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#28b463',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    flex: 1,
  },
  changePasswordButton: {
    backgroundColor: '#8e44ad',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fdfefe',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2c3e50',
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fdfefe',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#28b463',
    marginHorizontal: 5,
    alignItems: 'center',
  },
});
