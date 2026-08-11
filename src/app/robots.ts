import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Private client walkthrough — password gated, never for public indexing.
      disallow: ['/preview', '/preview/'],
    },
    sitemap: 'https://lavictoriatampa.com/sitemap.xml',
  };
}
