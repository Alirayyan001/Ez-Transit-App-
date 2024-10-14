import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BASE_URL from '../config/config';


const LoginScreen = ({ navigation, route }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (route.params?.clearInputs) {
      clearAllFields();
    }
  }, [route.params?.clearInputs]);

  const handleLogin = async () => {
    if (mobileNumber.length !== 11) {
      setLoginError('Mobile number should be 11 digits');
      return;
    }

    if (password.length < 6) {
      setLoginError('Password should be at least 6 characters long');
      return;
    }

    if (!mobileNumber || !password) {
      setLoginError('Please enter mobile number and password');
      return;
    }

    setLoginError('');

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`,{
        mobile: mobileNumber,
        password
      });

      const { token } = response.data;
      await AsyncStorage.setItem('token', token);

      Alert.alert('Login Successful', 'You have successfully logged in');
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.msg);
      } else {
        setLoginError('An error occurred. Please try again.');
      }
    }
  };

  const handleMobileNumberChange = (text) => {
    setMobileNumber(text);
    if (text.length === 11) {
      setLoginError('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length >= 6) {
      setLoginError('');
    }
  };

  const clearAllFields = () => {
    setMobileNumber('');
    setPassword('');
    setLoginError('');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Ionicons name="call" size={24} color="orange" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={handleMobileNumberChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={24} color="orange" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      {loginError !== '' && <Text style={styles.errorText}>{loginError}</Text>}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllFields}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>

      <Text style={styles.accountText}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Register Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  accountText: {
    marginTop: 40,
    color: 'black',
    fontSize: 16,
    fontWeight: 'italic',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
