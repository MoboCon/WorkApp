// src/screens/News/AdminNewsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, TextInput, Modal, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const AdminNewsScreen = () => {
  const [news, setNews] = useState([
    { id: '1', title: 'New Project Launch', content: 'We are launching a new project today!', image: null },
    { id: '2', title: 'Holiday Notice', content: 'Company holiday next week.', image: null }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState(news);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);

  const handleDelete = (newsId) => {
    Alert.alert(
      'Delete News',
      'Are you sure you want to delete this news item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
            const updated = news.filter(item => item.id !== newsId);
            setNews(updated);
            filterNews(updated, searchQuery);
          }
        }
      ]
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterNews(news, query);
  };

  const filterNews = (data, query) => {
    if (query.trim() === '') {
      setFilteredNews(data);
    } else {
      const filtered = data.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editItem) return;
    if (editTitle.trim() === '' || editContent.trim() === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const updated = news.map(n => n.id === editItem.id ? { ...n, title: editTitle, content: editContent } : n);
    setNews(updated);
    filterNews(updated, searchQuery);
    setEditModalVisible(false);
    setEditItem(null);
    setEditTitle('');
    setEditContent('');
  };

  const handleAddNews = () => {
    if (newTitle.trim() === '' || newContent.trim() === '') {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      image: newImage
    };
    const updated = [...news, newItem];
    setNews(updated);
    filterNews(updated, searchQuery);
    setAddModalVisible(false);
    setNewTitle('');
    setNewContent('');
    setNewImage(null);
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsItem}>
      {item.image && <Image source={{ uri: item.image }} style={styles.newsImage} />}
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsContent}>{item.content}</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <Text style={styles.header}>News List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search news..."
        placeholderTextColor="#95a5a6"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredNews}
        keyExtractor={item => item.id}
        renderItem={renderNewsItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No news found.</Text>}
        style={{flex:1, marginBottom:20}}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Entypo name="plus" size={20} color="#ecf0f1" />
        <Text style={styles.addButtonText}> Add News</Text>
      </TouchableOpacity>

      <Modal visible={editModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit News</Text>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Title"
              placeholderTextColor="#95a5a6"
            />
            <Text style={styles.label}>Content:</Text>
            <TextInput
              style={[styles.input, {height:100}]}
              value={editContent}
              onChangeText={setEditContent}
              placeholder="Content"
              placeholderTextColor="#95a5a6"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={addModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.modalBackground}>
          <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add News</Text>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Title"
              placeholderTextColor="#95a5a6"
            />
            <Text style={styles.label}>Content:</Text>
            <TextInput
              style={[styles.input,{height:100}]}
              value={newContent}
              onChangeText={setNewContent}
              placeholder="Content"
              placeholderTextColor="#95a5a6"
              multiline
            />
            {/* Could add image picker functionality here */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleAddNews}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setAddModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#2c3e50',
    padding:20
  },
  header:{
    fontSize:24,
    color:'#ecf0f1',
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:20
  },
  searchInput:{
    borderWidth:1,
    borderColor:'#34495e',
    padding:10,
    borderRadius:5,
    color:'#ecf0f1',
    marginBottom:15
  },
  newsItem:{
    backgroundColor:'#34495e',
    padding:15,
    borderRadius:5,
    marginBottom:10
  },
  newsTitle:{
    fontSize:18,
    color:'#ecf0f1',
    fontWeight:'bold',
    marginBottom:5
  },
  newsContent:{
    color:'#ecf0f1',
    marginBottom:10
  },
  newsImage:{
    width:'100%',
    height:150,
    borderRadius:5,
    marginBottom:10
  },
  emptyText:{
    color:'#ecf0f1',
    textAlign:'center',
    marginTop:20
  },
  addButton:{
    backgroundColor:'#27ae60',
    padding:15,
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  addButtonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  },
  itemButtons:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  editButton:{
    backgroundColor:'#2980b9',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  },
  deleteButton:{
    backgroundColor:'#c0392b',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  },
  buttonText:{
    color:'#ecf0f1',
    fontWeight:'bold'
  },
  modalBackground:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.7)',
    justifyContent:'center',
    alignItems:'center'
  },
  modalContainer:{
    backgroundColor:'#34495e',
    padding:20,
    borderRadius:10,
    width:'80%'
  },
  modalTitle:{
    fontSize:20,
    color:'#ecf0f1',
    fontWeight:'bold',
    marginBottom:20,
    textAlign:'center'
  },
  label:{
    fontSize:16,
    marginTop:15,
    color:'#ecf0f1'
  },
  input:{
    borderWidth:1,
    borderColor:'#2c3e50',
    padding:10,
    borderRadius:5,
    marginTop:5,
    color:'#ecf0f1'
  },
  modalButtons:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20
  },
  saveButton:{
    backgroundColor:'#27ae60',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  },
  cancelButton:{
    backgroundColor:'#7f8c8d',
    padding:10,
    borderRadius:5,
    flex:0.45,
    alignItems:'center'
  }
});

export default AdminNewsScreen;
