import React from "react";
import TodoListItem from "./TodoListItem";
export default function TodoListItemComponent({
  TodoListItemData,
  setTodoListItemData,
}) {
  return (
    <div className="sub-wrapper">
      {TodoListItemData.map((data, id) => {
        return (
          <TodoListItem
            key={id}
            id={data.id}
            todo_id={data.todolist}
            setTodoListItemData={setTodoListItemData}
            task={data.text}
          />
        );
      })}
    </div>
  );
}
