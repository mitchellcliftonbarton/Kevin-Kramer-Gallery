export default {
  name: 'artist',
  type: 'document',
  title: 'Artist',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      description: 'The name of the artist.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      description: 'A required slug for the artist. Used to generate the artist page URL.',
      validation: (Rule: any) => Rule.required(),
      options: {
        source: 'name',
      },
    },
  ],
}
