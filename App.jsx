import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
/* eslint-disable camelcase */
import {
  useFonts,
  Inter_900Black,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
  Inter_300Light,
} from '@expo-google-fonts/inter';
/* eslint-enable camelcase */
import COLORS from './colors';

// Components
import LoadingScreen from './components/LoadingScreen';
import WeatherScreen from './components/WeatherScreen';

/*
---------
Behaviour
---------
  */

export default function App() {
  // component states
  const [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_700Bold,
    Inter_500Medium,
    Inter_400Regular,
    Inter_300Light,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  // connect to api and fetch the current weather
  const fetchWeather = async (coords) => {
    // ? show nearby cities?
    await axios
      .get(
        `http://localhost:5000/current?lat=${coords.latitude}&lon=${coords.longitude}`
      )
      .then((res) => {
        // finished loading
        // TODO handle null list
        setCurrentWeather(res.data);
        setLoading(false);
      })
      .catch((e) => {
        // set error state
        setLoading(false);
        setError(e);
      });
  };
  // capture user's current location
  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      // user granted location permission
      const res = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      fetchWeather(res.coords);
      // user refused location permission
    } else {
      setError({ message: 'Location permission not granted!' });
      throw new Error('Location permission not granted!');
    }
  };
  // onComponentMount
  useEffect(() => {
    getLocationAsync();
  }, [loading, error]);

  /*
------
Styles
------
  */

  const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
  });

  /*
--------
Template
--------
  */

  // load all fonts
  if (!fontsLoaded && loading) {
    return <AppLoading />;
  }
  // start app
  if (loading) {
    return <LoadingScreen />;
  }
  // TODO show error screen
  // show weather components
  if (!loading) {
    return (
      <LinearGradient
        colors={[COLORS.sunnyGradientEnd, COLORS.sunnyGradientStart]}
        style={styles.linearGradient}
      >
        <WeatherScreen weather={currentWeather} />
        <StatusBar />
      </LinearGradient>
    );
  }
}
