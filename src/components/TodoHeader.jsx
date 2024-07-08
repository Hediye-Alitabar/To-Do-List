import React from 'react';

function TodoHeader({errorMessage, todoTitle, setTodoTitle, editingId, editTodo, addTodo, getTodos}) {
  return (
    <div>
     <div className="header">
        {!todoTitle && <p className="error-message">{errorMessage}</p>}
        <input
          className="title-input"
          type="text"
          name="title"
          id="title"
          placeholder="Title..."
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button
          className="add-edit-btn"
          onClick={editingId ? editTodo : addTodo}
        >
          {editingId ? "Edit" : "Add"}
        </button>
        <button className="show-todo-button" onClick={getTodos}>
          To-Do List
        </button>
      </div>
    </div>
  );
}

export default TodoHeader;
