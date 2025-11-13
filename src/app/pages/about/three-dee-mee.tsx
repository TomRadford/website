"use client";

import { Plane, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Pseudo3DMaterial, Pseudo3DMaterialType } from "./pseudo-3d-material";

extend({ Pseudo3DMaterial });

const ThreeDeeMee = ({ size = 1 }: { size?: number }) => {
  const depthMaterial = useRef<Pseudo3DMaterialType | null>(null);
  const texture = useTexture("/art/tom.jpg");
  const depthMap = useTexture("/art/tom-map.png");
  const { viewport } = useThree();

  // Calculate aspect ratio from the texture image
  const aspectRatio = useMemo(() => {
    const image = texture.image;
    if (image && typeof image === "object" && "width" in image && "height" in image) {
      const img = image as { width: number; height: number };
      return img.width / img.height;
    }
    return 1; // Default to square if not loaded yet
  }, [texture.image]);

  // Calculate scale based on viewport, maintaining image aspect ratio
  // size is a multiplier (1 = fits viewport, 2 = double size, etc.)
  const scale = useMemo(() => {
    // Use a base unit size, then scale by the size multiplier
    // This ensures both dimensions scale proportionally
    const baseUnit = Math.min(viewport.width, viewport.height);
    const width = baseUnit * aspectRatio * size;
    const height = baseUnit * size;

    return [width, height, 1] as [number, number, number];
  }, [viewport.width, viewport.height, aspectRatio, size]);

  useFrame((state) => {
    if (depthMaterial.current) {
      depthMaterial.current.uMouse = [state.mouse.x * 0.01, state.mouse.y * 0.01];
    }
  });

  return (
    <Plane args={[1, 1]} scale={scale}>
      <pseudo3DMaterial ref={depthMaterial} uImage={texture} uDepthMap={depthMap} />
    </Plane>
  );
};

export const ThreeDeeMeeCanvas = ({ size = 1 }: { size?: number }) => {
  return (
    <Canvas style={{ width: "1800px", height: "1600px" }}>
      <ThreeDeeMee size={1} />
    </Canvas>
  );
};
