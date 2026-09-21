// Use require (CommonJS) to import the plugin
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // Only enable when ANALYZE env var is 'true'
});
const isPreview = require('./config/isPreview');

const nextConfig = {
	env: {
		NEXT_PUBLIC_REDESIGN_ORIGIN: process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
			? `https://${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}`
			: process.env.SITE_URL || 'http://localhost:3010',
	},
	async headers() {
		return isPreview()
			? [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] }]
			: [];
	},
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        pathname: '/**',
      },
    ],
    loader: 'custom',
    loaderFile: './lib/sanityImageLoader.ts',
  },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
};

// Use module.exports (CommonJS) to export the wrapped config
module.exports = withBundleAnalyzer(nextConfig);
