import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../colors';

const styles = StyleSheet.create({
  gradientBG: {
    height: '100vh',
  },
});

const WeatherScreen = (weather) => (
  <LinearGradient
    // Background Linear Gradient
    colors={[COLORS.sunnyGradientEnd, COLORS.sunnyGradientStart]}
    style={styles.gradientBG}
  >
    <Text>The current time is {weather.main.temp}.</Text>
    <Ionicons name="ios-sunny" size={320} color="white" />
  </LinearGradient>
);

export default WeatherScreen;
