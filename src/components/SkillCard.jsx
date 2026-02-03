import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const SkillCard = ({ title, color, children,bghover }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  
  useGSAP(() => {
   
    let tl=gsap.timeline({
      opacity:0,
     scrollTrigger: {
          trigger: cardRef.current,
          start: "top 60%",   
        },
    })
    tl.to(cardRef.current,{
      opacity:1,
      duration:.2,
      ease:"power1.out"
    })
  
    tl.from(cardRef.current.querySelectorAll(".childContainer img"),{
      opacity:0,
      yPercent:-10,
      stagger:.1,
      scale:1.1,
      
    })
   
  }, { scope: cardRef });

 
  

  return (
    <section
      ref={cardRef}
      className={`relative w-full rounded-2xl bg-[#121111] p-4 sm:p-6 border-2 border-amber-100 transition-all opacity-0`}
    >
      <div
        ref={textRef}
        className={`absolute -top-4 left-4 rounded-lg px-3 py-1 ${color}`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <h2 className="font-[tango] text-sm sm:text-lg md:text-2xl text-[#121111]">
          {title}
        </h2>
      </div>

      <div className="childContainer mt-6 flex flex-wrap items-center justify-center gap-4">
        {children}
      </div>
    </section>
  );
};

export default SkillCard;
