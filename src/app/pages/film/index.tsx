import { Metadata } from "../../components/shared/metedata";
import { Typography } from "../../components/shared/typography";

export const FilmPage = () => {
  return (
    <>
      <Metadata
        title="Film"
        description="My film portfolio"
        publishDate="2025-11-20"
        author="Tom Radford"
      />
      <Typography element="h2" weight="bold" size="h3">
        Film
      </Typography>
    </>
  );
};
