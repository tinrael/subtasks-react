function Task({ id, name, checked, subtasks, addTask }) {
  return (
    <li>
      {name}
      <button type="button" onClick={() => addTask(createTask("Task"), id)}>
        Add
      </button>
      {subtasks.length > 0 && (
        <ul>
          {subtasks.map((subtask) => (
            <Task key={subtask.id} {...subtask} addTask={addTask} />
          ))}
        </ul>
      )}
    </li>
  );
}

function createTask(name) {
  return { id: "", name, checked: false, subtasks: [] };
}

export default Task;
