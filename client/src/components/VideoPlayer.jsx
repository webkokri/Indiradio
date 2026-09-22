import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiVolumeUp, HiVolumeOff, HiPlay } from 'react-icons/hi'

export default function VideoPlayer({ streamUrl, poster }) {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !streamUrl) return

    const isHls = streamUrl.includes('.m3u8')

    if (isHls && !video.canPlayType('application/vnd.apple.mpegurl')) {
      let hls
      import('hls.js')
        .then(({ default: Hls }) => {
          if (Hls.isSupported()) {
            hls = new Hls()
            hls.loadSource(streamUrl)
            hls.attachMedia(video)
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (data.fatal) setError('Live stream is currently unavailable.')
            })
          } else {
            setError('Your browser does not support this live stream format.')
          }
        })
        .catch(() => setError('Could not load the video player.'))

      return () => hls && hls.destroy()
    }

    video.src = streamUrl
  }, [streamUrl])

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    video
      .play()
      .then(() => setStarted(true))
      .catch(() => setError('Playback was blocked by the browser. Tap play again.'))
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl"
    >
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        playsInline
        className="h-full w-full object-cover"
      />

      {!started && !error && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/50"
          aria-label="Play live video"
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white shadow-glow"
          >
            <HiPlay size={36} />
          </motion.span>
        </button>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center text-white">
          {error}
        </div>
      )}

      {started && !error && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform hover:scale-105"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
        </button>
      )}

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        LIVE
      </div>
    </motion.div>
  )
}
