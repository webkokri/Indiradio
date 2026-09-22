import { customCodeField } from './fields/customCode'

export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', initialValue: 'Contact Us' },
    { name: 'intro', title: 'Intro Text', type: 'text', rows: 3 },
    { name: 'address', title: 'Address', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'officeHours', title: 'Office Hours', type: 'string' },
    { name: 'mapEmbedUrl', title: 'Map Embed URL', type: 'url' },
    customCodeField,
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
}
