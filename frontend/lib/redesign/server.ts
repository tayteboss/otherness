import { createRedesignClient } from './client';
import { redesignQuery, settingsQuery } from './queries';
import { contentIssues } from './validation';
import type { RedesignData, RedesignSettings } from './types';

// Call only from Pages Router getStaticProps. Data is published at build time,
// never read from the legacy json/siteSettings.json or exposed through a write API.
export async function getRedesignData(
	options: { release?: boolean } = {}
): Promise<RedesignData> {
	if (typeof window !== 'undefined')
		throw new Error('Redesign data must be loaded on the server.');
	const data = await createRedesignClient().fetch<RedesignData>(
		redesignQuery
	);
	const issues = contentIssues(data);
	if (options.release && issues.length)
		throw new Error(`Redesign content is not ready:\n${issues.join('\n')}`);
	return data;
}
export async function getRedesignSettings(): Promise<RedesignSettings | null> {
	if (typeof window !== 'undefined')
		throw new Error('Redesign settings must be loaded on the server.');
	return createRedesignClient().fetch<RedesignSettings | null>(settingsQuery);
}
