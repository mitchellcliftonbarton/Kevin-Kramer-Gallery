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

export const RichText = {
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
            name: 'pdf',
            type: 'file',
            title: 'PDF',
            description: 'An optional PDF to link to. Will override the link if present.',
            options: {
              accept: 'application/pdf',
            },
          },
          {
            title: 'Open in new tab',
            description:
              'If pdf is present, the value of this field will be ignored and the PDF will open in a new tab.',
            name: 'blank',
            type: 'boolean',
          },
        ],
      },
    ],
  },
}

export const Image = {
  type: 'image',
  name: 'Image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alt text',
    },
  ],
  preview: {
    select: {
      asset: 'asset',
    },
    prepare({asset}) {
      return {
        // title: 'Image',
        // subtitle: '🖼️',
        media: asset,
      }
    },
  },
}

export const Video = {
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
    {
      name: 'poster',
      type: 'image',
      title: 'Poster',
      description:
        'The poster image for the video. Acts as a fallback image if the video fails to load.',
    },
  ],
  preview: {
    select: {
      // file: 'file',
      poster: 'poster',
    },
    prepare({poster}) {
      // const filename = file?.asset?._ref?.split('-')?.[1] ?? 'Untitled Video'

      return {
        title: 'Video',
        subtitle: '►',
        media: poster?.asset,
      }
    },
  },
}
