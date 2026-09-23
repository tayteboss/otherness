import type {FieldDefinition} from 'sanity'
import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentIcon, ImageIcon, LinkIcon, CogIcon} from '@sanity/icons'

export const redesignSingletons = [
  {name: 'homePageV2', title: 'Home New'},
  {name: 'ourWayPage', title: 'Our Way'},
  {name: 'siteSettingsV2', title: 'Redesign Settings'},
]
export const isRedesignSingleton = (name: string) => redesignSingletons.some((s) => s.name === name)

const text = (name: string, title: string, multiline = false) =>
  defineField({name, title, type: multiline ? 'text' : 'string'})
const image = (name: string, title: string) => defineField({name, title, type: 'redesignImage'})
const list = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array' as const,
    of: [defineArrayMember({type: 'redesignListEntry'})],
  })
const seo = defineField({name: 'seo', title: 'SEO', group: 'seo', type: 'redesignSeo'})
const review = defineField({
  name: 'editorialNotes',
  title: 'Editorial review notes',
  group: 'review',
  type: 'text',
  description:
    'Internal only. Record missing artwork and unapproved copy; never rendered on the website.',
})
const groups = (names: string[]) =>
  [...names, 'seo', 'review'].map((name) => ({
    name,
    title: name.charAt(0).toUpperCase() + name.slice(1),
  }))
const section = (name: string, title: string, fields: FieldDefinition[]) =>
  defineField({name, title, type: 'object', group: name, fields})

