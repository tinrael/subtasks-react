import { useState } from "react";
import Task from "./components/Task";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(task, parentId) {
    setTasks((tasks) => addSubtask(tasks, task, parentId));
  }

  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} {...task} addTask={addTask} />
      ))}
    </ul>
  );
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
