import { getRedesignSettings } from './server';

// Additive page props: legacy page data and metadata overrides stay intact.
export async function getRedesignShellProps() {
	const origin = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
	return {
		redesignSettings: await getRedesignSettings(),
		redesignOrigin: origin
			? `https://${origin}`
			: process.env.SITE_URL || 'http://localhost:3010'
	};
}
