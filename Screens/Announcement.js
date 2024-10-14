import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import BASE_URL from '../config/config'; // Adjust path as needed

const AnnouncementScreen = ({ navigation }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/announcements`);
        const seen = await AsyncStorage.getItem('seenAnnouncements');
        const seenAnnouncements = seen ? JSON.parse(seen) : [];

        const newAnnouncements = response.data.filter(a => !seenAnnouncements.includes(a._id));
        setUnreadCount(newAnnouncements.length);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements(); // Initial fetch

    // Auto-refresh every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchAnnouncements, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcements</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.newbutton}
            onPress={() => navigation.navigate('NewAnnouncements')}
          >
            <Text style={styles.buttonText}>New Announcements</Text>
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.pastbutton}
          onPress={() => navigation.navigate('PastAnnouncements')}
        >
          <Text style={styles.buttonText}>Past Announcements</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '80%',
    position: 'relative', // Needed for absolute positioning of badge
  },
  newbutton: {
    backgroundColor: '#ff4500',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    position: 'relative', // Allows positioning the badge
  },
    pastbutton: {
    backgroundColor: '#ff4500',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    position: 'relative', // Allows positioning the badge
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#ff0000',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default AnnouncementScreen;
