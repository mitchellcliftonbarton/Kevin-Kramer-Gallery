import {Image} from '../utils/fields'

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
      ...Image,
      name: 'image',
      title: 'Image',
      description: 'If present, this image will be displayed at the top of the information page.',
    },
    {
      name: 'newsletter_title',
      type: 'string',
      title: 'Newsletter Title',
      description: 'The title above the newsletter signup form.',
    },
  ],
}
