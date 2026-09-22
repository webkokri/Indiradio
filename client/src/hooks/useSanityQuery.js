import { useEffect, useState } from 'react'
import { sanityClient, isSanityConfigured } from '../lib/sanityClient.js'

export function useSanityQuery(query, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSanityConfigured()) {
      setLoading(false)
      setError('Sanity is not configured yet. Set VITE_SANITY_PROJECT_ID in client/.env.')
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    sanityClient
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load content')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}
