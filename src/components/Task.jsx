import { nanoid } from "nanoid";

function Task({
  id,
  name,
  checked,
  subtasks,
  addTask,
  deleteTask,
  raiseTask,
  lowerTask,
}) {
  return (
    <li>
      {name}
      <button type="button" onClick={() => addTask(createTask("Task"), id)}>
        Add
      </button>
      <button type="button" onClick={() => deleteTask(id)}>
        Delete
      </button>
      <button type="button" onClick={() => raiseTask(id)}>
        Raise
      </button>
      <button type="button" onClick={() => lowerTask(id)}>
        Lower
      </button>
      {subtasks.length > 0 && (
        <ul>
          {subtasks.map((subtask) => (
            <Task
              key={subtask.id}
              {...subtask}
              addTask={addTask}
              deleteTask={deleteTask}
              raiseTask={raiseTask}
              lowerTask={lowerTask}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function createTask(name) {
  return { id: nanoid(), name, checked: false, subtasks: [] };
}

export default Task;
