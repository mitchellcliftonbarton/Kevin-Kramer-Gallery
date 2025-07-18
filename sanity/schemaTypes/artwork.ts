export default {
  name: 'artwork',
  type: 'document',
  title: 'Artwork',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      desciption: 'The title of the artwork',
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
  ],
}
