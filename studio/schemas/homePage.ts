import {HomeIcon} from '@sanity/icons'
import {
  homeBlocks,
  imageObject,
  linkObject,
  pageReferences,
  selectMediaTypeObject,
  videoObject,
} from '../objects'

export default {
  title: 'Home Page',
  name: 'homePage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO Title',
      name: 'seoTitle',
      type: 'string',
      description: 'This is the SEO title that appears in search engines.',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
      description: 'This is the SEO description that appears in search engines.',
    },
    {
      title: 'Hero Title',
      name: 'heroTitle',
      type: 'string',
    },
    {
      title: 'Mobile Hero Title',
      name: 'mobileHeroTitle',
      type: 'string',
    },
    {
      title: 'Hero Description',
      name: 'heroDescription',
      type: 'string',
    },
    {
      title: 'Mobile Hero Description',
      name: 'mobileHeroDescription',
      type: 'string',
    },
    {
      title: 'Hero Link',
      name: 'button',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (Rule: any) => Rule.uri({allowRelative: true}),
        },
      ],
    },
    {
      title: 'Hero Media',
      name: 'heroMedia',
      type: 'object',
      fields: [
        selectMediaTypeObject,
        {
          ...imageObject,
          hidden: ({document}: any) => document?.heroMedia?.mediaType !== 'image',
        },
        {
          ...videoObject,
          hidden: ({document}: any) => document?.heroMedia?.mediaType !== 'video',
        },
      ],
    },
    {
      title: 'What to Expect Title',
      name: 'whatToExpectTitle',
      type: 'string',
    },
    {
      title: 'What to Expect Content',
      name: 'whatToExpectContent',
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
    {
      title: 'What to Expect Button',
      name: 'whatToExpectButton',
      type: 'object',
      fields: linkObject,
    },
    {
      title: 'Services List',
      name: 'servicesList',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    },
    homeBlocks,
    {
      title: 'Featured Conversations',
      name: 'featuredConversations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
        },
      ],
      description:
        'Select up to 2 articles. Leave blank if you would like the latest 2 conversations',
      validation: (Rule: any) => Rule.max(2),
    },
    {
      title: 'Noticed List',
      name: 'noticedList',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Source',
              name: 'source',
              type: 'string',
            },
            {
              title: 'Year',
              name: 'year',
              type: 'string',
            },
            {
              title: 'Thumbnail Image',
              name: 'thumbnailImage',
              type: 'image',
            },
            {
              title: 'External URL',
              name: 'url',
              type: 'url',
              validation: (Rule: any) => Rule.uri({allowRelative: true}),
              description: 'Please use either a page reference or an external URL.',
            },
            pageReferences,
          ],
        },
      ],
    },
  ],
}
