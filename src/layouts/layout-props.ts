export interface SEOImage {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface SEOProps {
  title?: string;
  description?: string;
  titleSuffix?: string;
  canonical?: string;
  ogImage?: SEOImage | string;
  type?: 'website' | 'article';
  tags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}
