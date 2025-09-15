import { useState } from "react";
import Task from "./components/Task";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(task, parentId) {
    setTasks((tasks) => addSubtask(tasks, task, parentId));
  }

  function deleteTask(id) {
    setTasks((tasks) => removeTask(tasks, id));
  }

  function raiseTask(id) {
    setTasks((tasks) => upTask(tasks, id));
  }

  function lowerTask(id) {
    setTasks((tasks) => downTask(tasks, id));
  }

  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          addTask={addTask}
          deleteTask={deleteTask}
          raiseTask={raiseTask}
          lowerTask={lowerTask}
        />
      ))}
    </ul>
  );
}

function removeTask(tasks, id) {
  return tasks
    .filter((task) => task.id !== id)
    .map((task) => ({ ...task, subtasks: removeTask(task.subtasks, id) }));
}

function upTask(tasks, id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index > 0) {
    const tasksCopy = [...tasks];
    [tasksCopy[index - 1], tasksCopy[index]] = [
      tasksCopy[index],
      tasksCopy[index - 1],
    ];
    return tasksCopy;
  } else {
    return tasks.map((task) => ({
      ...task,
      subtasks: upTask(task.subtasks, id),
    }));
  }
}

function downTask(tasks, id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1 && index < tasks.length - 1) {
    const tasksCopy = [...tasks];
    [tasksCopy[index], tasksCopy[index + 1]] = [
      tasksCopy[index + 1],
      tasksCopy[index],
    ];
    return tasksCopy;
  } else {
    return tasks.map((task) => ({
      ...task,
      subtasks: downTask(task.subtasks, id),
    }));
  }
}

function addSubtask(tasks, subtask, parentId) {
  return tasks.map((task) => {
    if (task.id === parentId) {
      return { ...task, subtasks: [...task.subtasks, subtask] };
    } else {
      return {
        ...task,
        subtasks: addSubtask(task.subtasks, subtask, parentId),
      };
    }
  });
}

export default App;
