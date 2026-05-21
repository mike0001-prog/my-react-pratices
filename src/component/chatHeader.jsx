import React from "react";

export default function ChatHeader({ logout }) {
  return (
    <header className="fixed top-0 z-50 w-full bg-white px-6 h-16 flex justify-between items-center border-b border-stone-100">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-black tracking-tighter text-stone-900">
          ChatMe
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="hover:bg-stone-50 transition-colors p-2 rounded-full"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </header>
  );
}
