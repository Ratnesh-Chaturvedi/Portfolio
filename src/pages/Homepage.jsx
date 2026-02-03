import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Homepage = () => {
  
  useGSAP(() => {
    let tl = gsap.timeline({});
    tl.from(".mypic", {
      opacity: 0,
      scale: 2,
      duration: 1,
      ease: "expoScale(0.5,7,none)",
      backgroundColor: "black",
    });

    tl.from(".hellotext", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: {
        attr: "text",
      },
    });
    tl.from(
      ".marquee ",
      {
        opacity: 0,
        stagger: 0.1,
      },
      "Same",
    );
    tl.from(
      ".righttop h1",
      {
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.5,
      },
      "even",
    );

    tl.from(
      ".bottomtext a",
      {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.3,
      },
      "even",
    );

    let herotl = gsap.timeline({
      scrollTrigger: {
        trigger: ".heroContainer",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".mypic",{
      scrollTrigger:{
        trigger:".heroContainer",
        start:"top top",
        end:"bottom top",
        pin:".mypic",
        scrub:true,
      }
    })    
  });

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useGSAP(() => {
    
    gsap.to(slider.current, {
    
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
      
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-600px",
    });
    requestAnimationFrame(animate);
  });

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
   
    <div className="heroContainer w-full h-dvh relative overflow-hidden  bg-[#E0E0E0] bg-fixed z-10">
      <div className="blobOuter absolute w-dvw h-dvh inset-0 m-auto  bg-transparent ">
        <div className="blobIneer absolute w-full h-full inset-0 m-auto blur-[100px] overflow-hidden rounded-full">
          <div className="blob absolute  w-full h-full inset-0 m-auto "></div>
        </div>
      </div>
      <div className="absolute inset-0 z-20 ">
        <h1 className="hellotext overflow-hidden text-[#121111]  text-5xl sm:text-7xl font-[billiondream] absolute top-[50%] sm:bottom-[30%] sm:top-[20%] left-[10%] sm:left-[10%] ">
          Hello
          <span className="block text-[#3291B6]">I'm</span>
        </h1>

        {/* MARQUEE */}
        <div className="absolute lg:bottom-10 sm:bottom-15  bottom-10 w-full overflow-hidden  ">
          <div ref={slider} className="marquee flex w-max  relative whitespace-nowrap ">
            <h1
              ref={firstText}
              className="marquee-text text-[10em]  lg:text-[15em]  font-[tango] pr-20  text-[#121111]   "
            >
              Ratnesh Chaturvedi-
            </h1>
            <h1
              ref={secondText}
              className="marquee-text text-[10em] lg:text-[15em] font-[tango] font-extralight  pr-20  text-[#121111] "
            >
              Ratnesh Chaturvedi-
            </h1>
          </div>
        </div>

        <div className="rightext ">
          <div className="righttop absolute lg:right-10 lg:top-15 right-0 top-[50%]  md:top-[25%]  sm:top-[30%] leading-tight ">
            <h1 className="text-[#121111] font-[lekas] text-4xl sm:text-4xl md:text-6xl  lg:text-[3em] ">
              Web
              <span className="font-[billiondream] text-[#3291B6]">
                Developer
              </span>
            </h1>

            <h1 className="text-[#121111] font-[lekas] text-4xl sm:text-4xl md:text-6xl lg:text-[3em]">
              Problem
              <span className="font-[billiondream] text-[#3291B6]">Solver</span>
            </h1>
          </div>
        </div>
        <div className="bottomtext absolute sm:bottom-5 left-10 bottom-5  text-3xl font-[tango] sm:flex lg:flex-col md:justify-center  sm:items-start gap-10 sm:gap-10 lg:leading-1">
          <a
            href="https://www.linkedin.com/in/ratnesh-chaturvedi-80ab94289/"
            target="_blank"
            
          >
            <i className="ri-linkedin-box-fill text-[#249eef] "></i>{" "}
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="https://github.com/Ratnesh-Chaturvedi" target="_blank">
            <i className="ri-github-fill text-[#000000]"></i>{" "}
            <span className="hidden sm:inline">Github</span>
          </a>
          <a href="https://x.com/ratnesh__16" target="_blank">
            <i className="ri-twitter-x-fill text-black"></i>{" "}
            <span className="hidden sm:inline">Twitter/X</span>
          </a>
        </div>
      </div>
      <img
        className="mypic absolute inset-0  h-full w-full object-cover  z-10    "
        src="src/assets/pic2.png "
      />
    </div>
  );
};

export default Homepage;
