import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import TempPanel from './TempPanel';
import InfoPanel from './InfoPanel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

const WeatherScreen = (props) => {
  const { weather } = props;
  return (
    <View style={styles.container}>
      <TempPanel
        style={styles.tempPanel}
        temperature={weather.temperature}
        tempMin={weather.tempMin}
        tempMax={weather.tempMax}
        feelsLike={weather.feelsLike}
      />
      <InfoPanel style={styles.infoPanel} />
    </View>
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
