import {RichText} from '../utils/fields'

export default {
  name: 'termsPage',
  type: 'document',
  title: 'Terms Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      description: 'Text content for this page.',
      of: [RichText],
    },
  ],
}
