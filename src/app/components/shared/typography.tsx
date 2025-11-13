import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

const typographyVariants = cva("text-foreground", {
  variants: {
    size: {
      h1: "text-8xl ",
      h2: "text-6xl ",
      h3: "text-4xl",
      h4: "text-2xl",
      h5: "text-xl",
      h6: "text-lg",
      p: "text-base",
      span: "text-sm",
      div: "text-sm",
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
