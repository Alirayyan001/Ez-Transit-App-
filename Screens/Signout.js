import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SignoutScreen = ({ navigation }) => {
  const handleSignout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login', { clearInputs: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Signout Screen</Text>
      <Text style={styles.underDevelopment}>Under Development</Text>
      <TouchableOpacity style={styles.signoutButton} onPress={handleSignout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  underDevelopment: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'gray',
  },
  signoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SignoutScreen;
