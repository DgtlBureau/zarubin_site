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
      // SEO decanibalization redirect (pair 4: near-duplicate infosec content)
      {
        source: '/playbook/insights/top-10-information-security-practices',
        destination: '/playbook/expertise/Information-security-products',
        permanent: true,
      },
      // Recategorisation 2026-05-04: 6 compliance/security articles moved
      // from Insights/Notes to Expertise/IT Service for accurate positioning.
      // Old URLs were submitted to GSC, so 301 keeps link equity.
      {
        source: '/playbook/insights/eu-cyber-resilience-act-2027',
        destination: '/playbook/expertise/eu-cyber-resilience-act-2027',
        permanent: true,
      },
      {
        source: '/playbook/insights/pci-dss-4-march-2025-deadline',
        destination: '/playbook/expertise/pci-dss-4-march-2025-deadline',
        permanent: true,
      },
      {
        source: '/playbook/insights/supply-chain-attacks-xz-npm-pypi',
        destination: '/playbook/expertise/supply-chain-attacks-xz-npm-pypi',
        permanent: true,
      },
      {
        source: '/playbook/insights/ai-coding-agents-soc2',
        destination: '/playbook/expertise/ai-coding-agents-soc2',
        permanent: true,
      },
      {
        source: '/playbook/insights/ai-generated-code-ownership-banking',
        destination: '/playbook/expertise/ai-generated-code-ownership-banking',
        permanent: true,
      },
      {
        source: '/playbook/insights/compliance-cost-10x-ai-engineering',
        destination: '/playbook/expertise/compliance-cost-10x-ai-engineering',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
