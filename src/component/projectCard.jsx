import React from "react";

export default function ProjectCard({ Name, Url, ImageUrl }) {
  return (
    <div className="project-card-wrapper">
      <div className="project-card-image">
        <img src={ImageUrl} alt="project-image" />
      </div>
      <div className="project-card-title">
        <h3>{Name}</h3>
      </div>
      <div className="project-card-action">
        <a href={Url}>Visit</a>
      </div>
    </div>
  );
}
