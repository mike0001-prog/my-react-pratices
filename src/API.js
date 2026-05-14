// export default async function getMovieData() {
//   const response = await fetch("");
//   if (response.ok) {
//     console.log(response.json());
//   }
// }

function getTodoData(URL, setTodoListData) {
  fetch(URL)
    .then((data) => data.json())
    .then((data) => {
      localStorage.setItem("todo-list-data", JSON.stringify(data));
      setTodoListData(data);
    })
    .catch((error) => {
      console.error(`something went wrong ${error}`);
    });
}
function getTodoListItemData(URL, setTodoListItemData) {
  fetch(URL)
    .then((data) => data.json())
    .then((data) => {
      // localStorage.setItem("todo-list-data", JSON.stringify(data));
      setTodoListItemData(data);
    });
}
// chat demo
function connectWebSocket() {
  const socket = new WebSocket(`ws://127.0.0.1:8000/ws/main/`);
  socket.onerror = (error) => {
    console.error(`something went wrong ${error}`);
  };
  // socket.onmessage = (event) => {
  //   console.log(event.data);
  // };
  console.log(socket);
  socket.onopen = (e) => {
    socket.send(
      JSON.stringify({ msg: "hello world", type: "initial_handshake" }),
    );
  };
  console.log(socket.OPEN);
  console.log(socket.CLOSING, socket.CONNECTING);
  return socket;
}
async function getMessages(roomId) {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  console.log(token, JSON.parse(sessionStorage.getItem("token")));
  console.log(roomId);
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/main/room/${roomId}/messages/`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      return data;
    }
  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
}
async function getRooms() {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  // console.log(token, JSON.parse(sessionStorage.getItem("token")));
  try {
    const response = await fetch(`http://127.0.0.1:8000/main/rooms/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
}
async function Login(url, body, setToasts, setIsDisabled) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok && response.status == 200) {
      const data = await response.json();
      setToasts([
        {
          id: 1,
          variant: "success",
          message: "signed in sucessfully",
          title: "sign in",
        },
      ]);
      console.log(data);
      return data;
    } else if (response.status == 400) {
      setToasts([
        {
          id: 2,
          variant: "error",
          message: "username or password is incorrect ",
          title: "sign in",
        },
      ]);
      setTimeout(() => {
        setIsDisabled(false);
      }, 700);
      // setIsDisabled(false);
      console.error(`something went wrong`);
    }
  } catch (error) {
    setToasts([
      {
        id: 3,
        variant: "error",
        message: " something went wrong",
        title: "sign in",
      },
    ]);
    setTimeout(() => {
      setIsDisabled(false);
    }, 700);

    console.error(`something went wrong ${error}`);
  }
}
async function Signup(url, body, setToasts, setIsDisabled) {
  try {
    const response = await fetch(url, { body: body, method: "POST" });

    if (response.ok) {
      const data = await response.json();
      const msg = data?.msg;
      // setMsg(msg);
      setToasts([
        {
          variant: "success",
          message: "signed in sucessfully",
          title: "sign in",
        },
      ]);
      return data;
    }
  } catch (error) {
    setToasts([
      {
        id: 21,
        variant: "error",
        message: " something went wrong",
        title: "sign in",
      },
    ]);
    setTimeout(() => {
      setIsDisabled(false);
      // console.log(
    }, 700);
    console.error(`something went wrong ${error}`);
  }
}
async function createMessage(e, roomId, data) {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  const response = await fetch(
    `http://127.0.0.1:8000/main/room/${roomId}/messages/`,
    {
      headers: { Authorization: `Token ${token}` },
      method: "POST",
      body: data,
    },
  );
  if (response.ok) {
    const data = await response.json();
    return data;
    console.log(data);
  }
}
export {
  createMessage,
  getTodoData,
  getTodoListItemData,
  connectWebSocket,
  Login,
  Signup,
  getMessages,
  getRooms,
};
