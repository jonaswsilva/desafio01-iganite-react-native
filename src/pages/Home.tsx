import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type editTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    //const updateTasks = tasks.map(tasks => ({...tasks}))

    const findTask = tasks.find(item => item.title === newTaskTitle)

    if(findTask){
      return Alert.alert(
          'Task já cadastrada',
          'Você não pode cadastra uma task com o mesmo nome!',
      )
    }
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    

    setTasks(oldState => [...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updateTasks = tasks.map(tasks => ({...tasks}))
    
    const findTask = updateTasks.find(item => item.id === id);

    if(!findTask)
      return

    findTask.done = !findTask.done;
    setTasks(updateTasks);
  }

  function handleEditTask({ taskId, taskNewTitle } :editTaskArgs) {
    const updateTasks = tasks.map(tasks => ({...tasks}))
    
    const findTask = updateTasks.find(item => item.id === taskId);

    if(!findTask)
      return

    findTask.title = taskNewTitle;
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
        'Remover item',
        'Tem certeza que deseja remover este item?',
        [
          {text: 'Sim', onPress: () => setTasks(oldState => oldState.filter(
            task => task.id !== id
          ))},
          {text: 'Não',}
        ]
      )
    }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})