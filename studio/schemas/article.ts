import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { CaseIcon } from '@sanity/icons';
import { imageObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: 'Article',
	name: 'article',
	type: 'document',
	icon: CaseIcon,
	orderings: [orderRankOrdering],
	preview: {
		select: {
			subtitle: 'excerpt',
			title: 'title',
		},
	},
	fields: [
		orderRankField({ type: "article" }),
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
			title: 'Thumbnail Media',
			name: 'thumbnailMedia',
			type: 'object',
			fields: [
				selectMediaTypeObject,
				{
					...imageObject,
					hidden: ({ document }: any) => document?.thumbnailMedia?.mediaType !== 'image',
				},
				{
					...videoObject,
					hidden: ({ document }: any) => document?.thumbnailMedia?.mediaType !== 'video',
				}
			],
		},
		{
			title: 'Excerpt',
			name: 'excerpt',
			type: 'string',
		},
		{
			title: 'Tag',
			name: 'tag',
			type: 'string',
		},
		{
			title: 'Author',
			name: 'author',
			type: 'string',
		},
		{
			title: 'Author URL',
			name: 'authorUrl',
			type: 'url',
			description: 'Optional external URL.'
		},
		{
			title: 'Theme',
			name: 'theme',
			type: 'string',
			options: {
				list: [
					{ title: 'Light', value: 'light' },
					{ title: 'Dark', value: 'dark' }
				]
			}
		},
		{
			title: 'Page Builder',
			name: 'pageBuilder',
			type: 'array',
			of: [
				{type: 'pbRichText'},
				{type: 'pbMedia'},
				{type: 'pbTestimonial'},
			]
		},
		{
			title: 'Related Article',
			name: 'relatedArticle',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'article' }]
				}
			]
		}
	]
}
