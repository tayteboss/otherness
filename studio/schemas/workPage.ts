import { HomeIcon } from '@sanity/icons';
import { imageObject, linkObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: "Work Page",
	name: "workPage",
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
			title: 'CTA Banner Title',
			name: 'ctaBannerTitle',
			type: 'string',
		},
		{
			title: 'CTA Banner Link',
			name: 'ctaBannerLink',
			type: 'object',
			fields: linkObject
		},
		{
			title: 'CTA Banner Media',
			name: 'ctaBannerMedia',
			type: 'object',
			fields: [
				selectMediaTypeObject,
				{
					...imageObject,
					hidden: ({ document }: any) => document?.ctaBannerMedia?.mediaType !== 'image',
				},
				{
					...videoObject,
					hidden: ({ document }: any) => document?.ctaBannerMedia?.mediaType !== 'video',
				},
			],
		},
	]
}