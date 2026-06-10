// export default async function getMovieData() {
//   const response = await fetch("");
//   if (response.ok) {
//     console.log(response.json());
//   }
// }
// import env
console.log(import.meta.env.VITE_API_URL);
const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL
  : "http://127.0.0.1:8000";
const WS_URL = import.meta.env.VITE_WS_URL
  ? import.meta.env.VITE_WS_URL
  : "ws://127.0.0.1:8000";

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
// connect to websocket function
function connectWebSocket(token) {
  const socket = new WebSocket(`${WS_URL}/ws/main/?token=${token}`);
  socket.onerror = (error) => {
    console.error(`something went wrong ${error}`);
  };

  console.log(socket);
  socket.onopen = (e) => {
    socket.send(
      JSON.stringify({ msg: "hello world", type: "initial_handshake" }),
    );
  };

  return socket;
}
const token = JSON.parse(sessionStorage.getItem("token"))?.key;

async function changepassword(data, setToasts, setButtonDisabled) {
  console.log(token);
  try {
    const response = await fetch(`${BACKEND_URL}/main/user/change_password/`, {
      headers: { Authorization: `Token ${token}` },
      method: "PUT",
      body: data,
    });
    if (response.ok) {
      const res = await response.json();
      setToasts([
        {
          variant: "success",
          message: `${res.msg}`,
          title: "settings",
        },
      ]);
    }
    if (response.status == 400) {
      const res = await response.json();
      setToasts({
        variant: "error",
        message: `${res.msg}`,
        title: "settings",
      });
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
    }
  } catch (error) {
    setToasts([
      {
        variant: "error",
        message: "something went wrong ",
        title: "settings",
      },
    ]);
  }
}
async function updateusername(data, setToasts, setButtonDisabled) {
  try {
    const response = await fetch(`${BACKEND_URL}/main/user/change_username/`, {
      headers: { Authorization: `Token ${token}` },
      method: "PUT",
      body: data,
    });
    if (response.ok) {
      const res = await response.json();
      setToasts([
        {
          id: 2,
          variant: "success",
          message: `${res.msg}`,
          title: "settings",
        },
      ]);
      console.log(res);
    }
    const status = response.status;
    if (status == 400) {
      const res = await response.json();
      console.log(res.msg);
      setToasts([
        {
          id: 1,
          variant: "error",
          message: `${res.msg}`,
          title: "settings",
        },
      ]);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 3500);
    }
  } catch (error) {
    setToasts([
      {
        variant: "error",
        message: "something went wrong ",
        title: "settings",
      },
    ]);
    console.log(error);
  }
}
async function getMessages(roomId) {
  // console.log(token);
  // console.log(roomId);
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  try {
    const response = await fetch(
      `${BACKEND_URL}/main/room/${roomId}/messages/`,
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
    const response = await fetch(`${BACKEND_URL}/main/rooms/`, {
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
    const response = await fetch(`${BACKEND_URL}/main/login/`, {
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
    const response = await fetch(`${BACKEND_URL}/main/signup/`, { body: body, method: "POST" });

    if (response.ok) {
      const data = await response.json();
      const msg = data?.msg;
      // setMsg(msg);
      setToasts([
        {
          variant: "success",
          message: `${msg}`,
          title: "sign in",
        },
      ]);
      return data;
    }
    if (response.status == 400) {
      const res = await response.json();

      const messages = [...Object.values(res)].map((item, id) => ({
        id: id,
        variant: "error",
        message: item,
        title: "sign in",
      }));

      console.log(res);
      setToasts(messages);
      setTimeout(() => {
        setIsDisabled(false);
        // console.log(
      }, 700);
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
  const response = await fetch(`${BACKEND_URL}/main/room/${roomId}/messages/`, {
    headers: { Authorization: `Token ${token}` },
    method: "POST",
    body: data,
  });
  if (response.ok) {
    const data = await response.json();

    console.log(data);
    return data;
  }
}

async function getusers(setToasts) {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  // console.log(token, JSON.parse(sessionStorage.getItem("token")));
  try {
    const response = await fetch(`${BACKEND_URL}/main/users/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    setToasts([
      {
        id: 21,
        variant: "error",
        message: `something went wrong`,
        title: "explore",
      },
    ]);
    console.error(`something went wrong ${error}`);
  }
}
async function connectRoom(data, setButtonDisabled, setToasts) {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  console.log(token);
  try {
    const response = await fetch(`${BACKEND_URL}/main/rooms/`, {
      headers: { Authorization: `Token ${token}` },
      body: data,
      method: "POST",
    });
    if (response.ok) {
      const data = await response.json();
      setToasts([
        {
          id: 21,
          variant: "success",
          message: `${data.user_two_name} is now a friend`,
          title: "sign in",
        },
      ]);
      console.log(data);
      return data;
    }
    if (response.status == 400) {
      setToasts([
        {
          id: 21,
          variant: "error",
          message: ``,
          title: "sign in",
        },
      ]);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1500);
    }
  } catch (error) {
    setToasts([
      {
        id: 21,
        variant: "error",
        message: "something went wrong",
        title: "sign in",
      },
    ]);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1500);
    console.log(error);
  }
}
async function getuserprofile(setToasts) {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;
  try {
    const response = await fetch(`${BACKEND_URL}/main/user/profile/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    setToasts([
      {
        id: 21,
        variant: "error",
        message: "error gettting profile",
        title: "sign in",
      },
    ]);
    console.error(error);
  }
}
async function searchUsers(searchQuery) {
  const token = JSON.parse(sessionStorage.getItem("token"))?.key;

  try {
    const response = await fetch(
      `${BACKEND_URL}/main/users/?search=${encodeURIComponent(searchQuery)}`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    setToasts([
      {
        id: 21,
        variant: "error",
        message: `something went wrong`,
        title: "explore",
      },
    ]);
    console.error(`something went wrong ${error}`);
  }
}
export {
  getuserprofile,
  createMessage,
  getTodoData,
  getTodoListItemData,
  connectWebSocket,
  Login,
  Signup,
  getMessages,
  getRooms,
  changepassword,
  updateusername,
  getusers,
  connectRoom,
  searchUsers,
  BACKEND_URL,
};
