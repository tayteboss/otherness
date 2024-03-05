import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
	title: 'Project',
	name: 'project',
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: "project" }),
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 200,
				slugify: (input: string) => input
						.toLowerCase()
						.replace(/\s+/g, '-')
						.slice(0, 200)
			},
			validation: (Rule: any) => Rule.required()
		},
		{
			title: 'SEO Description',
			name: 'seoDescription',
			type: 'string',
		},
	]
}