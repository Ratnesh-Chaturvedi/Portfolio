import {lazy,Suspense}from "react"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const  EmailForm =lazy(()=>import('../components/EmailForm')) 





const Contact = () => {
   
  useGSAP(()=>{
       

        ScrollTrigger.create({
          trigger:".contactContainer",
          start:"top 40%",
          end:"top 60%",
        
          scrub:1,
          animation:gsap.from(".textMsg ",{
            // yPercent:-10,
            opacity:0,
            stagger:1,
            rotateX:-100,
          })
        })
      

  })
 


  return (
    <div  className='contactContainer  min-w-screen min-h-screen   relative bg-[#E0E0E0] overflow-hidden'>
      <p className=" absolute  text-[#f05038] font-[tango] text-xl top-4  left-4 z-20">
        #contact
      </p>
      <div className="blobOuter absolute min-w-screen min-h-screen inset-0 m-auto  bg-transparent ">
        <div className="blobIneer absolute w-full h-full inset-0 m-auto blur-[100px] overflow-hidden rounded-full">
          <div className="blob absolute  w-full h-full inset-0 m-auto "></div>
        </div>
      </div>
      <div className='w-full h-full absolute z-10 flex flex-col  md:flex-row lg:p-10 sm:p-7 p-5 items-center '>
        <div className="textMsg block sm:flex md:flex-col flex-row   items-center md:items-start  sm:mt-10 mt-5 gap-2 sm:gap-10  ">
          <h1 className='lg:text-[10em]  text-5xl lg:leading-[.7em] font-[tango] text-[#3860f0] tracking-tight text-center hover:rotate-x-360 transition-all duration-1000 '>Lets's
            <br />
            <span className='font-[billiondream] tracking-wide text-[#f05438]'>Connect</span>
          </h1>
          <div className="socialLinks flex flex-col   text-[#121111] font-[lekas] lg:text-2xl sm:gap-0  ">
            <a className='hidden sm:block hover:rotate-x-360 transition-all duration-500' href="https://github.com/Ratnesh-Chaturvedi" target="_blank"   ><i className="ri-github-fill text-[#000000] "></i>Github</a>
            <a className='hidden sm:block hover:rotate-x-360 transition-all duration-500' href="https://www.linkedin.com/in/ratnesh-chaturvedi-80ab94289/"
            target="_blank"> <i className="ri-linkedin-box-fill text-[#249eef] "></i>LinkedIn</a>
            <a className='hidden sm:block hover:rotate-x-360 transition-all duration-500' href="https://x.com/ratnesh__16" target='_blank'> <i className="ri-twitter-x-fill text-black"></i>Twittter</a>
            <h1 className='hover:rotate-x-360 transition-all duration-500'><i className="ri-mail-line "></i>@chaturvediratnesh16@gmail.com</h1>
            <h1 className='hidden sm:block hover:rotate-x-360 transition-all duration-500'><i className="ri-building-2-line"></i>Ghaziabad, UP, India</h1>
          </div>
        </div>
        <div className='contactForm w-full h-full z-10  '>
     {/* Email form place */}
  <EmailForm className="emailForm"/>
        </div>
      
      </div>
    </div>
  )
}

export default Contact