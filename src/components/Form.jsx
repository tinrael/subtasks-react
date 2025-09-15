import { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setName("");
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-task-input">Task:</label>
      <input
        type="text"
        id="new-task-input"
        name="text"
        value={name}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
