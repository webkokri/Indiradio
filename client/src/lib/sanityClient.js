import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_READ_TOKEN,
} from '../config.js'

// @sanity/client throws synchronously if projectId is falsy, which would crash
// the whole app on load before it's configured. Fall back to a syntactically
// valid placeholder; isSanityConfigured() is what actually gates any fetching.
export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID || 'placeholder',
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  token: SANITY_READ_TOKEN,
  useCdn: !SANITY_READ_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

export function isSanityConfigured() {
  return Boolean(SANITY_PROJECT_ID)
}
