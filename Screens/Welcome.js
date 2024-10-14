import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';


const Welcome = ({ navigation }) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Welcome to the Ez-Transit App!</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/route.png')} style={styles.logo} />
        <Text style={styles.text}>Discover Nearby Metro Bus Routes Effortlessly!</Text>
      </View>
      <View style={styles.slide}>
       <Image source={require('../assets/ticketing.png')} style={styles.logo} />
       <Text style={styles.text}>Enjoy Hassle-Free Metro Bus Ticketing{'\n'} from your Mobile!
       </Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Ready to Get Started?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#233D4D',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 320,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#BF3036',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Welcome;
