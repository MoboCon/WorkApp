import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  SectionList,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { workersData } from '../../data/workersData';

// Componente separate pentru o mai bună organizare
const FilterModal = ({ visible, onClose, filters, onApplyFilters }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <BlurView intensity={100} style={styles.modalContainer}>
        <View style={styles.filterModalContent}>
          <Text style={styles.filterTitle}>Filters</Text>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Status</Text>
            <View style={styles.filterOptions}>
              {['all', 'Active', 'Inactive'].map(status => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.filterOption,
                    tempFilters.status === status && styles.filterOptionSelected
                  ]}
                  onPress={() => setTempFilters({...tempFilters, status})}
                >
                  <Text style={styles.filterOptionText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Experience</Text>
            <View style={styles.filterOptions}>
              {['all', '0-2', '3-5', '5+'].map(exp => (
                <TouchableOpacity
                  key={exp}
                  style={[
                    styles.filterOption,
                    tempFilters.experience === exp && styles.filterOptionSelected
                  ]}
                  onPress={() => setTempFilters({...tempFilters, experience: exp})}
                >
                  <Text style={styles.filterOptionText}>{exp} years</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterButtons}>
            <TouchableOpacity 
              style={[styles.filterButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.filterButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, styles.applyButton]}
              onPress={() => {
                onApplyFilters(tempFilters);
                onClose();
              }}
            >
              <Text style={styles.filterButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const QuickActions = ({ worker, onCall, onMessage, onSchedule }) => (
  <View style={styles.quickActions}>
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#27ae60' }]}
      onPress={() => onCall(worker)}
    >
      <Ionicons name="call" size={20} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#3498db' }]}
      onPress={() => onMessage(worker)}
    >
      <Ionicons name="mail" size={20} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#e67e22' }]}
      onPress={() => onSchedule(worker)}
    >
      <Ionicons name="calendar" size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

const WorkerRating = ({ rating, reviewsCount }) => (
  <View style={styles.ratingContainer}>
    <View style={styles.starsContainer}>
      {[1, 2, 3, 4, 5].map(star => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={20}
          color="#f1c40f"
        />
      ))}
    </View>
    <Text style={styles.ratingCount}>({reviewsCount} reviews)</Text>
  </View>
);

const AvailabilityCalendar = ({ availability }) => (
  <View style={styles.calendarContainer}>
    <Text style={styles.calendarTitle}>Weekly Availability</Text>
    <View style={styles.weekView}>
      {Object.entries(availability).map(([day, isAvailable]) => (
        <View key={day} style={styles.dayColumn}>
          <Text style={styles.dayText}>{day}</Text>
          <View style={[
            styles.availabilityIndicator,
            isAvailable ? styles.available : styles.unavailable
          ]} />
        </View>
      ))}
    </View>
  </View>
);

const ProjectHistory = ({ projects }) => (
  <View style={styles.historyContainer}>
    <Text style={styles.historyTitle}>Project History</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.projectsScroll}
    >
      {projects.map(project => (
        <View key={project.id} style={styles.projectCard}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDate}>{project.date}</Text>
          <Text style={styles.projectRole}>{project.role}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const WorkerPerformance = ({ performanceData }) => (
  <View style={styles.performanceContainer}>
    <Text style={styles.performanceTitle}>Performance Trend</Text>
    <LineChart
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: performanceData
        }]
      }}
      width={Dimensions.get('window').width - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#2c3e50',
        backgroundGradientFrom: '#2c3e50',
        backgroundGradientTo: '#34495e',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      bezier
      style={styles.performanceChart}
    />
  </View>
);

const WorkersListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    experience: 'all'
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Filtrare și sortare
  const getFilteredAndSortedWorkers = useCallback(() => {
    let filtered = workersData.filter(worker => {
      const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filters.status === 'all' || worker.status === filters.status;
      const matchesExperience = filters.experience === 'all' || 
        (filters.experience === '5+' ? parseInt(worker.experience) >= 5 :
         filters.experience === '3-5' ? (parseInt(worker.experience) >= 3 && parseInt(worker.experience) < 5) :
         parseInt(worker.experience) < 3);
      
      return matchesSearch && matchesStatus && matchesExperience;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === 'experience') {
        return sortOrder === 'asc'
          ? parseInt(a.experience) - parseInt(b.experience)
          : parseInt(b.experience) - parseInt(a.experience);
      }
      return 0;
    });
  }, [searchQuery, filters, sortBy, sortOrder]);

  // Handlers pentru acțiuni rapide
  const handleCall = (worker) => {
    // Implementează logica pentru apel
    console.log('Calling:', worker.contact.phone);
  };

  const handleMessage = (worker) => {
    // Implementează logica pentru mesaj
    console.log('Messaging:', worker.contact.email);
  };

  const handleSchedule = (worker) => {
    // Implementează logica pentru programare
    console.log('Scheduling meeting with:', worker.name);
  };

  // Render worker card
  const renderWorkerCard = ({ item: worker }) => (
    <TouchableOpacity
      style={styles.workerCard}
      onPress={() => {
        setSelectedWorker(worker);
        setModalVisible(true);
      }}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: worker.avatar }} style={styles.avatar} />
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{worker.name}</Text>
          <Text style={styles.workerRole}>{worker.role}</Text>
          <WorkerRating rating={worker.rating} reviewsCount={worker.reviewsCount} />
        </View>
        <View style={[styles.statusBadge, 
          { backgroundColor: worker.status === 'Active' ? '#27ae60' : '#e74c3c' }
        ]}>
          <Text style={styles.statusText}>{worker.status}</Text>
        </View>
      </View>

      <QuickActions
        worker={worker}
        onCall={handleCall}
        onMessage={handleMessage}
        onSchedule={handleSchedule}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#bdc3c7" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search workers..."
            placeholderTextColor="#95a5a6"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="filter" size={20} color="#bdc3c7" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.sortContainer}>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => {
              if (sortBy === 'name') {
                setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
              } else {
                setSortBy('name');
                setSortOrder('asc');
              }
            }}
          >
            <Text style={styles.sortButtonText}>
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => {
              if (sortBy === 'experience') {
                setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
              } else {
                setSortBy('experience');
                setSortOrder('asc');
              }
            }}
          >
            <Text style={styles.sortButtonText}>
              Experience {sortBy === 'experience' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={getFilteredAndSortedWorkers()}
        renderItem={renderWorkerCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Worker Details Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={100} style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {selectedWorker && (
              <>
                <View style={styles.modalHeader}>
                  <Image source={{ uri: selectedWorker.avatar }} style={styles.modalAvatar} />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalName}>{selectedWorker.name}</Text>
                <Text style={styles.modalRole}>{selectedWorker.role}</Text>

                <WorkerRating 
                  rating={selectedWorker.rating} 
                  reviewsCount={selectedWorker.reviewsCount} 
                />

                <AvailabilityCalendar availability={selectedWorker.availability} />
                
                <WorkerPerformance performanceData={selectedWorker.performanceData} />
                
                <ProjectHistory projects={selectedWorker.projectHistory} />

                <QuickActions
                  worker={selectedWorker}
                  onCall={handleCall}
                  onMessage={handleMessage}
                  onSchedule={handleSchedule}
                />
              </>
            )}
          </ScrollView>
        </BlurView>
      </Modal>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2833',
  },
  header: {
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#ecf0f1',
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sortButton: {
    padding: 8,
  },
  sortButtonText: {
    color: '#ecf0f1',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  workerCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 4,
  },
  workerRole: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#34495e',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#2c3e50',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalRole: {
    fontSize: 16,
    color: '#bdc3c7',
    textAlign: 'center',
    marginBottom: 24,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingCount: {
    color: '#bdc3c7',
    fontSize: 14,
  },
  calendarContainer: {
    marginBottom: 24,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 16,
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayText: {
    color: '#bdc3c7',
    marginBottom: 8,
  },
  availabilityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  available: {
    backgroundColor: '#27ae60',
  },
  unavailable: {
    backgroundColor: '#e74c3c',
  },
  performanceContainer: {
    marginBottom: 24,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 16,
  },
  performanceChart: {
    borderRadius: 16,
  },
  historyContainer: {
    marginBottom: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 16,
  },
  projectsScroll: {
    marginBottom: 16,
  },
  projectCard: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 200,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 8,
  },
  projectDate: {
    color: '#bdc3c7',
    marginBottom: 4,
  },
  projectRole: {
    color: '#95a5a6',
  },
  filterModalContent: {
    backgroundColor: '#2c3e50',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 24,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    color: '#bdc3c7',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    backgroundColor: '#34495e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#2980b9',
  },
  filterOptionText: {
    color: '#ecf0f1',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  filterButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  applyButton: {
    backgroundColor: '#27ae60',
  },
  filterButtonText: {
    color: '#ecf0f1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default WorkersListScreen;