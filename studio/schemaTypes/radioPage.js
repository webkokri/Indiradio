import { customCodeField } from './fields/customCode'

export default {
  name: 'radioPage',
  title: 'Radio Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', initialValue: 'Listen Live' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    {
      name: 'streamUrl',
      title: 'Live Audio Stream URL',
      type: 'url',
      description: 'Icecast/Shoutcast/HLS audio stream URL',
    },
    { name: 'coverImage', title: 'Cover Art / Station Image', type: 'image', options: { hotspot: true } },
    {
      name: 'schedule',
      title: 'Weekly Schedule',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'show' }] }],
    },
    customCodeField,
  ],
  preview: {
    prepare() {
      return { title: 'Radio Page' }
    },
  },
}
