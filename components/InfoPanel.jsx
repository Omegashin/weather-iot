import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const InfoPanel = () => (
  <View style={styles.container}>
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quasi velit
      quia optio fugit, fuga magni laudantium ex sed, a quis. Tempore,
      exercitationem omnis officia culpa voluptatem cum in alias.
    </Text>
  </View>
);

export default InfoPanel;
