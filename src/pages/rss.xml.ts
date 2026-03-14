import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL | undefined }) {
  if (!context.site) {
    throw new Error(
      'The `site` option must be configured in astro.config.mjs to generate the RSS feed.'
    );
  }

  const writing = (await getCollection('writing')).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  return rss({
    title: 'Tom Radford thoughts',
    description: 'various ramblings',
    site: context.site,
    items: writing.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/${post.id}/`,
    })),
  });
}
