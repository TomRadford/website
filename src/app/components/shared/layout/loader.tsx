"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getLocation } from "../../../lib/location";
import { SunLoaderIcon } from "../icons/sun-loader";
import { Typography } from "../typography";

export const LOADER_DELAY_SECONDS = 1.5;

/**
 * Just hides the page until hydrated we dont get a flash of rendered content pre-hydration
 */
export const Loader = ({ location }: { location: ReturnType<typeof getLocation> }) => {
  const isCapeTown = location.city === "Cape Town";
  const textRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
    }, LOADER_DELAY_SECONDS * 1000);
  }, []);

  useGSAP(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        filter: "blur(20px)",
        opacity: 0,
        duration: LOADER_DELAY_SECONDS / 2,
        ease: "power2.in",
        delay: LOADER_DELAY_SECONDS / 2,
      });
    }
  });

  if (hidden) {
    return null;
  }

  return (
    <div className="z-50 fixed inset-0 bg-background">
      <div ref={textRef} className="flex gap-4 items-center flex-col justify-center h-full">
        <SunLoaderIcon className="w-10 h-10" />
        <Typography
          element="p"
          weight="light"
          size="p"
          className="text-foreground text-sm font-extralight"
        >
          {isCapeTown ? <>Howdy, fellow Capetonian!</> : <>From Cape Town to {location.city}!</>}
        </Typography>
      </div>
    </div>
  );
};
