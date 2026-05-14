import React from "react";
export default function ChatNav({ setNavstate }) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-white border-t border-stone-100 flex justify-around items-center px-6 z-50">
      <div
        className="flex flex-col items-center gap-1 group"
        onClick={() => {
          setNavstate("explore");
        }}
      >
        <div className="w-16 h-8 flex items-center justify-center rounded-full group-hover:bg-stone-50 transition-colors">
          <span
            className="material-symbols-outlined text-stone-500"
            data-icon="explore"
          >
            explore
          </span>
        </div>
        <span className="text-caption-xs font-caption-xs text-stone-500 uppercase">
          Explore
        </span>
      </div>
      <div
        className="flex flex-col items-center gap-1"
        onClick={() => {
          setNavstate("chat_body");
        }}
      >
        <div className="w-16 h-8 flex items-center justify-center bg-lime-400/20 rounded-full">
          <span
            className="material-symbols-outlined text-stone-900 font-bold"
            data-icon="chat_bubble"
          >
            chat_bubble
          </span>
        </div>
        <span className="text-caption-xs font-caption-xs text-stone-900 font-bold uppercase">
          Chats
        </span>
      </div>
      <div
        className="flex flex-col items-center gap-1 group"
        onClick={() => {
          setNavstate("");
        }}
      >
        <div className="w-16 h-8 flex items-center justify-center rounded-full group-hover:bg-stone-50 transition-colors">
          <span
            className="material-symbols-outlined text-stone-500"
            data-icon="person"
          >
            person
          </span>
        </div>
        <span className="text-caption-xs font-caption-xs text-stone-500 uppercase">
          Me
        </span>
      </div>
    </div>
  );
}
