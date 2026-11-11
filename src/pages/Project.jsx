import React from "react";
import projectData from "../assets/data/projectData";
import ProjectCards from "../components/ProjectCards";

const Project = () => {
  return (
    <div id="projects" className="projectContainer relative bg-[#E0E0E0]">
      {projectData.map((item, idx) => (
        <ProjectCards key={idx} data={item} />
      ))}
    </div>
  );
};

export default Project;
