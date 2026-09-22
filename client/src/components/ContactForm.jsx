import { useState } from 'react'
import { motion } from 'framer-motion'
import { API_BASE_URL } from '../config.js'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err.message)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className="rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-accent"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className="rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-accent"
        />
      </div>

      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-accent"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your message"
        rows={5}
        required
        className="rounded-lg border border-ink/15 px-4 py-3 outline-none focus:border-accent"
      />

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary justify-center disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </motion.button>

      {status === 'success' && (
        <p className="text-center text-sm font-medium text-green-600">
          Thanks! Your message has been sent.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm font-medium text-red-600">{errorMessage}</p>
      )}
    </motion.form>
  )
}
