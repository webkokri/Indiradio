import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RADIO_STREAM_URL } from '../config.js'
import { sanityClient, isSanityConfigured } from '../lib/sanityClient.js'

const RadioPlayerContext = createContext(null)

export function RadioPlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [streamUrl, setStreamUrl] = useState(RADIO_STREAM_URL)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [error, setError] = useState(null)

  // The Radio page's streamUrl in Sanity is the source of truth; fall back to
  // the .env default so the player still works before the Studio is populated.
  useEffect(() => {
    if (!isSanityConfigured()) return
    sanityClient
      .fetch(`*[_type == "radioPage"][0].streamUrl`)
      .then((url) => {
        if (url) setStreamUrl(url)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const audio = new Audio(streamUrl)
    audio.preload = 'none'
    audio.volume = volume
    audioRef.current = audio

    const onWaiting = () => setIsLoading(true)
    const onPlaying = () => {
      setIsLoading(false)
      setError(null)
    }
    const onError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Unable to reach the live stream. Please try again shortly.')
    }

    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('error', onError)
      audioRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamUrl])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const play = useCallback(() => {
    if (!audioRef.current) return
    setIsLoading(true)
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsLoading(false)
        setError('Playback was blocked. Tap play again to start the stream.')
      })
  }, [])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
    setIsLoading(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const value = {
    isPlaying,
    isLoading,
    volume,
    error,
    setVolume,
    play,
    pause,
    toggle,
  }

  return <RadioPlayerContext.Provider value={value}>{children}</RadioPlayerContext.Provider>
}

export function useRadioPlayer() {
  const ctx = useContext(RadioPlayerContext)
  if (!ctx) throw new Error('useRadioPlayer must be used within RadioPlayerProvider')
  return ctx
}
