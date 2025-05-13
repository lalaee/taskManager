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
  Button, // Keep for Add Task button
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity, // Import TouchableOpacity for interactions
  Alert, // Optional: For delete confirmation
} from 'react-native';

function App() {
  const [currentTaskText, setCurrentTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTaskPress = () => {
    const trimmedText = currentTaskText.trim();
    if (trimmedText === '') {
      // console.log('Task input is empty.'); // Optional: user feedback
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]); // Add new task to the beginning of the array
    setCurrentTaskText('');
    Keyboard.dismiss();
  };

  // a. Function to toggle task completion
  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // a. Function to delete a task
  const handleDeleteTask = (taskId) => {
    // Optional: Add a confirmation dialog
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
          },
          style: "destructive"
        }
      ]
    );
  };

  // b. Modify renderItem function
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItemContainer}>
      <TouchableOpacity
        style={styles.taskTextWrapper} // Wrapper for text to expand
        onPress={() => handleToggleComplete(item.id)} // ii. Call handleToggleComplete
      >
        <Text
          style={[
            styles.taskItemText,
            item.completed && styles.completedTaskText, // iii. Visual indication
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>

      {/* b. "Delete" button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.id)} // c. Call handleDeleteTask
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
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

        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={styles.emptyListText}>No tasks yet. Add some!</Text>}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start', // No longer needed if list can fill space
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
    marginBottom: 20,
  },
  list: {
    width: '100%',
    flex: 1, // Allow list to take remaining space if content overflows
  },
  taskItemContainer: {
    flexDirection: 'row', // Layout children in a row
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // Space out text and delete button
    backgroundColor: '#F9F9F9',
    paddingVertical: 12, // Adjusted padding
    paddingHorizontal: 15, // Adjusted padding
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 8,
  },
  taskTextWrapper: {
    flex: 1, // Allow text wrapper to take available space
    marginRight: 10, // Add some space before the delete button
  },
  taskItemText: {
    fontSize: 16,
    color: '#333',
  },
  completedTaskText: {
    textDecorationLine: 'line-through', // Style for completed tasks
    color: '#999', // Lighter color for completed tasks
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FF3B30', // Red color for delete button
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF', // White text for delete button
    fontSize: 14,
    fontWeight: '500',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#888',
  },
});

export default App;