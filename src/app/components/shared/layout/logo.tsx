"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Underline } from "@/app/components/shared/layout/underline";
import { COLOS } from "../../../constants/colos";

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
      <Underline lineRef={lineRef} />
      <h1 ref={logoRef} className="text-8xl font-extrabold relative">
        Tom
      </h1>
    </div>
  );
};
