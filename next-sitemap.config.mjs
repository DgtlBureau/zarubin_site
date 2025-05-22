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
      '/about',
      '/career',
      '/comparison',
      '/playbook',
      '/playbook/expertise',
      '/playbook/insights',
      '/solutions',
      '/policy',
      '/investments',
      '/brief',
      '/playbook/expertise/rss.xml',
      '/playbook/insights/rss.xml',
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
      return `/solutions/${fileName}`;
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
    '/assets/*',
    '/_next/*',
    '/tpost/*',
    '/products/*',
    '/services/*',
    '/search/*',
    '/lander/*',
    '/collections/*',
    '/expertise/*',
    '/insights/*',
    '/main/*',
    '*.md',
    '/404',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/*.js', '/*.css', '*tag=*', '*sub-category=*'],
        disallow: [
          '/assets/*',
          '/_next/*',
          '/tpost/*',
          '/products/*',
          '/services/*',
          '/search/*',
          '/lander/*',
          '/collections/*',
          '*?pr_prod_strat=',
          '*?target_origin=',
          '/account/',
          '*.md',
          '*.md$',
          '/*.webp',
          '/*.gif',
          '/*.jpg',
          '/*.png',
          '/expertise/',
          '/insights/',
          '/main/',
          '/blog',
        ],
      },

      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'Facebot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'RookeeBot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SEMrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'YandexBot', disallow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'megaindex.com', disallow: '/' },
    ],
    additionalSitemaps: ['https://thebrightbyte.com/sitemap.xml'],
  },
};

export default config;
