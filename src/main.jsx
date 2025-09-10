import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const tasks = [
  { id: "0", name: "Task 0", checked: false, subtasks: [] },
  {
    id: "1",
    name: "Task 1",
    checked: false,
    subtasks: [
      { id: "3", name: "Task 3", checked: false, subtasks: [] },
      {
        id: "4",
        name: "Task 4",
        checked: false,
        subtasks: [{ id: "5", name: "Task 5", checked: false, subtasks: [] }],
      },
    ],
  },
  { id: "2", name: "Task 2", checked: false, subtasks: [] },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App tasks={tasks} />
  </StrictMode>
);
