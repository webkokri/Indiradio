import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition.jsx'
import RadioPlayer from '../components/RadioPlayer.jsx'
import CustomCode from '../components/CustomCode.jsx'
import { PageLoader } from '../components/PageState.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { radioPageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanityClient.js'

const defaultSchedule = [
  { _id: 'd1', name: 'Morning Drive', host: 'Hosted live', day: 'Mon–Fri', time: '7:00 – 10:00 AM' },
  { _id: 'd2', name: 'Midday Mix', host: 'Hosted live', day: 'Mon–Fri', time: '12:00 – 2:00 PM' },
  { _id: 'd3', name: 'Evening Talk', host: 'Hosted live', day: 'Mon–Fri', time: '6:00 – 8:00 PM' },
]

export default function Radio() {
  const { data, loading, error } = useSanityQuery(radioPageQuery)

  if (loading) return <PageTransition><PageLoader label="Loading radio…" /></PageTransition>

  const page = data || {}
  const title = page.title || 'Listen Live'
  const description =
    page.description ||
    'Tune in to our 24/7 live audio stream — music, talk shows, and community voices.'
  const coverImage = page.coverImage ? urlFor(page.coverImage).width(400).height(400).url() : undefined
  const schedule = page.schedule?.length ? page.schedule : defaultSchedule

  return (
    <PageTransition>
      <CustomCode code={page.customCode} />
      <section className="border-b border-white/10 bg-ink py-20 text-white">
        <div className="container-page text-center">
          {error && (
            <div className="mx-auto mb-8 max-w-md rounded-xl border border-white/10 px-4 py-2 text-xs text-white/40">
              {error}
            </div>
          )}
          <p className="eyebrow">Radio</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">{description}</p>

          <div className="mt-12">
            <RadioPlayer coverImage={coverImage} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <p className="eyebrow">This Week</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">Weekly Schedule</h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10"
          >
            {schedule.map((show) => (
              <motion.div
                key={show._id}
                variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                className="flex flex-wrap items-center justify-between gap-2 px-6 py-5"
              >
                <div>
                  <p className="font-display font-bold text-ink">{show.name}</p>
                  <p className="text-sm text-ink/50">{show.host}</p>
                </div>
                <span className="rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
                  {show.day} · {show.time}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
