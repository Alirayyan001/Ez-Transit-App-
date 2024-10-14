import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import BASE_URL from '../config/config';

const PastAnnouncementsScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seenAnnouncements, setSeenAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/announcements`);
        const sortedAnnouncements = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        const seen = await AsyncStorage.getItem('seenAnnouncements');
        setSeenAnnouncements(seen ? JSON.parse(seen) : []);
        
        const pastAnnouncements = sortedAnnouncements.filter(a => seenAnnouncements.includes(a._id));
        setAnnouncements(pastAnnouncements);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the announcements!", error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [seenAnnouncements]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Past Announcements</Text>
      </View>

      {announcements.length === 0 ? (
        <View style={styles.noAnnouncementsContainer}>
          <Text style={styles.noAnnouncementsText}>No Past Announcements!</Text>
        </View>
      ) : (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          style={{ flex: 1, alignSelf: 'stretch' }} // Ensures it takes full width
          renderItem={({ item }) => (
            <View style={styles.announcementContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>
              <Text style={styles.date}>
                Added on: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
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
  listContent: {
    paddingTop: 20,
  },
  noAnnouncementsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAnnouncementsText: {
    fontSize: 18,
    color: '#555',
  },
  announcementContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
  date: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default PastAnnouncementsScreen;
