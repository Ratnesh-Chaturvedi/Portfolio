import React, { useMemo } from "react";

/**
 * SleekProjectLines
 * 
 * Scalable Parametric Semicircle Arc Indicator:
 * - Dynamically computes the semicircle curve for ANY number of projects (3, 5, 8, 12+).
 * - Desktop: Placed on the far left edge of the section along a smooth parametric semicircle arc.
 * - Mobile: Placed at the top along an upward-curved semicircle arc.
 * - Displays LINES ONLY (no numbers, no text names, no neon glows).
 * - Hover tooltip reveals project title elegantly without cluttering the screen.
 * - Clicking any line smoothly navigates to that project.
 */
const SleekProjectLines = ({
  projects,
  activeIndex,
  onSelectProject,
}) => {
  const count = projects?.length || 0;

  // 1. Parametric Desktop Semicircle Curve (Scales dynamically for any project count N)
  const { desktopPoints, desktopH } = useMemo(() => {
    if (count === 0) return { desktopPoints: [], desktopH: 280 };

    const startX = 8;
    const maxBulge = 28; // how much the center bows out to the right
    const startY = 24;
    // Adapt height dynamically to count so lines stay evenly spaced
    const totalH = Math.max(250, Math.min(430, count * (count > 7 ? 40 : 54)));
    const stepH = count > 1 ? (totalH - 2 * startY) / (count - 1) : 0;

    const points = Array.from({ length: count }, (_, i) => {
      const t = count > 1 ? i / (count - 1) : 0.5;
      const y = startY + i * stepH;
      // Parabolic 4t(1-t) precisely matches SVG quadratic bezier curve
      const curve = 4 * t * (1 - t);
      const x = startX + curve * maxBulge;
      return { x, y };
    });

    return { desktopPoints: points, desktopH: totalH };
  }, [count]);

  // 2. Parametric Mobile Upward Semicircle Curve (Scales dynamically for any project count N)
  const mobilePoints = useMemo(() => {
    if (count === 0) return [];

    const W = 290;
    const startX = 22;
    const maxRise = 24; // apex of upward curvature
    const baseLineY = 34;
    const stepX = count > 1 ? (W - 2 * startX) / (count - 1) : 0;

    return Array.from({ length: count }, (_, i) => {
      const t = count > 1 ? i / (count - 1) : 0.5;
      const x = startX + i * stepX;
      const curve = 4 * t * (1 - t);
      const y = baseLineY - curve * maxRise;
      return { x, y };
    });
  }, [count]);

  if (count === 0) return null;

  const activePt = desktopPoints[activeIndex] || desktopPoints[0] || { x: 8, y: 24 };

  return (
    <>
      {/* =========================================================================
          1. DESKTOP SEMICIRCLE ARC (Visible on lg:)
          Positioned on the VERY FAR LEFT of the section — LINES ONLY
          ========================================================================= */}
      <div
        className="hidden lg:block absolute left-3 sm:left-5 md:left-7 lg:left-9 top-1/2 -translate-y-1/2 w-[160px] select-none z-30 pointer-events-none"
        style={{ height: `${desktopH}px` }}
      >
        {/* Dynamic Semicircle Dashed SVG Track */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox={`0 0 160 ${desktopH}`}
        >
          {/* Exact quadratic bezier matching the computed points (control point cx = 8 + 2*28 = 64) */}
          <path
            d={`M 8 24 Q 64 ${desktopH / 2} 8 ${desktopH - 24}`}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
            strokeDasharray="3 5"
          />

          {/* Active Accent Bead traveling smoothly along the arc */}
          <circle
            cx={activePt.x}
            cy={activePt.y}
            r="3"
            fill="#ffffff"
            className="transition-all duration-300 ease-out"
          />
        </svg>

        {/* Dynamic Project Lines (LINES ONLY, NO NUMBERS, NO NEON GLOW) */}
        {projects.map((proj, i) => {
          const pt = desktopPoints[i] || { x: 8, y: 24 };
          const isActive = i === activeIndex;

          return (
            <button
              key={`desk-line-${proj.id || i}`}
              onClick={() => onSelectProject(i)}
              style={{
                top: `${pt.y}px`,
                left: `${pt.x + 8}px`,
              }}
              className="absolute -translate-y-1/2 group flex items-center focus:outline-none cursor-pointer py-2 pl-1 pointer-events-auto"
              aria-label={proj.title || `Project 0${i + 1}`}
            >
              {/* Pure Sleek Line with Tactile Hover Expansion */}
              <div className="relative flex items-center">
                <span
                  className="h-[2px] rounded-full transition-all duration-300 ease-out group-hover:bg-white/80"
                  style={{
                    width: isActive ? "56px" : "18px",
                    backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.22)",
                  }}
                />

                {/* Active Pulse Beacon Dot at the tip */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full ml-2 bg-white animate-ping" />
                )}

                {/* Subtle Hover Tooltip with Project Title (Editorial Pinterest style) */}
                <div className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#12121c]/90 border border-white/10 text-[11px] font-mono text-neutral-200 tracking-wide whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-xl">
                  <span className="text-neutral-500 mr-1.5">0{i + 1}</span>
                  {proj.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          2. MOBILE UPWARD SEMICIRCLE ARC (Visible on < lg)
          Lines ONLY along the curved arc
          ========================================================================= */}
      <div className="lg:hidden relative w-full max-w-[290px] h-[48px] mx-auto select-none z-30">
        
        {/* Dynamic Curved Reference Arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 290 48"
        >
          <path
            d="M 22 34 Q 145 -14 268 34"
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
          />
        </svg>

        {/* Dynamic Sleek Lines on Mobile Arc */}
        {projects.map((proj, i) => {
          const pt = mobilePoints[i] || { x: 25, y: 34 };
          const isActive = i === activeIndex;

          return (
            <button
              key={`mob-line-${proj.id || i}`}
              onClick={() => onSelectProject(i)}
              style={{
                left: `${pt.x}px`,
                top: `${pt.y}px`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-2 focus:outline-none cursor-pointer"
              aria-label={proj.title || `Project 0${i + 1}`}
            >
              <span
                className="h-[2px] rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "32px" : "12px",
                  backgroundColor: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.22)",
                }}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default SleekProjectLines;
