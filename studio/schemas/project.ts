import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { imageComponentEditorialBig, imageComponentFull, imageComponentLandscape, imageComponentOneBigTwoSmall, imageComponentOneEditorial, imageComponentOneHalf, imageComponentOneHalfOneXSmall, imageComponentOneSmallLandscape, imageComponentOneSmallPortraitMedium, imageComponentOneXSmall, imageComponentSmallPortrait, imageComponentTwoSmall, imageComponentTwoXSmall, imageObject, selectMediaTypeObject, videoObject } from '../objects';

export default {
	title: 'Project',
	name: 'project',
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: "project" }),
		{
			title: 'Client',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 200,
				slugify: (input: string) => input
						.toLowerCase()
						.replace(/\s+/g, '-')
						.slice(0, 200)
			},
			validation: (Rule: any) => Rule.required()
		},
		{
			title: 'Thumbnail Image',
			name: 'thumbnailImage',
			type: 'image',
		},
		{
			title: 'Tagline',
			name: 'tagline',
			type: 'string',
		},
		{
			title: 'Excerpt',
			name: 'excerpt',
			type: 'string',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string',
		},
		{
			title: 'Collaborators',
			name: 'collaborators',
			type: 'array',
			of: [
				{
					type: 'object',
					icon: () => '👥',
					fields: [
						{ title: 'Title', name: 'title', type: 'string' },
						{ title: 'URL', name: 'url', type: 'url' },
					],
				},
			],
		},
		{
			title: 'Type',
			name: 'type',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Strategy', value: 'strategy' },
					{ title: 'Branding', value: 'branding' },
					{ title: 'Packaging', value: 'packaging' },
					{ title: 'Art Direction', value: 'art-direction' },
					{ title: 'Digital', value: 'digital' },
				],
				layout: 'checkbox'
			},
			validation: (Rule: any) => Rule.required()
		},
		{
			title: 'Mood',
			name: 'mood',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				list: [
					{ title: 'Artsy', value: 'strategy' },
					{ title: 'Bombastic', value: 'bombastic' },
					{ title: 'Bookish', value: 'bookish' },
					{ title: 'Luxxy', value: 'luxxy' },
					{ title: 'Technical', value: 'technical' },
					{ title: 'Profesh', value: 'profesh' },
					{ title: 'Vivacious', value: 'vivacious' },
				],
				layout: 'checkbox'
			},
			validation: (Rule: any) => Rule.required()
		},
		{
			title: 'Hero Layout Type',
			name: 'heroLayoutType',
			type: 'string',
			options: {
				list: [
					{ title: 'Full Width', value: 'fullWidth' },
					{ title: 'Two Column', value: 'twoColumn' },
				],
				layout: 'dropdown'
			}
		},
		{
			title: 'Full Width Hero',
			name: 'fullWidthHero',
			type: 'object',
			hidden: ({ document }: any) => document?.heroLayoutType !== 'fullWidth',
			fields: [
				selectMediaTypeObject,
				{
					...imageObject,
					hidden: ({ document }: any) => document?.fullWidthHero?.mediaType !== 'image',
				},
				{
					...videoObject,
					hidden: ({ document }: any) => document?.fullWidthHero?.mediaType !== 'video',
				}
			],
		},
		{
			title: 'Two Column Hero',
			name: 'twoColumnHero',
			type: 'object',
			hidden: ({ document }: any) => document?.heroLayoutType !== 'twoColumn',
			fields: [
				{
					title: 'Left Block',
					name: 'leftBlock',
					type: 'object',
					fields: [
						selectMediaTypeObject,
						{
							...imageObject,
							hidden: ({ document }: any) => document?.twoColumnHero?.leftBlock?.mediaType !== 'image',
						},
						{
							...videoObject,
							hidden: ({ document }: any) => document?.twoColumnHero?.leftBlock?.mediaType !== 'video',
						}
					],
				},
				{
					title: 'Right Block',
					name: 'rightBlock',
					type: 'object',
					fields: [
						selectMediaTypeObject,
						{
							...imageObject,
							hidden: ({ document }: any) => document?.twoColumnHero?.rightBlock?.mediaType !== 'image',
						},
						{
							...videoObject,
							hidden: ({ document }: any) => document?.twoColumnHero?.rightBlock?.mediaType !== 'video',
						}
					],
				},
			],
			options: { collapsible: true }
		},
		{
			title: 'Image Blocks',
			name: 'imageBlocks',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							title: 'Select Image Component',
							name: 'imageComponent',
							type: 'string',
							options: {
								list: [
									{ title: 'One Half One XSmall', value: 'imageComponentOneHalfOneXSmall' },
									{ title: 'One XSmall', value: 'imageComponentOneXSmall' },
									{ title: 'Two XSmall', value: 'imageComponentTwoXSmall' },
									{ title: 'One Half', value: 'imageComponentOneHalf' },
									{ title: 'Editorial Big', value: 'imageComponentEditorialBig' },
									{ title: 'Landscape', value: 'imageComponentLandscape' },
									{ title: 'One Big Two Small', value: 'imageComponentOneBigTwoSmall' },
									{ title: 'One Editorial', value: 'imageComponentOneEditorial' },
									{ title: 'One Small Landscape', value: 'imageComponentOneSmallLandscape' },
									{ title: 'One Small Portrait Medium', value: 'imageComponentOneSmallPortraitMedium' },
									{ title: 'Small Portrait', value: 'imageComponentSmallPortrait' },
									{ title: 'Two Small', value: 'imageComponentTwoSmall' },
									{ title: 'Full', value: 'imageComponentFull' },
								],
								layout: 'dropdown'
							}
						},
						{
							name: 'imageComponentOneHalfOneXSmall',
							title: 'One Half One XSmall',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneHalfOneXSmall',
						},
						{
							name: 'imageComponentOneXSmall',
							title: 'One XSmall',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneXSmall',
						},
						{
							name: 'imageComponentTwoXSmall',
							title: 'Two XSmall',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentTwoXSmall',
						},
						{
							name: 'imageComponentOneHalf',
							title: 'One Half',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneHalf',
						},
						{
							name: 'imageComponentEditorialBig',
							title: 'Editorial Big',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentEditor'
						},
						{
							name: 'imageComponentLandscape',
							title: 'Landscape',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentLandscape',
						},
						{
							name: 'imageComponentOneBigTwoSmall',
							title: 'One Big Two Small',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneBigTwoSmall',
						},
						{
							name: 'imageComponentOneEditorial',
							title: 'One Editorial',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneEditorial',
						},
						{
							name: 'imageComponentOneSmallLandscape',
							title: 'One Small Landscape',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneSmallLandscape',
						},
						{
							name: 'imageComponentOneSmallPortraitMedium',
							title: 'One Small Portrait Medium',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentOneSmallPortraitMedium',
						},
						{
							name: 'imageComponentSmallPortrait',
							title: 'Small Portrait',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentSmallPortrait',
						},
						{
							name: 'imageComponentTwoSmall',
							title: 'Two Small',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentTwoSmall',
						},
						{
							name: 'imageComponentFull',
							title: 'Full',
							type: 'object',
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
							hidden: ({ parent }: { parent: any }) => parent?.imageComponent !== 'imageComponentFull',
						},
					],
				}
			]
		},
		{
			title: 'Sub Projects',
			name: 'subProjects',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'subProject' }]
				}
			]
		},
		{
			title: 'Related Project',
			name: 'relatedProject',
			type: 'reference',
			to: [{ type: 'project' }]
		}
	]
}
