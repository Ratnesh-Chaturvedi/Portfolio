import React, { useRef } from "react";
import gsap from "gsap";

const sizeClasses = {
  xs: "h-7.5 px-3.5 text-[10px] sm:text-xs tracking-[0.12em]",
  sm: "h-8.5 sm:h-9.5 px-4 sm:px-5 text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.14em]",
  md: "h-9 sm:h-11 px-4.5 sm:px-6 text-[10.5px] sm:text-xs tracking-[0.12em] sm:tracking-[0.14em]",
  lg: "h-12 px-7 text-xs sm:text-sm tracking-[0.14em]",
};

const variantConfigs = {
  primary: {
    defaultBg: "#ffffff",
    defaultColor: "#09090D",
    defaultBorder: "#ffffff",
    hoverBg: "#f05038",
    hoverColor: "#ffffff",
    hoverBorder: "#f05038",
    baseClasses: "font-headline font-semibold uppercase rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.12)] border-2",
  },
  outline: {
    defaultBg: "rgba(255, 255, 255, 0.05)",
    defaultColor: "#ffffff",
    defaultBorder: "rgba(255, 255, 255, 0.25)",
    hoverBg: "#f05038",
    hoverColor: "#ffffff",
    hoverBorder: "#f05038",
    baseClasses: "font-headline font-semibold uppercase rounded-full backdrop-blur-md border",
  },
  dark: {
    defaultBg: "#121111",
    defaultColor: "#A7A0A0",
    defaultBorder: "#403D3D",
    hoverBg: "#f05038",
    hoverColor: "#ffffff",
    hoverBorder: "#f05038",
    baseClasses: "font-headline font-semibold uppercase rounded-full border-2",
  },
  text: {
    defaultBg: "transparent",
    defaultColor: "#B8B3C7",
    defaultBorder: "transparent",
    hoverBg: "transparent",
    hoverColor: "#ffffff",
    hoverBorder: "transparent",
    baseClasses: "font-headline font-medium uppercase border-none p-0 tracking-[0.14em] text-xs sm:text-sm",
  },
};

/**
 * Creative Magnetic Button
 * 
 * Features:
 * - Magnetic 2D cursor attraction based on user's proven original implementation
 * - Reliable GSAP color transitions: backgroundColor, textColor, and borderColor tween simultaneously
 * - Zero text disappearance or clipping bugs
 * - Elastic spring-back recovery on mouse leave
 * - Supports primary, outline, dark, and editorial text variants
 */
const Button = ({
  content = "View More",
  link = null,
  onClick = null,
  size = "md",
  variant = "primary",
  className = "",
  icon = null,
  iconPosition = "right",
  isButton = false,
  type = "button",
  target = null,
  rel = null,
  disabled = false,
}) => {
  const buttonRef = useRef(null);
  const arrowRef = useRef(null);

  const config = variantConfigs[variant] || variantConfigs.primary;
  const isText = variant === "text";

  // Magnetic cursor tracking
  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    const { left, top, width, height } = button.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    gsap.to(button, {
      x: deltaX * 0.28,
      y: deltaY * 0.28,
      duration: 0.3,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  // Hover state: animate background, text color, and border simultaneously
  const handleMouseEnter = () => {
    const button = buttonRef.current;
    if (!button || disabled) return;

    gsap.to(button, {
      scale: isText ? 1.04 : 1.06,
      backgroundColor: config.hoverBg,
      color: config.hoverColor,
      borderColor: config.hoverBorder,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (arrowRef.current && isText) {
      gsap.to(arrowRef.current, {
        x: 4,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  // Leave state: return to default colors and position smoothly
  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      scale: 1,
      backgroundColor: config.defaultBg,
      color: config.defaultColor,
      borderColor: config.defaultBorder,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (arrowRef.current && isText) {
      gsap.to(arrowRef.current, {
        x: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const isExternal = link && (link.startsWith("http") || link.endsWith(".pdf"));
  const resolvedTarget = target || (isExternal ? "_blank" : undefined);
  const resolvedRel = rel || (isExternal ? "noreferrer noopener" : undefined);

  const handleClick = (e) => {
    if (onClick) {
      if (link && link.startsWith("#")) {
        e?.preventDefault?.();
        e?.stopPropagation?.();
      }
      onClick(e);
    }
  };

  const buttonInner = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: config.defaultBg,
        color: config.defaultColor,
        borderColor: config.defaultBorder,
      }}
      className={`
        relative inline-flex items-center justify-center select-none cursor-pointer
        whitespace-nowrap transition-none will-change-transform
        ${isText ? "gap-2" : sizeClasses[size] || sizeClasses.md}
        ${config.baseClasses}
        ${className}
      `}
    >
      {icon && iconPosition === "left" && (
        <span className="shrink-0 mr-1.5">{icon}</span>
      )}

      <span>{content}</span>

      {icon && iconPosition === "right" && (
        <span ref={arrowRef} className="shrink-0 ml-1.5 inline-block">
          {icon}
        </span>
      )}
    </div>
  );

  if (isButton || (!link && onClick)) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="inline-block focus:outline-none"
      >
        {buttonInner}
      </button>
    );
  }

  return (
    <a
      href={link || "#"}
      onClick={handleClick}
      target={resolvedTarget}
      rel={resolvedRel}
      className="inline-block focus:outline-none"
    >
      {buttonInner}
    </a>
  );
};

export default Button;
