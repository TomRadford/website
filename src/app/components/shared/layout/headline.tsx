"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LOADER_DELAY_SECONDS } from "./loader";
import { Typography } from "../typography";

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
    <Typography element="h2" weight="bold" size="h4" ref={headlineRef} className="relative">
      Software Engineer
    </Typography>
  );
};
