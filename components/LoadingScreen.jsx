import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../colors';

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.loadingBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: 'Inter_700Bold',
    fontSize: '18px',
  },
});

const LoadingScreen = () => (
  <View style={styles.loadingScreen}>
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

export default LoadingScreen;
