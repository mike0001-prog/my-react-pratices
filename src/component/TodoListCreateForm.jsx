import React from "react";

export default function TodoListCreateForm({
  Input,
  setInput,
  searchQuery,
  setSearchQuery,
  createTodo,
}) {
  return (
    <form
      className="todo-form"
      onSubmit={(e) => {
        createTodo(e);
      }}
      action="http://127.0.0.1:8000/main/create_list/"
      method="post"
    >
      <h2>Todo App</h2>

      <div className="create">
        <input
          type="text"
          name="title"
          value={Input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          required
          placeholder="Create New Todo List e.g Saturday Chores"
        />
        <button className="create-btn todo">+ create</button>
      </div>
      <div className="search">
        <input
          type="search"
          name="search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          placeholder="search for your task..."
        />
      </div>
    </form>
  );
}
