import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const AdminWorkScreen = () => {
  const navigation = useNavigation();
  const [scrollY] = useState(new Animated.Value(0));

  const features = [
    {
      id: '1',
      title: 'Create Project',
      description: 'Start a new project and set its details',
      icon: 'add-circle',
      screen: 'CreateProject',
      gradient: ['#00b09b', '#96c93d']
    },
    {
      id: '2',
      title: 'Projects List',
      description: 'View and manage all projects',
      icon: 'list',
      screen: 'ProjectsList',
      gradient: ['#5f2c82', '#49a09d']
    },
    {
      id: '3',
      title: 'Create Team',
      description: 'Form new teams for projects',
      icon: 'people',
      screen: 'CreateTeam',
      gradient: ['#667eea', '#764ba2']
    },
    {
      id: '4',
      title: 'Workers List',
      description: 'Manage your workforce',
      icon: 'person',
      screen: 'WorkersList',
      gradient: ['#f83600', '#f9d423']
    }
  ];

  const quickStats = [
    { 
      label: 'Active Projects', 
      value: '12', 
      icon: 'rocket-outline',
      gradient: ['#00b09b', '#96c93d']
    },
    { 
      label: 'Teams', 
      value: '5', 
      icon: 'people-outline',
      gradient: ['#5f2c82', '#49a09d']
    },
    { 
      label: 'Workers', 
      value: '28', 
      icon: 'person-outline',
      gradient: ['#f83600', '#f9d423']
    }
  ];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 70],
    extrapolate: 'clamp'
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <LinearGradient
          colors={['#1a2a6c', '#b21f1f']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Work Dashboard</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color="#FFF" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.statsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsScrollView}
          >
            {quickStats.map((stat, index) => (
              <TouchableOpacity key={index} activeOpacity={0.9}>
                <LinearGradient
                  colors={stat.gradient}
                  style={styles.statCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.iconContainer}>
                    <Ionicons name={stat.icon} size={24} color="#FFF" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                activeOpacity={0.9}
                onPress={() => navigation.navigate(feature.screen)}
              >
                <LinearGradient
                  colors={feature.gradient}
                  style={styles.featureCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <BlurView intensity={20} style={styles.blurContainer}>
                    <View style={styles.iconCircle}>
                      <Ionicons name={feature.icon} size={30} color="#FFF" />
                    </View>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </BlurView>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity 
              key={item} 
              style={styles.activityItem}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#141e30', '#243b55']}
                style={styles.activityContent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.activityHeader}>
                  <View style={styles.activityDot} />
                  <Text style={styles.activityTitle}>Project Update</Text>
                  <Text style={styles.activityTime}>2h ago</Text>
                </View>
                <Text style={styles.activityDescription}>
                  New team assigned to Project Alpha
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerGradient: {
    flex: 1,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff3b30',
  },
  scrollView: {
    flex: 1,
    marginTop: 120,
  },
  statsContainer: {
    marginVertical: 20,
  },
  statsScrollView: {
    paddingHorizontal: 16,
  },
  statCard: {
    width: 160,
    height: 120,
    borderRadius: 20,
    marginRight: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  featuresContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
    marginLeft: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: cardWidth,
    height: 180,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  blurContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  recentActivityContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  activityItem: {
    marginBottom: 12,
  },
  activityContent: {
    borderRadius: 16,
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  activityTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  activityTime: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
  },
  activityDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 16,
  },
});

export default AdminWorkScreen;