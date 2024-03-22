import {projectImageBlocks} from '../objects'

export default {
  title: 'Sub Project',
  name: 'subProject',
  type: 'document',
  fields: [
    {
      title: 'Label',
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
      type: 'text',
    },
    projectImageBlocks,
  ],
}
