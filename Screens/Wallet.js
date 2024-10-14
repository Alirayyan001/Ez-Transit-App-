import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BASE_URL from '../config/config';

const Wallet = ({ navigation }) => {
  const [balance, setBalance] = useState(0);

  const fetchWalletBalance = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Please login first');
        return;
      }

      const response = await axios.get(`${BASE_URL}/api/wallet`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBalance(response.data.balance);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      Alert.alert('Error fetching wallet balance. Please try again.');
    }
  };

  useEffect(() => {
    fetchWalletBalance(); // Initial fetch

    // Auto-refresh every 10 seconds (10000 milliseconds)
    const intervalId = setInterval(fetchWalletBalance, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAddCredit = () => {
    navigation.navigate('Topup');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCopyAccountNumber = () => {
    Clipboard.setString('03365317281');
    Alert.alert('Copied', 'Account number copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Wallet</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.creditLabel}>Your Credit</Text>
        <Text style={styles.creditAmount}>{balance} PKR</Text>

        {/* Instructional Text */}
        <Text style={styles.instructionText}>
          Please first make a transaction of Amount 100, 250, or 500 on the following EasyPaisa Account and then press the "Add Credit" button at the bottom of the screen to recharge your wallet:
        </Text>

        {/* Account Information with Copy Button */}
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountLabel}>Account Number: </Text>
          <Text style={styles.accountNumber}>03365317281</Text>
          <TouchableOpacity onPress={handleCopyAccountNumber} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.accountName}>Name: Ali Rayyan</Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCredit}>
          <Text style={styles.addButtonText}>Add Credit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ff4500',
    height: 180,
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
 headerText: {
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
    paddingHorizontal: 20,
  },
  creditLabel: {
    fontSize: 18,
    color: 'black',
    marginTop: 100,
  },
  creditAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  instructionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 100,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  accountLabel: {
    fontSize: 16,
    color: 'black',
  },
  accountNumber: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: '#ff4500',
    borderRadius: 5,
    padding: 5,
  },
  accountName: {
    fontSize: 16,
    color: 'black',
    marginBottom: 200,
  },
  addButton: {
    bottom: 150,
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Wallet;
