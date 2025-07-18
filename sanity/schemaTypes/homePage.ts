export default {
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Featured Press',
      name: 'featured_press',
      type: 'array',
      description:
        'Press to be featured on the home page. If empty, the most recent 3 press items will be displayed.',
      of: [{type: 'reference', to: [{type: 'press'}]}],
      options: {
        layout: 'list',
      },
    },
  ],
}
