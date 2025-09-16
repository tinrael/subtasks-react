import { useState } from "react";
import { createTask } from "./Task";

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.addTask(createTask(props.name));
    props.setName("");
  }

  function handleChange(event) {
    props.setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-task-input">Task:</label>
      <input
        type="text"
        id="new-task-input"
        name="text"
        value={props.name}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
