import { Image } from "@unpic/react";
import { Link } from "../components/shared/link";
import { Metadata } from "../components/shared/metedata";
import { Typography } from "../components/shared/typography";

export const HomePage = () => {
  return (
    <>
      <Metadata
        title="Creative Engineer"
        description="I'm a creative engineer who has a love for being a part of building meaningful solutions and telling important stories by balancing technical competency with artistic vision."
        publishDate="2025-11-09"
        author="Tom Radford"
        slug=""
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="sm:w-1/2 relative">
          <Typography
            className="absolute bottom-8 text-center w-full text-yellow"
            element="h3"
            weight="bold"
            size="h3"
          >
            Hi, I'm Tom Radford!
          </Typography>
          <img
            src="/images/DSCF3945.jpg"
            alt="Tom Radford"
            width={500}
            height={500}
            className="object-cover rounded-full"
          />
        </div>
        <div className="space-y-4  sm:w-1/2">
          <Typography element="h4" weight="default" size="h4">
            I'm a <Link href="/">creative engineer</Link> who has a love for being a part of
            building meaningful solutions and telling important stories by balancing technical
            competency with artistic vision.
          </Typography>
          <Typography element="p" weight="light" size="p">
            Currently, I work as a senior dev at{" "}
            <Link target="_blank" href="https://teamgeek.io">
              TeamGeek
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};
