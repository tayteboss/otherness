const selectMediaTypeObject = {
	title: 'Select Media Type',
	name: 'mediaType',
	type: 'string',
	options: {
		list: [
			{ title: 'Image', value: 'image' },
			{ title: 'Video', value: 'video' }
		],
		layout: 'dropdown'
	},
	initialValue: 'image'
};

const imageObject = {
	title: 'Image',
	name: 'image',
	type: 'image',
	fields: [
		{
			name: 'alt',
			type: 'string',
			title: 'Alt Text'
		}
	]
};

const videoObject = {
	title: 'Video',
	name: 'video',
	type: 'mux.video',
};

const imageComponentOneHalfOneXSmall = {
    title: 'One Half One XSmall',
    name: 'imageComponentOneHalfOneXSmall',
    type: 'image',
    fields: [
        selectMediaTypeObject,
        {
            ...imageObject,
            hidden: ({ parent }: any) => parent?.mediaType !== 'image',
        },
        {
            ...videoObject,
            hidden: ({ parent }: any) => parent?.mediaType !== 'video',
        }
    ],
};

const imageComponentOneXSmall = {
	title: 'One X Small',
	name: 'imageComponentOneXSmall',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentTwoXSmall = {
	title: 'Two X Small',
	name: 'imageComponentTwoXSmall',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentOneHalf = {
	title: 'One Half',
	name: 'imageComponentOneHalf',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentEditorialBig = {
	title: 'Editorial Big',
	name: 'imageComponentEditorialBig',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentOneBigTwoSmall = {
	title: 'One Big Two Small',
	name: 'imageComponentOneBigTwoSmall',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentOneEditorial = {
	title: 'One Editorial',
	name: 'imageComponentOneEditorial',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentLandscape = {
	title: 'Landscape',
	name: 'imageComponentLandscape',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentOneSmallPortraitMedium = {
	title: 'One Small Portrait Medium',
	name: 'imageComponentOneSmallPortraitMedium',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentTwoSmall = {
	title: 'Two Small',
	name: 'imageComponentTwoSmall',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentSmallPortrait = {
	title: 'Small Portrait',
	name: 'imageComponentSmallPortrait',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentFull = {
	title: 'Full',
	name: 'imageComponentFull',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const imageComponentOneSmallLandscape = {
	title: 'One Small Landscape',
	name: 'imageComponentOneSmallLandscape',
	type: 'image',
	fields: [
		selectMediaTypeObject,
		imageObject,
		videoObject
	]
}

const pageReferencesList = [
	{ type: 'homePage' }, { type: 'workPage' }, { type: 'conversationsPage' }, { type: 'whatToExpectPage' }
]

const pageReferences = {
	title: 'Page Reference',
	name: 'pageReference',
	type: 'reference',
	to: pageReferencesList,
	description: 'Please use either a page reference or an external URL.'
};

const linkObject = [
	{
		title: 'Title',
		name: 'title',
		type: 'string',
		validation: (Rule: any) => Rule.required(),
	},
	{
		title: 'External URL',
		name: 'url',
		type: 'url',
		validation: (Rule: any) => Rule.uri({ allowRelative: true }),
		description: 'Please use either a page reference or an external URL.'
	},
	pageReferences
];

const furtherReadingObject = {
	title: 'Further Reading',
	name: 'furtherReading',
	type: 'object',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Page Reference',
			name: 'pageReference',
			type: 'reference',
			to: pageReferencesList,
		}
	]
}

export {
	selectMediaTypeObject,
	imageObject,
	videoObject,
	imageComponentOneHalfOneXSmall,
	imageComponentOneXSmall,
	imageComponentTwoXSmall,
	imageComponentOneHalf,
	imageComponentEditorialBig,
	imageComponentOneBigTwoSmall,
	imageComponentOneEditorial,
	imageComponentLandscape,
	imageComponentOneSmallPortraitMedium,
	imageComponentTwoSmall,
	imageComponentSmallPortrait,
	imageComponentFull,
	imageComponentOneSmallLandscape,
	pageReferences,
	linkObject,
	furtherReadingObject
};