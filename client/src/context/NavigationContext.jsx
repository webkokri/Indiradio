import { createContext, useContext, useMemo } from 'react'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { navigationQuery } from '../lib/queries.js'

const defaultLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Radio', to: '/radio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
]

// Turns a Sanity navLink into { label, to, external, newTab }, or null if it
// isn't linked to anything yet (e.g. a custom page that was deleted).
function resolveLink(link) {
  if (!link?.label) return null
  const newTab = Boolean(link.openInNewTab)

  if (link.linkType === 'external') {
    return link.url ? { label: link.label, to: link.url, external: true, newTab } : null
  }
  if (link.linkType === 'internal') {
    return link.internalPath ? { label: link.label, to: link.internalPath, external: false, newTab } : null
  }
  return link.pageSlug ? { label: link.label, to: `/${link.pageSlug}`, external: false, newTab } : null
}

function resolveList(links) {
  if (!links?.length) return defaultLinks.map((l) => ({ ...l, external: false, newTab: false }))
  return links.map(resolveLink).filter(Boolean)
}

const NavigationContext = createContext({
  headerLinks: resolveList(),
  footerLinks: resolveList(),
})

export function NavigationProvider({ children }) {
  const { data } = useSanityQuery(navigationQuery)

  const value = useMemo(
    () => ({
      headerLinks: resolveList(data?.headerLinks),
      footerLinks: resolveList(data?.footerLinks),
    }),
    [data],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
}

export function useNavigation() {
  return useContext(NavigationContext)
}
