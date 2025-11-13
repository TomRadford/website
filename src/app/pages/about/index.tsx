import { Metadata } from "../../components/shared/metedata";

export const AboutPage = () => {
  return (
    <>
      <Metadata
        title="About Me"
        description="I'm a product engineer who's jazzed on creating meaningful problem oriented solutions."
        publishDate="2025-11-09"
        author="Tom Radford"
        slug="about"
      />
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold">Hi, I'm Tom Radford!</h1>
        <p>
          I'm a product engineer who's jazzed on creating meaningful problem oriented solutions.
        </p>
      </div>
    </>
  );
};
