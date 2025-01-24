import {HomeIcon} from '@sanity/icons'
import {furtherReadingObject} from '../objects'

export default {
  title: 'Working Together Page',
  name: 'whatToExpectPage',
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
      title: 'Page Builder',
      name: 'pageBuilder',
      type: 'array',
      of: [
        {type: 'pbImageMultiColumnContent'},
        {type: 'pbProcessList'},
        {type: 'pbCtaBanner'},
        {type: 'pbImageOneColumnContent'},
      ],
    },
    furtherReadingObject,
  ],
}
