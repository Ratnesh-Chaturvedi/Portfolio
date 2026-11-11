import React, { forwardRef } from "react";
import { getSkillIcon } from "../assets/data/projectData";

/**
 * SleekProjectCard
 * 
 * Awwwards & Pinterest Caliber Digital Product Showcase:
 * - Framed luxury macOS browser chrome displaying an unobstructed, crystal-clear project preview.
 * - Pristine visual hierarchy: high-resolution preview + editorial metadata base.
 * - High-contrast action buttons: Solid white Live Demo pill & dark glass Code button.
 * - Authentic brand stack icons in refined minimal chips.
 * - Responsive 3D layering with zero z-fighting and zero clipping.
 */
const SleekProjectCard = forwardRef(({ project = {}, index = 0, total = 1, isActive = false }, ref) => {
  const {
    id = "project",
    title = "Untitled Project",
    category = "Engineering Project",
    year = "2026",
    description = "",
    projectImage,
    skill = [],
    skills = [],
    liveDemo,
    codeDemo,
  } = project;

  const techStack = (skill && skill.length > 0) ? skill : (skills || []);

  // Layering priority: active card is highest, adjacent cards are layered right below
  const layerZIndex = isActive ? 30 : Math.max(1, total - Math.abs(index));

  return (
    <div
      ref={ref}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        pointerEvents: isActive ? "auto" : "none",
        zIndex: layerZIndex,
      }}
      className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#0d0d15] border border-white/[0.09] hover:border-white/[0.22] transition-[border-color] duration-500 flex flex-col justify-between group select-none shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
    >
      {/* =========================================================================
          1. LUXURY BROWSER CHROME (Header Bar)
          ========================================================================= */}
      <div className="relative z-10 h-10 px-4 sm:px-5 bg-[#12121e] border-b border-white/[0.07] flex items-center justify-between select-none shrink-0">
        
        {/* macOS Traffic Light Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 group-hover:bg-[#ff5f56] transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 group-hover:bg-[#ffbd2e] transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 group-hover:bg-[#27c93f] transition-colors" />
        </div>

        {/* Minimalist URL Pill */}
        <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-neutral-300 tracking-wider">
          <i className="ri-lock-line text-[10px] text-emerald-400" />
          <span>https://{id}.ratnesh.dev</span>
        </div>

        {/* Category & Status Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
          <span className="hidden sm:inline">{category}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* =========================================================================
          2. CRYSTAL-CLEAR PROJECT SCREENSHOT VIEWPORT (~56% Height)
          Completely unobstructed, ultra-sharp preview of the real application
          ========================================================================= */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#07070c]">
        {projectImage ? (
          <img
            src={projectImage}
            alt={title}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            width="820"
            height="460"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 flex items-center justify-center">
            <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">
              Preview Unavailable
            </span>
          </div>
        )}

        {/* Subtle Bottom Ambient Gradient for Visual Transition */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0e0e18] to-transparent pointer-events-none" />

        {/* Quick Action Overlay on Card Hover */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 pointer-events-none">
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <span>Visit Live</span>
              <i className="ri-arrow-right-up-line text-sm" />
            </a>
          )}
          {codeDemo && (
            <a
              href={codeDemo}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto px-4 py-2 rounded-xl bg-[#141420]/90 text-white border border-white/20 font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-transform"
            >
              <i className="ri-github-fill text-sm" />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>

      {/* =========================================================================
          3. EDITORIAL METADATA & ACTIONS BASE (~44% Height)
          ========================================================================= */}
      <div className="relative z-10 p-4 sm:p-5 lg:p-6 bg-[#0e0e18] border-t border-white/[0.08] flex flex-col justify-between gap-3 shrink-0">
        
        {/* Top Meta Line: Title + Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-neutral-400">
                0{index + 1} / 0{total} • {year}
              </span>
            </div>
            <h3 className="font-[tango] text-xl sm:text-2xl md:text-3xl text-white tracking-wide leading-snug drop-shadow-sm">
              {title}
            </h3>
          </div>

          {/* Action Buttons: High-Contrast Awwwards / Editorial Style */}
          <div className="flex items-center gap-2 shrink-0">
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-white hover:bg-neutral-200 active:scale-95 flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.03] shadow-md cursor-pointer"
              >
                <span>LIVE DEMO</span>
                <i className="ri-arrow-right-up-line text-sm font-bold" />
              </a>
            )}

            {codeDemo && (
              <a
                href={codeDemo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-semibold text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/10 flex items-center gap-1.5 transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              >
                <i className="ri-github-fill text-sm" />
                <span>CODE</span>
              </a>
            )}
          </div>
        </div>

        {/* Short Editorial Description */}
        {description && (
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed line-clamp-2 max-w-2xl">
            {description}
          </p>
        )}

        {/* Tech Stack Pills Bar */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/[0.05]">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {techStack.map((skillName) => (
              <span
                key={skillName}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[10px] sm:text-[11px] font-mono text-neutral-300"
              >
                <img
                  src={getSkillIcon(skillName)}
                  alt={`${skillName} logo`}
                  loading="lazy"
                  decoding="async"
                  width="14"
                  height="14"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span>{skillName}</span>
              </span>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-neutral-500 uppercase tracking-widest shrink-0">
            <span>Scroll to navigate</span>
            <i className="ri-arrow-down-line text-xs" />
          </div>
        </div>

      </div>
    </div>
  );
});

export default SleekProjectCard;
