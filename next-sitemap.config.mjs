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
    '/soltions',
    '/404',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/*.js', '/*.css', '*tag=*', '*sub-category=*'],
        disallow: [
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
          '/main/',
          '/blog',
          '/about',
          '/_next/static/media/',
          '/assets/video/',
          '/*?target_origin=',
          '/*checkout_version=',
        ],
      },

      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'Facebot', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'RookeeBot', disallow: '/' },
      { userAgent: 'AhrefsBot', allow: '/' },
      { userAgent: 'SEMrushBot', allow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'Screaming Frog SEO Spider', disallow: '/' },
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'YandexBot', allow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'megaindex.com', allow: '/' },
    ],
    additionalSitemaps: ['https://thebrightbyte.com/sitemap.xml'],
  },
};

export default config;
