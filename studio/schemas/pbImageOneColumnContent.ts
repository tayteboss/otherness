import {BlockContentIcon} from '@sanity/icons'
import {selectMediaTypeObject, imageObject, videoObject} from '../objects'

export default {
  title: 'Image & One Column Content',
  name: 'pbImageOneColumnContent',
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
          hidden: ({parent}: {parent: {mediaType: string}}) => parent.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({parent}: {parent: {mediaType: string}}) => parent.mediaType !== 'video',
        },
      ],
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Normal', value: 'normal'},
          ],
          lists: [],
          marks: {
            decorators: [],
          },
        },
      ],
    },
  ],
}
