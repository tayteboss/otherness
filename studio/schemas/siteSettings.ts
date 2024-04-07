import {linkObject} from '../objects'

export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
      initialValue: 'Site Settings',
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
      description: 'This is the tagline that appears in the footer.',
    },
    {
      title: 'Footer Consultation CTA',
      name: 'footerConsultationCta',
      type: 'string',
    },
    {
      title: 'Footer Consultation Button Title',
      name: 'footerConsultationButtonTitle',
      type: 'string',
    },
    {
      title: 'Footer Consultation Button URL',
      name: 'footerConsultationButtonUrl',
      type: 'url',
    },
    {
      title: 'Mobile Menu Consultation CTA',
      name: 'mobileMenuConsultationCta',
      type: 'string',
    },
    {
      title: 'Mobile Menu Consultation Button Title',
      name: 'mobileMenuConsultationButtonTitle',
      type: 'string',
    },
    {
      title: 'Social Link 1',
      name: 'socialLink1',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          title: 'External URL',
          name: 'url',
          type: 'url',
          validation: (Rule: any) => Rule.uri({allowRelative: true}),
        },
      ],
    },
    {
      title: 'Social Link 2',
      name: 'socialLink2',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          title: 'External URL',
          name: 'url',
          type: 'url',
          validation: (Rule: any) => Rule.uri({allowRelative: true}),
        },
      ],
    },
    {
      title: 'Social Link 3',
      name: 'socialLink3',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          title: 'External URL',
          name: 'url',
          type: 'url',
          validation: (Rule: any) => Rule.uri({allowRelative: true}),
        },
      ],
    },
  ],
}
