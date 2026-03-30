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
        source: '/blog',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
      {
        source: '/regfo',
        destination: '/soc2-checker',
        permanent: true,
      },
      {
        source: '/regfo/:path*',
        destination: '/soc2-checker/:path*',
        permanent: true,
      },
      // SEO decanibalization redirects
      {
        source: '/playbook/insights/how-to-choose-a-crm',
        destination: '/playbook/expertise/How_to_choose_a_CRM_for_a_sports_club',
        permanent: true,
      },
      {
        source: '/playbook/expertise/How-sports-analytics-works',
        destination: '/playbook/expertise/How-AI-is-revolutionising-performance-in-sport',
        permanent: true,
      },
      {
        source: '/playbook/expertise/Future-of-FieldOps-PersoniWay',
        destination: '/playbook/insights/PersoniWay-AI-That-Transforms-HVAC',
        permanent: true,
      },
      {
        source: '/playbook/insights/top-10-information-security-practices',
        destination: '/playbook/expertise/Information-security-products',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
