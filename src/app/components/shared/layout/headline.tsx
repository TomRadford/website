"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LOADER_DELAY_SECONDS } from "./loader";

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
        delay: LOADER_DELAY_SECONDS + 0.5,
      });
    }
  });

  return (
    <h2 ref={headlineRef} className="text-xl font-bold">
      Product Engineer
    </h2>
  );
};
