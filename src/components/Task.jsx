import { nanoid } from "nanoid";

function Task({ id, name, checked, subtasks, addTask, deleteTask }) {
  return (
    <li>
      {name}
      <button type="button" onClick={() => addTask(createTask("Task"), id)}>
        Add
      </button>
      <button type="button" onClick={() => deleteTask(id)}>
        Delete
      </button>
      {subtasks.length > 0 && (
        <ul>
          {subtasks.map((subtask) => (
            <Task
              key={subtask.id}
              {...subtask}
              addTask={addTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function createTask(name) {
  return { id: nanoid(), name, checked: false, subtasks: [] };
}

export default Task;
