export default {
  name: 'press',
  type: 'document',
  title: 'Press',
  fields: [
    {
      name: 'article_title',
      type: 'string',
      title: 'Article Title',
      desciption:
        'The title of the article. e.g. "Kayode Ojo Wants You to Question Your Relationship to Fashion"',
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      description: 'The link to the press item. Will open in a new tab.',
    },
    {
      name: 'pdf',
      type: 'file',
      title: 'PDF',
      description: 'An optional PDF for the press item. Will override the link if present.',
      options: {
        accept: 'application/pdf',
      },
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
      name: 'author',
      type: 'string',
      title: 'Author',
      desciption: 'The author of the article. e.g. "Calvin Tompkins"',
    },
  ],
}
