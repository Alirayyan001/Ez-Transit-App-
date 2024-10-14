import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Menu = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToWallet = () => {
    navigation.navigate('Wallet');
  };

  const navigateToTicket = () => {
    navigation.navigate('Ticket');
  };

  const navigateToComplain = () => {
    navigation.navigate('Complain');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={navigateToHome}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={navigateToProfile}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={navigateToWallet}>
        <Text>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={navigateToTicket}>
        <Text>Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={navigateToComplain}>
        <Text>Complain</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingLeft: 20,
  },
  navItem: {
    paddingVertical: 20,
  },
});

export default Menu;
