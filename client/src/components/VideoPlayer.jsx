import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { MdFullscreen, MdFullscreenExit, MdPictureInPictureAlt } from 'react-icons/md'

export default function VideoPlayer({ streamUrl, poster }) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [pipSupported, setPipSupported] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !streamUrl) return

    const attemptAutoplay = () => {
      // Try with sound first; browsers that block unmuted autoplay reject the
      // promise, so we fall back to muted autoplay, which is almost always allowed.
      video
        .play()
        .catch(() => {
          video.muted = true
          setMuted(true)
          video.play().catch(() => {})
        })
    }

    const isHls = streamUrl.includes('.m3u8')
    let hls

    if (isHls && !video.canPlayType('application/vnd.apple.mpegurl')) {
      import('hls.js')
        .then(({ default: Hls }) => {
          if (!Hls.isSupported()) {
            setError('Your browser does not support this live stream format.')
            return
          }
          hls = new Hls()
          hls.loadSource(streamUrl)
          hls.attachMedia(video)
          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data.fatal) setError('Live stream is currently unavailable.')
          })
          hls.on(Hls.Events.MANIFEST_PARSED, attemptAutoplay)
        })
        .catch(() => setError('Could not load the video player.'))

      return () => hls && hls.destroy()
    }

    video.src = streamUrl
    video.addEventListener('loadedmetadata', attemptAutoplay)
    return () => video.removeEventListener('loadedmetadata', attemptAutoplay)
  }, [streamUrl])

  useEffect(() => {
    setPipSupported(document.pictureInPictureEnabled && !videoRef.current?.disablePictureInPicture)

    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    if (!video.muted) video.play().catch(() => {})
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current?.requestFullscreen().catch(() => {})
    }
  }

  const togglePip = async () => {
    const video = videoRef.current
    if (!video) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await video.requestPictureInPicture()
      }
    } catch {
      // Ignore — PiP isn't guaranteed to succeed on every browser/state.
    }
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group relative aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl"
    >
      <video
        ref={videoRef}
        poster={poster}
        muted={muted}
        autoPlay
        playsInline
        className="h-full w-full object-cover"
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6 text-center text-white">
          {error}
        </div>
      )}

      {!error && (
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform hover:scale-105"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
          </button>

          {pipSupported && (
            <button
              onClick={togglePip}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform hover:scale-105"
              aria-label="Picture in picture"
            >
              <MdPictureInPictureAlt size={20} />
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-transform hover:scale-105"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <MdFullscreenExit size={22} /> : <MdFullscreen size={22} />}
          </button>
        </div>
      )}

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        LIVE
      </div>
    </motion.div>
  )
}
