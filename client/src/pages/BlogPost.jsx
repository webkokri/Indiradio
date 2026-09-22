import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import PageTransition from '../components/PageTransition.jsx'
import CustomCode from '../components/CustomCode.jsx'
import { PageLoader, PageError } from '../components/PageState.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { blogPostBySlugQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanityClient.js'

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(900).url()}
        alt=""
        className="my-6 w-full rounded-2xl object-cover"
      />
    ),
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, loading, error } = useSanityQuery(blogPostBySlugQuery, { slug })

  if (loading) return <PageTransition><PageLoader label="Loading post…" /></PageTransition>
  if (error) return <PageTransition><PageError message={error} /></PageTransition>
  if (!post) return <PageTransition><PageError message="This post could not be found." /></PageTransition>

  const coverImage = post.coverImage ? urlFor(post.coverImage).width(1200).url() : undefined

  return (
    <PageTransition className="container-page max-w-3xl py-16">
      <CustomCode code={post.customCode} />
      <Link to="/blog" className="text-sm font-semibold text-accent">
        ← Back to Blog
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-4xl font-bold text-ink"
      >
        {post.title}
      </motion.h1>

      <p className="mt-2 text-sm text-ink/50">
        {post.author && <>By {post.author} · </>}
        {post.publishedAt &&
          new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
      </p>

      {coverImage && (
        <img src={coverImage} alt={post.title} className="mt-8 w-full rounded-2xl object-cover" />
      )}

      {post.body && (
        <div className="prose prose-lg mt-10 max-w-none text-ink/70">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      )}
    </PageTransition>
  )
}
