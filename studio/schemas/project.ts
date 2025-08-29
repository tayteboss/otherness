import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {CaseIcon} from '@sanity/icons'
import {
  imageObject,
  mobileImageObject,
  mobileVideoObject,
  projectImageBlocks,
  selectMediaTypeObject,
  videoObject,
} from '../objects'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  preview: {
    select: {
      subtitle: 'tagline',
      title: 'title',
    },
  },
  fields: [
    orderRankField({type: 'project'}),
    {
      title: 'Archive Project',
      name: 'archiveProject',
      type: 'boolean',
    },
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
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Open Graph Image',
      name: 'openGraphImage',
      type: 'image',
      description: 'IMPORTANT: Ensure image is 1200x630px and jpg',
    },
    {
      title: 'Thumbnail Media',
      name: 'thumbnailMedia',
      type: 'object',
      fields: [
        selectMediaTypeObject,
        {
          ...imageObject,
          hidden: ({document}: any) => document?.thumbnailMedia?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({document}: any) => document?.thumbnailMedia?.mediaType !== 'video',
        },
      ],
    },
    {
      title: 'Related Cover Media',
      name: 'relatedDesktopMedia',
      type: 'object',
      fields: [
        selectMediaTypeObject,
        {
          ...imageObject,
          hidden: ({document}: any) => document?.relatedDesktopMedia?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({document}: any) => document?.relatedDesktopMedia?.mediaType !== 'video',
        },
      ],
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
    {
      title: 'Collaborators',
      name: 'collaborators',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: () => '👥',
          fields: [
            {title: 'Title', name: 'title', type: 'string'},
            {title: 'URL', name: 'url', type: 'url'},
          ],
        },
      ],
    },
    {
      title: 'Type',
      name: 'type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Strategy', value: 'strategy'},
          {title: 'Branding', value: 'branding'},
          {title: 'Packaging', value: 'packaging'},
          {title: 'Art Direction', value: 'art-direction'},
          {title: 'Digital', value: 'digital'},
        ],
        layout: 'checkbox',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Mood',
      name: 'mood',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Artsy', value: 'artsy'},
          {title: 'Cheeky', value: 'cheeky'},
          {title: 'Bookish', value: 'bookish'},
          {title: 'Luxxy', value: 'luxxy'},
          {title: 'Technical', value: 'technical'},
          {title: 'Professh', value: 'professh'},
          {title: 'Vivacious', value: 'vivacious'},
        ],
        layout: 'checkbox',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Hero Layout Type',
      name: 'heroLayoutType',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'fullWidth'},
          {title: 'Two Column', value: 'twoColumn'},
        ],
        layout: 'dropdown',
      },
    },
    {
      title: 'Full Width Hero',
      name: 'fullWidthHero',
      type: 'object',
      hidden: ({document}: any) => document?.heroLayoutType !== 'fullWidth',
      fields: [
        selectMediaTypeObject,
        {
          ...imageObject,
          hidden: ({document}: any) => document?.fullWidthHero?.mediaType !== 'image',
        },
        {
          ...mobileImageObject,
          hidden: ({document}: any) => document?.fullWidthHero?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({document}: any) => document?.fullWidthHero?.mediaType !== 'video',
        },
        {
          ...mobileVideoObject,
          hidden: ({document}: any) => document?.fullWidthHero?.mediaType !== 'video',
        },
      ],
    },
    {
      title: 'Two Column Hero',
      name: 'twoColumnHero',
      type: 'object',
      hidden: ({document}: any) => document?.heroLayoutType !== 'twoColumn',
      fields: [
        {
          title: 'Left Block',
          name: 'leftBlock',
          type: 'object',
          fields: [
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({document}: any) =>
                document?.twoColumnHero?.leftBlock?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({document}: any) =>
                document?.twoColumnHero?.leftBlock?.mediaType !== 'video',
            },
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
              hidden: ({document}: any) =>
                document?.twoColumnHero?.rightBlock?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({document}: any) =>
                document?.twoColumnHero?.rightBlock?.mediaType !== 'video',
            },
          ],
        },
      ],
    },
    projectImageBlocks,
    {
      title: 'Sub Projects',
      name: 'subProjects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'subProject'}],
        },
      ],
    },
    {
      title: 'Related Project',
      name: 'relatedProject',
      type: 'reference',
      to: [{type: 'project'}],
    },
  ],
}
