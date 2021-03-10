import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const black = '#aaa';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  // component states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [currentWeather, setCurrentWeather] = useState(0);

  const fetchWeather = async (lat, lon) => {
    await axios
      .get(`http://localhost:5000/current?lat=${lat}&lon=${lon}`)
      .then((res) => {
        setLoading(false);
        setCurrentWeather(res.data.list[0].main.temp);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  };

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const res = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      fetchWeather(res.coords.latitude, res.coords.longitude);
    } else {
      throw new Error('Location permission not granted');
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, [loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Loading is {loading}.</Text>
      <Text>Error is {error.message}.</Text>
      <Text>The current time is {currentWeather}.</Text>
      <StatusBar />
    </View>
  );
}
