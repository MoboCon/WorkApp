import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  FlatList,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CreateTeamScreen = () => {
  // State-uri
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [workers, setWorkers] = useState([]);
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerSurname, setNewWorkerSurname] = useState('');
  const [newWorkerEmail, setNewWorkerEmail] = useState('');
  const [newWorkerPhone, setNewWorkerPhone] = useState('');
  const [selectedLeaderId, setSelectedLeaderId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Funcții
  const addWorker = () => {
    if (!newWorkerName.trim() || !newWorkerSurname.trim() || !newWorkerEmail.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newWorker = {
      id: Date.now().toString(),
      name: newWorkerName,
      surname: newWorkerSurname,
      email: newWorkerEmail,
      phone: newWorkerPhone,
      role: 'worker'
    };

    setWorkers([...workers, newWorker]);
    clearWorkerForm();
  };

  const clearWorkerForm = () => {
    setNewWorkerName('');
    setNewWorkerSurname('');
    setNewWorkerEmail('');
    setNewWorkerPhone('');
  };

  const assignLeader = (workerId) => {
    setSelectedLeaderId(workerId);
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name');
      return;
    }

    if (workers.length === 0) {
      Alert.alert('Error', 'Please add at least one worker');
      return;
    }

    if (!selectedLeaderId) {
      Alert.alert('Error', 'Please select a team leader');
      return;
    }

    setShowConfirmModal(true);
  };

  const ListHeaderComponent = () => (
    <View>
      <Text style={styles.header}>Create a New Team</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Information</Text>
        <TextInput
          style={styles.input}
          value={teamName}
          onChangeText={setTeamName}
          placeholder="Team Name"
          placeholderTextColor="#95a5a6"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          value={teamDescription}
          onChangeText={setTeamDescription}
          placeholder="Team Description"
          placeholderTextColor="#95a5a6"
          multiline
          numberOfLines={3}
        />

        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          placeholder="Department"
          placeholderTextColor="#95a5a6"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Team Member</Text>
        <TextInput
          style={styles.input}
          value={newWorkerName}
          onChangeText={setNewWorkerName}
          placeholder="First Name"
          placeholderTextColor="#95a5a6"
        />
        <TextInput
          style={styles.input}
          value={newWorkerSurname}
          onChangeText={setNewWorkerSurname}
          placeholder="Last Name"
          placeholderTextColor="#95a5a6"
        />
        <TextInput
          style={styles.input}
          value={newWorkerEmail}
          onChangeText={setNewWorkerEmail}
          placeholder="Email"
          placeholderTextColor="#95a5a6"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={newWorkerPhone}
          onChangeText={setNewWorkerPhone}
          placeholder="Phone Number"
          placeholderTextColor="#95a5a6"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.addButton} onPress={addWorker}>
          <MaterialCommunityIcons name="account-plus" size={24} color="#fff" />
          <Text style={styles.buttonText}>Add Team Member</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Team Members</Text>
    </View>
  );

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.createButton} 
        onPress={handleCreateTeam}
      >
        <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
        <Text style={styles.createButtonText}>Create Team</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWorker = ({ item }) => (
    <LinearGradient
      colors={['#2c3e50', '#34495e']}
      style={styles.workerItem}
    >
      <View style={styles.workerAvatar}>
        <Text style={styles.avatarText}>
          {item.name[0]}{item.surname[0]}
        </Text>
      </View>
      <View style={styles.workerInfo}>
        <Text style={styles.workerName}>{item.name} {item.surname}</Text>
        <Text style={styles.workerEmail}>{item.email}</Text>
        {item.phone && <Text style={styles.workerPhone}>{item.phone}</Text>}
      </View>
      <TouchableOpacity 
        style={[
          styles.leaderButton,
          selectedLeaderId === item.id && styles.leaderButtonSelected
        ]}
        onPress={() => assignLeader(item.id)}
      >
        <MaterialCommunityIcons 
          name={selectedLeaderId === item.id ? "star" : "star-outline"} 
          size={24} 
          color={selectedLeaderId === item.id ? "#f1c40f" : "#ecf0f1"} 
        />
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <FlatList
          data={workers}
          renderItem={renderWorker}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No team members added yet.</Text>
          }
          contentContainerStyle={styles.listContent}
        />

        <Modal
          visible={showConfirmModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowConfirmModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <MaterialCommunityIcons 
                name="check-circle" 
                size={60} 
                color="#2ecc71" 
              />
              <Text style={styles.modalTitle}>Team Created!</Text>
              <Text style={styles.modalText}>
                Your team has been successfully created.
              </Text>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => {
                  setShowConfirmModal(false);
                  // Reset form
                  setTeamName('');
                  setTeamDescription('');
                  setDepartment('');
                  setWorkers([]);
                  setSelectedLeaderId(null);
                }}
              >
                <Text style={styles.modalButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  listContent: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    backgroundColor: '#34495e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#ecf0f1',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  workerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  workerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  workerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  workerName: {
    color: '#ecf0f1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workerEmail: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  workerPhone: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  leaderButton: {
    padding: 8,
    borderRadius: 20,
  },
  leaderButtonSelected: {
    backgroundColor: '#f39c12',
  },
  addButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  createButton: {
    backgroundColor: '#2ecc71',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyText: {
    color: '#bdc3c7',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#34495e',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginTop: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#bdc3c7',
    textAlign: 'center',
    marginVertical: 16,
  },
  modalButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateTeamScreen;