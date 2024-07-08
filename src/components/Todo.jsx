import React, { useState } from "react";
import axios from "axios";
import TodoCard from "./TodoCard";
import TodoHeader from "./TodoHeader";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let baseURL = `http://localhost:8000/todos`;

  const getTodos = async () => {
    try {
      const res = await axios.get(`${baseURL}`);
      setTodos(res.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("There was a problem fetching the todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("There was a problem deleting the todo:", error);
    }
  };

  const addTodo = async () => {
    if (!todoTitle) {
      setErrorMessage("Please fill the input!");
      return;
    }
    try {
      const newTodo = { title: todoTitle, isComplete: false };
      const res = await axios.post(`${baseURL}`, newTodo);
      setTodos([...todos, res.data]);
      setTodoTitle("");
      setErrorMessage("");
    } catch (error) {
      console.error("There was a problem adding the todo:", error);
    }
  };

  const editTodo = async () => {
    const todoToUpdate = todos.find((todo) => todo.id === editingId);
    try {
      await axios.put(`${baseURL}/${editingId}`, {
        title: todoTitle,
        isComplete: todoToUpdate.isComplete,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === editingId
            ? { ...todo, title: todoTitle, isComplete: todoToUpdate.isComplete }
            : todo
        )
      );
      setTodoTitle("");
      setEditingId(null);
      setErrorMessage("");
    } catch (error) {
      console.error("There was a problem adding the todo:", error);
    }
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setTodoTitle(title);
  };

  const handleCheckboxChange = async (id) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    );
    setTodos(updatedTodo);
    try {
      const todoToUpdate = updatedTodo.find((todo) => todo.id === id);
      await axios.put(`${baseURL}/${id}`, todoToUpdate);
    } catch (error) {
      console.error("There was a problem updating the todo status:", error);
    }
  };

  return (
    <div>
      <TodoHeader
        errorMessage={errorMessage}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
        editingId={editingId}
        editTodo={editTodo}
        addTodo={addTodo}
        getTodos={getTodos}
      ></TodoHeader>
      <TodoCard
        todos={todos}
        deleteTodo={deleteTodo}
        isLoaded={isLoaded}
        handleCheckboxChange={handleCheckboxChange}
        startEditing={startEditing}
      ></TodoCard>
    </div>
  );
};

export default Todo;
