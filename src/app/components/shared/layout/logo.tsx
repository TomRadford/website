"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Underline } from "@/app/components/shared/layout/underline";
import { LOADER_DELAY_SECONDS } from "./loader";
import { Typography } from "../typography";

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
        delay: LOADER_DELAY_SECONDS,
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: LOADER_DELAY_SECONDS + 0.3,
      });
    }
  });

  return (
    <div className="relative inline-block">
      <Underline lineRef={lineRef} />
      <Typography
        element="h1"
        weight="extrabold"
        size="h1-fixed"
        ref={logoRef}
        className="relative"
      >
        Tom
      </Typography>
    </div>
  );
};
