import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import projectData from "../assets/data/projectData";
import SleekProjectLines from "../components/SleekProjectLines";
import SleekProjectCard from "../components/SleekProjectCard";

gsap.registerPlugin(ScrollTrigger);

/**
 * Project Page
 * 
 * Awwwards & Pinterest Level Project Showcase:
 * - Left side: Minimalist parametric semicircle arc lines (LINES ONLY, far-left, scalable).
 * - Center: Project cards moving along a silky smooth Semicircle "Tire" trajectory:
 *   - Enters from TOP-LEFT curve (arcX, -arcYPercent, -arcRotateZ, scale: 0.9, opacity: 0).
 *   - Rolls into MID / CENTER (x: 0px, yPercent: 0%, rotateZ: 0deg, scale: 1, opacity: 1).
 *   - Exits rolling down to BOTTOM-LEFT curve (arcX, arcYPercent, arcRotateZ, scale: 0.9, opacity: 0).
 *   - Reversing scroll rolls smoothly back upward along the semicircle in real time.
 * - Editorial macOS browser card frame with crystal-clear project preview and high-contrast actions.
 * - Dynamic scroll distance based on project count (total * 650px).
 */
const Project = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollTriggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const total = projectData.length;
  const activeProject = projectData[activeIndex] || projectData[0] || {};

  // GSAP Responsive Pinned Semicircle "Tire" Motion ScrollTrigger Animation
  useGSAP(
    () => {
      if (total <= 1) return;

      const cards = cardsRef.current;
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions;
          const arcX = isDesktop ? -130 : -45;
          const arcRotateZ = isDesktop ? 12 : 8;
          const arcRotateX = isDesktop ? 8 : 4;
          const arcYPercent = isDesktop ? 75 : 65;

          // Initial positions along the semicircle "tire" trajectory:
          // Card 0 sits in the MID / CENTER facing user flat.
          // Remaining cards wait on the TOP-LEFT curve.
          if (cards[0]) {
            gsap.set(cards[0], {
              x: 0,
              yPercent: 0,
              rotateZ: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
            });
          }

          for (let i = 1; i < total; i++) {
            if (cards[i]) {
              gsap.set(cards[i], {
                x: arcX,
                yPercent: -arcYPercent,
                rotateZ: -arcRotateZ,
                rotateX: arcRotateX,
                scale: 0.9,
                opacity: 0,
              });
            }
          }

          // Dynamic runway: scales smoothly with total project count (650px per project)
          const runwayDistance = Math.max(1800, total * 650);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${runwayDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: 0.6, // Direct, optimistic, zero-lag inertial response
              onUpdate: (self) => {
                const rawIdx = self.progress * (total - 1);
                const activeIdx = Math.min(total - 1, Math.max(0, Math.round(rawIdx)));
                if (activeIdx !== activeIndexRef.current) {
                  activeIndexRef.current = activeIdx;
                  setActiveIndex(activeIdx);
                }
              },
            },
          });

          scrollTriggerRef.current = tl.scrollTrigger;

          // Sequential Semicircle "Tire" transitions with hold zones:
          for (let i = 0; i < total - 1; i++) {
            const currentCard = cards[i];
            const nextCard = cards[i + 1];
            if (!currentCard || !nextCard) continue;

            const startTime = i + 0.15;
            const duration = 0.70;

            // Outgoing rolls from MID down to BOTTOM-LEFT curve
            tl.to(
              currentCard,
              {
                x: arcX,
                yPercent: arcYPercent,
                rotateZ: arcRotateZ,
                rotateX: -arcRotateX,
                scale: 0.9,
                opacity: 0,
                ease: "power1.inOut",
                duration: duration,
              },
              startTime
            );

            // Incoming rolls in from TOP-LEFT curve into MID
            tl.to(
              nextCard,
              {
                x: 0,
                yPercent: 0,
                rotateZ: 0,
                rotateX: 0,
                scale: 1,
                opacity: 1,
                ease: "power1.inOut",
                duration: duration,
              },
              startTime
            );
          }
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [total] }
  );

  // Smooth scroll to project when clicking any sleek line
  const handleSelectProject = (index) => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    const targetProgress = total > 1 ? index / (total - 1) : 0;
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    try {
      const smoother = ScrollSmoother?.get?.();
      if (smoother && typeof smoother.scrollTo === "function") {
        smoother.scrollTo(targetScroll, true);
        return;
      }
    } catch {
      // Fallback to window scroll
    }

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  if (total === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-screen min-h-[640px] bg-[#06060c] px-3 sm:px-6 md:px-8 py-3 sm:py-5 overflow-hidden flex flex-col justify-between select-none border-b border-white/[0.06]"
    >
      {/* Subtle Fine Atmospheric Light */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_65%_45%,rgba(255,255,255,0.025)_0%,rgba(0,0,0,0)_70%)] -z-10" />

      {/* Clean Editorial Section Header */}
      <div className="text-center pt-1 sm:pt-2 z-20 relative">
        <h2 className="font-[tango] text-2xl sm:text-3xl md:text-4xl text-white tracking-wide">
          Featured Projects
        </h2>
        <p className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-[0.2em] mt-0.5">
          Curated Engineering Showcase
        </p>
      </div>

      {/* Single Responsive Instance of Parametric Semicircle Lines (Far-Left) */}
      <SleekProjectLines
        projects={projectData}
        activeIndex={activeIndex}
        onSelectProject={handleSelectProject}
      />

      {/* Main Content Stage: Houses the Semicircle "Tire" Project Cards Motion */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center my-auto z-20 lg:translate-x-6 xl:translate-x-10">
        
        <div
          className="relative w-full max-w-[740px] xl:max-w-[820px] h-[460px] xs:h-[490px] sm:h-[510px] md:h-[530px] lg:h-[540px] flex items-center justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "center center",
          }}
        >
          {projectData.map((project, idx) => (
            <SleekProjectCard
              key={project.id || idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              project={project}
              index={idx}
              total={total}
              isActive={idx === activeIndex}
            />
          ))}
        </div>

      </div>

      {/* Bottom Minimalist Status Ticker */}
      <div className="relative z-20 pb-2 flex items-center justify-center gap-2 pointer-events-none">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase font-medium text-neutral-400">
          0{activeIndex + 1} / 0{total} • {activeProject?.category || "Project"}
        </span>
      </div>
    </section>
  );
};

export default Project;
