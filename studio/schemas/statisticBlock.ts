import { NumberIcon } from '@sanity/icons';

export default {
	title: "Statistic Block",
	name: "statisticBlock",
	type: "document",
	icon: NumberIcon,
	fields: [
		{
			title: 'Reference Title',
			name: 'referenceTitle',
			type: 'string',
			description: 'This is an internal reference title.'
		},
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
					{ title: 'Large', value: 'large' }
				]
			}
		},
	]
}