// Shared by Next.js response headers and next-sitemap. This only affects this
// checkout/deployment; staging keeps its existing branch and configuration.
module.exports = function isPreview(env = process.env) {
	return (
		env.REDESIGN_PREVIEW === '1' ||
		env.VERCEL_ENV === 'preview' ||
		['staging', 'development'].includes(env.NEXT_PUBLIC_ENVIRONMENT)
	);
};
