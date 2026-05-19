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
      // Recategorisation 2026-05-04 + Phase 2 (2026-05-18): compliance/security
      // articles moved to /playbook/compliance/. Originally insights → expertise,
      // now consolidated to compliance top-level. 301 keeps link equity from old URLs.
      {
        source: '/playbook/insights/eu-cyber-resilience-act-2027',
        destination: '/playbook/compliance/eu-cyber-resilience-act-2027',
        permanent: true,
      },
      {
        source: '/playbook/insights/pci-dss-4-march-2025-deadline',
        destination: '/playbook/compliance/pci-dss-4-march-2025-deadline',
        permanent: true,
      },
      {
        source: '/playbook/insights/supply-chain-attacks-xz-npm-pypi',
        destination: '/playbook/compliance/supply-chain-attacks-xz-npm-pypi',
        permanent: true,
      },
      {
        source: '/playbook/insights/ai-coding-agents-soc2',
        destination: '/playbook/compliance/ai-coding-agents-soc2',
        permanent: true,
      },
      {
        source: '/playbook/insights/ai-generated-code-ownership-banking',
        destination: '/playbook/compliance/ai-generated-code-ownership-banking',
        permanent: true,
      },
      {
        source: '/playbook/insights/compliance-cost-10x-ai-engineering',
        destination: '/playbook/compliance/compliance-cost-10x-ai-engineering',
        permanent: true,
      },
      // Phase 2 (2026-05-18): 11 compliance articles moved from /expertise/
      // (or insights) to top-level /compliance/. Preserve link equity.
      {
        source: '/playbook/expertise/eu-ai-act-compliance-ai-agents',
        destination: '/playbook/compliance/eu-ai-act-compliance-ai-agents',
        permanent: true,
      },
      {
        source: '/playbook/expertise/pci-dss-4-march-2025-deadline',
        destination: '/playbook/compliance/pci-dss-4-march-2025-deadline',
        permanent: true,
      },
      {
        source: '/playbook/expertise/regfo-ai-compliance-automation',
        destination: '/playbook/compliance/regfo-ai-compliance-automation',
        permanent: true,
      },
      {
        source: '/playbook/expertise/ai-coding-agents-soc2',
        destination: '/playbook/compliance/ai-coding-agents-soc2',
        permanent: true,
      },
      {
        source: '/playbook/expertise/ai-audit-trail-architecture-compliance',
        destination: '/playbook/compliance/ai-audit-trail-architecture-compliance',
        permanent: true,
      },
      {
        source: '/playbook/expertise/dora-compliance-ai-fintech',
        destination: '/playbook/compliance/dora-compliance-ai-fintech',
        permanent: true,
      },
      {
        source: '/playbook/expertise/eu-cyber-resilience-act-2027',
        destination: '/playbook/compliance/eu-cyber-resilience-act-2027',
        permanent: true,
      },
      {
        source: '/playbook/expertise/supply-chain-attacks-xz-npm-pypi',
        destination: '/playbook/compliance/supply-chain-attacks-xz-npm-pypi',
        permanent: true,
      },
      {
        source: '/playbook/expertise/compliance-cost-10x-ai-engineering',
        destination: '/playbook/compliance/compliance-cost-10x-ai-engineering',
        permanent: true,
      },
      {
        source: '/playbook/expertise/ai-generated-code-ownership-banking',
        destination: '/playbook/compliance/ai-generated-code-ownership-banking',
        permanent: true,
      },
      {
        source: '/playbook/insights/eu-ai-act-delay-december-2027-trap',
        destination: '/playbook/compliance/eu-ai-act-delay-december-2027-trap',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
