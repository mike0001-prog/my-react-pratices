import React from "react";
import TodoList from "./Todolist";
export default function TodoListComponent({
  TodoListData,
  setTodoListData,
  open,
  searchQuery,
}) {
  return (
    <div className="sub-wrapper">
      {TodoListData.map((data, id) => {
        return (
          data.title.toLowerCase().startsWith(searchQuery) && (
            <TodoList
              id={data.id}
              key={id}
              Title={data.title}
              TaskQty={data.count}
              setTodoListData={setTodoListData}
              open={open}
            />
          )
        );
      })}
    </div>
  );
}
