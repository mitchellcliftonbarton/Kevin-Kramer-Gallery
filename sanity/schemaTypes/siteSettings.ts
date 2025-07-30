import {RichText, Link} from '../utils/fields'

export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      desciption: 'The title of the site',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      description:
        'The meta description of the site. Will be used as the default — can be overriden on a per-page basis',
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
      description:
        'The image that will be used when sharing the site on social media. Will be used as the default — can be overriden on a per-page basis',
    },
    {
      title: 'Alert',
      name: 'alert',
      type: 'array',
      description: 'If present, this text will show an alert text in various parts of the site.',
      of: RichText,
    },
    {
      title: 'Address',
      name: 'address',
      type: 'array',
      description:
        'The gallery address. This appears on the information page and footer. In the footer, line breaks will be ignored.',
      of: RichText,
    },
    {
      title: 'Hours',
      name: 'hours',
      type: 'array',
      description:
        'The gallery hours. This appears on the information page and footer. In the footer, line breaks will be ignored.',
      of: RichText,
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
      description: 'The gallery email. This appears on the information page and footer.',
    },
    {
      title: 'Contact Information',
      name: 'contactInformation',
      type: 'array',
      description: 'Phone number, etc.',
      of: RichText,
    },
    {
      title: 'Social Links',
      name: 'socialLinks',
      type: 'array',
      description: 'The gallery social links. This appears on the information page and footer.',
      of: [Link],
    },
  ],
}
