import { ImageIcon } from '@sanity/icons';
import { imageObject, linkObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: 'CTA Banner',
	name: 'pbCtaBanner',
	type: 'document',
	icon: ImageIcon,
	preview: {
		select: {
			title: 'title',
		},
	},
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Link',
			name: 'link',
			type: 'object',
			fields: linkObject
		},
		{
			title: 'Media',
			name: 'media',
			type: 'object',
			fields: [
				selectMediaTypeObject,
				{
					...imageObject,
					hidden: ({ parent }: { parent: { mediaType: string } }) => parent.mediaType !== 'image',
				},
				{
					...videoObject,
					hidden: ({ parent }: { parent: { mediaType: string } }) => parent.mediaType !== 'video',
				},
			],
		},
	]
}
