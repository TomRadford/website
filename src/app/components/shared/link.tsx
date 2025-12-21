import { Slot } from "@radix-ui/react-slot";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { RouteType } from "../..";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: RouteType | `https://${string}`;
};

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
