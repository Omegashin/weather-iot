import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import AppLoading from 'expo-app-loading';
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

// Components
import LoadingScreen from './components/LoadingScreen';

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
  const [currentWeather, setCurrentWeather] = useState(0);
  // connect to api and fetch the current weather
  const fetchWeather = async (coords) => {
    // ? show nearby cities?
    await axios
      .get(
        `http://localhost:5000/current?lat=${coords.latitude}&lon=${coords.longitude}`
      )
      .then((res) => {
        // finished loading
        console.log(res.data.list[0].main.temp);
        // TODO handle null list
        setCurrentWeather(res.data.list[0]);
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

  const styles = StyleSheet.create({});

  /*
--------
Template
--------
  */

  // load all fonts
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // start app
  // ? add funny loading text?
  if (loading) {
    return <LoadingScreen />;
  }
  // show weather components
  return (
    <View style={styles.container}>
      <Text>Loading is {loading}.</Text>
      <Text>Error is {error.message}.</Text>
      <Text>The current time is {currentWeather.main.temp}.</Text>
      <StatusBar />
    </View>
  );
}
