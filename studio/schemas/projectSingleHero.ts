import { ImageIcon } from '@sanity/icons';

export default {
	title: 'Project Single Hero',
	name: 'projectSingleHero',
	type: 'document',
	icon: ImageIcon,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'This is an internal reference title.',
			initialValue: 'One Column (Image)'
		},
		{
			title: 'Select Media Type',
			name: 'mediaType',
			type: 'string',
			options: {
			  list: [
				{ title: 'Image', value: 'image' },
				{ title: 'Video', value: 'video' }
			  ],
			  layout: 'dropdown'
			}
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			hidden: ({ document }: any) => document?.mediaType !== 'image',
			fields: [
			  {
				name: 'alt',
				type: 'string',
				title: 'Alt Text'
			  }
			]
		  },
		  {
			title: 'Video',
			name: 'video',
			type: 'mux.video',
			hidden: ({ document }: any) => document?.mediaType !== 'video'
		  }
	]
}