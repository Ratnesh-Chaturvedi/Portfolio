import React, { useState,lazy,Suspense } from 'react'


import "remixicon/fonts/remixicon.css";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import SimplePreloader from './components/SimplePreloader';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


const Homepage = lazy(() => import("./pages/Homepage"));
const Aboutme = lazy(() => import("./pages/Aboutme"));
const Skillpage = lazy(() => import("./pages/Skillpage"));
const Project = lazy(() => import("./pages/Project"));
const Contact = lazy(() => import("./pages/Contact"));
const App = () => {
  

    useGSAP(() => {
      try {
        if (ScrollSmoother && typeof ScrollSmoother.create === "function") {
          ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
          });
        }
      } catch (e) {
        console.warn("ScrollSmoother:", e);
      }
    });

  return (
    <div id="smooth-wrapper" className="bg-[#09090D] min-h-screen text-[#F5F2FA]">
      <div id="smooth-content">
        <Suspense fallback={<SimplePreloader/>}>
          <Homepage />
          <Aboutme />
          <Skillpage />
          <Project />
          <Contact />
        </Suspense>
      </div>
    </div>
   
    
  
  )
}

export default App