import type { LayoutProps } from "rwsdk/router";
import { Logo } from "./components/shared/logo";

export function AppLayout({ children, requestInfo }: LayoutProps) {
  return (
    <div className="app mx-auto sm:max-w-3xl lg:max-w-6xl my-5">
      <header className="text-center">
        <Logo />
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
        {requestInfo && <span>Path: {new URL(requestInfo.request.url).pathname}</span>}
      </header>
      <main>{children}</main>
      <footer className="text-yellow">&copy; {new Date().getFullYear()}</footer>
    </div>
  );
}
