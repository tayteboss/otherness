const isPreview = require('./config/isPreview');
let robotsPolicy = [{ userAgent: '*', allow: '/' }];
if (isPreview()) {
	robotsPolicy = [{ userAgent: '*', disallow: '/' }];
}

module.exports = {
	siteUrl: process.env.SITE_URL || 'https://localhost:3000',
	generateRobotsTxt: true,
	robotsTxtOptions: {
		policies: robotsPolicy,
	},
};
