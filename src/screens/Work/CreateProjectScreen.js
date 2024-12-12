// src/screens/Work/CreateProjectScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { saveProject } from '../../utils/storage';

const CreateProjectScreen = ({ navigation }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    location: '',
    description: '',
    budget: '',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'medium',
    status: 'planning',
    images: [],
    tasks: [],
    team: null
  });

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const priorities = ['low', 'medium', 'high'];
  const statuses = ['planning', 'in-progress', 'completed', 'on-hold'];

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to enable permission to access the photo library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setProjectData(prev => ({
        ...prev,
        images: [...prev.images, result.assets[0].uri]
      }));
    }
  };

  const handleSave = async () => {
    if (!projectData.name || !projectData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      await saveProject({
        ...projectData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      });
      Alert.alert(
        'Success',
        'Project created successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create project');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Basic Information</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Project Name *</Text>
        <TextInput
          style={styles.input}
          value={projectData.name}
          onChangeText={(text) => setProjectData(prev => ({ ...prev, name: text }))}
          placeholder="Enter project name"
          placeholderTextColor="#95a5a6"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location *</Text>
        <TextInput
          style={styles.input}
          value={projectData.location}
          onChangeText={(text) => setProjectData(prev => ({ ...prev, location: text }))}
          placeholder="Enter project location"
          placeholderTextColor="#95a5a6"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={projectData.description}
          onChangeText={(text) => setProjectData(prev => ({ ...prev, description: text }))}
          placeholder="Enter project description"
          placeholderTextColor="#95a5a6"
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Timeline & Budget</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons name="calendar-outline" size={24} color="#3498db" />
          <Text style={styles.dateButtonText}>
            {projectData.startDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons name="calendar-outline" size={24} color="#3498db" />
          <Text style={styles.dateButtonText}>
            {projectData.endDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Budget</Text>
        <TextInput
          style={styles.input}
          value={projectData.budget}
          onChangeText={(text) => setProjectData(prev => ({ ...prev, budget: text }))}
          placeholder="Enter project budget"
          placeholderTextColor="#95a5a6"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Details & Media</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {priorities.map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                projectData.priority === priority && styles.priorityButtonActive,
                { backgroundColor: priority === 'high' ? '#e74c3c' : 
                                 priority === 'medium' ? '#f1c40f' : '#2ecc71' }
              ]}
              onPress={() => setProjectData(prev => ({ ...prev, priority }))}
            >
              <Text style={styles.priorityButtonText}>{priority}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                projectData.status === status && styles.statusButtonActive
              ]}
              onPress={() => setProjectData(prev => ({ ...prev, status }))}
            >
              <Text style={styles.statusButtonText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Project Images</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}
        >
          {projectData.images.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.projectImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => {
                  setProjectData(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index)
                  }));
                }}
              >
                <Ionicons name="close-circle" size={24} color="#e74c3c" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={handleImagePick}
          >
            <Ionicons name="add-circle-outline" size={40} color="#3498db" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.stepsIndicator}>
          {[1, 2, 3].map((step) => (
            <TouchableOpacity
              key={step}
              style={[
                styles.stepIndicator,
                currentStep === step && styles.stepIndicatorActive
              ]}
              onPress={() => setCurrentStep(step)}
            >
              <Text style={[
                styles.stepIndicatorText,
                currentStep === step && styles.stepIndicatorTextActive
              ]}>
                {step}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <View style={styles.navigationButtons}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton]}
              onPress={() => setCurrentStep(prev => prev - 1)}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          {currentStep < 3 ? (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={() => setCurrentStep(prev => prev + 1)}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.navButtonText}>Create Project</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {showStartDate && (
        <DateTimePicker
          value={projectData.startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDate(false);
            if (selectedDate) {
              setProjectData(prev => ({ ...prev, startDate: selectedDate }));
            }
          }}
        />
      )}

      {showEndDate && (
        <DateTimePicker
          value={projectData.endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDate(false);
            if (selectedDate) {
              setProjectData(prev => ({ ...prev, endDate: selectedDate }));
            }
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2833',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  stepIndicatorActive: {
    backgroundColor: '#3498db',
  },
  stepIndicatorText: {
    color: '#95a5a6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepIndicatorTextActive: {
    color: '#fff',
  },
  stepContainer: {
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#bdc3c7',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
    color: '#ecf0f1',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    padding: 12,
  },
  dateButtonText: {
    color: '#ecf0f1',
    fontSize: 16,
    marginLeft: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  priorityButtonActive: {
    opacity: 1,
  },
  priorityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statusButton: {
    backgroundColor: '#2c3e50',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  statusButtonActive: {
    backgroundColor: '#3498db',
  },
  statusButtonText: {
    color: '#ecf0f1',
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  projectImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3498db',
    borderStyle: 'dashed',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 50,
  },
  navButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  prevButton: {
    backgroundColor: '#34495e',
  },
  nextButton: {
    backgroundColor: '#3498db',
  },
  saveButton: {
    backgroundColor: '#27ae60',
  },
  navButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProjectScreen;
