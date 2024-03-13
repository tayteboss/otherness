import { BlockContentIcon } from '@sanity/icons';
import { selectMediaTypeObject, imageObject, videoObject } from '../objects';

export default {
	title: 'Image & Multiple Column Content',
	name: 'pbImageMultiColumnContent',
	type: 'document',
	icon: BlockContentIcon,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'This is an internal reference title.',
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
				}
			],
		},
		{
            title: 'Columns',
            name: 'columns',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'column',
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'string',
                        },
                        {
                            title: 'Description',
                            name: 'description',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
	]
}