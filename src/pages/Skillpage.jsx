import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveGlobe from "../components/InteractiveGlobe";
import { CONTINENTS_DATA } from "../assets/data/continentSkillsData";

/**
 * Skillpage (#skills)
 * 
 * Features:
 * - Pinned staged scroll experience: as you scroll down, the real 3D dot-matrix globe
 *   rotates continuously across Earth, sequentially revealing all 7 continental skill domains
 *   until all skills are shown.
 * - Pure SVG motion-graphics animation: animated glowing constellation laser beams branch out
 *   from the active continent beacon on the 3D globe to floating tech logos.
 * - Zero card containers, zero boxes, zero full-screen blur: the 3D globe stays centered,
 *   crisp, and interactive throughout.
 * - Direct interactive continent click on the 3D globe to smoothly rotate to any domain.
 * - Pinned #skills tag animation stays firmly at top-4 left-4 throughout the entire scroll.
 */
const Skillpage = () => {
  const sectionRef = useRef(null);
  const [activeContinent, setActiveContinent] = useState(CONTINENTS_DATA[0]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Staged ScrollTrigger Pinning: pins the section while the user scrolls through all 8 skill groups
  useGSAP(
    () => {
      // Section pin & scroll driver across all 8 skill groups
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3800", // Generous runway for all 8 domains
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Calculate active continent (0 to 7)
            const stepIndex = Math.min(
              CONTINENTS_DATA.length - 1,
              Math.floor(self.progress * CONTINENTS_DATA.length)
            );
            setActiveContinent(CONTINENTS_DATA[stepIndex]);
          },
        },
      });

      return () => {
        tl.kill();
      };
    },
    { scope: sectionRef }
  );

  const handleSelectContinent = (continent) => {
    setActiveContinent(continent);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="sectionContianer relative w-full h-screen min-h-[560px] sm:min-h-[640px] bg-[#070709] px-3 sm:px-6 md:px-8 py-3 sm:py-5 border-b-3 border-[#222020] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.06)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

      {/* Clean Centered Header */}
      <div className="text-center pt-2 sm:pt-4 z-20 relative">
        <h2 className="font-[tango] text-2xl sm:text-3xl md:text-4xl text-white tracking-wide">
          Interactive Skill Globe
        </h2>
      </div>

      {/* Centered 3D Globe with Animated SVG Constellation & Floating Tech Logos */}
      <div className="relative w-full max-w-6xl mx-auto flex-1 flex items-center justify-center my-auto z-20">
        <InteractiveGlobe
          activeContinent={activeContinent}
          onSelectContinent={handleSelectContinent}
          scrollProgress={scrollProgress}
        />
      </div>
    </section>
  );
};

export default Skillpage;
