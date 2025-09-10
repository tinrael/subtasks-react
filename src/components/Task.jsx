function Task({ id, name, checked, subtasks }) {
  return (
    <li>
      {name}
      {subtasks.length > 0 && (
        <ul>
          {subtasks.map((subtask) => (
            <Task key={subtask.id} {...subtask} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Task;
