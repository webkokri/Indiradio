import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import PageTransition from '../components/PageTransition.jsx'
import CustomCode from '../components/CustomCode.jsx'
import { PageLoader } from '../components/PageState.jsx'
import NotFound from './NotFound.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { customPageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanityClient.js'

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img src={urlFor(value).width(900).url()} alt="" className="my-6 w-full rounded-2xl object-cover" />
    ),
  },
}

export default function CustomPage() {
  const { slug } = useParams()
  const { data: page, loading } = useSanityQuery(customPageQuery, { slug })

  if (loading) return <PageTransition><PageLoader label="Loading…" /></PageTransition>
  if (!page) return <NotFound />

  return (
    <PageTransition>
      <CustomCode code={page.customCode} />
      <section className="border-b border-white/10 bg-ink py-20 text-white">
        <div className="container-page">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="max-w-2xl text-4xl font-bold md:text-5xl">{page.title}</h1>
            {page.subtitle && <p className="mt-6 max-w-xl text-lg text-white/60">{page.subtitle}</p>}
          </motion.div>
        </div>
      </section>

      {page.body?.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-page">
            <div className="prose prose-lg max-w-3xl text-ink/70">
              <PortableText value={page.body} components={portableTextComponents} />
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  )
}
