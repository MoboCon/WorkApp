// src/screens/Work/WorkerWorkDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Image, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const WorkerWorkDetailsScreen = () => {
  // Example work data
  const [project, setProject] = useState('Project Alpha');
  const [location, setLocation] = useState('Location A');
  const [details, setDetails] = useState('Painting walls');
  const [status, setStatus] = useState('Pending');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [activities, setActivities] = useState([
    { id: '1', activity: 'Assigned to worker', date: '2024-07-01' },
    { id: '2', activity: 'Material prepared', date: '2024-07-05' },
  ]);

  const handleAddComment = () => {
    if (commentText.trim() === '') {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }
    const newComment = {
      id: String(comments.length + 1),
      text: commentText,
      date: new Date().toLocaleDateString(),
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  const handleEditDetails = () => {
    Alert.alert('Edit Details', 'Feature under construction.');
  };

  const handleSubmitWork = () => {
    Alert.alert('Success', 'Work submitted successfully.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#e74c3c';
      case 'In Progress':
        return '#f39c12';
      case 'Completed':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  const renderActivity = ({ item }) => (
    <View style={styles.activityItem}>
      <Text style={styles.activityText}>{item.activity}</Text>
      <Text style={styles.activityDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/300x150' }}
            style={styles.workImage}
            resizeMode="cover"
          />
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <Text style={styles.header}>Work Details</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.info}>Project: {project}</Text>
          <Text style={styles.info}>Location: {location}</Text>
          <Text style={styles.info}>Details: {details}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditDetails}>
          <Ionicons name="create-outline" size={20} color="#ecf0f1" />
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>

        <View style={styles.activitiesContainer}>
          <Text style={styles.subHeader}>Activity History</Text>
          <FlatList
            data={activities}
            keyExtractor={(item) => item.id}
            renderItem={renderActivity}
            style={styles.activitiesList}
          />
        </View>

        <View style={styles.commentsContainer}>
          <Text style={styles.subHeader}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentText}>{item.text}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.noComments}>No comments yet.</Text>}
          />
          <TextInput
            style={styles.commentInput}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Add a comment..."
            placeholderTextColor="#95a5a6"
          />
          <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
            <Text style={styles.addCommentButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitWork}>
          <Ionicons name="checkmark-done-outline" size={20} color="#ecf0f1" />
          <Text style={styles.submitButtonText}>Submit Work</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  workImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  statusIndicator: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  statusText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginTop: 15,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 20,
  },
  info: {
    color: '#ecf0f1',
    fontSize: 16,
    marginVertical: 5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  editButtonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  activitiesContainer: {
    marginTop: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  activitiesList: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 10,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activityText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  activityDate: {
    color: '#95a5a6',
    fontSize: 14,
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentItem: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
  commentDate: {
    color: '#95a5a6',
    fontSize: 14,
    marginTop: 5,
  },
  noComments: {
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 10,
  },
  commentInput: {
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addCommentButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addCommentButtonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  submitButtonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default WorkerWorkDetailsScreen;
