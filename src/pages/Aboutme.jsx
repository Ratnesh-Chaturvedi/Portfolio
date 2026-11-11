import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 3 sequential paragraph parts with selective cursive formatting on valuable keywords
const wordsPart1 = [
  { text: "4th-year", isCursive: false },
  { text: "B.Tech", isCursive: false },
  { text: "CSE", isCursive: false },
  { text: "student", isCursive: false },
  { text: "building", isCursive: false },
];

const wordsPart2 = [
  { text: "Modern,", isCursive: false },
  { text: "Creative,", isCursive: true },
  { text: "Intelligent", isCursive: false },
  { text: "and", isCursive: false },
  { text: "Interactive", isCursive: true },
  { text: "web", isCursive: false },
  { text: "experiences.", isCursive: false },
];

const wordsPart3 = [
  { text: "Full-stack", isCursive: false },
  { text: "AI", isCursive: false },
  { text: "Powered", isCursive: false },
  { text: "developer", isCursive: false },
  { text: "crafting", isCursive: true },
  { text: "unique", isCursive: false },
  { text: "frontends", isCursive: false },
  { text: "and", isCursive: false },
  { text: "Scalable", isCursive: false },
  { text: "backends", isCursive: false },
  { text: "with", isCursive: false },
  { text: "technologies.", isCursive: false },
];

/**
 * Aboutme Section (#intro)
 * 
 * Features:
 * - Pinned #intro tag moving animation matching #skills:
 *   Uses ScrollTrigger.create with `pinSpacing: false`, `start: "top top"`, `end: "bottom 10%"`
 *   so #intro stays pinned at the top-left while section content scrolls under it.
 * - Word-by-word illuminated text reveal on scroll:
 *   1. Part 1 words illuminate to crisp white
 *   2. Part 2 words illuminate with cursive keywords ("Creative,", "Interactive") in #f05038 highlight color
 *   3. Part 3 words illuminate with cursive keyword ("crafting") in #f05038 highlight color
 *   4. Bottom-left content (quote + Download Resume button) smoothly fades and slides up into view
 */
const Aboutme = () => {
  const containerRef = useRef(null);
  const bottomLeftRef = useRef(null);

  useGSAP(
    () => {
      // Sequential word-by-word illuminated text reveal as user scrolls
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.5,
        },
      });

      // Part 1: illuminate to crisp white
      tl.to(".about-word-1", {
        color: "#ffffff",
        stagger: 0.08,
        ease: "power1.inOut",
      })
        // Part 2: cursive words illuminate to #f05038 highlight color, others to white
        .to(".about-word-2", {
          color: (i, target) =>
            target.classList.contains("about-cursive") ? "#f05038" : "#ffffff",
          stagger: 0.08,
          ease: "power1.inOut",
        })
        // Part 3: cursive words illuminate to #f05038 highlight color, others to white
        .to(".about-word-3", {
          color: (i, target) =>
            target.classList.contains("about-cursive") ? "#f05038" : "#ffffff",
          stagger: 0.08,
          ease: "power1.inOut",
        })
        // Bottom-left reveal: quote + Download Resume button appears
        .fromTo(
          bottomLeftRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="introContainer relative w-full min-h-[120vh] lg:min-h-[135vh] bg-[#070709] text-white border-b border-[#222020] flex flex-col justify-between"
    >
      {/* Ambient warm atmospheric glow on the right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_35%,rgba(240,80,56,0.07)_0%,transparent_65%)] pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 pt-10 sm:pt-16 lg:pt-14 pb-8 sm:pb-12 lg:pb-14 flex-1 flex flex-col justify-between">
        
        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 flex-1 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN (Desktop) / BOTTOM CONTENT (Mobile):
              Quote & Download Resume Button
              ========================================================================= */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-end z-10 pb-2 lg:pb-6">
            <div
              ref={bottomLeftRef}
              className="bottom-left-content max-w-md flex flex-col items-start gap-4 sm:gap-6 will-change-transform"
            >
              <p className="text-[#3291B6] font-[tango] text-base sm:text-lg md:text-xl font-medium tracking-wide leading-relaxed">
                "Open to exciting opportunities in web and software development, ready to build impactful projects."
              </p>

              <Button
                content="DOWNLOAD RESUME"
                hoverContent="GET RESUME ↗"
                link="/myresume.pdf"
                variant="dark"
                fillColor="#f05038"
                size="md"
                target="_blank"
                rel="noreferrer"
                icon={<i className="ri-download-line text-sm" />}
              />
            </div>
          </div>

          {/* =========================================================================
              RIGHT HALF (Desktop) / TOP (Mobile):
              Main Sequential Word-by-Word Illuminated Text with Cursive Highlight Accents
              ========================================================================= */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex items-center z-10 py-4 lg:py-0">
            <p className="font-[tango] text-2xl xs:text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem] xl:text-[3.5rem] leading-[1.28] sm:leading-[1.22] tracking-tight">
              {/* Part 1: Illuminates to White */}
              {wordsPart1.map((item, idx) => (
                <span
                  key={`p1-${idx}`}
                  className="about-word-1 inline-block mr-[0.28em] text-[#242222]"
                >
                  {item.text}
                </span>
              ))}

              {/* Part 2: Cursive Words Illuminate to #f05038 Highlight Color, Others to White */}
              {wordsPart2.map((item, idx) => (
                <span
                  key={`p2-${idx}`}
                  className={`about-word-2 inline-block mr-[0.28em] text-[#242222] ${
                    item.isCursive
                      ? "about-cursive font-editorial italic font-normal text-[1.14em] tracking-normal px-[0.04em]"
                      : ""
                  }`}
                >
                  {item.text}
                </span>
              ))}

              {/* Part 3: Cursive Words Illuminate to #f05038 Highlight Color, Others to White */}
              {wordsPart3.map((item, idx) => (
                <span
                  key={`p3-${idx}`}
                  className={`about-word-3 inline-block mr-[0.28em] text-[#242222] ${
                    item.isCursive
                      ? "about-cursive font-editorial italic font-normal text-[1.14em] tracking-normal px-[0.04em]"
                      : ""
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Aboutme;
