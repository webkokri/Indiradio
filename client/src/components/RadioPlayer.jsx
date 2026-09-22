import { motion } from 'framer-motion'
import { HiPlay, HiPause, HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { useRadioPlayer } from '../context/RadioPlayerContext.jsx'
import { STATION_NAME } from '../config.js'

export default function RadioPlayer({ coverImage }) {
  const { isPlaying, isLoading, volume, error, setVolume, toggle } = useRadioPlayer()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto flex max-w-xl flex-col items-center gap-6 rounded-3xl bg-ink p-10 text-center text-white shadow-glow"
    >
      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={{ repeat: isPlaying ? Infinity : 0, duration: 12, ease: 'linear' }}
        className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-ink-soft"
      >
        {coverImage ? (
          <img src={coverImage} alt={STATION_NAME} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-4xl font-bold text-accent">IR</span>
        )}
      </motion.div>

      <div>
        <h3 className="font-display text-xl font-bold">{STATION_NAME} Live</h3>
        <p className="mt-1 text-sm text-white/50">
          {isLoading ? 'Buffering stream…' : isPlaying ? 'On air now' : 'Tap play to listen live'}
        </p>
      </div>

      <button
        onClick={toggle}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white transition-transform hover:scale-105 active:scale-95"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isLoading ? (
          <motion.span
            className="h-8 w-8 rounded-full border-4 border-white/30 border-t-white"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          />
        ) : isPlaying ? (
          <HiPause size={32} />
        ) : (
          <HiPlay size={32} />
        )}
      </button>

      <div className="flex w-full max-w-xs items-center gap-3">
        <button onClick={() => setVolume(volume > 0 ? 0 : 0.8)} aria-label="Toggle volume">
          {volume > 0 ? <HiVolumeUp size={20} /> : <HiVolumeOff size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-accent"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </motion.div>
  )
}
