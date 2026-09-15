/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The static site shipped these as directory URLs; keep them working.
      { source: '/spectrum', destination: '/spectrum-plans', permanent: true },
      { source: '/xfinity', destination: '/xfinity-plans', permanent: true },
      { source: '/compare', destination: '/contact-us-to-compare', permanent: true },
      { source: '/compare-internet-options', destination: '/contact-us-to-compare', permanent: true },
    ];
  },
};

export default nextConfig;
