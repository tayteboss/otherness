const { createClient } = require('@sanity/client');
// Published, uncached reads only. No token is necessary for this public dataset.
function createRedesignClient() {
	return createClient({
		projectId: 'vdwu088q',
		dataset: 'production',
		apiVersion: '2024-01-01',
		useCdn: false,
		perspective: 'published'
	});
}
module.exports = { createRedesignClient };
