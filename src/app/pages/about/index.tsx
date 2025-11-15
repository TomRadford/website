import { Link } from "../../components/shared/link";
import { Metadata } from "../../components/shared/metedata";
import { Typography } from "../../components/shared/typography";

export const AboutPage = () => {
  return (
    <>
      <Metadata
        title="About Me"
        description="Software Developer who's jazzed on creating meaningful problem oriented solutions."
        publishDate="2025-11-20"
        author="Tom Radford"
        slug="about"
      />
      <div className="space-y-4 text-center">
        <Typography element="h3" weight="bold" size="h3">
          Hi, I'm Tom Radford!
        </Typography>
        <Typography element="h4" weight="default" size="h4">
          I'm a software developer who's jazzed on creating meaningful problem oriented solutions.
        </Typography>
        <Typography element="p" weight="default" size="p">
          Currently, I work as a senior dev at{" "}
          <Link target="_blank" href="https://teamgeek.io">
            TeamGeek
          </Link>
          <a></a>.
        </Typography>
      </div>
    </>
  );
};
