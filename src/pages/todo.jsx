import React from "react";
import TodoList from "../component/Todolist";
import { getTodoData, getTodoListItemData, BACKEND_URL } from "../API";
import { useState, useEffect } from "react";
import TodoListItem from "../component/TodoListItem";
import Footer from "../component/footer";
import TodoListComponent from "../component/TodoListComponent";
import TodoListItemComponent from "../component/TodoListItemComponent";
import TodoListCreateForm from "../component/TodoListCreateForm";
import TodoListItemCreateForm from "../component/TodoListItemCreateForm";
// import "../styles/App.css";
import "../styles/App.css";
export default function Todo() {
  const [TodoListData, setTodoListData] = useState([]);
  const [Input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [IshomePage, setIshomePage] = useState(true);
  const [TodoListItemData, setTodoListItemData] = useState([]);
  const [TodoTitle, setTodoTitle] = useState("");
  const [taskInputVal, setTaskInputVal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [TodoId, setTodoId] = useState();

  useEffect(() => {
    // setSubmitted(false)
    if (localStorage.getItem("todo-list-data")) {
      console.log("available");
      const data = localStorage.getItem("todo-list-data");
      setTodoListData(JSON.parse(data));
      return;
    }

    fetch(`${BACKEND_URL}/main/create_list/`)
      .then((data) => data.json())
      .then((data) => {
        localStorage.setItem("todo-list-data", JSON.stringify(data));
        setTodoListData(data);
      })
      .catch((error) => {
        console.error(`something went wrong ${error}`);
      });

    console.log("rendered");
  }, []);

  // "${BACKEND_URL}/main/create_list/"
  // function getTodoData(URL, setTodoListData) {
  //   fetch(URL)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       localStorage.setItem("todo-list-data", JSON.stringify(data));
  //       setTodoListData(data);
  //     });
  // }
  // const data = getData();
  async function createTodo(e) {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("user", 1);
    formData.append("title", Input);
    try {
      const response = await fetch(`${BACKEND_URL}/main/create_list/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      // console.log(data);
      setTodoListData((prevTodoListData) => {
        const newTodoListData = [...prevTodoListData, data];
        // console.log(newTodoListData);
        localStorage.setItem("todo-list-data", JSON.stringify(newTodoListData));
        return newTodoListData;
      });
    } catch (error) {
      console.error(`something went wrong ${error}`);
    }
    console.log("SETTING INPUT ... TO EMPTY STRING");
    setInput("");
    // localStorage.removeItem("todo-list-data");
    // getTodoData("${BACKEND_URL}/main/create_list/", setTodoListData);

    // setTodoListData(TodoListData);
  }

  async function open(e, title) {
    const id = e.target.dataset.id;
    console.log(id);
    // ${BACKEND_URL}/main/create_item/1/
    try {
      const response = await fetch(`${BACKEND_URL}/main/create_item/${id}/`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setTodoListItemData(data);
        setIshomePage(false);
        setTodoTitle(title);
        setTodoId(id);
      }
    } catch (error) {
      console.error(`something went wrong ${error}`);
    }
  }
  // function edit(){
  async function AddTask(e, id) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("todolist", id);
    formData.append("text", taskInputVal);
    const response = await fetch(`${BACKEND_URL}/main/create_item/${id}/`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      setTaskInputVal("");
      setTodoListItemData((prevTodoListItemData) => [
        ...prevTodoListItemData,
        data,
      ]);
      getTodoData(`${BACKEND_URL}/main/create_list/`, setTodoListData);
    }
  }
  function Home() {
    setIshomePage(true);
  }
  return (
    <div className="main">
      {!IshomePage ? (
        // <div >
        <TodoListItemCreateForm
          TodoTitle={TodoTitle}
          taskInputVal={taskInputVal}
          setTaskInputVal={setTaskInputVal}
          AddTask={AddTask}
          TodoId={TodoId}
          Home={Home}
        />
      ) : (
        <TodoListCreateForm
          Input={Input}
          setInput={setInput}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          createTodo={createTodo}
        />
        // </div>
      )}

      <div className="todolistwrapper">
        {!IshomePage ? (
          <TodoListItemComponent
            TodoListItemData={TodoListItemData}
            setTodoListItemData={setTodoListItemData}
          />
        ) : (
          <TodoListComponent
            TodoListData={TodoListData}
            setTodoListData={setTodoListData}
            open={open}
            searchQuery={searchQuery}
          />
        )}
      </div>
      <Footer className="footer-todo" />
    </div>
  );
}
