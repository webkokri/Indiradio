import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineGlobeAlt, HiOutlineUserGroup, HiArrowRight } from 'react-icons/hi'
import { HiOutlineRadio } from 'react-icons/hi2'
import PageTransition from '../components/PageTransition.jsx'
import VideoPlayer from '../components/VideoPlayer.jsx'
import CustomCode from '../components/CustomCode.jsx'
import { PageLoader } from '../components/PageState.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { homePageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanityClient.js'
import { VIDEO_STREAM_URL, STATION_NAME } from '../config.js'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stats = [
  { label: 'Live, all day', value: '24/7' },
  { label: 'Broadcast channels', value: '02' },
  { label: 'Listening worldwide', value: '∞' },
]

const defaultHighlights = [
  {
    title: 'Live Radio, Always On',
    description: 'Music, talk, and community voices streaming around the clock — no downloads required.',
    icon: 'radio',
  },
  {
    title: 'Live TV, Right Here',
    description: 'Watch our broadcast stream directly on the site, from any device, anywhere in the world.',
    icon: 'tv',
  },
  {
    title: 'Built for the Community',
    description: 'Hosted by real people telling real stories — programming shaped by the listeners.',
    icon: 'community',
  },
]

const icons = {
  radio: HiOutlineRadio,
  tv: HiOutlineGlobeAlt,
  community: HiOutlineUserGroup,
}

export default function Home() {
  const { data, loading, error } = useSanityQuery(homePageQuery)

  if (loading) return <PageTransition><PageLoader label="Tuning in…" /></PageTransition>

  const page = data || {}
  const heroTitle = page.heroTitle || `Live Radio & TV, Wherever You Are`
  const heroSubtitle =
    page.heroSubtitle ||
    `${STATION_NAME} streams live audio and video around the clock — music, talk, and culture from the community, for the community.`
  const heroCtaText = page.heroCtaText || 'Listen Live'
  const heroCtaLink = page.heroCtaLink || '/radio'
  const videoUrl = page.videoStreamUrl || VIDEO_STREAM_URL
  const poster = page.videoPoster ? urlFor(page.videoPoster).width(1280).url() : undefined
  const highlights = page.highlights?.length ? page.highlights : defaultHighlights
  const featuredShows = page.featuredShows || []

  return (
    <PageTransition>
      <CustomCode code={page.customCode} />
      {error && (
        <div className="border-b border-white/10 bg-ink px-6 py-2 text-center text-xs text-white/40">
          {error}
        </div>
      )}

      {/* Section 1 — Hero */}
      <section className="border-b border-white/10 bg-ink py-20 text-white">
        <div className="container-page grid items-center gap-16 md:grid-cols-2">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <p className="eyebrow">On Air Now</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] md:text-6xl">{heroTitle}</h1>
            <p className="mt-6 max-w-md text-lg text-white/60">{heroSubtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={heroCtaLink} className="btn-primary">
                {heroCtaText} <HiArrowRight />
              </Link>
              <Link to="/blog" className="btn-secondary-inverse">
                Read the Blog
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <VideoPlayer streamUrl={videoUrl} poster={poster} />
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Stats strip */}
      <section className="border-b border-ink/10 bg-white py-14">
        <div className="container-page grid gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <p className="font-display text-4xl font-bold text-ink">{s.value}</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 — Highlights */}
      <section className="bg-white py-20">
        <div className="container-page">
          <p className="eyebrow">Why {STATION_NAME}</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-ink md:text-4xl">
            One station, every way you want to experience it.
          </h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.12 }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {highlights.map((h, i) => {
              const Icon = icons[h.icon] || HiOutlineRadio
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-ink/10 p-8"
                >
                  <Icon className="text-3xl text-accent" />
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-2 text-sm text-ink/60">{h.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Featured shows */}
      <section className="border-t border-white/10 bg-ink py-20 text-white">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured Shows</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">What's playing this week</h2>
            </div>
            <Link to="/radio" className="btn-secondary-inverse">
              See Full Schedule <HiArrowRight />
            </Link>
          </div>

          {featuredShows.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredShows.map((show) => (
                <motion.div
                  key={show._id}
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-2xl border border-white/10"
                >
                  {show.image && (
                    <img
                      src={urlFor(show.image).width(400).height(250).url()}
                      alt={show.name}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className="font-display font-bold">{show.name}</h3>
                    <p className="text-sm text-white/50">{show.host}</p>
                    <p className="mt-2 text-xs font-semibold text-accent">
                      {show.day} · {show.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {['Morning Drive', 'Midday Mix', 'Evening Talk'].map((placeholder) => (
                <div
                  key={placeholder}
                  className="flex h-40 flex-col justify-end rounded-2xl border border-dashed border-white/15 p-5"
                >
                  <h3 className="font-display font-bold text-white/70">{placeholder}</h3>
                  <p className="mt-1 text-xs text-white/35">Schedule coming soon</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 5 — Final CTA */}
      <section className="bg-accent py-20 text-white">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">
            Turn it on. {STATION_NAME} is always live.
          </h2>
          <Link
            to="/radio"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-accent transition-transform hover:scale-105"
          >
            Start Listening <HiArrowRight />
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}
