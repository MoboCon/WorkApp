// src/screens/News/WorkerNewsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, TextInput, Modal } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function WorkerNewsScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    // Simulated API call to fetch news
    setTimeout(() => {
      const fetchedNews = [
        { id: '1', title: 'Safety Update', content: 'Please wear helmets at all times.', date: '2024-12-01', author: 'Admin' },
        { id: '2', title: 'Holiday Notice', content: 'Office will be closed on 25th Dec.', date: '2024-12-10', author: 'HR' },
        { id: '3', title: 'New Project Launch', content: 'Project Gamma starts next week.', date: '2024-12-15', author: 'Manager' },
        { id: '4', title: 'Training Session', content: 'Mandatory safety training on 20th Dec.', date: '2024-12-20', author: 'Safety Team' },
      ];
      setNews(fetchedNews);
      setFilteredNews(fetchedNews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  const handleReadMore = (item) => {
    setSelectedNews(item);
    setModalVisible(true);
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDate}>{item.date} - {item.author}</Text>
      <Text style={styles.newsContent} numberOfLines={2}>
        {item.content}
      </Text>
      <TouchableOpacity style={styles.readMoreButton} onPress={() => handleReadMore(item)}>
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Worker News</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search news..."
        placeholderTextColor="#95a5a6"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#27ae60" />
      ) : (
        <FlatList
          data={filteredNews}
          keyExtractor={(item) => item.id}
          renderItem={renderNewsItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No news found.</Text>}
          style={{ flex: 1 }}
        />
      )}

      {/* Modal for detailed news */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Entypo name="cross" size={30} color="#ecf0f1" />
            </TouchableOpacity>
            {selectedNews && (
              <>
                <Text style={styles.modalTitle}>{selectedNews.title}</Text>
                <Text style={styles.modalDate}>{selectedNews.date} - {selectedNews.author}</Text>
                <Text style={styles.modalText}>{selectedNews.content}</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#34495e',
    padding: 10,
    borderRadius: 5,
    color: '#ecf0f1',
    marginBottom: 20,
  },
  newsCard: {
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  newsTitle: {
    fontSize: 18,
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDate: {
    color: '#95a5a6',
    fontSize: 12,
    marginBottom: 10,
  },
  newsContent: {
    color: '#bdc3c7',
    fontSize: 14,
    marginBottom: 10,
  },
  readMoreButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  readMoreText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#ecf0f1',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#34495e',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 20,
  },
  modalText: {
    color: '#bdc3c7',
    fontSize: 16,
  },
});
