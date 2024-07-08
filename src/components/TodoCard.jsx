import React from "react";

const TodoCard = ({todos, deleteTodo , isLoaded, handleCheckboxChange, startEditing}) => {
  return (
    <div className="container">
        {isLoaded && todos.length === 0 ? (
          <p>No Todos!</p>
        ) : (
          todos.map((todo) => (
            <div className="card" key={todo.id}>
              <h3>{todo.title}</h3>
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <div className="card_button">
                <button onClick={() => startEditing(todo.id, todo.title)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
  );
};

export default TodoCard;
