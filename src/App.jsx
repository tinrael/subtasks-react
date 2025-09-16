import { useState } from "react";
import Task from "./components/Task";
import Form from "./components/Form";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(task, parentId) {
    setTasks((tasks) => insertTask(tasks, task, parentId));
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
    <>
      <Form addTask={addTask} />
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
    </>
  );
}

function insertTask(tasks, subtask, parentId = null) {
  if (parentId === null) {
    return [...tasks, subtask];
  }
  return tasks.map((task) => {
    if (task.id === parentId) {
      return { ...task, subtasks: [...task.subtasks, subtask] };
    } else {
      return {
        ...task,
        subtasks: insertTask(task.subtasks, subtask, parentId),
      };
    }
  });
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

export default App;
