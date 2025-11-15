import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

const typographyVariants = cva("text-foreground", {
  variants: {
    size: {
      "h1-fixed": "text-8xl",
      "h2-fixed": "text-6xl",
      "h3-fixed": "text-4xl",
      "h4-fixed": "text-2xl",
      "h5-fixed": "text-xl",
      "h6-fixed": "text-lg",
      "p-fixed": "text-base",
      h1: "text-4xl sm:text-8xl",
      h2: "text-3xl sm:text-6xl",
      h3: "text-2xl sm:text-4xl",
      h4: "text-xl sm:text-2xl",
      h5: "text-lg sm:text-xl",
      h6: "text-base sm:text-lg",
      p: "text-sm sm:text-base",
    },
    weight: {
      default: "font-normal",
      bold: "font-bold",
      light: "font-light",
      medium: "font-medium",
      semibold: "font-semibold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
  },
});

export const Typography = ({
  children,
  className,
  element,
  ref,
  ...props
}: {
  element: ElementType;
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLHeadingElement | null>;
} & VariantProps<typeof typographyVariants>) => {
  const Element = element;
  return (
    <Element ref={ref} className={cn(typographyVariants({ ...props }), className)} {...props}>
      {children}
    </Element>
  );
};
