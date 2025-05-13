/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList, // Import FlatList
} from 'react-native';

// Define the structure of a task (optional, but good for clarity if using TypeScript later)
// interface Task {
//   id: string;
//   text: string;
//   completed: boolean;
// }

function App() {
  const [currentTaskText, setCurrentTaskText] = useState('');
  const [tasks, setTasks] = useState([]); // tasks will be an array of Task objects

  const handleAddTaskPress = () => {
    const trimmedText = currentTaskText.trim();
    if (trimmedText === '') {
      console.log('Task input is empty.');
      return;
    }

    // a. Create the new task object with the specified structure
    const newTask = {
      id: Date.now().toString(), // Unique ID using timestamp
      text: trimmedText,
      completed: false, // Default to not completed
    };

    // b. Update the tasks state array
    setTasks(prevTasks => [...prevTasks, newTask]); // Add the new task to the existing array

    console.log('Task added:', newTask); // Optional: log the added task
    setCurrentTaskText(''); // Clear the input field
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  // renderItem function for FlatList
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItemContainer}>
      <Text style={styles.taskItemText}>{item.text}</Text>
      {/* Later, you could add a checkbox here for item.completed */}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Vibe Task Manager</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your task here"
          value={currentTaskText}
          onChangeText={setCurrentTaskText}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Add Task"
            onPress={handleAddTaskPress}
            color="#007AFF"
          />
        </View>

        {/* FlatList to display tasks */}
        <FlatList
          style={styles.list}
          data={tasks} // a. Data prop is the tasks array
          renderItem={renderTaskItem} // b. renderItem function
          keyExtractor={item => item.id} // c. keyExtractor using item.id
          ListEmptyComponent={<Text style={styles.emptyListText}>No tasks yet. Add some!</Text>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#DADADA',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#F8F8F8',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20, // Add some space between the button and the list
  },
  list: {
    width: '100%', // Make the list take the full width
  },
  taskItemContainer: {
    backgroundColor: '#F9F9F9', // Slight background for items
    paddingVertical: 15,       // Vertical padding
    paddingHorizontal: 10,     // Horizontal padding
    borderBottomWidth: 1,      // Bottom border for separation
    borderBottomColor: '#E0E0E0', // Color for the bottom border
    borderRadius: 5,           // Slightly rounded corners for items
    marginBottom: 8,           // Space between task items
  },
  taskItemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
});

export default App;