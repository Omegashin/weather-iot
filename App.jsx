import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch('http://localhost:5000/time')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
        console.log(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app.</Text>
      <Text>The current time is {currentTime}.</Text>
      <StatusBar />
    </View>
  );
}
