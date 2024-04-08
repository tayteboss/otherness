import {TextIcon} from '@sanity/icons'

export default {
  title: 'Testimonial Block',
  name: 'testimonialBlock',
  type: 'document',
  icon: TextIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'Testimonial Title',
      name: 'testimonialTitle',
      type: 'string',
    },
    {
      title: 'Credit Name',
      name: 'creditName',
      type: 'string',
    },
    {
      title: 'Credit Role',
      name: 'creditRole',
      type: 'string',
    },
    {
      title: 'Credit Company',
      name: 'creditCompany',
      type: 'string',
    },
    {
      title: 'External Link (Optional)',
      name: 'externalLink',
      type: 'url',
    },
  ],
}
