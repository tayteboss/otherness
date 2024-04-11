import {projectImageBlocks} from '../objects'

export default {
  title: 'Sub Project',
  name: 'subProject',
  type: 'document',
  fields: [
    {
      title: 'Anchor Title',
      name: 'label',
      type: 'string',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [{title: 'Emphasis', value: 'em'}],
            annotations: [],
          },
        },
      ],
    },
    projectImageBlocks,
  ],
}
