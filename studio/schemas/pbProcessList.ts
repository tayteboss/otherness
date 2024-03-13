import { BlockContentIcon } from '@sanity/icons';

export default {
    title: 'Process List',
    name: 'pbProcessList',
    type: 'document',
    icon: BlockContentIcon,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
        },
        {
            title: 'Description',
            name: 'description',
            type: 'string',
        },
        {
            title: 'Columns',
            name: 'columns',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'column',
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'string',
                        },
                        {
                            title: 'List',
                            name: 'listContent',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' },
                                    ],
                                    lists: [],
                                    marks: {
                                        decorators: [],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    // Add any additional fields or modifications here
}
