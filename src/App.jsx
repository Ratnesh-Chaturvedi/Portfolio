import React, { useEffect, useState } from 'react';
import "remixicon/fonts/remixicon.css";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import Preloader from "./components/Preloader";
import Homepage from "./pages/Homepage";
import Aboutme from "./pages/Aboutme";
import Skillpage from "./pages/Skillpage";
import Project from "./pages/Project";
import Contact from "./pages/Contact";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useGSAP(() => {
    try {
      if (ScrollSmoother && typeof ScrollSmoother.create === "function") {
        ScrollSmoother.create({
          smooth: 1.0, // Silky smooth without floaty input lag
          smoothTouch: 0.1, // Direct, instant response on mobile touch
          effects: true,
          normalizeScroll: true, // Eliminates mobile URL-bar jitter
        });
      }
    } catch (e) {
      console.warn("ScrollSmoother:", e);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    // Lock pin & scroll coordinates once preloader curtain finishes exit
    ScrollTrigger.refresh();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div id="smooth-wrapper" className="bg-[#09090D] min-h-screen text-[#F5F2FA]">
        <div id="smooth-content">
          <Homepage />
          <Aboutme />
          <Skillpage />
          <Project />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default App;
