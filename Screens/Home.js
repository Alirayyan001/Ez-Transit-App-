import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, PanResponder, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import NavigationDrawer from '../Navigation/NavigationDrawer'; // Update the import path

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mapRef = useRef(null);
  const navigation = useNavigation(); // Get the navigation prop
  const drawerTranslateX = useRef(new Animated.Value(-300)).current; // Initial position of the drawer is off-screen

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        if (Platform.OS === 'ios') {
          Alert.alert(
            'Permission Denied',
            'Please go to Settings and enable location permissions for this app.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        }
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Failed to fetch location');
      }
    })();
  }, []);

  const goToCurrentLocation = () => {
    if (location) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    Animated.timing(drawerTranslateX, {
      toValue: isMenuOpen ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // PanResponder to handle gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < 300) { // Limit the drawer's horizontal movement
          drawerTranslateX.setValue(gestureState.dx - 300);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 150) {
          setIsMenuOpen(true);
          Animated.timing(drawerTranslateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          setIsMenuOpen(false);
          Animated.timing(drawerTranslateX, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Coordinates for Islamabad
  const islamabadCoordinates = {
    latitude: 33.6844,
    longitude: 73.0479,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={islamabadCoordinates} // Set initial region to Islamabad coordinates
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Ionicons name="menu-outline" size={35} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
        <Ionicons name="locate-outline" size={35} color="black" />
      </TouchableOpacity>
      <NavigationDrawer
        drawerTranslateX={drawerTranslateX}
        panResponder={panResponder}
        navigation={navigation} // Pass navigation prop to the NavigationDrawer component
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menuButton: {
    position: 'absolute',
    top: 50,
    left: 15,
    padding: 10,
    zIndex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    padding: 10,
    zIndex: 1,
  },
  errorMsg: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
