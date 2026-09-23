import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SOCIAL_LINKS, STATION_NAME } from '../config.js'
import { useNavigation } from '../context/NavigationContext.jsx'
import logo from '../assets/logo.webp'

export default function Footer() {
  const { footerLinks } = useNavigation()

  return (
    <footer className="border-t border-white/10 bg-ink text-white/60">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <span className="inline-flex items-center rounded-lg bg-white px-3 py-1.5">
            <img src={logo} alt={STATION_NAME} className="h-10 w-auto" />
          </span>
          <p className="mt-4 max-w-xs text-sm">
            Live radio and TV streaming, celebrating the sounds and stories of the community —
            anytime, anywhere.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm">
            {footerLinks.map((link, i) => (
              <li key={`${link.to}-${i}`}>
                {link.external ? (
                  <a
                    href={link.to}
                    target={link.newTab ? '_blank' : undefined}
                    rel={link.newTab ? 'noreferrer noopener' : undefined}
                    className="hover:text-white"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.to}
                    target={link.newTab ? '_blank' : undefined}
                    className="hover:text-white"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Follow Us</p>
          <div className="flex gap-4 text-xl">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-accent hover:text-accent" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs">
        <p>© {new Date().getFullYear()} {STATION_NAME}. All rights reserved.</p>
        <p className="mt-1">
          Designed by{' '}
          <a
            href="https://siman.ca"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-white/80 hover:text-accent"
          >
            Siman Tech Studio
          </a>
        </p>
      </div>
    </footer>
  )
}
