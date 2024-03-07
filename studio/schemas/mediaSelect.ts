import { ImageIcon } from '@sanity/icons';

export default {
  title: 'Media Select',
  name: 'mediaSelect',
  type: 'document',
  icon: ImageIcon,
  fields: [
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
      title: 'Media',
      name: 'media',
      type: 'image',
      hidden: ({ document }: any) => document?.mediaType !== 'image', // Hide if mediaType is not 'image'
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
      hidden: ({ document }: any) => document?.mediaType !== 'video' // Hide if mediaType is not 'video'
    }
  ]
}
