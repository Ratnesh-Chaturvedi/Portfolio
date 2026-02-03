import React, { useRef } from "react";

import projectData from "../assets/data/projectData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import ProjectCards from "../components/ProjectCards";
const Project = () => {
  useGSAP(() => {
    gsap.to(".projectPintext", {
      scrollTrigger: {
        trigger: ".projectContainer",
        start: "top top",
        end: "bottom 10%",
        pin: ".projectPintext",
        scrub: true,
      },
    });
  });

  return (
    <div className="projectContainer relative bg-[#E0E0E0] ">
      <p className="projectPintext absolute  text-[#f05038] font-[tango] text-xl top-4  left-4 z-10  ">
        #project
      </p>

      {projectData.map((item, idx) => (
        <ProjectCards key={idx} data={item} />
      ))}
    </div>
  );
};

export default Project;
