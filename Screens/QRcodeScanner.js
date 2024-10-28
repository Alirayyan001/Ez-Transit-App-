import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import { fetchWalletBalance } from './Wallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BASE_URL from '../config/config';

const QRcodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    const fetchBalance = async () => {
      const balance = await fetchWalletBalance();
      setWalletBalance(balance);
    };

    fetchBalance();

    const intervalId = setInterval(fetchBalance, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);

    const [stationID, fare, qrType] = data.split('|'); // Assuming format "stationID|fare|type"
    const fareAmount = parseFloat(fare);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Please login first');
        return;
      }

      // Check if fare deduction is possible based on qrType
      if (qrType === 'entry' && walletBalance >= fareAmount * 2) {
        await deductFare(token, data); // sending full `data` string as `qrCodeData`
      } else if (qrType === 'exit') {
        await deductFare(token, data);
      } else {
        Alert.alert('Insufficient Balance', 'Please top up your balance to proceed.');
      }
    } catch (error) {
      console.error('Error processing QR code:', error);
      Alert.alert('Error', 'Failed to process QR code. Please try again.');
    }
  };

  const deductFare = async (token, qrCodeData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/qrcode/deduct-fare`,
        { qrCodeData }, // Sending `qrCodeData` as required by the server
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { newBalance, message } = response.data;
      setWalletBalance(newBalance);
      Alert.alert('Success', message);
    } catch (error) {
      console.error('Error deducting fare:', error);
      Alert.alert('Error', 'Failed to deduct fare. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>QR Code Scanner</Text>
      </View>
      <Text style={styles.walletText}>Wallet Balance: {walletBalance} PKR</Text>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
      {scannedData !== '' && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Scanned Data: {scannedData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
  walletText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dataContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  dataText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QRcodeScanner;
