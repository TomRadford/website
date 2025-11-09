export const Metadata = ({
  title,
  description,
  image,
  publishDate,
  author = "Tom Radford",
  slug = "",
}: {
  title: string;
  description: string;
  image?: string;
  publishDate: string;
  author: string;
  slug?: string;
}) => {
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{`${title} | Tom Radford`}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={image.url} /> */}
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:author" content={author} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content={image.url} /> */}

      {/* Canonical URL */}
      <link rel="canonical" href={`https://theradford.com/${slug}`} />
    </>
  );
};
