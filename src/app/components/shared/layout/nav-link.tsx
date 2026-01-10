import { RouteType } from "../../..";
import { Button } from "../../ui/button";

export const NavLink = ({ href, children }: { href: RouteType; children: React.ReactNode }) => {
  return (
    <Button asChild variant="ghost">
      <a href={href}>{children}</a>
    </Button>
  );
};
