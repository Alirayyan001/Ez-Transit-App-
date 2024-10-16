import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const NavigationDrawer = ({ drawerTranslateX, panResponder, navigation }) => {
  // State to clear inputs on logout
  const [clearInputs, setClearInputs] = useState(false);

  const handleSignOut = () => {
    setClearInputs(true);
    navigation.navigate('Login', { clearInputs: true });
  };

  return (
    <Animated.View
      style={[
        styles.drawer,
        {
          transform: [{ translateX: drawerTranslateX }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity style={styles.profileContainer}>
        <Image
          source={require('../assets/user.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.push('Home')}>
        <Ionicons name="bus" size={20} color="#000" />
        <Text>   Find a route</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Announcement')}>
        <Ionicons name="megaphone-outline" size={20} color="#000" />
        <Text>   Announcements</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Wallet')}>
        <Ionicons name="wallet-outline" size={20} color="#000" />
        <Text>   Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="home-outline" size={20} color="#000" />
        <Text>   Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
        <Text>   Sign Out</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300, // Adjusted width for drawer
    backgroundColor: '#ECF0F1', // Change background color to light gray
    zIndex: 2,
    elevation: 5, // For Android elevation
    paddingTop: 70, // Increased padding top to move content down
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default NavigationDrawer;
