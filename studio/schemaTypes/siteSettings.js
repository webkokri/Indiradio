export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'siteTitle', title: 'Site Title', type: 'string', initialValue: 'Indi Radio' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'contactEmail', title: 'Contact Email', type: 'string' },
    { name: 'contactPhone', title: 'Contact Phone', type: 'string' },
    { name: 'address', title: 'Address', type: 'string' },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
        { name: 'twitter', title: 'Twitter / X URL', type: 'url' },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
}
