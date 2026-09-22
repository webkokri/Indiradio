import { createClient } from '@sanity/client'

export const isSanityWriteConfigured = Boolean(
  process.env.SANITY_PROJECT_ID && process.env.SANITY_WRITE_TOKEN,
)

// @sanity/client throws synchronously if projectId is falsy, which would crash
// this module (and every function that imports it) before a Sanity project
// exists. Fall back to a placeholder; isSanityWriteConfigured gates real use.
export const sanityWriteClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})
