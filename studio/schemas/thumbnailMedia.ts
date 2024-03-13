import { ImagesIcon } from '@sanity/icons';

export default {
	title: "Thumbnail Media",
	name: "thumbnailMedia",
	type: "object",
	icon: ImagesIcon,
	fields: [
		{
			title: 'Desktop Image',
			name: 'desktopImage',
			type: 'image',
			fields: [
				{
					title: 'Alt',
					name: 'alt',
					type: 'string',
				}
			],
			description: 'Please use an image or video, not both.'
		},
		{
			title: 'Mobile Image',
			name: 'mobileImage',
			type: 'image',
			description: 'Please use an image or video, not both.'
		},
		{
			title: 'Desktop Video',
			name: 'desktopVideo',
			type: 'mux.video',
			description: 'Please use an image or video, not both.'
		},
		{
			title: 'Mobile Video',
			name: 'mobileVideo',
			type: 'mux.video',
			description: 'Please use an image or video, not both.'
		},
	]
}