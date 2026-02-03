import React from 'react';
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
const Navbar = () => {


 useGSAP(()=>{
let tl=gsap.timeline({
  delay:.1,
});
   tl.from(".navContainer",{
     y:-100,
     opacity:1,
     duration:.5,
     
    },)
    .from(".navContainer h1",{
     x:-10,
     opacity:0,
     duration:.1,
     stagger:true,
     
    },)
    
  })
   


  return (
    <div className=' navContainer w-full h-20 z-99 p-4 hidden lg:flex lg:items-center justify-left fixed ml-5  '>
      
      <div className=' w-[45%] h-[80%] bg-white/10 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-around p-2 '>
        <h1 className='text-white  text-2xl font-[lemonbold] font-bold cursor-pointer'>RC</h1>
       <div className='linksContainer flex items-center justify-center gap-5'>

        <h1 className='text-[#121111] text-2xl  font-[lekas] tracking-wide font-light cursor-pointer'>About</h1>
        <h1  className='text-[#121111] text-2xl  font-[lekas] font-light cursor-pointer'>Skills</h1>
        <h1  className='text-[#121111] text-2xl  font-[lekas] font-light cursor-pointer'>Projects</h1>
        <h1  className='text-[#121111] text-2xl  font-[lekas] font-light cursor-pointer'>Contact</h1>
       </div>
      </div>
    </div>
  );
}

export default Navbar;
