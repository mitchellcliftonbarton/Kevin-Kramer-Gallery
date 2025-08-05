import {RichText, Image, Video} from '../utils/fields'
import {toPlainText, getMediaPreview} from '../utils/utils'

export default {
  name: 'exhibition',
  type: 'document',
  title: 'Exhibition',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      desciption: 'The title of the exhibition',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      title: 'Start Date',
      name: 'start_date',
      type: 'date',
      description: 'The start date of the exhibition',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'End Date',
      name: 'end_date',
      type: 'date',
      description: 'The end date of the exhibition',
    },
    {
      name: 'featured_image',
      type: 'image',
      title: 'Featured Image',
      description:
        'The image that will be referenced when displaying the exhibition on the home page.',
    },
    {
      title: 'Alternate Location',
      name: 'alternate_location',
      type: 'array',
      description:
        'Use this field to specify if this exhibition is being held at an alternate location. e.g. "Sadie Coles, London"',
      of: RichText,
    },
    {
      title: 'Artists',
      name: 'artists',
      type: 'array',
      description: 'A list of artists in the exhibition.',
      of: [{type: 'reference', to: [{type: 'artist'}]}],
    },
    {
      title: 'Artists List Override',
      name: 'artists_list_override',
      type: 'text',
      description:
        'By default, the artists list will be displayed as a comma-separated list of artist names (unless there are more than 5 artists, in which case it will say "Group Show"). If present, this field will override it.',
    },
    {
      title: 'Solo Show',
      name: 'is_solo',
      type: 'boolean',
      description: 'If true, the exhibition is a solo show.',
    },
    {
      title: 'Exhibition Media',
      name: 'exhibition_media',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'exhibition_media_group',
          title: 'Exhibition Media Group',
          fields: [
            {
              type: 'array',
              name: 'media',
              title: 'Media',
              description: 'The media to display.',
              of: [...Image, ...Video],
              options: {
                layout: 'grid',
              },
            },
            {
              type: 'array',
              name: 'caption',
              title: 'Caption',
              description: 'A caption for the media.',
              of: RichText,
            },
            {
              type: 'array',
              name: 'artists',
              title: 'Artists',
              description: 'A list of artists associated with this media.',
              of: [{type: 'reference', to: [{type: 'artist'}]}],
              options: {
                layout: 'list',
              },
              hidden: ({document}: {document: {is_solo?: boolean}}) => document.is_solo,
            },
          ],
          preview: {
            select: {
              caption: 'caption',
              media: 'media',
            },
            prepare(selection: any) {
              const {caption, media} = selection

              const plainCaption = toPlainText(caption)

              // get media
              const hasMedia = media?.length > 0
              let firstMedia = hasMedia ? media[0] : null

              // get media preview
              let mediaPreview = firstMedia ? getMediaPreview(firstMedia) : null

              return {
                title: plainCaption ? plainCaption : '---',
                media: mediaPreview,
              }
            },
          },
        },
      ],
    },
    {
      name: 'exhibition_text',
      title: 'Exhibition Text',
      type: 'array',
      description: 'Exhibition text content.',
      of: RichText,
    },
    {
      name: 'exhibition_details_override',
      title: 'Exhibition Details Override',
      type: 'array',
      description:
        'By default, the gallery address and hours will appear under the exhibition text. If present, this field will override it.',
      of: RichText,
    },
    {
      title: 'Additional Text Sections',
      name: 'additional_text_sections',
      description:
        'Optional additional text sections for the exhibition. Will appear underneath the exhibition text if present.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'text_section',
          title: 'Text Section',
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Heading',
              description: 'An optional heading of the text section',
            },
            {
              name: 'text',
              type: 'array',
              description: 'Text content for this section.',
              of: RichText,
            },
          ],
        },
      ],
    },
    {
      title: 'Press',
      name: 'press',
      type: 'array',
      description: 'Press associated with this exhibition.',
      of: [{type: 'reference', to: [{type: 'press'}]}],
    },
  ],
}
