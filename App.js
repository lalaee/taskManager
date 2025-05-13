/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react'; // Import useState
import {
  StyleSheet,
  Text,
  View,
  TextInput, // Import TextInput
  Button,   // Import Button
  Keyboard, // Import Keyboard for dismissing it
  TouchableWithoutFeedback // To dismiss keyboard on tap outside
} from 'react-native';

function App() {
  // State variable to hold the current text of the TextInput
  const [currentTaskText, setCurrentTaskText] = useState('');
  // State variable to hold an array of task objects (initially empty)
  const [tasks, setTasks] = useState([]); // We're not adding to this array yet

  const handleAddTaskPress = () => {
    if (currentTaskText.trim() === '') {
      // Optional: Don't add empty tasks
      console.log('Task input is empty.');
      return;
    }
    // Log the current text from the TextInput to the console
    console.log('Task to add:', currentTaskText);

    // Clear the TextInput field
    setCurrentTaskText('');

    // Dismiss the keyboard
    Keyboard.dismiss();

    // (For now, don't add it to the task array yet)
    // Example of how you might add it later:
    // setTasks(prevTasks => [...prevTasks, { id: Date.now().toString(), text: currentTaskText }]);
  };

  return (
    // TouchableWithoutFeedback allows dismissing the keyboard by tapping outside the input
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Vibe Task Manager</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your task here"
          value={currentTaskText}
          onChangeText={setCurrentTaskText} // Updates currentTaskText state on every change
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Add Task"
            onPress={handleAddTaskPress}
            color="#007AFF" // iOS standard blue, Android uses theme color by default
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60, // Add padding from the top of the screen
    paddingHorizontal: 20, // Add horizontal padding
  },
  title: {
    fontSize: 28, // Increased font size a bit
    fontWeight: 'bold', // Made title bold
    marginBottom: 25, // Space below the title
    color: '#333', // Darker color for title
  },
  input: {
    height: 45, // Slightly taller input
    borderColor: '#DADADA', // Lighter gray border
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    marginBottom: 15, // Space below the input
    paddingHorizontal: 15, // Padding inside the input
    width: '100%', // Make input take full available width (considering container's padding)
    fontSize: 16,
    backgroundColor: '#F8F8F8', // Slight background for input
  },
  buttonContainer: {
    width: '100%', // Make button container take full width for better layout control
    // For Android, Button styling is limited. You might need custom components for more control.
    // On iOS, 'color' prop works well.
  },
});

export default App;