const isPreview = require('./config/isPreview');
let robotsPolicy = [{ userAgent: '*', allow: '/' }];
if (isPreview()) {
	robotsPolicy = [{ userAgent: '*', disallow: '/' }];
}

module.exports = {
	siteUrl: process.env.SITE_URL || 'https://localhost:3000',
	generateRobotsTxt: true,
	exclude: process.env.VERCEL_ENV === 'production' ? ['/working-together'] : [],
	robotsTxtOptions: {
		policies: robotsPolicy,
	},
};
