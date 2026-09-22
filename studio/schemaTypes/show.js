export default {
  name: 'show',
  title: 'Radio Show',
  type: 'document',
  fields: [
    { name: 'name', title: 'Show Name', type: 'string' },
    { name: 'host', title: 'Host', type: 'string' },
    { name: 'day', title: 'Day', type: 'string', description: 'e.g. Monday, or "Mon–Fri"' },
    { name: 'time', title: 'Time', type: 'string', description: 'e.g. 6:00 PM – 8:00 PM' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'image', title: 'Show Image', type: 'image', options: { hotspot: true } },
  ],
  preview: {
    select: { title: 'name', subtitle: 'host', media: 'image' },
  },
}
