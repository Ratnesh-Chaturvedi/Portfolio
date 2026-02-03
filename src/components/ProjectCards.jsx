import {lazy}from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useRef } from "react";
import Button from "./Button";
const  projectData =lazy (()=>import('../assets/data/projectData.js')) 

const ProjectCards = ({ data }) => {
  const projectItem = useRef(null);
  const imgCont = useRef(null);
  const textArea = useRef(null);
  const projectImg = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // text animation
      ScrollTrigger.create({
        trigger: projectItem.current,
        start: "top 0%",
        end: "top 60%",
        scrub: 1,
        animation: gsap.from(textArea.current, {
          yPercent: -10,
          opacity: 0,
          rotateX: -100,
        }),
      });

      ScrollTrigger.create({
        trigger: projectItem.current,
        start: "top bottom",
        end: "top top",
        scrub: 0.5,
        animation: gsap.fromTo(
          imgCont.current,
          {
            clipPath: "polygon(25% 25%,75% 40%,100% 100%,0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            ease: "none",
          },
        ),
      });
      gsap.set(imgCont.current, {
        clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)",
      });

      ScrollTrigger.create({
        trigger: projectItem.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 0.5,
        animation: gsap.fromTo(
          imgCont.current,
          {
            clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%,100% 0%,75% 60%,25% 75%)",
            ease: "none",
          },
        ),
      });
    },
    { scope: projectItem },
  );

  const textAreaMouseEnter = () => {
    gsap.to(projectImg.current, {
      filter: "blur(8px)",
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const textAreaMouseOut = () => {
    gsap.to(projectImg.current, {
      filter: "blur(0px)",
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={projectItem}
      className="projectItems w-full h-full bg-[#121111]  p-2"
    >
      <div
        ref={imgCont}
        className="w-full h-dvh relative p-2 "
        style={{ clipPath: "polygon(25% 25%,75% 40%,100% 100%,0% 100%)" }}
      >
        <div
          ref={textArea}
          onMouseEnter={textAreaMouseEnter}
          onMouseLeave={textAreaMouseOut}
          className="textArea absolute w-full  flex flex-col items-center justify-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] gap-2  pointer-events-auto z-100   "
        >
          <h1
            className="text-[#121111] px-4 py-2 rounded-full font-[tango] border-2 border-[#f05038] text-center hover:bg-[#f05038] hover:text-white transition-all duration-200"
            style={{ fontSize: "clamp(1.5rem, 5vw, 6rem)" }}
          >
            {data.title}
          </h1>
          <div className="links flex items-center justify-center gap-10 ">
            <Button
              link={data.codeDemo}
              icon={
                <i className="ri-code-s-slash-line font-bold rounded-full    tracking-wide" />
              }
              content="Code"
            />

            <Button
              link={data.liveDemo}
              icon={<i className="ri-code-s-slash-line font-bold" />}
              content="Live"
            />
          </div>
          <div className="toolsUsed flex flex-wrap items-center justify-center    ">
            {data.skill.map((item,idx) => (
              <div key={idx} className="rounded-full px-2 py-1 text-xl border-2 border-[#f05038] text-[#121111] text-center font-[lekas]  m-2 hover:text-white hover:bg-[#f05038] transition-all duration-200" >
                {item}
              </div>
            ))}
          </div>
        </div>
        <img
          ref={projectImg}
          src={`${data.projectImage}`}
          style={{ filter: "blur(0px)" }}
          className=" w-full h-full object-cover" loading="lazy"
          alt=""
        />
      </div>
    </div>
  );
};

export default ProjectCards;
