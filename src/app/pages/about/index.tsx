import { Metadata } from "../../components/shared/metedata";
import { Typography } from "../../components/shared/typography";
import { ThreeDeeMeeCanvas } from "./three-dee-mee";

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
        <ThreeDeeMeeCanvas />
        <Typography element="h2" weight="bold" size="h3">
          Hi, I'm Tom Radford!
        </Typography>
        <Typography element="p" weight="default" size="p">
          I'm a product engineer who's jazzed on creating meaningful problem oriented solutions.
        </Typography>
      </div>
    </>
  );
};
