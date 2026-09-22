import { customCodeField } from './fields/customCode'

export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', initialValue: 'About Us' },
    { name: 'mission', title: 'Mission Statement', type: 'text', rows: 3 },
    {
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [{ type: 'block' }],
    },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
    },
    customCodeField,
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
}
