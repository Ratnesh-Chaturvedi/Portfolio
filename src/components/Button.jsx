import React, { useRef } from "react";
import gsap from "gsap";

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-14 px-6 text-base sm:text-lg",
  lg: "h-20 px-8 text-lg sm:text-xl md:text-2xl",
};

const Button = ({
  content = "View More",
  link = "#",
  size = "md",
  className = "",
  icon = null,
}) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const { left, top, width, height } = button.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    gsap.to(button, {
      x: deltaX * 0.25,
      y: deltaY * 0.25,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.08,
      backgroundColor: "#f05038",
      color: "#121111",
      borderColor: "#f05038",
      duration: 0.3,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      backgroundColor: "#121111",
      color: "#A7A0A0",
      borderColor: "#A7A0A0",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <a href={link} className="inline-block">
      <button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          font-[tango] font-light
          rounded-full border-2
          whitespace-nowrap
          bg-[#121111] text-[#A7A0A0] border-[#A7A0A0]
          ${sizeClasses[size]}
          ${className}
        `}
      >
        {icon && <span className="icon mr-2">{icon}</span>}
        <span>{content}</span>
      </button>
    </a>
  );
};

export default Button;
