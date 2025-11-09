import { NavLink } from "./nav-link";

export const Navigation = () => {
  return (
    <nav className="flex gap-4 justify-center mt-8">
      <NavLink href="/">Posts</NavLink>
      <NavLink href="/about">About</NavLink>
    </nav>
  );
};
