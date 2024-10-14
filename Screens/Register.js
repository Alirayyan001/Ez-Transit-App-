import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BASE_URL from '../config/config';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  useEffect(() => {
    // Clear all fields when the component is mounted
    clearAllFields();
  }, []);

  const clearAllFields = () => {
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPasswordMatchError('');
    setRegistrationError('');
  };

  const handleRegister = () => {
    if (!fullName || !mobileNumber || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
  
    const emailRegex = /^[a-zA-Z][^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address starting with an alphabet');
      return;
    }
  
    const mobileNumberRegex = /^03\d{9}$/;
    if (!mobileNumberRegex.test(mobileNumber)) {
      alert('Mobile number should start with "03" and be 11 digits long');
      return;
    }
  
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!nameRegex.test(fullName)) {
      alert('Full name should contain only alphabets with a space between first and last name');
      return;
    }
  
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return;
    }
  
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    setPasswordMatchError('');
  
    axios.post( `${BASE_URL}/api/auth/register`,{
      fullname: fullName,
      mobile: mobileNumber,
      email,
      password,
    })
    .then(response => {
      console.log('Registration successful', response.data);
      navigation.navigate('Login');
    })
    .catch(error => {
      console.error('Error registering user:', error);
      if (error.response && error.response.data) {
        setRegistrationError(error.response.data.msg);
      } else {
        setRegistrationError('An error occurred. Please try again.');
      }
    }); 
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.newAccountText}>Create new account</Text>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.passwordInputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.confirmPasswordInputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.confirmPasswordInput}
          placeholder="Confirm Password"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {passwordMatchError !== '' && <Text style={styles.errorText}>{passwordMatchError}</Text>}
      {registrationError !== '' && <Text style={styles.errorText}>{registrationError}</Text>}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={clearAllFields}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>

      <Text style={styles.userText}>Already a User?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  newAccountText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  confirmPasswordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  confirmPasswordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
  icon: {
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userText: {
    marginTop: 20,
    fontSize: 16,
  },
  loginText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default RegisterScreen;
