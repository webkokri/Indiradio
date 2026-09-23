export default {
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'headerLinks',
      title: 'Header menu',
      type: 'array',
      of: [{ type: 'navLink' }],
      description: 'Links in the top navigation bar. Drag to reorder.',
    },
    {
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      of: [{ type: 'navLink' }],
      description: 'Links in the footer "Explore" column. Drag to reorder.',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' }
    },
  },
}
