/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'; // Import useEffect
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const TASKS_STORAGE_KEY = '@VibeTaskManager:tasks'; // Define a key for storage

function App() {
  const [currentTaskText, setCurrentTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Optional: for loading indicator

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Failed to load tasks from storage', error);
        Alert.alert("Error", "Failed to load tasks.");
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    };

    loadTasks();
  }, []); // Empty dependency array means this effect runs once on mount

  // Save tasks to AsyncStorage whenever the tasks state changes
  useEffect(() => {
    // Don't save during the initial loading phase
    // or if tasks haven't changed from their initial loaded state yet
    // This condition prevents saving the initial empty array over loaded data
    // if loadTasks is slow and this effect runs before it completes setting state.
    // A more robust way would be to ensure save only happens after initial load.
    // However, since loadTasks updates state, this effect will run *after* that.
    // The main concern is not running save if tasks is still the default from useState
    // AND the load has not yet occurred. The isLoading flag can help here.

    if (!isLoading) { // Only save if not in the initial loading phase
        const saveTasks = async () => {
            try {
                await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
            } catch (error) {
                console.error('Failed to save tasks to storage', error);
                Alert.alert("Error", "Failed to save tasks.");
            }
        };
        saveTasks();
    }
  }, [tasks, isLoading]); // Re-run this effect if tasks or isLoading changes

  const handleAddTaskPress = () => {
    const trimmedText = currentTaskText.trim();
    if (trimmedText === '') {
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: trimmedText,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setCurrentTaskText('');
    Keyboard.dismiss();
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskItemContainer}>
      <TouchableOpacity
        style={styles.taskTextWrapper}
        onPress={() => handleToggleComplete(item.id)}
      >
        <Text
          style={[
            styles.taskItemText,
            item.completed && styles.completedTaskText,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTask(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    // Optional: Render a loading indicator while tasks are being loaded
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loadingContainer: { // Style for loading state
    justifyContent: 'center',
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
    flex: 1,
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9F9',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 8,
  },
  taskTextWrapper: {
    flex: 1,
    marginRight: 10,
  },
  taskItemText: {
    fontSize: 16,
    color: '#333',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
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