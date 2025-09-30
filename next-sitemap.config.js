/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.namakwala.com',
  generateRobotsTxt: true, // optional
  sitemapSize: 5000, // max URLs per sitemap file
  changefreq: 'daily',  // optional
  priority: 0.7,        // optional
  exclude: ['/admin/*'], // optional
};
