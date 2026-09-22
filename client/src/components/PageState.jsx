import { motion } from 'framer-motion'

export function PageLoader({ label = 'Loading content…' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-ink">
      <motion.span
        className="h-10 w-10 rounded-full border-4 border-accent/20 border-t-accent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      />
      <p className="font-medium">{label}</p>
    </div>
  )
}

export function PageError({ message }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="text-lg font-semibold text-ink">Content unavailable</p>
      <p className="max-w-md text-sm text-ink/60">{message}</p>
    </div>
  )
}
