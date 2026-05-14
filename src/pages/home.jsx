import React from "react";
import "../styles/Home.css";
import Footer from "../component/footer";
import ProjectCard from "../component/projectCard";
import todoImage from "../assets/projects-images/todo.png";
export default function HomePage() {
  return (
    <div className="main-home">
      <div className="sub-project-wrapper">
        <div className="project-wrapper">
          <ProjectCard Name="Todo App" ImageUrl={todoImage} Url="/todo" />
          <ProjectCard
            Name="Tic-Tac-Toe Game"
            ImageUrl={null}
            Url="https://tic-tac-toe-eight-gray-78.vercel.app"
          />
          <ProjectCard Name="Music App" ImageUrl={null} Url="" />
          {/* <ProjectCard Name="Todo App" ImageUrl={null} Url="" />
          <ProjectCard Name="Todo App" ImageUrl={null} Url="" />
          <ProjectCard Name="Todo App" ImageUrl={null} Url="" />
          <ProjectCard Name="Todo App" ImageUrl={null} Url="" />
          <ProjectCard Name="Todo App" ImageUrl={null} Url="" />
          <ProjectCard Name="Todo App" ImageUrl={null} Url="" /> */}
        </div>
      </div>
      <Footer className="footer-home" />
    </div>
  );
}
