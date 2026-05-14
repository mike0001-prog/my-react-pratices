import React from "react";

export default function TodoListItemCreateForm({
  setTaskInputVal,
  taskInputVal,
  AddTask,
  TodoTitle,
  TodoId,
  Home,
}) {
  return (
    <form
      onSubmit={(e) => {
        AddTask(e, TodoId);
      }}
      className="todo-form"
    >
      <h2>{TodoTitle}</h2>

      {/* <h3>ADD TASK</h3> */}
      <div className="create">
        <input
          type="text"
          onChange={(e) => {
            setTaskInputVal(e.target.value);
          }}
          value={taskInputVal}
          placeholder="Add Task e.g Walk The Dog"
          required
        />
        <button className="todo" type="submit">
          + Add
        </button>
      </div>
      <div className="back">
        <button className="todo" type="button" onClick={Home}>
          Back
        </button>
      </div>
    </form>
  );
}
