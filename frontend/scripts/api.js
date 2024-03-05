const fetch = require('node-fetch');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
	path: '.env.local',
});

const fetchAPI = async (query, { variables } = {}) => {
	const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/default`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
		},
		body: JSON.stringify({
			query,
			variables,
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const json = await response.json();

	return json.data;
};

const getSiteData = async () => {
	const query = `
		query {
			allSiteSettings {
				
			}
		}
	`;

	const data = await fetchAPI(query);
	if (!data) {
		return [];
	}

	const path = 'json';
	const file = 'siteSettings.json';
	const jsonData = JSON.stringify(data?.allSiteSettings[0]);

	fs.writeFile(`${path}/${file}`, jsonData, 'utf8', () => {
		console.log(`Wrote ${file} file.`);
	});

	return data;
};

module.exports = {
	getSiteData,
};
