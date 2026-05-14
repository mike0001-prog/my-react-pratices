import React from "react";
import { useState, useRef } from "react";
import { Login } from "../API";
export default function ChatLoginComponent({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login(e, url) {
    console.log("logging in");
    e.preventDefault();
    const data = JSON.stringify({ username: username, password: password });
    console.log(data);
    const { token } = await Login(url, data);
    console.log(token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  }
  return (
    <div
      className="body bg-surface text-on-surface overflow-x-hidden"
      style={{ display: "flex", justifyContent: "center", padding: "50px" }}
    >
      <div className="chat-form-wrapper">
        <form
          className="chat-form"
          onSubmit={(e) => {
            login(e, "http://127.0.0.1:8000/main/login/");
          }}
          // action=""
          method="post"
        >
          <h1
            style={{ textAlign: "center" }}
            className="text-2xl font-black tracking-tighter text-stone-900 mb-6"
          >
            Log In
          </h1>
          <input
            className="w-full mb-6 h-12 border-none rounded-full px-6 text-sm"
            value={username}
            name="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            required
          />
          <input
            className="w-full mb-6 h-12 border-none rounded-full px-6 text-sm "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            required
          />
          <button className="bg-primary-container mb-6" type="submit">
            Log In
          </button>
          <button className="bg-primary-container" type="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
// import { useState, useRef } from "react";

// ─── Design tokens (matching chatme.html) ────────────────────────────────────
