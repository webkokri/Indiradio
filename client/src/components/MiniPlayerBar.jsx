import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { HiPause, HiPlay } from 'react-icons/hi'
import { useRadioPlayer } from '../context/RadioPlayerContext.jsx'
import { STATION_NAME } from '../config.js'

export default function MiniPlayerBar() {
  const { isPlaying, isLoading, toggle } = useRadioPlayer()
  const location = useLocation()

  // The full player already lives on /radio, so keep the mini bar for every other page.
  const hideOnRadioPage = location.pathname === '/radio'

  return (
    <AnimatePresence>
      {isPlaying && !hideOnRadioPage && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="sticky bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur"
        >
          <div className="container-page flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-white">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-semibold">
                {isLoading ? 'Buffering…' : `${STATION_NAME} — Live`}
              </span>
            </div>
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <HiPause size={20} /> : <HiPlay size={20} />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
