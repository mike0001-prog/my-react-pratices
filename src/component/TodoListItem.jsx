import React from "react";
import { useState, useEffect } from "react";
import { getTodoListItemData } from "../API";
export default function TodoListItem({
  todo_id,
  id,
  task,
  setTodoListItemData,
}) {
  const [TaskInput, setTaskInput] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // useEffect(() => {
  //   fetch(`http://127.0.0.1:8000/main/create_item/${todo_id}/`)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       // console.log(data);
  //       setTodoListItemData(data);
  //     });
  // }, [submitted]);
  function editTask(e) {
    e.preventDefault();
    const URL = e.target.action;
    const formData = new FormData();
    formData.append("text", TaskInput);
    formData.append("todolist", todo_id);
    fetch(URL, {
      method: "PUT",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => {
        setTodoListItemData((prevTodoListItemData) => {
          const copyTodoListItemData = [...prevTodoListItemData];
          const copyTodoItem = copyTodoListItemData.find(
            (item) => item.id == data.id,
          );
          copyTodoItem.text = data.text;
          console.log(copyTodoListItemData);
          return copyTodoListItemData;
        });
      })
      .catch((error) => {
        console.error(`something went wrong ${error}`);
      });
    setShowEdit(false);

    setTaskInput(" ");
  }

  return (
    <div>
      <div className="todolist">
        <h3 className="title">{task}</h3>
        <div className="actions">
          <button className="danger">Delete</button>

          <button
            className="todo"
            onClick={() => {
              setShowEdit(true);
            }}
          >
            Edit
          </button>
        </div>
      </div>
      {showEdit && (
        <form
          className="edit-form"
          action={`http://127.0.0.1:8000/main/update_delete_item/${id}/`}
          onSubmit={(e) => {
            editTask(e);
          }}
        >
          <input
            value={TaskInput}
            onChange={(e) => {
              setTaskInput(e.target.value);
            }}
          />
          <button className="todo" type="submit">
            Save
          </button>
          <button
            className="danger"
            onClick={() => {
              setShowEdit(false);
            }}
            type="button"
          >
            X
          </button>
        </form>
      )}
    </div>
  );
}
