import React from "react";

export default function Message({ text, time }) {
  return (
    <div className="chat-message">
      <div>{text}</div>
      <div>{time}</div>
    </div>
  );
}
