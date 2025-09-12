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

  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          addTask={addTask}
          deleteTask={deleteTask}
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
