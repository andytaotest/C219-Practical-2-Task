import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./components/App";

describe("Task Manager App", () => {
  test("renders the app and checks initial UI elements", () => {
    render(<App />);
    expect(screen.getByText(/Task Tracker/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/New Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test("adds a new task to the list", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/New Task/i);
    const button = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(button);

    expect(screen.getByText(/Learn React/i)).toBeInTheDocument();
  });

  test("prevents adding an empty task", () => {
    render(<App />);
    const button = screen.getByText(/Add Task/i);

    fireEvent.click(button);

    expect(screen.queryByText(/No Task/i)).not.toBeInTheDocument(); // Ensure no task was added
  });

  test("marks a task as completed", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/New Task/i);
    const button = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: "Do Homework" } });
    fireEvent.click(button);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(screen.getByText(/Do Homework/i)).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  test("unmarks a completed task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/New Task/i);
    const button = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: "Do Homework" } });
    fireEvent.click(button);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox); // Mark as completed
    fireEvent.click(checkbox); // Unmark

    expect(screen.getByText(/Do Homework/i)).not.toHaveStyle(
      "text-decoration: line-through"
    );
  });

  test("deletes a task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/New Task/i);
    const button = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: "Wash Dishes" } });
    fireEvent.click(button);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Wash Dishes/i)).not.toBeInTheDocument();
  });

  test("shows all tasks correctly", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/New Task/i);
    const button = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(button);

    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(button);

    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
  });
});
