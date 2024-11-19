import React from "react";

export default function Task({ task, onToggleTask, onDeleteTask }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      <span style={task.completed ? { textDecoration: "line-through" } : {}}>
        {task.description}
      </span>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
}
