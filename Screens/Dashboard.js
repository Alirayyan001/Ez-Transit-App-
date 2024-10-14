import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DashboardScreen = ({ navigation }) => {
  const handleSignOut = () => {
    navigation.navigate('Login', { clearInputs: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/bus-animation.gif')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Making your Metro Bus journey easy!</Text>
      </View>

      <View style={styles.iconsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="bus" size={40} color="orange" />
            <Text style={styles.iconText}>Route Planner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Announcement')}
          >
            <Icon name="megaphone" size={40} color="orange" />
            <Text style={styles.iconText}>Announcement</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Wallet')}
          >
            <Icon name="wallet" size={40} color="orange" />
            <Text style={styles.iconText}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleSignOut}
          >
            <Icon name="log-out" size={40} color="orange" />
            <Text style={styles.iconText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 450,
    resizeMode: 'contain',
  },
  headerText: {
    fontStyle: 'italic',
    bottom: 110,
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  iconsContainer: {
    marginTop: -45,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  iconButton: {
    width: 140,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#fff',
  },
  iconText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default DashboardScreen;
