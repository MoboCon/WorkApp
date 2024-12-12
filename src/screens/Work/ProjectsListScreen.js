import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Animated,
  Image,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getProjects } from '../../utils/storage';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProjectListScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Projects', icon: 'apps-outline' },
    { id: 'active', label: 'Active', icon: 'play-circle-outline' },
    { id: 'completed', label: 'Completed', icon: 'checkmark-circle-outline' },
    { id: 'delayed', label: 'Delayed', icon: 'alert-circle-outline' }
  ];

  const sortOptions = [
    { id: 'date', label: 'Date' },
    { id: 'name', label: 'Name' },
    { id: 'priority', label: 'Priority' },
    { id: 'status', label: 'Status' }
  ];

  useFocusEffect(
    React.useCallback(() => {
      loadProjects();
    }, [])
  );

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedFilter, sortBy, projects]);

  const loadProjects = async () => {
    try {
      const loadedProjects = await getProjects();
      setProjects(loadedProjects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(project => project.status === selectedFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'priority':
          return b.priority.localeCompare(a.priority);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'date':
        default:
          return new Date(b.startDate) - new Date(a.startDate);
      }
    });

    setFilteredProjects(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#27ae60';
      case 'completed':
        return '#2ecc71';
      case 'delayed':
        return '#e74c3c';
      default:
        return '#f1c40f';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return { name: 'alert-circle', color: '#e74c3c' };
      case 'medium':
        return { name: 'alert', color: '#f1c40f' };
      case 'low':
        return { name: 'information-circle', color: '#2ecc71' };
      default:
        return { name: 'help-circle', color: '#95a5a6' };
    }
  };

  const renderProjectCard = ({ item }) => {
    const priorityIcon = getPriorityIcon(item.priority);
    const progress = item.progress || 0;
    const daysLeft = Math.ceil((new Date(item.endDate) - new Date()) / (1000 * 60 * 60 * 24));

    return (
      <TouchableOpacity
        style={styles.projectCard}
        onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.projectInfo}>
            <Text style={styles.projectName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={16} color="#bdc3c7" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
          <Ionicons name={priorityIcon.name} size={24} color={priorityIcon.color} />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: getStatusColor(item.status) }
              ]}
            />
          </View>
          <Text style={styles.progressText}>{progress}% Complete</Text>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.teamContainer}>
            {item.assignedTeam ? (
              <View style={styles.assignedTeamContainer}>
                <Ionicons name="people" size={20} color="#3498db" />
                <Text style={styles.teamText}>{item.assignedTeam.name}</Text>
                <View style={styles.teamInfoBadge}>
                  <Text style={styles.teamMembersText}>
                    {item.assignedTeam.members} members
                  </Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.assignTeamButton}
                onPress={() => navigation.navigate('AssignTeam', { 
                  projectId: item.id,
                  projectName: item.name 
                })}
              >
                <Ionicons name="people-outline" size={16} color="#fff" />
                <Text style={styles.assignTeamText}>Assign Team</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.dateContainer}>
            <Ionicons name="time-outline" size={20} color="#bdc3c7" />
            <Text style={styles.daysText}>
              {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterChips = () => (
    <FlatList
      horizontal
      data={filterOptions}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      style={styles.filterList}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedFilter === item.id && styles.filterChipActive
          ]}
          onPress={() => setSelectedFilter(item.id)}
        >
          <Ionicons 
            name={item.icon} 
            size={20} 
            color={selectedFilter === item.id ? '#fff' : '#bdc3c7'} 
          />
          <Text style={[
            styles.filterChipText,
            selectedFilter === item.id && styles.filterChipTextActive
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#bdc3c7" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            placeholderTextColor="#95a5a6"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options-outline" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.sortContainer}>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortButton,
                  sortBy === option.id && styles.sortButtonActive
                ]}
                onPress={() => setSortBy(option.id)}
              >
                <Text style={[
                  styles.sortButtonText,
                  sortBy === option.id && styles.sortButtonTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {renderFilterChips()}
      </View>

      <FlatList
        data={filteredProjects}
        renderItem={renderProjectCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3498db"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={64} color="#95a5a6" />
            <Text style={styles.emptyText}>No projects found</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateProject')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#2c3e50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#ecf0f1',
    marginLeft: 10,
    fontSize: 16,
  },
  filterButton: {
    padding: 5,
  },
  filterList: {
    marginTop: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#3498db',
  },
  filterChipText: {
    color: '#bdc3c7',
    marginLeft: 8,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  sortButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2c3e50',
  },
  sortButtonActive: {
    backgroundColor: '#3498db',
  },
  sortButtonText: {
    color: '#bdc3c7',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  projectCard: {
    backgroundColor: '#2c3e50',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#bdc3c7',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#34495e',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    color: '#bdc3c7',
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    flex: 1,
    marginRight: 16,
  },
  assignedTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  teamText: {
    color: '#ecf0f1',
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 14,
  },
  teamInfoBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  teamMembersText: {
    color: '#fff',
    fontSize: 12,
  },
  assignTeamButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  assignTeamText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34495e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  daysText: {
    color: '#ecf0f1',
    fontSize: 12,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#95a5a6',
    fontSize: 16,
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#3498db',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ProjectListScreen;