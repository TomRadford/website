"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LOADER_DELAY_SECONDS } from "./layout/loader";

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          {
            translateY: 30,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            translateY: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            delay: LOADER_DELAY_SECONDS + delay,
          },
        );
      }
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
};
