export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Hero Title', type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3 },
    { name: 'heroCtaText', title: 'Hero Button Text', type: 'string', initialValue: 'Watch Live' },
    { name: 'heroCtaLink', title: 'Hero Button Link', type: 'string', initialValue: '/radio' },
    {
      name: 'videoStreamUrl',
      title: 'Live TV Stream URL',
      type: 'url',
      description: 'HLS (.m3u8) or MP4 URL for the home page video player',
    },
    { name: 'videoPoster', title: 'Video Poster Image', type: 'image', options: { hotspot: true } },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'highlight',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Name key used by the frontend to pick an icon, e.g. "radio", "tv", "music"',
            },
          ],
        },
      ],
    },
    {
      name: 'featuredShows',
      title: 'Featured Shows',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'show' }] }],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
}
