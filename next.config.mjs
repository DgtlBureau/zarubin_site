import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const redirectsData = require('./src/data/redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*/',
        destination: '/:path*',
      },
    ];
  },
  async redirects() {
    // Host-based + wildcard rules are kept inline; only Node-hosted environments
    // honor these. On GitHub Pages static export, see scripts/generate-redirect-stubs.mjs
    // and app/not-found.tsx for the actual mechanism. The rest are sourced from
    // src/data/redirects.json (single source of truth).
    const fromJson = redirectsData.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
    return [
      {
        source: '/(.*)',
        destination: 'https://thebrightbyte.com/:path*',
        permanent: true,
        has: [
          {
            type: 'host',
            value: 'www.thebrightbyte.com',
          },
        ],
      },
      {
        source: '/blog/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
      ...fromJson,
    ];
  },
};

export default nextConfig;
