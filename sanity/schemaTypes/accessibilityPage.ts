import {RichText} from '../utils/fields'

export default {
  name: 'accessibilityPage',
  type: 'document',
  title: 'Accessibility Page',
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
      of: RichText,
    },
  ],
}
