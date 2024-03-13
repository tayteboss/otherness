import { NumberIcon } from '@sanity/icons';
import { imageObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: "Statistic Block",
	name: "statisticBlock",
	type: "document",
	icon: NumberIcon,
	fields: [
		{
			title: 'Statistic Title',
			name: 'statisticTitle',
			type: 'string',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string',
		},
		{
			title: 'Size',
			name: 'size',
			type: 'string',
			options: {
				list: [
					{ title: 'Small', value: 'small' },
					{ title: 'Medium', value: 'medium' },
				]
			}
		},
		selectMediaTypeObject,
		{
			...imageObject,
			hidden: ({ parent }: any) => parent?.mediaType !== 'image',
		},
		{
			...videoObject,
			hidden: ({ parent }: any) => parent?.mediaType !== 'video',
		}
	]
}