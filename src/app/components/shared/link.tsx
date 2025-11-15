import { Slot } from "@radix-ui/react-slot";
import { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type AsChildProps = {
  asChild: boolean;
};

/**
 * use `asChild` for buttons
 */
export const Link = (props: (LinkProps | AsChildProps) & { children: ReactNode }) => {
  const Comp = "asChild" in props ? Slot : "a";

  return <Comp className="text-yellow hover:text-yellow-500" {...props} />;
};
