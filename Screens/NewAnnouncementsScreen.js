import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import BASE_URL from '../config/config';

const NewAnnouncementsScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seenAnnouncements, setSeenAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/announcements`);
      const sortedAnnouncements = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      const seen = await AsyncStorage.getItem('seenAnnouncements');
      setSeenAnnouncements(seen ? JSON.parse(seen) : []);
      
      const newAnnouncements = sortedAnnouncements.filter(a => !seenAnnouncements.includes(a._id));
      setAnnouncements(newAnnouncements);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the announcements!", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(); // Initial fetch

    // Auto-refresh every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchAnnouncements, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [seenAnnouncements]);

  const markAsRead = async (id) => {
    const updatedSeen = [...seenAnnouncements, id];
    await AsyncStorage.setItem('seenAnnouncements', JSON.stringify(updatedSeen));
    setSeenAnnouncements(updatedSeen);
    setAnnouncements(announcements.filter(a => a._id !== id));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Announcements</Text>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <View style={styles.announcementCard}>
            <Text style={styles.announcementTitle}>{item.title}</Text>
            <Text style={styles.announcementContent}>{item.content}</Text>
            <Text style={styles.announcementDate}>
              Added on: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </Text>
            <TouchableOpacity 
              style={styles.markAsReadButton} 
              onPress={() => markAsRead(item._id)}
            >
              <Text style={styles.markAsReadButtonText}>Mark as Read</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#ff4500',
    height: 180,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    marginLeft: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  flatListContent: {
    padding: 20,
    paddingBottom: 30, // Add some padding at the bottom to ensure the scrollbar is always visible
  },
  announcementCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  announcementContent: {
    fontSize: 16,
    color: '#333',
  },
  announcementDate: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  markAsReadButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ff4500',
    borderRadius: 5,
    alignItems: 'center',
  },
  markAsReadButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NewAnnouncementsScreen;
