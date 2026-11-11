import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import EmailForm from "../components/EmailForm";

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact Page
 * 
 * High-End Awwwards & Pinterest Level Editorial Contact Section:
 * - Seamlessly integrates with the dark obsidian (#09090D) aesthetic of the portfolio.
 * - Dynamic atmospheric lighting with subtle warm coral rays and ambient violet depth.
 * - Monumental typography: Tango display heading with BillionDream cursive accent word.
 * - Interactive direct connection hub: Click-to-copy email with visual feedback pill,
 *   real-time dynamic IST local clock, and magnetic brand cards.
 * - Luxury macOS terminal contact form with zero raw alerts and real-time validation.
 * - Minimalist editorial footer bar with smooth back-to-top navigation.
 */
const Contact = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Real-time ticking IST clock (UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // One-click email copy with tactile feedback
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("chaturvediratnesh16@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Smooth scroll back to top of portfolio
  const handleScrollToTop = () => {
    try {
      const smoother = ScrollSmoother?.get?.();
      if (smoother && typeof smoother.scrollTo === "function") {
        smoother.scrollTo(0, true);
        return;
      }
    } catch {
      // Fallback
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // GSAP Entrance ScrollTrigger Animation
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".contact-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      }).from(
        rightColRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#09090D] text-[#F5F2FA] overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-10 flex flex-col justify-between border-t border-white/[0.07] select-none"
    >
      {/* =========================================================================
          ATMOSPHERIC LIGHTING & PATTERNS
          ========================================================================= */}
      {/* Warm Ambient Coral Glow from Top-Left */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(240,80,56,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

      {/* Violet / Indigo Ambient Glow on Bottom-Right */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none -z-10" />

      {/* Fine Dotted Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none -z-10" />

      {/* =========================================================================
          MAIN CONTACT CONTAINER
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-auto flex-1 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* -----------------------------------------------------------------------
              LEFT COLUMN: Editorial Identity, Pitch, Direct Info & Social Hub (7 cols)
              ----------------------------------------------------------------------- */}
          <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8">
            
            {/* Status Eyebrow Badge */}
            <div className="contact-reveal flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] font-medium text-neutral-300">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </div>

            {/* Monumental Editorial Headline */}
            <div className="contact-reveal">
              <h2 className="font-[tango] text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white tracking-tight leading-[1.08] drop-shadow-sm">
                Let's build <br />
                something{" "}
                <span className="font-[billiondream] text-[#f05038] text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-normal inline-block lowercase font-normal -rotate-2 ml-1">
                  meaningful.
                </span>
              </h2>

              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-xl">
                Have an engineering opportunity, a web project, or an idea waiting to be built? My inbox is always open for ambitious teams, collaborative creators, and tech innovators.
              </p>
            </div>

            {/* Interactive Quick-Connect Cards (Pinterest / Editorial Style) */}
            <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
              
              {/* Card 1: Direct Email with 1-Click Copy */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300 group flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                    Direct Email
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded-md text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    <i className={copied ? "ri-check-line text-emerald-400 text-sm font-bold" : "ri-file-copy-line text-sm"} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:chaturvediratnesh16@gmail.com"
                    className="text-xs sm:text-sm font-mono text-white group-hover:text-[#f05038] transition-colors truncate"
                  >
                    chaturvediratnesh16@gmail.com
                  </a>
                  <a
                    href="mailto:chaturvediratnesh16@gmail.com"
                    className="text-neutral-500 group-hover:text-white transition-colors shrink-0"
                  >
                    <i className="ri-arrow-right-up-line text-sm" />
                  </a>
                </div>

                {copied && (
                  <span className="text-[10px] font-mono text-emerald-400 mt-1">
                    ✓ Copied to clipboard
                  </span>
                )}
              </div>

              {/* Card 2: Location & Real-Time IST Clock */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                    Location &amp; Time
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-white font-medium">
                    Ghaziabad / Delhi NCR, India
                  </p>
                  <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    {currentTime ? `${currentTime} IST` : "UTC +5:30"}
                  </p>
                </div>
              </div>

            </div>

            {/* Social Network Ecosystem (Pinterest Aesthetic) */}
            <div className="contact-reveal pt-1">
              <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400 mb-2.5">
                Connect on Channels
              </span>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* GitHub */}
                <a
                  href="https://github.com/Ratnesh-Chaturvedi"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/25 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-sm"
                >
                  <i className="ri-github-fill text-sm" />
                  <span>GitHub</span>
                  <i className="ri-arrow-right-up-line text-[10px] text-neutral-500" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ratnesh-chaturvedi-80ab94289/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-[#0a66c2]/60 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-sm"
                >
                  <i className="ri-linkedin-box-fill text-sm text-[#0a66c2]" />
                  <span>LinkedIn</span>
                  <i className="ri-arrow-right-up-line text-[10px] text-neutral-500" />
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com/ratnesh__16"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/25 text-neutral-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-sm"
                >
                  <i className="ri-twitter-x-fill text-sm" />
                  <span>Twitter / X</span>
                  <i className="ri-arrow-right-up-line text-[10px] text-neutral-500" />
                </a>
              </div>
            </div>

          </div>

          {/* -----------------------------------------------------------------------
              RIGHT COLUMN: Luxury macOS Terminal Email Form (5 cols)
              ----------------------------------------------------------------------- */}
          <div ref={rightColRef} className="lg:col-span-5 w-full">
            <EmailForm />
          </div>

        </div>

      </div>

      {/* =========================================================================
          EDITORIAL FOOTER BAR
          ========================================================================= */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12 sm:mt-16 pt-5 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
        
        {/* Left: Copyright & Stack Info */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Ratnesh Chaturvedi</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">Engineered with React, GSAP &amp; Tailwind</span>
        </div>

        {/* Right: Smooth Back to Top Button */}
        <button
          onClick={handleScrollToTop}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer group py-1"
        >
          <span>Back to Top</span>
          <i className="ri-arrow-up-line text-sm transition-transform group-hover:-translate-y-0.5" />
        </button>
      </footer>
    </section>
  );
};

export default Contact;
