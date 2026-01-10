import { NavLink } from "./nav-link";

export const Navigation = () => {
  return (
    <nav className="flex gap-2 sm:gap-4 justify-center mt-8">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/posts">Posts</NavLink>
      <NavLink href="/film">Film</NavLink>
    </nav>
  );
};
