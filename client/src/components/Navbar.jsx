import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'
import { STATION_NAME } from '../config.js'
import { useNavigation } from '../context/NavigationContext.jsx'
import logo from '../assets/logo.webp'

const externalProps = (link) => ({
  href: link.to,
  target: link.newTab ? '_blank' : undefined,
  rel: link.newTab ? 'noreferrer noopener' : undefined,
})

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { headerLinks } = useNavigation()

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur">
      <nav className="container-page flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="flex items-center rounded-lg bg-white px-3 py-1.5">
            <img src={logo} alt={STATION_NAME} className="h-10 w-auto" />
          </span>
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {headerLinks.map((link, i) => (
            <li key={`${link.to}-${i}`}>
              {link.external ? (
                <a
                  {...externalProps(link)}
                  className="text-sm font-semibold uppercase tracking-wide text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  target={link.newTab ? '_blank' : undefined}
                  className={({ isActive }) =>
                    `relative text-sm font-semibold uppercase tracking-wide transition-colors ${
                      isActive ? 'text-white' : 'text-white/50 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="relative pb-1">
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 h-0.5 w-full bg-accent"
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        <button
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-ink md:hidden"
          >
            {headerLinks.map((link, i) => (
              <li key={`${link.to}-${i}`} className="border-b border-white/10">
                {link.external ? (
                  <a
                    {...externalProps(link)}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white/70"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    target={link.newTab ? '_blank' : undefined}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-6 py-4 text-sm font-semibold uppercase tracking-wide ${
                        isActive ? 'text-accent' : 'text-white/70'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
