import Task from "./components/Task";

function App({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  );
}

export default App;
