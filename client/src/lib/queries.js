export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  siteTitle,
  tagline,
  logo,
  contactEmail,
  contactPhone,
  address,
  socialLinks,
  headerCode,
  footerCode
}`

export const homePageQuery = /* groq */ `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroCtaText,
  heroCtaLink,
  videoStreamUrl,
  videoPoster,
  highlights,
  customCode,
  "featuredShows": featuredShows[]->{
    _id, name, host, day, time, description, image
  }
}`

export const aboutPageQuery = /* groq */ `*[_type == "aboutPage"][0]{
  title,
  mission,
  story,
  heroImage,
  customCode,
  "teamMembers": teamMembers[]->{
    _id, name, role, photo, bio
  }
}`

export const radioPageQuery = /* groq */ `*[_type == "radioPage"][0]{
  title,
  description,
  streamUrl,
  coverImage,
  customCode,
  "schedule": schedule[]->{
    _id, name, host, day, time, description, image
  }
}`

export const contactPageQuery = /* groq */ `*[_type == "contactPage"][0]{
  title,
  intro,
  address,
  phone,
  email,
  officeHours,
  mapEmbedUrl,
  customCode
}`

export const blogPostsQuery = /* groq */ `*[_type == "blogPost"] | order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  author,
  publishedAt,
  tags
}`

export const blogPostBySlugQuery = /* groq */ `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  author,
  publishedAt,
  tags,
  body,
  customCode
}`
