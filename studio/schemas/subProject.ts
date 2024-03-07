import { imageComponentOneHalfOneXSmall, imageComponentOneXSmall, imageComponentTwoXSmall, imageComponentOneHalf, imageComponentEditorialBig, imageComponentLandscape, imageComponentOneBigTwoSmall, imageComponentOneEditorial, imageComponentOneSmallLandscape, imageComponentOneSmallPortraitMedium, imageComponentSmallPortrait, imageComponentTwoSmall, imageComponentFull } from "../objects";

export default {
	title: 'Sub Project',
	name: 'subProject',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Description',
			name: 'description',
			type: 'array',
			of: [{ type: 'block' }],
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
						// Conditional fields for editing the selected image component
						imageComponentOneHalfOneXSmall,
						imageComponentOneXSmall,
						imageComponentTwoXSmall,
						imageComponentOneHalf,
						imageComponentEditorialBig,
						imageComponentLandscape,
						imageComponentOneBigTwoSmall,
						imageComponentOneEditorial,
						imageComponentOneSmallLandscape,
						imageComponentOneSmallPortraitMedium,
						imageComponentSmallPortrait,
						imageComponentTwoSmall,
						imageComponentFull,
						
					],
				}
			]
		},
	]
}