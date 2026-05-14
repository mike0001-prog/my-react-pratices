import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "../styles/Home.css";

import MovieApp from "./pages/MovieApp";
import { Route, Routes } from "react-router";
import Favorite from "./pages/favorite";
import Navbar from "./component/Navbar";
import Footer from "./component/footer";
import Todo from "./pages/todo";
import HomePage from "./pages/home";
import Chat from "./pages/chat";
function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favs" element={<Favorite />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
