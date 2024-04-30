import {HomeIcon} from '@sanity/icons'

export default {
  title: 'Things We Understand Page',
  name: 'thingsWeUnderstandPage',
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
      title: 'Statements and Authors',
      name: 'statementsAndAuthors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {type: 'string', title: 'Statement', name: 'statement'},
            {type: 'string', title: 'Author', name: 'author'},
          ],
        },
      ],
    },
  ],
}
