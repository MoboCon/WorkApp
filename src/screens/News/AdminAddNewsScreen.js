// src/screens/News/AdminAddNewsScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AdminAddNewsScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleAddNews = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Your news has been published! 🎉');
    setTitle('');
    setContent('');
    setImage(null);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Needed', 'Please grant camera roll permissions to continue');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#4a90e2', '#63b8ff']}
            style={styles.headerGradient}
          >
            <Text style={styles.header}>Create News</Text>
            <Text style={styles.subHeader}>Share important updates with your team</Text>
          </LinearGradient>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="format-title" size={24} color="#4a90e2" />
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter an engaging title"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.contentContainer}>
              <MaterialCommunityIcons name="text" size={24} color="#4a90e2" />
              <TextInput
                style={styles.contentInput}
                value={content}
                onChangeText={setContent}
                placeholder="Write your news content here..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
              />
            </View>

            {image ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.removeImageButton}
                  onPress={() => setImage(null)}
                >
                  <MaterialCommunityIcons name="close-circle" size={28} color="#ff4444" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <MaterialCommunityIcons name="image-plus" size={32} color="#4a90e2" />
                <Text style={styles.imageButtonText}>Add Cover Image</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.publishButton} onPress={handleAddNews}>
              <MaterialCommunityIcons name="send" size={24} color="#fff" />
              <Text style={styles.publishButtonText}>Publish News</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    height: 150,
  },
  imageContainer: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#4a90e2',
    borderStyle: 'dashed',
  },
  imageButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: '600',
  },
  publishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  publishButtonText: {
    marginLeft: 8,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdminAddNewsScreen;
