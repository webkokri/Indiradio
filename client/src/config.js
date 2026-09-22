export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || ''
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production'
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'
export const SANITY_READ_TOKEN = import.meta.env.VITE_SANITY_READ_TOKEN || undefined

export const RADIO_STREAM_URL =
  import.meta.env.VITE_RADIO_STREAM_URL || 'https://stream.indiradio.ca/live'

export const VIDEO_STREAM_URL =
  import.meta.env.VITE_VIDEO_STREAM_URL || 'https://stream.indiradio.ca/tv/live.m3u8'

export const VIDEO_POSTER_URL = import.meta.env.VITE_VIDEO_POSTER_URL || ''

export const SOCIAL_LINKS = {
  facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/indiradio',
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/indiradio',
  youtube: import.meta.env.VITE_YOUTUBE_URL || 'https://youtube.com/@indiradio',
}

export const STATION_NAME = 'Indi Radio'
