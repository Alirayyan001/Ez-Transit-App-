import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BASE_URL from '../config/config';


const TopUpScreen = ({ navigation }) => {
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [accountType, setAccountType] = useState('Easypaisa');
  const [accountNumber, setAccountNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const validateAccountNumber = (number) => {
    const regex = /^03\d{9}$/;
    return regex.test(number);
  };

  const handleTopUp = async () => {
    if (!selectedAmount || !accountType || !accountNumber || !transactionId) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (!validateAccountNumber(accountNumber)) {
      Alert.alert('Error', 'Please enter correct account number.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Please login first.');
        return;
      }

      const response = await axios.post(
       `${BASE_URL}/api/topup`,
        { amount: selectedAmount, accountType, accountNumber, transactionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Topup request sent. ', response.data);
      Alert.alert('Success', 'Topup request sent.\n\nTopup amount will be added to your\nwallet after approvel from Admin.');
      handleClearAll();

    } catch (error) {
      console.error('Error sending topup request:', error);
      Alert.alert('Error', 'Error sending topup request. Please try again.');
    }
  };

  const handleClearAll = () => {
    setSelectedAmount('100');
    setAccountType('Easypaisa');
    setAccountNumber('');
    setTransactionId('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Top Up Credit</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.instructionText}>Please select an amount to top up:</Text>
        <View style={styles.amountContainer}>
          {['100', '250', '500'].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.amountOption, selectedAmount === amount && styles.selectedAmountOption]}
              onPress={() => setSelectedAmount(amount)}
            >
              <Text style={[styles.amountText, selectedAmount === amount && { color: 'white' }]}>
                PKR {amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.instructionText}>Select account type:</Text>
        <View style={styles.accountTypeContainer}>
          <RNPickerSelect
            onValueChange={(value) => setAccountType(value)}
            items={[
              { label: 'Easypaisa' , value: 'Easypaisa' },
              { label: 'Jazzcash' , value: 'Jazzcash' },
              { label: 'Nayapay' , value: 'Nayapay' },
              { label: 'Sadapay' , value: 'Sadapay' },
              

            ]}
            value={accountType}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        <Text style={styles.instructionText}>Enter account number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="e.g. 03331234567"
          value={accountNumber}
          onChangeText={(text) => setAccountNumber(text.replace(/\s/g, ''))}
        />
        <Text style={styles.instructionText}>Enter Transaction ID Number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Transaction ID"
          value={transactionId}
          onChangeText={setTransactionId}
        />
        <TouchableOpacity style={styles.topUpButton} onPress={handleTopUp}>
          <Text style={styles.topUpButtonText}>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
  },
  header: {
    marginTop : -20,
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
    padding: 20,
  },
  instructionText: {
    marginLeft: 5,
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto',
    fontWeight: '500',
    color: '#333',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  amountOption: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  selectedAmountOption: {
    backgroundColor: '#ff4500',
  },
  amountText: {
    color: 'black',
    fontFamily: 'Roboto',
  },
  accountTypeContainer: {
    marginVertical: 15,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#f8f8f8',
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#333',
  },
  topUpButton: {
    marginTop: 20,
    backgroundColor: '#ff4500',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  topUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  clearButton: {
    marginTop: 15,
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Roboto',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Roboto',
  },
});

export default TopUpScreen;
