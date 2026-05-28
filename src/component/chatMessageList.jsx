import React from "react";
import Message from "./Message";
import ChatMessage from "./chatMessage";
import { useEffect, useState } from "react";
import { createMessage } from "../API";
import ConversationHeader from "./conversationHeader";

function DateDivider({ date }) {
  return (
    <>
      <div className="flex justify-center">
        <span className="px-4 py-4 rounded-full bg-[#f0f0e8] dark:bg-[#3d3c2a] text-[#8c8b5f] text-[10px] font-bold uppercase tracking-wider">
          {date}
        </span>
      </div>
    </>
  );
}

export default function ChatMessageList({
  currentChat,
  closeRoom,
  chatMessage,
  user,
  setChatMessage,
  sendTypingSignal,
  userState,
}) {
  const user_id = JSON.parse(sessionStorage.getItem("token"))?.user;
  const [messageInput, setMessageInput] = useState("");
  async function sendMessage(e, currentChat) {
    e.preventDefault();

    const userId = JSON.parse(sessionStorage.getItem("token"))?.user;
    const formData = new FormData();
    formData.append("content", messageInput);
    formData.append("sender", userId);
    if (!messageInput) return;
    const response = await createMessage(e, currentChat, formData);
    if (!response) return;
    setMessageInput("");
    setChatMessage((prevMessages) => {
      const updatedMessages = [...prevMessages, response];
      return updatedMessages;
    });
  }
  const parseTime = (timestamp) => {
    const hours = new Date(timestamp).getHours();
    const minutes = new Date(timestamp).getMinutes();
    let symbol = "AM";
    if (hours > 12) {
      symbol = "PM";
      return `${hours - 12}: ${minutes > 10 ? minutes : "0" + minutes} ${symbol}`;
    }
    return `${hours}:${minutes > 10 ? minutes : "0" + minutes} ${symbol}`;
  };
  const groupByDate = (messages) => {
    const groupedMessages = messages.reduce((acc, msg) => {
      const datekey = new Date(msg.created_at).toDateString();
      // console.log(datekey);
      // console.log(acc);
      if (!acc[`${datekey}`]) acc[`${datekey}`] = [];
      acc[datekey].push(msg);
      return acc;
    }, {});
    return groupedMessages;
  };

  return (
    <section
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "10vh 70vh 20vh",
      }}
    >
      <ConversationHeader
        closeRoom={closeRoom}
        user={user}
        userState={userState}
      />
      {/* <!-- Message Feed --> */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {Object.entries(groupByDate(chatMessage)).map(([date, messages]) => (
          <>
            <DateDivider date={date} />

            {messages.map((message, id) => (
              <ChatMessage
                key={id}
                text={message.content}
                time={parseTime(message.created_at)}
                is_sender={message.sender == user_id}
              />
            ))}
          </>
        ))}
        {/* {chatMessage.map((message, id) => (
          <ChatMessage
            key={id}
            text={message.content}
            time={parseTime(message.created_at)}
            is_sender={message.sender == user_id}
          />
        ))} */}

        {/* <!-- Typing indicator --> */}
        {/* <div className="flex items-center gap-2 text-[#8c8b5f] text-xs font-medium ml-11">
          <span className="italic">Sarah is typing</span>
          <div className="flex gap-1">
            <div className="size-1 bg-[#8c8b5f] rounded-full animate-bounce"></div>
            <div className="size-1 bg-[#8c8b5f] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="size-1 bg-[#8c8b5f] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div> */}
      </div>
      {/* <!-- Chat Input --> */}
      <form
        onSubmit={(e) => {
          sendMessage(e, currentChat);
        }}
        className=" bg-white dark:bg-[#1a1a0d] border-t border-[#e5e5e0] dark:border-[#3d3c2a] p-4 flex items-center gap-4 shrink-0"
      >
        <div className="flex gap-2">
          {/* <button className="size-11 rounded-full flex items-center justify-center text-[#8c8b5f] hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button> */}
          <button className="size-11 rounded-full flex items-center justify-center text-[#8c8b5f] hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors">
            <span className="material-symbols-outlined">
              sentiment_satisfied
            </span>
          </button>
        </div>

        <div className="flex-1 relative">
          <input
            className="w-full h-12 bg-[#f5f5f0] dark:bg-[#2e2d1a] border-none rounded-full px-6 text-sm focus:ring-2 focus:ring-primary/50"
            placeholder="Type a message..."
            type="text"
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
              setTimeout(() => {
                sendTypingSignal();
              }, 3000);
            }}
            onKeyDown={(e) => {
              console.log(e.target.value, e.key);
              console.log(e.key === "Enter");
              if (e.key === "Enter") {
                console.log("sending msg");
                sendMessage(e, currentChat);
              }
            }}
          />
        </div>
        <button className="size-12 rounded-full bg-primary flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-all">
          <span
            className="material-symbols-outlined"
            // style="font-variation-settings: 'FILL' 1;"
          >
            send
          </span>
        </button>
      </form>
    </section>
  );
}
