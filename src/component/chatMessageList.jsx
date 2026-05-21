import React from "react";
import Message from "./Message";
import ChatMessage from "./chatMessage";
import { useEffect, useState } from "react";
import { createMessage } from "../API";

export default function ChatMessageList({
  currentChat,
  closeRoom,
  chatMessage,
  user,
  setChatMessage,
}) {
  const user_id = JSON.parse(sessionStorage.getItem("token"))?.user;
  const [messageInput, setMessageInput] = useState("");
  async function sendMessage(e, currentChat) {
    e.preventDefault();

    const userId = JSON.parse(sessionStorage.getItem("token"))?.user;
    const formData = new FormData();
    formData.append("content", messageInput);
    formData.append("sender", userId);
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
  return (
    <section
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateRows: "10vh 70vh 20vh",
      }}
    >
      <header className="h-20 bg-white dark:bg-[#1a1a0d] border-b border-[#e5e5e0] dark:border-[#3d3c2a] flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={closeRoom}
            className="size-10 rounded-full flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
            data-alt="user-profile"
          ></div>
          <div>
            <h3 className="font-bold text-lg">{user}</h3>
            <p className="text-xs text-[#078816] font-medium">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <button className="size-10 rounded-full flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors">
            <span className="material-symbols-outlined">home</span>
          </button> */}
          {/* <button className="size-10 rounded-full flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors">
            <span className="material-symbols-outlined">call</span>
          </button> */}
          <div className="w-px h-6 bg-[#e5e5e0] dark:bg-[#3d3c2a] mx-2"></div>
          <button className="size-10 rounded-full flex items-center justify-center hover:bg-[#f5f5f0] dark:hover:bg-[#2e2d1a] transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>
      {/* <!-- Message Feed --> */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* <!-- Date Separator --> */}
        {/* <div className="flex justify-center">
          <span className="px-4 py-1 rounded-full bg-[#f0f0e8] dark:bg-[#3d3c2a] text-[#8c8b5f] text-[10px] font-bold uppercase tracking-wider">
            Today
          </span>
        </div> */}
        {/* <!-- Recipient Message --> */}
        {/* <div className="flex items-end gap-3 max-w-[80%]">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 shrink-0 mb-1"
            data-alt="Sarah profile thumbnail"
            // style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmjRasWbrRnmF24uTJ08yqC-kbVDtyd_kPRkZyj86x3C7EoC7WoGRqAls80gwPJTQdQpDrOyClREdsQhI8ryVzdw9oXAaGfi-UloMS48JpNhmDJyDwe3bx0LIGXm1dpFlRj2ZayB9l6qGeOcAkAcWAm_679ctoSyYdtg-MyhQl50EIvSL3nZ4-mWg3HWU--ZQhjrTq1DSPJxB1107juUYLKT6K8aB7tZJoRHuBXMzGEoCMYTYvm68xfGaR22pMo7R5gsxDUbJ9l0v8");'
          ></div>
          <div className="flex flex-col gap-1">
            <div className="bg-white dark:bg-[#1a1a0d] p-4 rounded-xl rounded-bl-none shadow-sm">
              <p className="text-sm leading-relaxed">
                Hey! Are we still on for the project review today?
              </p>
            </div>
            <span className="text-[10px] text-[#8c8b5f] ml-1">12:30 PM</span>
          </div>
        </div> */}
        {/* <!-- User Message --> */}
        {/* <div className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse">
          <div className="flex flex-col items-end gap-1">
            <div className="bg-primary p-4 rounded-xl rounded-br-none shadow-sm text-black">
              <p className="text-sm leading-relaxed">
                Absolutely! I've just finished the UI drafts for the main
                interface. Can't wait to show you.
              </p>
            </div>
            <div className="flex items-center gap-1 mr-1">
              <span className="text-[10px] text-[#8c8b5f]">12:35 PM</span>
              <span
                className="material-symbols-outlined text-xs text-[#078816]"
                // style="font-variation-settings: 'FILL' 1;"
              >
                done_all
              </span>
            </div>
          </div>
        </div> */}
        {chatMessage.map((message, id) => (
          <ChatMessage
            key={id}
            text={message.content}
            time={parseTime(message.created_at)}
            is_sender={message.sender == user_id}
          />
        ))}

        {/* <!-- Typing indicator --> */}
        <div className="flex items-center gap-2 text-[#8c8b5f] text-xs font-medium ml-11">
          <span className="italic">Sarah is typing</span>
          <div className="flex gap-1">
            <div className="size-1 bg-[#8c8b5f] rounded-full animate-bounce"></div>
            <div className="size-1 bg-[#8c8b5f] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="size-1 bg-[#8c8b5f] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
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
