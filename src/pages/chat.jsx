import React, { useEffect } from "react";
import { connectWebSocket, getMessages } from "../API";
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

// import { connectWebSocket } from "../API";
export default function Chat() {
  const [toasts, setToasts] = useState([]);
  const [chatMessage, setChatMessage] = useState([]);
  const [IsOpen, setIsOPen] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("token") ? true : false,
  );
  const [currentChat, setCurrentChat] = useState();
  const [navstate, setNavstate] = useState("chat_body");
  const [currentUser, setCurrentUser] = useState("");
  const websocket = useRef(null);

  if (websocket.current) {
    websocket.current.onmessage = (event) => {
      console.log("test");
      console.log(typeof event.data);
      const message = JSON.parse(event.data);
      console.log(message);
      setChatMessage((prevMessages) => {
        const updatedMessages = [...prevMessages, message.data];
        return updatedMessages;
      });
    };
  }
  async function openRoom(e, conversationId, currentUser) {
    console.log(e.target);

    console.log("opened a chat");
    console.log(conversationId);

    const data = await getMessages(conversationId);
    console.log(data);
    setChatMessage(data);
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
        ;
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
        />
      ) : (
        <div className="body bg-surface text-on-surface overflow-x-hidden">
          {/* <button onClick={()=>{connectChatRoom("room_1")}}>connect</button> */}
          <ChatHeader />
          {navstate == "chat_body" && <ChatBody openRoom={openRoom} />}
          {navstate == "explore" && <Explore />}
          {!navstate && <Profile />}
          {/* {navstate == "chat_body" ? (
            <ChatBody openRoom={openRoom} />
          ) : navstate == "explore" ? (
            <Explore />
          ) : (
            <Profile />
          )} */}

          {/* <Explore /> */}
          <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary-container text-black rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform z-40">
            <span className="material-symbols-outlined text-2xl">add</span>
          </button>
          <ChatNav navState={navstate} setNavstate={setNavstate} />
        </div>
      )}
    </>
  );
}
