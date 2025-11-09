import type { LayoutProps } from "rwsdk/router";
import { Logo } from "./components/shared/layout/logo";
import { Headline } from "./components/shared/layout/headline";
import { Footer } from "./components/shared/layout/footer";
import { Navigation } from "./components/shared/layout/navigation";
import { FadeIn } from "./components/shared/fade-in";

export const AppLayout = ({ children, requestInfo }: LayoutProps) => {
  return (
    <div className="app mx-auto sm:max-w-3xl lg:max-w-6xl my-5">
      <header className="text-center mb-16">
        <Logo />
        <Headline />
        <FadeIn delay={0.5}>
          <Navigation />
        </FadeIn>
      </header>
      <main className="p-4 lg:p-8">
        <FadeIn delay={1}>{children}</FadeIn>
      </main>
      <FadeIn delay={1.5}>
        <Footer />
      </FadeIn>
    </div>
  );
};
