import {SmallCapsIcon, SmallCapsDecorator} from './fieldObjects'

export const Link = {
  type: 'object',
  name: 'Link',
  title: 'Link',
  fields: [
    {
      name: 'linkText',
      type: 'string',
      title: 'Link Text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'href',
      type: 'string',
      title: 'URL',
    },
    {
      title: 'Open in new tab',
      name: 'blank',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'linkText',
      subtitle: 'href',
    },
  },
}

export const RichText = [
  {
    type: 'block',
    styles: [],
    marks: {
      decorators: [
        {
          title: 'Small Caps',
          value: 'smallcaps',
          icon: SmallCapsIcon,
          component: SmallCapsDecorator,
        },
        {title: 'Strong', value: 'strong'},
        {title: 'Emphasis', value: 'em'},
      ],
      annotations: [
        {
          name: 'link',
          type: 'object',
          title: 'External link',
          fields: [
            {
              name: 'href',
              type: 'string',
              title: 'URL',
            },
            {
              title: 'Open in new tab',
              name: 'blank',
              type: 'boolean',
            },
          ],
        },
      ],
    },
  },
]

export const Image = [
  {
    type: 'image',
    name: 'Image',
    fields: [
      {
        name: 'alt',
        type: 'string',
        title: 'Alt text',
      },
      // {
      //   name: 'is_detail',
      //   type: 'boolean',
      //   title: 'Is Detail',
      //   description: 'If true, the image caption will be adjusted to show .',
      // }
    ],
  },
]

export const Video = [
  {
    type: 'object',
    name: 'Video',
    fields: [
      {
        name: 'file',
        type: 'file',
        title: 'MP4',
        options: {
          accept: 'video/mp4',
        },
      },
    ],
  },
]
