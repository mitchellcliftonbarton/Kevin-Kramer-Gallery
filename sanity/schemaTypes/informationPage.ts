export default {
  name: 'informationPage',
  type: 'document',
  title: 'Information Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'newsletter_title',
      type: 'string',
      title: 'Newsletter Title',
      desciption: 'The title above the newsletter',
    },
  ],
}
