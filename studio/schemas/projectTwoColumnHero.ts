import { ImageIcon } from '@sanity/icons';

export default {
    title: 'Project Two Column Hero',
    name: 'projectTwoColumnHero',
    type: 'document',
    icon: ImageIcon,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            description: 'This is an internal reference title.',
            initialValue: 'One Column (Image)'
        },
        {
            title: 'Left Block',
            name: 'leftBlock',
            type: 'object',
            fields: [
                {
                    title: 'Image',
                    name: 'image',
                    type: 'image',
                },
                // Add other fields specific to left block here
            ],
        },
        {
            title: 'Right Block',
            name: 'rightBlock',
            type: 'object',
            fields: [
                {
                    title: 'Image',
                    name: 'image',
                    type: 'image',
                },
                // Add other fields specific to right block here
            ],
        },
    ]
}
