import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

const ProjectCard = () => {
  
  useGSAP(()=>{
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".projectCards").forEach((card)=>{
    gsap.to(card,{
      scale:.9,
      opacity:0,
      scrollTrigger:{
        trigger:card,
        start:"top 10%",
        end:"bottom 0%",
        scrub:true,
        pin:true,

      }
    })
  })
})

  return (
    <section className="cardContainer w-full  flex flex-col gap-10   items-center  md:px-5 px-2  ">
      
      {projectData.map((item, idx) => (
        <div
          key={idx}
          className="projectCards   w-full h-full rounded-4xl md:p-4 p-2  flex flex-col md:flex-row gap-5 bg-[#121111] shadow-lg shadow-[#2c2b2b] "
        >
          <div className="imagePart  bg-amber-300 md:w-[60%] w-full md:h-full h-full border-2  border-gray-400 rounded-3xl overflow-hidden  ">
            <img
              className="w-full h-full object-cover"
              src={item.projectImage}
              alt={item.title}
            />
             
          </div>

          <div className="texts md:w-[40%] w-full text-gray-300 rounded-2xl md:p-10 p-5 flex flex-col gap-10 justify-between border-2 border-gray-400 bg-[#121111] ">
            <div className="heading">
              <h1 className="md:text-7xl text-4xl font-[tango] md:font-extrabold tracking-wide">
                {item.title}
              </h1>
            </div>

            <div className="textcontent flex flex-col md:gap-5 bg-[#121111]">
            
              <div className="desc md:p-2 sm:block hidden">
              
                <p className="text-xl md:text-2xl font-[tango] font-extralight">
                  {item.projectDesc}
                </p>
              </div>
              <div className="skills flex gap-2 md:gap-4 flex-wrap">
                  <a href={`${item.liveDemo}`} target="_blank" className='text-xl px-3 py-1 w-fit border-2 rounded-full   font-[tango] gap-2 flex md:flex-row text-[#f05038] cursor-pointer '>
              <i className="ri-code-s-slash-line font-bold rounded-full  text-white  tracking-wide"></i>Code
              </a>
                  <a href={`${item.codeDemo}`} target="_blank" className='text-xl px-3 py-1 w-fit border-2 rounded-full   font-[tango] gap-2 flex md:flex-row text-[#3291B6] cursor-pointer'>
              <i className="ri-sword-fill font-bold rounded-full  text-white  tracking-wide"></i>Live
              </a>
                {item.skill?.map((skillItem, i) => (
                  <span
                    key={i}
                    className="rounded-full border-2 px-3 py-1 font-[tango]"
                  >
                    {skillItem}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </section>
  )
}

export default ProjectCard
