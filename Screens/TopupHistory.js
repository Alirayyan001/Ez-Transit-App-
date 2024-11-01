import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../config/config';

const TopupHistory = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopupHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'Please login first.');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/topup/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching top-up history:', error);
        Alert.alert('Error', 'Error fetching top-up history. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopupHistory();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Top-Up History</Text>
      </View>

      {history.length === 0 ? (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>No top-up history available.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContent}>
          {history.map((topup) => (
           <View key={topup._id} style={styles.historyItem}>
           <Text style={styles.amount}>Amount: PKR {topup.amount}</Text>
           <Text style={styles.details}>Account Type: {topup.accountType}</Text>
           <Text style={styles.details}>Account Number: {topup.accountNumber}</Text>
           <Text style={styles.details}>Transaction ID: {topup.transactionId}</Text>
           <Text style={styles.details}>Status: {topup.status || 'pending'}</Text> 
           <Text style={styles.date}>
             Date: {new Date(topup.date).toLocaleDateString()} {new Date(topup.date).toLocaleTimeString()}
           </Text>
         </View>
         
          ))}
        </ScrollView>
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
  noHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHistoryText: {
    fontSize: 18,
    color: '#555',
  },
  historyItem: {
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
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff4500',
  },
  details: {
    fontSize: 16,
    color: '#333',
  },
  date: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
});

export default TopupHistory;
