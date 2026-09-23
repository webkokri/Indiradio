import { customCodeField } from './fields/customCode'

const RESERVED_SLUGS = ['about', 'radio', 'blog', 'contact', 'admin', 'api']

export default {
  name: 'page',
  title: 'Custom Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
    {
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      description: 'The page will live at indiradio.ca/<slug>',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((slug) =>
          slug?.current && RESERVED_SLUGS.includes(slug.current)
            ? `"${slug.current}" is reserved by the site — pick another slug`
            : true,
        ),
    },
    { name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    customCodeField,
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: slug && `/${slug}` }),
  },
}
