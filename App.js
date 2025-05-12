/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vibe Task Manager</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container take up the full screen
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
    backgroundColor: '#FFFFFF', // Optional: Set a background color
  },
  title: {
    fontSize: 24, // Set the font size for the text
    fontWeight: '600', // Set the font weight
  },
});

export default App;