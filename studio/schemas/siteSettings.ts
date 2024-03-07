export default {
	title: "Site Settings",
	name: "siteSettings",
	type: "document",
	fields: [
		{
			title: 'Title',
			name: 'referenceTitle',
			type: 'string',
			description: 'This is an internal reference title.',
			initialValue: 'Site Settings'
		},
		{
			title: 'Tagline',
			name: 'tagline',
			type: 'string',
			description: 'This is the tagline that appears in the footer.'
		},
		{
			title: 'Footer Consultation CTA',
			name: 'footerConsultationCta',
			type: 'string',
		},
		{
			title: 'Instagram URL',
			name: 'instagramUrl',
			type: 'url',
		},
		{
			title: 'Twitter URL',
			name: 'twitterUrl',
			type: 'url',
		},
		{
			title: 'LinkedIn URL',
			name: 'linkedInUrl',
			type: 'url',
		},
	]
}