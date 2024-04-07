const selectMediaTypeObject = {
  title: 'Select Media Type',
  name: 'mediaType',
  type: 'string',
  options: {
    list: [
      {title: 'Image', value: 'image'},
      {title: 'Video', value: 'video'},
    ],
    layout: 'dropdown',
  },
}

const selectPosition4 = {
  title: 'Select Position',
  name: 'selectPosition',
  type: 'string',
  options: {
    list: [
      {title: 'Left', value: 'left'},
      {title: 'Middle', value: 'middle'},
      {title: 'Right', value: 'right'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'left',
}

const selectPosition2 = {
  title: 'Select Position',
  name: 'selectPosition',
  type: 'string',
  options: {
    list: [
      {title: 'Left', value: 'left'},
      {title: 'Right', value: 'right'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'left',
}

const selectPosition3 = {
  title: 'Select Position',
  name: 'selectPosition',
  type: 'string',
  options: {
    list: [
      {title: 'Left', value: 'left'},
      {title: 'Middle', value: 'middle'},
      {title: 'Right', value: 'right'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'left',
}

const selectSmallOrMediumSize = {
  title: 'Select Size',
  name: 'selectSize',
  type: 'string',
  options: {
    list: [
      {title: 'Small', value: 'small'},
      {title: 'Medium', value: 'medium'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'small',
}

const selectHalfOrLargeSize = {
  title: 'Select Size',
  name: 'selectSize',
  type: 'string',
  options: {
    list: [
      {title: 'Half', value: 'half'},
      {title: 'Large', value: 'large'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'small',
}

const selectPositionTextAndImage = {
  title: 'Select Position of Text',
  name: 'selectPosition',
  type: 'string',
  options: {
    list: [
      {title: 'Left', value: 'left'},
      {title: 'Right', value: 'right'},
    ],
    layout: 'dropdown',
  },
  initialValue: 'left',
}

const referenceTitle = {
  title: 'Reference Title',
  name: 'referenceTitle',
  type: 'string',
  description: 'This is an internal reference title.',
}

const imageObject = {
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    },
  ],
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const mobileImageObject = {
  title: 'Mobile Image',
  name: 'mobileImage',
  type: 'image',
  description: 'Optional',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt Text',
    },
  ],
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const videoObject = {
  title: 'Video',
  name: 'video',
  type: 'mux.video',
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const mobileVideoObject = {
  title: 'Mobile Video',
  name: 'mobileVideo',
  type: 'mux.video',
  description: 'Optional',
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const imageComponentOneHalfOneXSmall = {
  title: 'One Half One XSmall',
  name: 'imageComponentOneHalfOneXSmall',
  type: 'image',
  fields: [
    selectMediaTypeObject,
    {
      ...imageObject,
      hidden: ({parent}: any) => parent?.mediaType !== 'image',
    },
    {
      ...videoObject,
      hidden: ({parent}: any) => parent?.mediaType !== 'video',
    },
  ],
}

const imageComponentOneXSmall = {
  title: 'One X Small',
  name: 'imageComponentOneXSmall',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentTwoXSmall = {
  title: 'Two X Small',
  name: 'imageComponentTwoXSmall',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentOneHalf = {
  title: 'One Half',
  name: 'imageComponentOneHalf',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentEditorialBig = {
  title: 'Editorial Big',
  name: 'imageComponentEditorialBig',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentOneBigTwoSmall = {
  title: 'One Big Two Small',
  name: 'imageComponentOneBigTwoSmall',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentOneEditorial = {
  title: 'One Editorial',
  name: 'imageComponentOneEditorial',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentLandscape = {
  title: 'Landscape',
  name: 'imageComponentLandscape',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentOneSmallPortraitMedium = {
  title: 'One Small Portrait Medium',
  name: 'imageComponentOneSmallPortraitMedium',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentTwoSmall = {
  title: 'Two Small',
  name: 'imageComponentTwoSmall',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentSmallPortrait = {
  title: 'Small Portrait',
  name: 'imageComponentSmallPortrait',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentFull = {
  title: 'Full',
  name: 'imageComponentFull',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const imageComponentOneSmallLandscape = {
  title: 'One Small Landscape',
  name: 'imageComponentOneSmallLandscape',
  type: 'image',
  fields: [selectMediaTypeObject, imageObject, videoObject],
}

const pageReferencesList = [
  {type: 'homePage'},
  {type: 'workPage'},
  {type: 'conversationsPage'},
  {type: 'whatToExpectPage'},
  {type: 'project'},
  {type: 'article'},
]

const pageReferences = {
  title: 'Page Reference',
  name: 'pageReference',
  type: 'reference',
  to: pageReferencesList,
  description: 'Please use either a page reference or an external URL.',
}

const linkObject = [
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
    description: 'Please use either a page reference or an external URL.',
  },
  pageReferences,
]

const furtherReadingObject = {
  title: 'Further Reading',
  name: 'furtherReading',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Page Reference',
      name: 'pageReference',
      type: 'reference',
      to: pageReferencesList,
    },
  ],
}

const imageBlockList = [
  {title: 'One Half One XSmall', value: 'imageComponentOneHalfOneXSmall'},
  {title: 'One XSmall', value: 'imageComponentOneXSmall'},
  {title: 'Two XSmall', value: 'imageComponentTwoXSmall'},
  {title: 'One Half', value: 'imageComponentOneHalf'},
  {title: 'Editorial Big', value: 'imageComponentEditorialBig'},
  {title: 'Landscape', value: 'imageComponentLandscape'},
  {title: 'One Big Two Small', value: 'imageComponentOneBigTwoSmall'},
  {title: 'One Editorial', value: 'imageComponentOneEditorial'},
  {title: 'One Portrait', value: 'imageComponentOnePortrait'},
  {title: 'Full', value: 'imageComponentFull'},
  {title: 'One Portrait One Medium', value: 'imageComponentOnePortraitOneMedium'},
  {title: 'One Big', value: 'imageComponentOneBig'},
  {title: 'One Small One Big Landscape', value: 'imageComponentOneSmallOneBigLandscape'},
  {title: 'One Big One XSmall', value: 'imageComponentOneBigOneXSmall'},
  {title: 'Two Half', value: 'imageComponentTwoHalf'},
  {title: 'One Testimonial One XSmall', value: 'imageComponentOneTestimonialOneXSmall'},
  {title: 'CTA Banner', value: 'pbCtaBanner'},
]

const homeBlockList = [
  {title: 'One Project', value: 'homeComponentOneProject'},
  {title: 'Two Half Projects', value: 'homeComponentTwoHalfProjects'},
  {title: 'One Testimonial One Statistic', value: 'homeComponentOneTestimonialOneStatistic'},
  {title: 'One Statistic', value: 'homeComponentOneStatistic'},
]

const editorialBlock = {
  title: 'Editorial Block',
  name: 'editorialBlock',
  type: 'object',
  fields: [
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
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'dropdown',
      },
    },
  ],
  options: {
    collapsible: false,
    collapsed: false,
  },
}

const testimonialBlock = {
  title: 'Testimonial Block',
  name: 'testimonialBlock',
  type: 'object',
  fields: [
    {
      title: 'Testimonial',
      name: 'testimonial',
      type: 'text',
    },
    {
      title: 'Credit',
      name: 'credit',
      type: 'text',
    },
    {
      title: 'Theme',
      name: 'theme',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'dropdown',
      },
    },
  ],
}

const statisticBlock = {
  title: 'Statistic',
  name: 'statistic',
  type: 'object',
  fields: [
    {
      title: 'Statistic Title',
      name: 'statisticTitle',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
        ],
      },
    },
    selectMediaTypeObject,
    {
      ...imageObject,
      hidden: ({parent}: any) => parent?.mediaType !== 'image',
    },
    {
      ...videoObject,
      hidden: ({parent}: any) => parent?.mediaType !== 'video',
    },
  ],
}

const projectImageBlocks = {
  title: 'Image Blocks',
  name: 'imageBlocks',
  type: 'array',
  of: [
    {
      type: 'object',
      preview: {
        select: {
          imageComponent: 'imageComponent',
        },
        prepare: ({imageComponent}: any) => {
          let componentName = ''

          if (imageComponent === 'imageComponentOneHalfOneXSmall') {
            componentName = 'One Half One XSmall'
          } else if (imageComponent === 'imageComponentOneXSmall') {
            componentName = 'One XSmall'
          } else if (imageComponent === 'imageComponentTwoXSmall') {
            componentName = 'Two XSmall'
          } else if (imageComponent === 'imageComponentOneHalf') {
            componentName = 'One Half'
          } else if (imageComponent === 'imageComponentEditorialBig') {
            componentName = 'Editorial Big'
          } else if (imageComponent === 'imageComponentLandscape') {
            componentName = 'One Landscape'
          } else if (imageComponent === 'imageComponentOneBigTwoSmall') {
            componentName = 'One Big Two Small'
          } else if (imageComponent === 'imageComponentOneEditorial') {
            componentName = 'One Editorial'
          } else if (imageComponent === 'imageComponentOnePortrait') {
            componentName = 'One Portrait'
          } else if (imageComponent === 'imageComponentFull') {
            componentName = 'Full'
          } else if (imageComponent === 'imageComponentOnePortraitOneMedium') {
            componentName = 'One Portrait One Medium'
          } else if (imageComponent === 'imageComponentOneBig') {
            componentName = 'One Big'
          } else if (imageComponent === 'imageComponentOneSmallOneBigLandscape') {
            componentName = 'One Small One Big Landscape'
          } else if (imageComponent === 'imageComponentOneBigOneXSmall') {
            componentName = 'One Big One XSmall'
          } else if (imageComponent === 'imageComponentTwoHalf') {
            componentName = 'Two Half'
          } else if (imageComponent === 'imageComponentOneTestimonialOneXSmall') {
            componentName = 'One Editorial One XSmall'
          } else if (imageComponent === 'pbCtaBanner') {
            componentName = 'CTA Banner'
          } else {
            componentName = 'Unknown'
          }

          return {
            title: componentName,
          }
        },
      },
      fields: [
        {
          title: 'Select Image Component',
          name: 'imageComponent',
          type: 'string',
          options: {
            list: imageBlockList,
            layout: 'dropdown',
          },
        },
        {
          name: 'imageComponentOneHalfOneXSmall',
          title: 'One Half One XSmall',
          type: 'object',
          fields: [
            {
              title: 'Half',
              name: 'half',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'X-Small',
              name: 'xSmall',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOneHalfOneXSmall',
        },
        {
          name: 'imageComponentOneXSmall',
          title: 'One XSmall',
          type: 'object',
          fields: [
            selectPosition4,
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentOneXSmall',
        },
        {
          name: 'imageComponentTwoXSmall',
          title: 'Two XSmall',
          type: 'object',
          fields: [
            selectPosition2,
            {
              title: 'LHS',
              name: 'lhs',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'RHS',
              name: 'rhs',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentTwoXSmall',
        },
        {
          name: 'imageComponentOneHalf',
          title: 'One Half',
          type: 'object',
          fields: [
            selectPosition2,
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentOneHalf',
        },
        {
          name: 'imageComponentEditorialBig',
          title: 'Editorial Big',
          type: 'object',
          fields: [
            selectPositionTextAndImage,
            editorialBlock,
            {
              title: 'Media',
              name: 'media',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentEditorialBig',
        },
        {
          name: 'imageComponentLandscape',
          title: 'Landscape',
          type: 'object',
          fields: [
            selectPosition2,
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentLandscape',
        },
        {
          name: 'imageComponentOneBigTwoSmall',
          title: 'One Big Two Small',
          type: 'object',
          fields: [
            {
              title: 'Big',
              name: 'big',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'Small 1',
              name: 'small1',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'Small 2',
              name: 'small2',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOneBigTwoSmall',
        },
        {
          name: 'imageComponentOneEditorial',
          title: 'One Editorial',
          type: 'object',
          fields: [selectPosition4, editorialBlock],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOneEditorial',
        },
        {
          name: 'imageComponentOnePortrait',
          title: 'One Portrait',
          type: 'object',
          fields: [
            selectPosition3,
            selectSmallOrMediumSize,
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOnePortrait',
        },
        {
          name: 'imageComponentFull',
          title: 'Full',
          type: 'object',
          fields: [
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentFull',
        },
        {
          name: 'imageComponentOnePortraitOneMedium',
          title: 'One Portrait One Medium',
          type: 'object',
          fields: [
            selectPosition2,
            {
              title: 'Portrait',
              name: 'portrait',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'Medium',
              name: 'medium',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOnePortraitOneMedium',
        },
        {
          name: 'imageComponentOneBig',
          title: 'One Big',
          type: 'object',
          fields: [
            selectPosition3,
            selectMediaTypeObject,
            {
              ...imageObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'image',
            },
            {
              ...videoObject,
              hidden: ({parent}: any) => parent?.mediaType !== 'video',
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentOneBig',
        },
        {
          name: 'imageComponentOneSmallOneBigLandscape',
          title: 'One Small One Big Landscape',
          type: 'object',
          fields: [
            selectPosition2,
            {
              title: 'Small',
              name: 'small',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'Landscape',
              name: 'landscape',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOneSmallOneBigLandscape',
        },
        {
          name: 'imageComponentOneBigOneXSmall',
          title: 'One Small One XSmall',
          type: 'object',
          fields: [
            selectPosition2,
            {
              title: 'Big',
              name: 'big',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'Small',
              name: 'small',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOneBigOneXSmall',
        },
        {
          name: 'imageComponentTwoHalf',
          title: 'Two Half',
          type: 'object',
          fields: [
            {
              title: 'LHS',
              name: 'lhs',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
            {
              title: 'RHS',
              name: 'rhs',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'imageComponentTwoHalf',
        },
        {
          name: 'imageComponentOneTestimonialOneXSmall',
          title: 'One Testimonial One XSmall',
          type: 'object',
          fields: [
            selectPosition2,
            testimonialBlock,
            {
              title: 'XSmall',
              name: 'xSmall',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
              options: {
                collapsible: false,
                collapsed: false,
              },
            },
          ],
          hidden: ({parent}: {parent: any}) =>
            parent?.imageComponent !== 'imageComponentOneTestimonialOneXSmall',
        },
        {
          title: 'CTA Banner',
          name: 'pbCtaBanner',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'object',
              fields: linkObject,
            },
            {
              title: 'Media',
              name: 'media',
              type: 'object',
              fields: [
                selectMediaTypeObject,
                {
                  ...imageObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'image',
                },
                {
                  ...videoObject,
                  hidden: ({parent}: any) => parent?.mediaType !== 'video',
                },
              ],
            },
          ],
          hidden: ({parent}: {parent: any}) => parent?.imageComponent !== 'pbCtaBanner',
        },
      ],
    },
  ],
}

const homeBlocks = {
  title: 'Home Blocks',
  name: 'homeBlocks',
  type: 'array',
  of: [
    {
      type: 'object',
      preview: {
        select: {
          component: 'component',
        },
        prepare: ({component}: any) => {
          let componentName = ''

          if (component === 'homeComponentOneProject') {
            componentName = 'One Project'
          } else if (component === 'homeComponentTwoHalfProjects') {
            componentName = 'Two Half Projects'
          } else if (component === 'homeComponentOneTestimonialOneStatistic') {
            componentName = 'One Testimonial One Statistic'
          } else if (component === 'homeComponentOneStatistic') {
            componentName = 'One Statistic'
          } else {
            componentName = 'Unknown'
          }

          return {
            title: componentName,
          }
        },
      },
      fields: [
        {
          title: 'Select Image Component',
          name: 'component',
          type: 'string',
          options: {
            list: homeBlockList,
            layout: 'dropdown',
          },
        },
        {
          name: 'homeComponentOneProject',
          title: 'One Project',
          type: 'object',
          fields: [
            {
              title: 'Project',
              name: 'project',
              type: 'object',
              fields: [
                selectPosition2,
                selectHalfOrLargeSize,
                {
                  title: 'Project',
                  name: 'project',
                  type: 'reference',
                  to: [{type: 'project'}],
                },
              ],
            },
          ],
          hidden: ({parent}: {parent: any}) => parent?.component !== 'homeComponentOneProject',
        },
        {
          name: 'homeComponentTwoHalfProjects',
          title: 'Two Half Projects',
          type: 'object',
          fields: [
            {
              title: 'Project One',
              name: 'projectOne',
              type: 'reference',
              to: [{type: 'project'}],
            },
            {
              title: 'Project Two',
              name: 'projectTwo',
              type: 'reference',
              to: [{type: 'project'}],
            },
          ],
          options: {
            collapsible: false,
            collapsed: false,
          },
          hidden: ({parent}: {parent: any}) => parent?.component !== 'homeComponentTwoHalfProjects',
        },
        {
          name: 'homeComponentOneTestimonialOneStatistic',
          title: 'One Testimonial One Statistic',
          type: 'object',
          fields: [testimonialBlock, statisticBlock],
          hidden: ({parent}: {parent: any}) =>
            parent?.component !== 'homeComponentOneTestimonialOneStatistic',
        },
        {
          name: 'homeComponentOneStatistic',
          title: 'One Statistic',
          type: 'object',
          fields: [selectPosition4, statisticBlock],
          hidden: ({parent}: {parent: any}) => parent?.component !== 'homeComponentOneStatistic',
        },
      ],
    },
  ],
}

export {
  projectImageBlocks,
  imageBlockList,
  selectMediaTypeObject,
  imageObject,
  videoObject,
  imageComponentOneHalfOneXSmall,
  imageComponentOneXSmall,
  imageComponentTwoXSmall,
  imageComponentOneHalf,
  imageComponentEditorialBig,
  imageComponentOneBigTwoSmall,
  imageComponentOneEditorial,
  imageComponentLandscape,
  imageComponentOneSmallPortraitMedium,
  imageComponentTwoSmall,
  imageComponentSmallPortrait,
  imageComponentFull,
  imageComponentOneSmallLandscape,
  pageReferences,
  linkObject,
  furtherReadingObject,
  referenceTitle,
  selectPosition4,
  selectPosition2,
  selectPositionTextAndImage,
  editorialBlock,
  selectPosition3,
  selectSmallOrMediumSize,
  homeBlocks,
  mobileImageObject,
  mobileVideoObject,
}
