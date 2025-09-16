import { nanoid } from "nanoid";
import { useState } from "react";

function Task({
  id,
  name,
  checked,
  subtasks,
  subtaskName,
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  raiseTask,
  lowerTask,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    editTask(id, newName);
    setNewName("");
    setEditing(false);
  }

  function handleChange(event) {
    setNewName(event.target.value);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <label htmlFor={id}>New name for {name}:</label>
      <input type="text" id={id} value={newName} onChange={handleChange} />
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
      <button type="submit">Save</button>
    </form>
  );

  const viewTemplate = (
    <>
      <input
        id={id}
        type="checkbox"
        defaultChecked={checked}
        onChange={() => toggleTask(id)}
      />
      <label htmlFor={id}>{name}</label>
      <button
        type="button"
        onClick={() => addTask(createTask(subtaskName), id)}
      >
        Add
      </button>
      <button type="button" onClick={() => deleteTask(id)}>
        Delete
      </button>
      <button type="button" onClick={() => setEditing(true)}>
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
              subtaskName={subtaskName}
              addTask={addTask}
              deleteTask={deleteTask}
              editTask={editTask}
              toggleTask={toggleTask}
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
