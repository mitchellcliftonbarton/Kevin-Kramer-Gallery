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
      name: 'image',
      type: 'image',
      title: 'Image',
      description: 'If present, this image will be displayed at the top of the page.',
    },
    {
      name: 'newsletter_title',
      type: 'string',
      title: 'Newsletter Title',
      desciption: 'The title above the newsletter',
    },
  ],
}
