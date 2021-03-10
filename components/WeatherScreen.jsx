import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import COLORS from '../colors';

const styles = StyleSheet.create({
  gradientBG: {
    height: '100vh',
  },
});

const WeatherScreen = (props) => {
  const { weather } = props;
  return (
    <LinearGradient
      colors={[COLORS.sunnyGradientEnd, COLORS.sunnyGradientStart]}
      style={styles.gradientBG}
    >
      <Text>The current time is {weather.temperature}.</Text>
      <Text>The current time is {weather.rain}.</Text>
      <Ionicons name="ios-sunny" size={320} color="white" />
    </LinearGradient>
  );
};

WeatherScreen.propTypes = {
  weather: PropTypes.shape({
    cityName: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    feelsLike: PropTypes.number.isRequired,
    tempMin: PropTypes.number.isRequired,
    tempMax: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    cloudiness: PropTypes.number.isRequired,
    rain: PropTypes.number,
    snow: PropTypes.number,
    weatherType: PropTypes.string.isRequired,
    weatherDesc: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherScreen;
