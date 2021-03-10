import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import global from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  temperature: {
    fontSize: '56px',
  },
});

const temperaturePanel = (props) => {
  const { temperature } = props;
  return (
    <View style={styles.container}>
      <Ionicons style={styles.icon} name="ios-sunny" size={120} color="white" />
      <Text style={[global.textBlack, styles.temperature]}>{temperature}</Text>
    </View>
  );
};

temperaturePanel.propTypes = {
  temperature: PropTypes.number.isRequired,
};

export default temperaturePanel;
