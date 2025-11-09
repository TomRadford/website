export const Underline = ({ lineRef }: { lineRef: React.RefObject<SVGPathElement | null> }) => {
  return (
    <svg
      className="absolute bottom-[1px] left-0 w-[200px] h-4 z-10 text-yellow"
      preserveAspectRatio="none"
      width="250"
      height="8"
      viewBox="0 0 202 8"
      fill="none"
    >
      <path
        ref={lineRef}
        d="M0.0675049 3.5C0.0675049 3.5 36.77 1 82.5675 1C128.365 0.999997 216.068 3 216.068 3"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
      />
    </svg>
  );
};
