/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yakitori-site.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
};