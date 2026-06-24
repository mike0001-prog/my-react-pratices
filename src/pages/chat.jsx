import React, { useEffect } from "react";
import { connectWebSocket, getMessages, loadMoreMessages } from "../API";
import ChatHeader from "../component/chatHeader";
import Footer from "../component/footer";
import ChatBody from "../component/chatBody";
import "../styles/chat.css";
import ChatNav from "../component/chatNav";
import ChatMessageList from "../component/chatMessageList";
import ChatMeAuth from "../component/chatAuth";
import { ToastContainer } from "../component/Toast";
import { useState, useRef } from "react";
import Explore from "../component/Explore";
import Profile from "../component/Profile";

export default function Chat() {
  const websocket = useRef(null);
  // useEffect(() => {
  //   websocket.current = connectWebSocket();
  // }, []);
  const [toasts, setToasts] = useState([]);
  const [chatMessage, setChatMessage] = useState([]);
  const [IsOpen, setIsOPen] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") ? true : false,
  );
  const [currentChat, setCurrentChat] = useState();
  const [navstate, setNavstate] = useState("chat_body");
  const [currentUser, setCurrentUser] = useState("");
  const [userState, setUserState] = useState("");
  const [nextPage, setNextPage] = useState("");

  async function loadmore(url) {
    const response = await loadMoreMessages(url);
    if (!response) return;
    const messages = response.results;
    const nextpage = response.next;
    console.log(nextpage);
    console.log(messages);
    setNextPage(nextpage);
    setChatMessage((prevMessages) => {
      console.log(messages, prevMessages);
      const updatedMessages = [...messages, ...prevMessages];
      console.log(updatedMessages);
      return updatedMessages;
    });
  }
  if (websocket.current) {
    websocket.current.onmessage = (event) => {
      console.log("test");
      console.log(typeof event.data);
      const message = JSON.parse(event.data);
      console.log(message, message.data.type);
      if (message.data.type == "suscribe_room") {
        setChatMessage((prevMessages) => {
          const updatedMessages = [...prevMessages, message.data.data];
          return updatedMessages;
        });
      }
      console.log(message.data.type);
      if (message.data.type == "typing_signal") {
        setUserState("typing");
        setTimeout(() => {
          setUserState("");
        }, 2000);
      }
    };
  } else if (IsLoggedIn && !websocket.current) {
    const token = JSON.parse(sessionStorage.getItem("token")).key;
    websocket.current = connectWebSocket(token);
  }
  const sendTypingSignal = () => {
    const data = { type: "typing_signal", reciever: currentUser };
    websocket.current.send(JSON.stringify(data));
  };
  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    console.log(websocket.current);
    // websocket.current.send(JSON.stringify({ type: "disconnect" }));
    websocket.current.close();
  };
  async function openRoom(e, conversationId, currentUser) {
    console.log(e.target);

    console.log("opened a chat");
    console.log(conversationId);

    const data = await getMessages(conversationId);
    // console.log(data);
    if (!data) return;
    const nextPage = data.next;
    console.log(nextPage);
    setNextPage(nextPage);
    setChatMessage(data.results.reverse());
    // sessionStorage.setItem(conversationId,JSON.stringify(data))
    setIsOPen(true);
    setCurrentChat(conversationId);
    setCurrentUser(currentUser);
  }
  function closeRoom() {
    setIsOPen(false);
  }
  if (!IsLoggedIn) {
    // return <ChatLoginComponent setIsLoggedIn={setIsLoggedIn} />;
    return (
      <>
        <ChatMeAuth
          setIsLoggedIn={setIsLoggedIn}
          setToasts={setToasts}
          websocket={websocket}
        />

        <ToastContainer toasts={toasts} setToasts={setToasts} />
      </>
    );
  }
  // if (Isexplore) {
  //   return <Explore/>
  // }
  return (
    <>
      {/* { IsLoggedIn ?} */}
      {IsOpen ? (
        <ChatMessageList
          user={currentUser}
          currentChat={currentChat}
          closeRoom={closeRoom}
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          sendTypingSignal={sendTypingSignal}
          userState={userState}
          nextPage={nextPage}
          loadmore={loadmore}
        />
      ) : (
        <div className="body bg-surface text-on-surface overflow-x-hidden">
          {/* <button onClick={()=>{connectChatRoom("room_1")}}>connect</button> */}
          <ChatHeader logout={logout} />
          {navstate == "chat_body" && <ChatBody openRoom={openRoom} />}
          {navstate == "explore" && (
            <Explore setToasts={setToasts} openroom={openRoom} />
          )}
          {!navstate && <Profile setToasts={setToasts} />}
          {/* {navstate == "chat_body" ? (
            <ChatBody openRoom={openRoom} />
          ) : navstate == "explore" ? (
            <Explore />
          ) : (
            <Profile />
          )} */}

          {/* <Explore /> */}

          <ChatNav navState={navstate} setNavstate={setNavstate} />
        </div>
      )}
      <ToastContainer toasts={toasts} setToasts={setToasts} />
    </>
  );
}
