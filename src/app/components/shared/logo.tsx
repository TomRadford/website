"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Logo = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (logoRef.current && lineRef.current) {
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.5,
      });

      gsap.set(lineRef.current, {
        strokeDasharray: 200,
        strokeDashoffset: 200,
        opacity: 0,
      });

      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.3,
      });
    }
  });

  return (
    <div className="relative inline-block">
      <svg
        className="absolute bottom-[1px] left-0 w-[200px] h-4 z-10 text-yellow"
        preserveAspectRatio="none"
        width="250"
        height="8"
        viewBox="0 0 202 8"
        fill="none"
      >
        <path
          ref={lineRef}
          d="M0.0675049 3.5C0.0675049 3.5 36.77 1 82.5675 1C128.365 0.999997 216.068 3 216.068 3"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
        />
      </svg>
      <h1 ref={logoRef} className="text-8xl font-extrabold relative">
        Tom
      </h1>
    </div>
  );
};

<svg width="217" height="5" viewBox="0 0 217 5" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0.0675049 3.5C0.0675049 3.5 36.77 1 82.5675 1C128.365 0.999997 216.068 3 216.068 3"
    stroke="white"
    stroke-width="2"
  />
</svg>;
