import { LEGAL_LINKS, PROVIDERS, SITE } from '@/lib/site';

const BASE = `https://${SITE.domain}`;

export default function sitemap() {
  const lastModified = new Date();

  const pages = [
    { path: '/', priority: 1 },
    ...PROVIDERS.map((provider) => ({ path: provider.href, priority: 0.9 })),
    { path: '/contact-us-to-compare', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/live-agent', priority: 0.7 },
    ...LEGAL_LINKS.map((link) => ({ path: link.href, priority: 0.3 })),
  ];

  return pages.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: priority >= 0.8 ? 'weekly' : 'monthly',
    priority,
  }));
}