const homePageV2 = defineType({
  name: 'homePageV2',
  title: 'Home New',
  type: 'document',
  icon: DocumentIcon,
  groups: groups(['loading', 'landing', 'introduction', 'services', 'results', 'noticed']),
  fields: [
    defineField({
      name: 'loadingPairs',
      title: 'Loading word pairs',
      group: 'loading',
      type: 'array' as const,
      validation: (r) => r.length(3).warning('The intro is designed for three word pairs.'),
      of: [
        defineArrayMember({
          name: 'wordPair',
          type: 'object',
          fields: [text('first', 'First word'), text('second', 'Second word')],
          preview: {select: {title: 'first', subtitle: 'second'}},
        }),
      ],
    }),
    section('landing', 'Landing', [
      text('statement', 'Statement'),
      image('desktopImage', 'Desktop artwork'),
      image('mobileImage', 'Mobile artwork'),
    ]),
    section('introduction', 'Introduction', [
      text('heading', 'Heading'),
      text('statement', 'Agency statement', true),
      defineField({name: 'link', title: 'What to expect link', type: 'redesignLink'}),
    ]),
    defineField({
      name: 'services',
      title: 'Services (one order on all devices)',
      group: 'services',
      type: 'array' as const,
      of: [
        defineArrayMember({
          name: 'service',
          type: 'object',
          fields: [
            text('title', 'Title'),
            text('description', 'Description', true),
            text('contactLabel', 'Contact label'),
            defineField({
              name: 'projects',
              title: 'Project cards',
              type: 'array' as const,
              of: [
                defineArrayMember({
                  name: 'projectCard',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'project',
                      type: 'reference',
                      to: [{type: 'project'}],
                      options: {disableNew: true},
                      validation: (r) => r.required(),
                    }),
                    image('image', 'Homepage-only card image'),
                    text('caption', 'Homepage-only caption'),
                  ],
                  preview: {select: {title: 'project.title', subtitle: 'caption', media: 'image'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }),
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results / testimonials',
      group: 'results',
      type: 'array' as const,
      of: [
        defineArrayMember({
          name: 'result',
          type: 'object',
          fields: [
            text('client', 'Client'),
            text('quote', 'Quote', true),
            image('background', 'Background'),
            image('mobileBackground', 'Mobile background (optional)'),
            image('logo', 'Client logo'),
          ],
          preview: {select: {title: 'client', subtitle: 'quote', media: 'logo'}},
        }),
      ],
    }),
    defineField({
      name: 'noticed',
      title: 'Noticed',
      group: 'noticed',
      type: 'array' as const,
      of: [
        defineArrayMember({
          name: 'noticedEntry',
          type: 'object',
          fields: [
            text('title', 'Title'),
            text('source', 'Source'),
            text('year', 'Year'),
            defineField({name: 'link', title: 'Destination', type: 'redesignLink'}),
            image('image', 'Thumbnail'),
          ],
          preview: {select: {title: 'title', subtitle: 'source', media: 'image'}},
        }),
      ],
    }),
    seo,
    review,
  ],
  preview: {prepare: () => ({title: 'Home New'})},
})

const ourWayPage = defineType({
  name: 'ourWayPage',
  title: 'Our Way',
  type: 'document',
  icon: DocumentIcon,
  groups: groups(['hero', 'introduction', 'partnership', 'process', 'consultation', 'credentials']),
  fields: [
    section('hero', 'Hero', [
      text('statement', 'Positioning statement', true),
      text('scrollLabel', 'Scroll label'),
      image('image', 'Hero image'),
      image('mobileImage', 'Mobile hero (optional)'),
    ]),
    section('introduction', 'Introduction', [text('text', 'Sector / client introduction', true)]),
    section('partnership', 'Partnership', [
      text('heading', 'Heading'),
      text('founderNote', 'Founder note', true),
      defineField({
        name: 'principles',
        type: 'array' as const,
        validation: (r) => r.length(4).warning('Review the four principles before release.'),
        of: [
          defineArrayMember({
            name: 'principle',
            type: 'object',
            fields: [text('title', 'Title'), text('description', 'Description', true)],
          }),
        ],
      }),
    ]),
    section('process', 'Process', [
      text('heading', 'Heading'),
      text('description', 'Introduction', true),
      defineField({
        name: 'stages',
        type: 'array' as const,
        of: [
          defineArrayMember({
            name: 'processStage',
            type: 'object',
            fields: [
              text('title', 'Title'),
              text('description', 'Description', true),
              list('services', 'Services'),
            ],
          }),
        ],
        validation: (r) => r.length(4).warning('The process layout expects four stages.'),
      }),
    ]),
    section('consultation', 'Consultation', [
      text('heading', 'Heading'),
      text('text', 'Supporting text', true),
      text('buttonLabel', 'Booking button label'),
      image('artwork', 'Consultation artwork'),
    ]),
    section('credentials', 'Credentials', [
      text('founderHeading', 'Founder heading'),
      text('biography', 'Founder biography', true),
      list('services', 'Services'),
      list('clients', 'Notable clients'),
      list('recognition', 'Notable recognition'),
      defineField({
        name: 'logos',
        title: 'Recognition logos',
        type: 'array' as const,
        of: [
          defineArrayMember({
            name: 'recognitionLogo',
            type: 'object',
            fields: [
              text('title', 'Name'),
              image('image', 'Logo'),
              defineField({name: 'link', type: 'redesignLink'}),
            ],
          }),
        ],
      }),
    ]),
    seo,
    review,
  ],
  preview: {prepare: () => ({title: 'Our Way'})},
})

const siteSettingsV2 = defineType({
  name: 'siteSettingsV2',
  title: 'Redesign Settings',
  type: 'document',
  icon: CogIcon,
  groups: groups(['navigation', 'consultation', 'footer']),
  fields: [
    defineField({
      name: 'navigation',
      title: 'Primary navigation',
      group: 'navigation',
      type: 'array' as const,
      of: [defineArrayMember({type: 'redesignLink'})],
    }),
    defineField({
      name: 'consultationUrl',
      title: 'Consultation destination',
      group: 'consultation',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'consultationLabel',
      title: 'Consultation button label',
      group: 'consultation',
      type: 'string',
    }),
    section('footer', 'Footer', [
      text('heading', 'Heading'),
      text('tagline', 'Tagline', true),
      text('copyright', 'Copyright name (year is automatic)'),
      text('trademark', 'Trademark'),
      defineField({name: 'privacyLink', type: 'redesignLink'}),
      defineField({
        name: 'socials',
        type: 'array' as const,
        of: [defineArrayMember({type: 'redesignLink'})],
      }),
    ]),
    seo,
    review,
  ],
  preview: {prepare: () => ({title: 'Redesign Settings'})},
})

export const redesignSchemaTypes = [
  defineType({
    name: 'redesignImage',
    title: 'Redesign image',
    type: 'image',
    icon: ImageIcon,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alternative text',
        type: 'string',
        description: 'Describe the supplied artwork. Do not upload reference screenshots.',
        validation: (r) => r.required(),
      }),
    ],
  }),
  defineType({
    name: 'redesignLink',
    title: 'Link',
    type: 'object',
    icon: LinkIcon,
    fields: [
      defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
      defineField({
        name: 'href',
        title: 'URL or site path',
        type: 'url',
        validation: (r) =>
          r.required().uri({allowRelative: true, scheme: ['https', 'http', 'mailto', 'tel']}),
      }),
    ],
    preview: {select: {title: 'label', subtitle: 'href'}},
  }),
  defineType({
    name: 'redesignListEntry',
    title: 'List entry',
    type: 'object',
    icon: DocumentIcon,
    fields: [
      text('title', 'Title'),
      text('detail', 'Detail'),
      defineField({name: 'link', type: 'redesignLink'}),
    ],
  }),
  defineType({
    name: 'redesignSeo',
    title: 'SEO',
    type: 'object',
    icon: DocumentIcon,
    fields: [
      text('title', 'Title'),
      text('description', 'Description', true),
      image('image', 'Social image override'),
    ],
  }),
  homePageV2,
  ourWayPage,
  siteSettingsV2,
]
