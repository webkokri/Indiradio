import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import PageTransition from '../components/PageTransition.jsx'
import CustomCode from '../components/CustomCode.jsx'
import { PageLoader } from '../components/PageState.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { aboutPageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanityClient.js'
import { STATION_NAME } from '../config.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const defaultStory = [
  `${STATION_NAME} started as a simple idea: give a community a station that actually sounds like it. No syndicated filler, no distant programming decisions — just live radio and TV built by the people who listen to it.`,
  `Today that means round-the-clock streaming audio, a live video channel, and a growing lineup of shows hosted by real voices from the community. Everything is built to work anywhere — no app to install, no login, just press play.`,
]

const pillars = [
  { title: 'Local first', description: 'Programming shaped by the community it serves, not a distant network.' },
  { title: 'Always live', description: 'Radio and TV streaming 24/7, from wherever you are.' },
  { title: 'Open to everyone', description: 'No account, no app, no paywall — just press play.' },
]

export default function About() {
  const { data, loading, error } = useSanityQuery(aboutPageQuery)

  if (loading) return <PageTransition><PageLoader label="Loading our story…" /></PageTransition>

  const page = data || {}
  const title = page.title || 'About Us'
  const mission =
    page.mission ||
    `${STATION_NAME} brings live radio and TV to listeners everywhere, powered by community voices.`
  const heroImage = page.heroImage ? urlFor(page.heroImage).width(1200).url() : undefined
  const teamMembers = page.teamMembers || []

  return (
    <PageTransition>
      <CustomCode code={page.customCode} />
      {error && (
        <div className="border-b border-ink/10 bg-white px-6 py-2 text-center text-xs text-ink/40">
          {error}
        </div>
      )}

      {/* Hero */}
      <section className="border-b border-white/10 bg-ink py-20 text-white">
        <div className="container-page">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}>
            <p className="eyebrow">About Us</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">{title}</h1>
            <p className="mt-6 max-w-xl text-lg text-white/60">{mission}</p>
          </motion.div>
        </div>
      </section>

      {heroImage && (
        <img src={heroImage} alt={title} className="h-[360px] w-full object-cover" />
      )}

      {/* Story */}
      <section className="bg-white py-20">
        <div className="container-page grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-3 text-3xl font-bold text-ink">How it started</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/70">
            {page.story ? (
              <PortableText value={page.story} />
            ) : (
              defaultStory.map((p, i) => <p key={i}>{p}</p>)
            )}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-ink/10 bg-white pb-20">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-ink/10 p-8">
              <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-white/10 bg-ink py-20 text-white">
        <div className="container-page">
          <p className="eyebrow">The Team</p>
          <h2 className="mt-3 text-3xl font-bold">Meet the voices</h2>

          {teamMembers.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
              className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
            >
              {teamMembers.map((member) => (
                <motion.div
                  key={member._id}
                  variants={fadeUp}
                  className="rounded-2xl border border-white/10 p-6 text-center"
                >
                  {member.photo && (
                    <img
                      src={urlFor(member.photo).width(200).height(200).url()}
                      alt={member.name}
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                    />
                  )}
                  <h3 className="mt-4 font-display font-bold">{member.name}</h3>
                  <p className="text-sm text-accent">{member.role}</p>
                  {member.bio && <p className="mt-2 text-sm text-white/50">{member.bio}</p>}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="mt-8 max-w-md text-white/40">
              Team profiles are managed in the Studio — add Team Member entries there and they'll
              appear here.
            </p>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
