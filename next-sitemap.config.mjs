import fs from 'fs';
import path from 'path';

const config = {
  siteUrl: 'https://thebrightbyte.com',
  generateSitemap: true,
  outDir: './out',
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 5000,
  additionalPaths: async () => {
    const staticPages = [
      '/',
      '/career',
      '/comparison',
      '/playbook',
      '/playbook/expertise',
      '/playbook/insights',
      '/cases',
      '/policy',
      '/investments',
      '/brief',
      '/soc2-checker',
      '/soc2-checker/assessment',
      '/playbook/expertise/rss.xml',
      '/playbook/insights/rss.xml',
      '/bonuses',
    ];

    const getAllMarkdownFiles = (dirPath, arrayOfFiles = []) => {
      const files = fs.readdirSync(dirPath);

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
          arrayOfFiles = getAllMarkdownFiles(filePath, arrayOfFiles);
        } else if (file.endsWith('.md')) {
          arrayOfFiles.push(filePath);
        }
      });

      return arrayOfFiles;
    };

    const expertiseDir = path.join(process.cwd(), 'src/playbook/expertise');
    const expertiseFiles = getAllMarkdownFiles(expertiseDir);

    const dynamicExpertisePages = expertiseFiles.map((file) => {
      const fileName = path.basename(file, '.md');
      return `/playbook/expertise/${fileName}`;
    });

    const blogDir = path.join(process.cwd(), 'src/playbook/insights');
    const blogFiles = getAllMarkdownFiles(blogDir);

    const dynamicBlogPages = blogFiles.map((file) => {
      const fileName = path.basename(file, '.md');
      return `/playbook/insights/${fileName}`;
    });

    const solutionsDir = path.join(process.cwd(), 'src/cases');
    const solutionsFiles = getAllMarkdownFiles(solutionsDir);

    const dynamicSolutionsPages = solutionsFiles.map((file) => {
      const fileName = path.basename(file, '.md');
      return `/cases/${fileName}`;
    });

    const allPaths = [
      ...staticPages.map((loc) => ({
        loc,
        changefreq: 'daily',
        priority: 1.0,
      })),
      ...dynamicExpertisePages.map((loc) => ({
        loc,
        changefreq: 'daily',
        priority: 0.8,
      })),
      ...dynamicBlogPages.map((loc) => ({
        loc,
        changefreq: 'daily',
        priority: 0.8,
      })),
      ...dynamicSolutionsPages.map((loc) => ({
        loc,
        changefreq: 'daily',
        priority: 0.8,
      })),
    ];

    return allPaths;
  },

  exclude: [
    '/_next/*',
    '/tpost/*',
    '/products/*',
    '/services/*',
    '/search/*',
    '/lander/*',
    '/collections/*',
    '/main/*',
    '/about',
    '*.md',
    '/solutions',
    '/404',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/*.js', '/*.css', '/_next/static/media/*', '*tag=*', '*sub-category=*'],
        disallow: [
          '/_next/data/*',
          '/_next/image*',
          '/search/*',
          '*?pr_prod_strat=',
          '*?target_origin=',
          '/account/',
          '*.md',
          '/main/',
          '/*?target_origin=',
          '/*checkout_version=',
        ],
      },

      // AI crawlers — explicitly allowed for AEO visibility
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },

      // Social media crawlers
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'Facebot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },

      // SEO tools — allowed
      { userAgent: 'AhrefsBot', allow: '/' },
      { userAgent: 'SEMrushBot', allow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'megaindex.com', allow: '/' },

      // Bad bots — blocked
      { userAgent: 'RookeeBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
    ],
    additionalSitemaps: ['https://thebrightbyte.com/sitemap.xml'],
  },
};

export default config;
