"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          {
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            delay: delay,
          },
        );
      }
    },
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
};
