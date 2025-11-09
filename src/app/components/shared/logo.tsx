"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Logo = () => {
  const logoRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (logoRef.current) {
      // Set initial state
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.5,
      });

      gsap.to(logoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
      });
    }
  });

  return (
    <h1 ref={logoRef} className="text-8xl font-extrabold">
      Tom
    </h1>
  );
};
