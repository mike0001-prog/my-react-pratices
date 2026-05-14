import React, { useState, useEffect } from "react";
// import "../App.css";
import { getTodoData } from "../API";
export default function TodoList({
  id,
  Title,
  TaskQty,
  setTodoListData,
  open,
}) {
  const [titleInput, setTitleInput] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const [hiddenInput, setHiddenInput] = useState(0);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/main/create_list/")
  //     .then((data) => data.json())
  //     .then((data) => {
  //       localStorage.setItem("todo-list-data", JSON.stringify(data));
  //       setTodoListData(data);
  //     });
  // }, [submitted]);
  function editTitle(e) {
    e.preventDefault();
    const URL = e.target.action;
    const formData = new FormData();
    formData.append("title", titleInput);
    fetch(URL, {
      method: "PUT",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setTodoListData((prevTodoListData) => {
          const copyTodoListData = [...prevTodoListData];
          const copyTodoItem = copyTodoListData.find(
            (item) => item.id == data.id,
          );
          copyTodoItem.title = data.title;
          // const updatedTodoListData =
          console.log(copyTodoListData);
          localStorage.setItem(
            "todo-list-data",
            JSON.stringify(copyTodoListData),
          );
          return copyTodoListData;
        });
      })
      .catch((error) => {
        console.error(`something went wrong ${error}`);
      });
    console.log("edited data");
    setShowEdit(false);
    // getTodoData("http://127.0.0.1:8000/main/create_list/", setTodoListData);

    // setSubmitted(true);
  }
  function deleteTaskList(e) {
    e.preventDefault();
    const URL = e.target.action;
    const formData = new FormData();
    console.log("deleting ... the data");
    // formData.append("id", hiddenInput);
    fetch(URL, {
      method: "DELETE",
      // body: formData,
    })
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(`something went wrong ${error}`);
      });
    // setTodoListData((prevTodoListData)=>{

    // })
    getTodoData("http://127.0.0.1:8000/main/create_list/", setTodoListData);
  }
  return (
    <div>
      <div className="todolist">
        <h3 className="title">{Title}</h3>
        <span className="task-qty">{TaskQty}</span>
      </div>
      <div className="actions">
        <button
          className="todo"
          data-id={id}
          onClick={(e) => {
            open(e, Title);
          }}
        >
          See List
        </button>
        <form
          onSubmit={(e) => {
            deleteTaskList(e);
          }}
          action={`http://127.0.0.1:8000/main/update_delete_list/${id}/`}
        >
          <button className="danger">Delete</button>
        </form>

        <button
          className="todo"
          onClick={() => {
            setShowEdit(true);
          }}
        >
          Edit Title
        </button>
      </div>
      <div>
        {showEdit && (
          <form
            className="edit-form"
            action={`http://127.0.0.1:8000/main/update_delete_list/${id}/`}
            onSubmit={(e) => {
              editTitle(e);
            }}
          >
            <input
              value={titleInput}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
              placeholder="Enter New Title"
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
    </div>
  );
}
