import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { motion as Motion, AnimatePresence } from "motion/react";
import Button from "../components/Button";

/**
 * Words to animate in sequence:
 * intelligent -> thoughtful -> meaningful -> creative -> impactful
 */
const WORDS = ["intelligent", "thoughtful", "meaningful", "creative", "impactful"];

/**
 * Homepage
 * 
 * High-end editorial portfolio hero:
 * - Fully responsive across mobile (320px–430px), tablets, and ultrawide screens
 * - Fluid typography scaling so headline never overflows on small viewports
 * - Dark atmospheric obsidian background with volumetric warm sunlight ray streaming diagonally from top-left
 * - Ambient indigo/violet glow on the right
 * - Completely static "I build" and "things that feel human."
 * - Reduced line gap with tight editorial leading
 * - Dynamic words colored in signature #intro (#f05038)
 * - Attached, refined small status badge directly above headline
 * - Full text selection enabled
 * - Vertical slide-up transition with slight blur-to-sharp on the highlighted word
 * - Reusable creative magnetic Button component used across the page
 * - Staggered bouncy popup entrance animation for all social media icons using GSAP
 * - Magnetic interactive hover on social icons
 */
const Homepage = () => {
  const containerRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Smooth scroll handler compatible with GSAP ScrollSmoother and native scrolling
  const handleScroll = (e, targetId) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();

    // Ensure internal containers are never scrolled natively by accidental browser jumps
    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");
    if (wrapper && wrapper.scrollTop !== 0) wrapper.scrollTop = 0;
    if (content && content.scrollTop !== 0) content.scrollTop = 0;

    // Return to top handler
    if (targetId === "#home" || targetId === "top") {
      try {
        const smoother = ScrollSmoother.get();
        if (smoother && typeof smoother.scrollTo === "function") {
          smoother.scrollTo(0, true);
          return;
        }
      } catch {
        // Fallback
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    try {
      const smoother = ScrollSmoother.get();
      if (smoother && typeof smoother.scrollTo === "function") {
        // Use smoother.scrollTo with exact position matching
        smoother.scrollTo(target, true, "top top");
        return;
      }
    } catch {
      // Fallback
    }

    // Safe fallback without calling scrollIntoView (which pollutes container.scrollTop)
    const targetY = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Magnetic cursor tracking for circular social icons
  const handleSocialMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    gsap.to(el, {
      x: deltaX * 0.45,
      y: deltaY * 0.45,
      scale: 1.15,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleSocialMouseLeave = (e) => {
    const el = e.currentTarget;
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  // Rotate highlighted words: 620ms transition duration + 2200ms pause = 2820ms cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2820);

    return () => clearInterval(timer);
  }, []);

  // Staggered entrance animation with bouncing popup for social media icons
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".sunlight-ray-wrapper", {
        opacity: 0,
        duration: 1.6,
        ease: "power2.inOut",
      })
        .from(
          ".nav-bar",
          {
            y: -25,
            opacity: 0,
            duration: 0.8,
          },
          "-=1.1"
        )
        .from(
          ".hero-content",
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".bottom-bar",
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.5"
        )
        .fromTo(
          ".social-popup-item",
          {
            scale: 0,
            opacity: 0,
            y: 32,
            transformOrigin: "50% 50%",
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "back.out(2.4)",
            stagger: 0.14,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen min-h-[100dvh] bg-[#070709] text-white overflow-x-hidden flex flex-col justify-between"
    >
      {/* =========================================================================
          SLENDER FOCUSED VOLUMETRIC SUNLIGHT RAY FROM TOP-LEFT (#f05038 / amber)
          Hardware-accelerated with zero runtime blur filters for maximum 120fps smoothness
          ========================================================================= */}
      <div className="sunlight-ray-wrapper absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[4]">
        
        {/* Volumetric Warm Light Beam (Smooth GPU gradient, zero raster blur) */}
        <div
          className="absolute -top-10 -left-10 w-[120vw] h-[100vh] origin-top-left pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at 10% 0%,
                rgba(255, 230, 205, 0.22) 0%,
                rgba(240, 80, 56, 0.14) 28%,
                rgba(235, 100, 55, 0.05) 55%,
                transparent 72%
              )
            `,
            mixBlendMode: "screen",
          }}
        />

        {/* Diagonal Light Stream */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(240, 80, 56, 0.12) 0%,
                rgba(255, 200, 160, 0.06) 30%,
                transparent 60%
              )
            `,
          }}
        />
      </div>

      {/* Ambient Deep Violet & Warm Peach Backdrop Glows for a Rich, Fulfilled Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(139,92,246,0.12)_0%,rgba(96,165,250,0.04)_45%,transparent_75%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,rgba(240,80,56,0.10)_0%,rgba(255,190,150,0.04)_45%,transparent_70%)] pointer-events-none z-0" />

      {/* =========================================================================
          1. TOP NAVIGATION BAR (RATNESH & REUSABLE MAGNETIC BUTTON)
          ========================================================================= */}
      <header className="nav-bar relative z-30 w-full px-6 sm:px-12 md:px-16 lg:px-20 pt-7 sm:pt-8 pb-3 sm:pb-4">
        <div className="max-w-[1560px] mx-auto flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "#home")}
            className="font-headline font-bold text-xl sm:text-2xl tracking-[0.14em] text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            RATNESH
          </a>

          {/* Reusable Magnetic Button */}
          <div className="flex items-center">
            <Button
              content="LET'S TALK"
              link="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              variant="outline"
              size="xs"
              icon={<span className="text-xs">↗</span>}
              fillColor="#f05038"
            />
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. MAIN HERO SECTION (Harmonious, Fulfilled Layout with Commanding Presence)
          ========================================================================= */}
      <main className="hero-content relative z-20 w-full px-6 sm:px-12 md:px-16 lg:px-20 my-auto py-6 sm:py-8">
        <div className="max-w-[1560px] mx-auto">
          
          {/* Refined Category / Status Badge: Scaled and cleanly attached */}
          <div className="flex items-center gap-2 mb-3.5 sm:mb-4 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f05038] shadow-[0_0_8px_rgba(240,80,56,0.9)] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.24em] text-[#a8a3b8] uppercase font-medium truncate sm:whitespace-normal">
              INDEPENDENT DEVELOPER / AI × FULL-STACK
            </span>
          </div>

          {/* Main Headline: Bold, commanding presence calibrated to 2 lines without wrapping */}
          <h1
            style={{ fontSize: "clamp(2.15rem, 7.6vw, 6.2rem)" }}
            className="font-headline font-bold tracking-tight text-white leading-[1.04] sm:leading-[0.98]"
          >
            {/* Line 1: Completely static "I build " + vertical sliding highlighted word */}
            <div className="flex items-baseline flex-nowrap whitespace-nowrap">
              <span className="shrink-0">I build&nbsp;</span>
              <Motion.span
                layout
                transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                className="relative inline-flex items-baseline overflow-hidden h-[1.14em] -my-[0.06em] align-baseline"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <Motion.span
                    key={WORDS[wordIndex]}
                    layout="position"
                    initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
                    transition={{
                      duration: 0.62,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-editorial italic font-normal tracking-normal pr-2.5 sm:pr-3.5 hero-word-intro will-change-transform inline-block"
                  >
                    {WORDS[wordIndex]}
                  </Motion.span>
                </AnimatePresence>
              </Motion.span>
            </div>

            {/* Line 2: Completely static "things that feel human." - strictly 1 line */}
            <div className="block whitespace-nowrap mt-0.5 sm:-mt-1 md:-mt-1.5">
              things that feel human<span className="text-[#f05038]">.</span>
            </div>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-5 sm:mt-6 text-xs xs:text-sm sm:text-base md:text-lg text-[#9e9aa8] max-w-lg font-body font-normal leading-relaxed">
            Turning curious ideas into thoughtful digital products —<br className="hidden sm:inline" />
            from AI-powered systems to full-stack experiences.
          </p>

          {/* CTA Buttons: Generous spacing and refined presence */}
          <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row sm:items-center items-start gap-4 sm:gap-7">
            {/* Primary Action Button: EXPLORE MY WORK */}
            <Button
              content="EXPLORE MY WORK"
              link="#projects"
              onClick={(e) => handleScroll(e, "#projects")}
              variant="primary"
              size="sm"
              icon={<span className="text-[10px] sm:text-xs">↗</span>}
            />

            {/* Secondary Action: MORE ABOUT ME */}
            <Button
              content="MORE ABOUT ME"
              link="#about"
              onClick={(e) => handleScroll(e, "#about")}
              variant="text"
              size="sm"
              icon={<span className="text-[10px] sm:text-xs transition-transform duration-200 group-hover:translate-x-1.5">→</span>}
            />
          </div>

          {/* Availability Status Badge */}
          <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_#10b981,0_0_3px_#34d399] shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase text-neutral-400">
              OPEN TO INTERESTING OPPORTUNITIES
            </span>
          </div>

        </div>
      </main>

      {/* =========================================================================
          3. BOTTOM BAR (Socials, Scroll, Email)
          ========================================================================= */}
      <footer className="bottom-bar relative z-30 w-full px-5 xs:px-6 sm:px-12 md:px-16 lg:px-20 pb-5 sm:pb-7 pt-3 sm:pt-4">
        {/* Subtle Horizontal Divider Line */}
        <div className="w-full h-[1px] bg-white/[0.08] mb-4 sm:mb-5" />

        <div className="max-w-[1560px] mx-auto flex items-center justify-between">
          
          {/* Bottom Left: Social Media Links with Bouncing Pop-up & Magnetic Hover */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-400">
            <a
              href="https://www.linkedin.com/in/ratnesh-chaturvedi-80ab94289/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              onMouseMove={handleSocialMouseMove}
              onMouseLeave={handleSocialMouseLeave}
              className="social-popup-item w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#f05038] hover:bg-[#f05038] flex items-center justify-center hover:text-white transition-colors duration-300 will-change-transform shadow-sm"
              title="LinkedIn"
            >
              <i className="ri-linkedin-fill text-xs sm:text-sm"></i>
            </a>
            <a
              href="https://github.com/Ratnesh-Chaturvedi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              onMouseMove={handleSocialMouseMove}
              onMouseLeave={handleSocialMouseLeave}
              className="social-popup-item w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#f05038] hover:bg-[#f05038] flex items-center justify-center hover:text-white transition-colors duration-300 will-change-transform shadow-sm"
              title="GitHub"
            >
              <i className="ri-github-fill text-xs sm:text-sm"></i>
            </a>
            <a
              href="https://x.com/ratnesh__16"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter/X Profile"
              onMouseMove={handleSocialMouseMove}
              onMouseLeave={handleSocialMouseLeave}
              className="social-popup-item w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#f05038] hover:bg-[#f05038] flex items-center justify-center hover:text-white transition-colors duration-300 will-change-transform shadow-sm"
              title="Twitter/X"
            >
              <i className="ri-twitter-x-fill text-xs sm:text-sm"></i>
            </a>
          </div>

          {/* Bottom Right: Email Icon with Bouncing Pop-up & Magnetic Hover */}
          <div className="flex items-center text-neutral-400">
            <a
              href="mailto:chaturvediratnesh16@gmail.com"
              aria-label="Send Email"
              onMouseMove={handleSocialMouseMove}
              onMouseLeave={handleSocialMouseLeave}
              className="social-popup-item w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#f05038] hover:bg-[#f05038] flex items-center justify-center hover:text-white transition-colors duration-300 will-change-transform shadow-sm"
              title="Email: chaturvediratnesh16@gmail.com"
            >
              <i className="ri-mail-line text-xs sm:text-sm"></i>
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Homepage;
