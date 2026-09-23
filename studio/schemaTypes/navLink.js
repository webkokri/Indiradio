export default {
  name: 'navLink',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkType',
      title: 'Link to',
      type: 'string',
      initialValue: 'page',
      options: {
        layout: 'radio',
        list: [
          { title: 'Custom page (created in Studio)', value: 'page' },
          { title: 'Built-in page', value: 'internal' },
          { title: 'External URL', value: 'external' },
        ],
      },
    },
    {
      name: 'page',
      title: 'Custom page',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.linkType !== 'page',
    },
    {
      name: 'internalPath',
      title: 'Built-in page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: '/' },
          { title: 'About Us', value: '/about' },
          { title: 'Radio', value: '/radio' },
          { title: 'Blog', value: '/blog' },
          { title: 'Contact Us', value: '/contact' },
        ],
      },
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Full URL, e.g. https://example.com, mailto:hi@example.com',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
      hidden: ({ parent }) => parent?.linkType !== 'external',
    },
    {
      name: 'openInNewTab',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'label', linkType: 'linkType', path: 'internalPath', url: 'url', slug: 'page.slug.current' },
    prepare({ title, linkType, path, url, slug }) {
      const target = linkType === 'external' ? url : linkType === 'internal' ? path : slug && `/${slug}`
      return { title, subtitle: target || 'Not linked yet' }
    },
  },
}
