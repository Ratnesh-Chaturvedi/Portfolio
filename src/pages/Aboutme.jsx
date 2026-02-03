import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";

 const Aboutme = () => {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ptext1 = SplitText.create(".paratext1", {
      type: "words",
    });
    const ptext2 = SplitText.create(".paratext2", {
      type: "words",
    });
    const ptext3 = SplitText.create(".paratext3", {
      type: "words",
    });
  

    let tl = gsap.timeline({
      delay: 0.1,

      scrollTrigger: {
        trigger: ".container",
        start: "top center",
        end: "bottom bottom",
        scrub: true,
        
      },
    });
    tl.to(ptext1.words, {
      color: "white",
      ease: "power1.in",
      stagger: 1,
    })
      .to(ptext2.words, {
        color: "#f05038",
        ease: "power1.in",
        stagger: 1,
      })
      .to(ptext3.words, {
        color: "white",
        ease: "power1.in",
        stagger: 1,
        
      },"same")
    
      .from(".paratext4",{
        yPercent:-10,
        opacity:0,
        duration:1,
        stagger:1,
        ease: "linear",
      
      })
      
      gsap.to(".pintext",{
      
        scrollTrigger:{
          trigger:".container",
          start:"top top",
          end:"bottom 10%",
          scrub:true,
          pin:".pintext",
          
        
        }
      })
  },[]);

  return (
    
     
    <div  className="container h-fit relative min-w-full  border-b-3 border-[#222020] z-10 overflow-hidden ">
      <p className="pintext absolute  text-[#f05038] font-[tango] text-xl top-4  left-4 z-10">
        #intro
      </p>
      <div className="paratext text-center px-10   w-full  md:leading-15 md:pl-30 pt-20  font-[tango]   md:text-[3.5em]  text-3xl text-[#222020]  ">
        <p className="paratext1 inline ">
        3rd-year B.Tech CSE student building {" "}
        </p>
        <p className="paratext2 inline ">
          Modern,Creative,and Interactive web experiences. {" "}
        </p>
        <p className="paratext3 inline"><span> </span>
        Full-stack developer crafting unique frontends with GSAP & Framer Motion. 
        </p>
      </div>
      <div className="paratext4 mt-10 sm:mt-30    p-2  w-dvw   text-[#3291B6]  sm:text-xl font-[tango] tracking-wide md:flex md:flex-col sm:gap-4 text-center md:items-center ">
        <p>"Open to exciting opportunities in web and software development, ready to build impactful projects." </p>
        <Button content="Download Resume" link="/r.pdf" className="mt-5 sm:mt-5  "/>
      </div>
     
    </div>

  );
};
export default Aboutme;