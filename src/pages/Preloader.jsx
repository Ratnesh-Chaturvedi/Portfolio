import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);

  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  // Increment counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Exit animation when counter hits 100
  useEffect(() => {
    if (counter !== 100) return;

    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(counterRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
    })
      .to(layer1Ref.current, { x: "-100%", duration: 0.3, ease: "power3.inOut" })
      .to(layer2Ref.current, { y: "-100%", duration: 0.3, ease: "power3.inOut" })
      .to(layer3Ref.current, { x: "100%", duration: 0.3, ease: "power3.inOut" })
      .to(preloaderRef.current, { opacity: 0, duration: 0, pointerEvents: "none" });
  }, [counter, onComplete]);

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[9999] overflow-hidden ">
      <div ref={layer1Ref} className="absolute inset-0 bg-green-500 z-20 blur "
        style={{ clipPath: "polygon(0 0, 0 100%, 50% 100%)" }} />
      <div ref={layer2Ref} className="absolute inset-0 bg-blue-500 z-30 blur-2xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
      <div ref={layer3Ref} className="absolute inset-0 bg-yellow-500 z-25 blur-2xl"
        style={{ clipPath: "polygon(100% 100%, 100% 0, 50% 100%)" }} />

      <div className="absolute inset-0 flex items-center justify-center z-40">
        <div ref={counterRef} className="text-white text-7xl font-[lemonbold]">
          {counter}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
