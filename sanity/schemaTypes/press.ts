import {RichText} from '../utils/fields'

export default {
  name: 'press',
  type: 'document',
  title: 'Press',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      desciption: 'The title of the press item. This is for internal use only.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'source',
      type: 'string',
      title: 'Source',
      desciption: 'The source of the press item. e.g. "The New York Times"',
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      desciption: 'The date of the press item.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'article_title',
      type: 'string',
      title: 'Article Title',
      desciption:
        'The title of the article. e.g. "Kayode Ojo Wants You to Question Your Relationship to Fashion"',
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
      desciption: 'The author of the article. e.g. "Calvin Tompkins"',
    },
    {
      title: 'Text Override',
      name: 'text_override',
      type: 'array',
      description: 'If present, this text will override the text of the press item.',
      of: RichText,
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      description: 'The link to the press item. Will open in a new tab.',
    },
  ],
}
