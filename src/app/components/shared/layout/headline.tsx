"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Headline = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (headlineRef.current) {
      gsap.set(headlineRef.current, {
        opacity: 0,
        y: -30,
      });

      gsap.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.5,
      });
    }
  });

  return (
    <h2 ref={headlineRef} className="text-xl font-bold">
      Product Engineer
    </h2>
  );
};
