import { ImageIcon } from '@sanity/icons';
import { imageObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: 'Media',
	name: 'pbMedia',
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
			description: 'This is an internal reference title.',
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
				},
				{
					title: 'Caption',
					name: 'caption',
					type: 'string',
				}
			],
		},
	]
}
