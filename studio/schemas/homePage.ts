import { HomeIcon } from '@sanity/icons';
import { imageObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: "Home Page",
	name: "homePage",
	type: "document",
	icon: HomeIcon,
	fields: [
		{
			title: 'Reference Title',
			name: 'referenceTitle',
			type: 'string',
			description: 'This is an internal reference title.'
		},
		{
			title: 'SEO Title',
			name: 'seoTitle',
			type: 'string',
			description: 'This is the SEO title that appears in search engines.'
		},
		{
			title: 'SEO Description',
			name: 'seoDescription',
			type: 'string',
			description: 'This is the SEO description that appears in search engines.'
		},
		{
			title: 'Hero Title',
			name: 'heroTitle',
			type: 'string',
		},
		{
			title: 'Hero Description',
			name: 'heroDescription',
			type: 'string',
		},
		{
			title: 'Hero Link',
			name: 'button',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Title',
					type: 'string',
					validation: (Rule: any) => Rule.required(),
				},
				{
					name: 'url',
					title: 'URL',
					type: 'url',
					validation: (Rule: any) => Rule.uri({ allowRelative: true }),
				}
			]
		},
		{
			title: 'Hero Media',
			name: 'heroMedia',
			type: 'object',
			hidden: ({ document }: any) => document?.heroLayoutType !== 'fullWidth',
			fields: [
				selectMediaTypeObject,
				{
					...imageObject,
					hidden: ({ document }: any) => document?.heroMedia?.mediaType !== 'image',

				},
				{
					...videoObject,
					hidden: ({ document }: any) => document?.heroMedia?.mediaType !== 'video',
				}
			],
		}
	]
}