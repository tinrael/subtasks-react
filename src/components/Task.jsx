import { nanoid } from "nanoid";
import { useState } from "react";

function Task({
  id,
  name,
  checked,
  subtasks,
  addTask,
  deleteTask,
  editTask,
  raiseTask,
  lowerTask,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const editingTemplate = (
    <form>
      <label htmlFor={id}>New name for {name}:</label>
      <input type="text" id={id} />
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
      <button type="submit">Save</button>
    </form>
  );

  const viewTemplate = (
    <>
      {name}
      <button type="button" onClick={() => addTask(createTask("Task"), id)}>
        Add
      </button>
      <button type="button" onClick={() => deleteTask(id)}>
        Delete
      </button>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button type="button" onClick={() => raiseTask(id)}>
        Raise
      </button>
      <button type="button" onClick={() => lowerTask(id)}>
        Lower
      </button>
    </>
  );

  return (
    <li>
      {isEditing ? editingTemplate : viewTemplate}
      {subtasks.length > 0 && (
        <ul>
          {subtasks.map((subtask) => (
            <Task
              key={subtask.id}
              {...subtask}
              addTask={addTask}
              deleteTask={deleteTask}
              editTask={editTask}
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
