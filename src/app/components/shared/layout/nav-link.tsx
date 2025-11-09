import { Button } from "../../ui/button";

export const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Button asChild variant="ghost">
      <a href={href}>{children}</a>
    </Button>
  );
};
