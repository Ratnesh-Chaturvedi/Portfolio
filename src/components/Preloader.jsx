import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Preloader
 * 
 * Luxury Awwwards-Level Typographic Preloader:
 * - Signature "Driven by Curiosity" typographic lockup, perfectly proportioned for mobile and desktop.
 * - Mobile-first responsive scale: balanced typography that never overflows or feels oversized on small screens.
 * - Smooth parametric counter (0% -> 100%) with asset load synchronization.
 * - Dynamic status subtext: "Initializing Experience", "Synthesizing Architecture", "Welcome".
 * - High-end curtain split / slide-up reveal with GSAP power4.inOut easing.
 * - Automatically unmounts and cleans up when finished.
 */
const Preloader = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Experience...");

  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear natural loading curve
      const increment = Math.max(1, Math.floor(Math.random() * 8) + (current > 70 ? 2 : 4));
      current += increment;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setStatusText("Welcome.");
        setPercent(100);
      } else {
        if (current > 30 && current < 65) {
          setStatusText("Synthesizing Architecture & Assets...");
        } else if (current >= 65) {
          setStatusText("Synchronizing GSAP Motion Engine...");
        }
        setPercent(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Exit animation when percent reaches 100%
  useEffect(() => {
    if (percent !== 100) return;

    const tl = gsap.timeline({
      delay: 0.12,
      onComplete: () => {
        onComplete?.();
      },
    });

    // 1. Text & UI elements lift and fade
    tl.to(contentRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.35,
      ease: "power2.inOut",
    })
    // 2. Main curtain sweeps up effortlessly
    .to(
      preloaderRef.current,
      {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
      },
      "-=0.12"
    );
  }, [percent, onComplete]);

  return (
    <aside
      ref={preloaderRef}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[9999] bg-[#09090D] flex flex-col justify-between p-4 xs:p-6 sm:p-10 select-none overflow-hidden"
    >
      {/* Ambient Atmospheric Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[radial-gradient(circle,rgba(240,80,56,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

      {/* Top Header Ticker */}
      <div className="flex items-center justify-between text-[9px] sm:text-xs font-mono uppercase tracking-[0.22em] text-neutral-400">
        <span>RATNESH CHATURVEDI</span>
        <span className="hidden xs:inline">PORTFOLIO &copy;2026</span>
      </div>

      {/* Center Typographic Lockup */}
      <div ref={contentRef} className="my-auto flex flex-col items-center justify-center text-center px-2">
        
        {/* "Driven by Curiosity" Typography - Balanced Scale for Mobile & Desktop */}
        <h1 className="font-[tango] text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wide sm:tracking-wider leading-snug sm:leading-tight">
          <span>Driven</span>
          <span className="font-[billiondream] text-neutral-400 font-normal italic lowercase text-[1.15em] sm:text-[1.25em] mx-1.5 sm:mx-2 inline-block">
            by
          </span>
          <br className="sm:hidden" />
          <span className="text-[#f05038] drop-shadow-[0_0_25px_rgba(240,80,56,0.35)]">
            Curiosity
          </span>
        </h1>

        {/* Counter & Progress Line */}
        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2.5 sm:gap-3">
          
          <div className="text-base sm:text-xl font-mono font-bold text-white tracking-wider">
            {String(percent).padStart(2, "0")}%
          </div>

          {/* Minimalist Progress Track */}
          <div className="w-36 xs:w-44 sm:w-56 h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#f05038] via-white to-[#f05038] transition-all duration-100 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Subtext Status */}
          <p className="text-[9px] sm:text-[11px] font-mono text-neutral-400 uppercase tracking-[0.16em] transition-all duration-300">
            {statusText}
          </p>
        </div>

      </div>

      {/* Bottom Footer Details */}
      <div className="flex items-center justify-between text-[9px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f05038] animate-ping" />
          <span>SYSTEM READY</span>
        </div>
        <span>AI &bull; FULL-STACK</span>
      </div>
    </aside>
  );
};

export default Preloader;
