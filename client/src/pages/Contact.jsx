import { motion } from 'framer-motion'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import PageTransition from '../components/PageTransition.jsx'
import ContactForm from '../components/ContactForm.jsx'
import CustomCode from '../components/CustomCode.jsx'
import { PageLoader } from '../components/PageState.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { contactPageQuery } from '../lib/queries.js'

export default function Contact() {
  const { data, loading, error } = useSanityQuery(contactPageQuery)

  if (loading) return <PageTransition><PageLoader label="Loading contact info…" /></PageTransition>

  const page = data || {}
  const title = page.title || 'Contact Us'
  const intro = page.intro || "Have a question, a show idea, or feedback? We'd love to hear from you."
  const email = page.email || 'hello@indiradio.ca'
  const phone = page.phone
  const address = page.address
  const officeHours = page.officeHours || 'We typically reply within one business day.'

  return (
    <PageTransition>
      <CustomCode code={page.customCode} />
      <section className="border-b border-white/10 bg-ink py-20 text-white">
        <div className="container-page">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">{intro}</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          {error && (
            <div className="mb-8 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-center text-xs text-ink/50">
              {error}
            </div>
          )}

          <div className="grid gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-3">
                <HiMail className="mt-1 text-xl text-accent" />
                <a href={`mailto:${email}`} className="text-ink/80 hover:text-accent">
                  {email}
                </a>
              </div>

              {phone && (
                <div className="flex items-start gap-3">
                  <HiPhone className="mt-1 text-xl text-accent" />
                  <a href={`tel:${phone}`} className="text-ink/80 hover:text-accent">
                    {phone}
                  </a>
                </div>
              )}

              {address && (
                <div className="flex items-start gap-3">
                  <HiLocationMarker className="mt-1 text-xl text-accent" />
                  <p className="text-ink/80">{address}</p>
                </div>
              )}

              <p className="text-sm text-ink/50">{officeHours}</p>

              {page.mapEmbedUrl && (
                <iframe
                  title="Location map"
                  src={page.mapEmbedUrl}
                  className="mt-4 h-64 w-full rounded-2xl border-0"
                  loading="lazy"
                />
              )}
            </motion.div>

            <ContactForm />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
