import React from "react";
export default function ChatNav({ setNavstate, navState }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-stone-100 flex justify-around items-center px-6 z-50">
      <div
        className="flex flex-col items-center gap-1 group"
        onClick={() => {
          setNavstate("explore");
        }}
      >
        {/*  ${navState === "chat_body" ? : "group-hover:bg-stone-50 transition-colors" */}
        <div
          className={`w-16 h-8 flex items-center group-hover:bg-stone-50 justify-center rounded-full ${navState === "explore" ? "bg-lime-400/20 rounded-full" : ""}`}
        >
          <span
            className={`material-symbols-outlined  ${navState === "explore" ? "text-stone-900 font-bold" : "text-stone-500"}`}
            data-icon="explore"
          >
            explore
          </span>
        </div>
        <span
          className={`text-caption-xs font-caption-xs uppercase ${navState === "explore" ? "text-stone-900 font-bold" : "text-stone-500"} `}
        >
          Explore
        </span>
      </div>
      <div
        className="flex flex-col items-center gap-1 group"
        onClick={() => {
          setNavstate("chat_body");
        }}
      >
        <div
          className={`w-16 h-8 flex items-center group-hover:bg-stone-50 justify-center rounded-full ${navState === "chat_body" ? "bg-lime-400/20" : ""}`}
        >
          <span
            className={`material-symbols-outlined  ${navState === "chat_body" ? "text-stone-900 font-bold" : "text-stone-500"}`}
            data-icon="chat_bubble"
          >
            chat_bubble
          </span>
        </div>
        <span
          className={`text-caption-xs font-caption-xs uppercase ${navState === "chat_body" ? "text-stone-900 font-bold" : "text-stone-500"} `}
        >
          Chats
        </span>
      </div>
      <div
        className="flex flex-col items-center gap-1 group"
        onClick={() => {
          setNavstate("");
        }}
      >
        <div
          className={`w-16 h-8 flex items-center group-hover:bg-stone-50 justify-center rounded-full ${!navState ? "bg-lime-400/20" : ""}`}
        >
          <span
            className={`material-symbols-outlined  ${!navState ? "text-stone-900 font-bold" : "text-stone-500"}`}
            data-icon="person"
          >
            person
          </span>
        </div>
        <span
          className={`text-caption-xs font-caption-xs uppercase ${!navState ? "text-stone-900 font-bold" : "text-stone-500"} `}
        >
          Me
        </span>
      </div>
    </div>
  );
}
