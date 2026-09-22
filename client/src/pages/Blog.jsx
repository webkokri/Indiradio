import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiOutlineDocumentText } from 'react-icons/hi'
import PageTransition from '../components/PageTransition.jsx'
import { PageLoader } from '../components/PageState.jsx'
import { useSanityQuery } from '../hooks/useSanityQuery.js'
import { blogPostsQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanityClient.js'

export default function Blog() {
  const { data, loading, error } = useSanityQuery(blogPostsQuery)

  if (loading) return <PageTransition><PageLoader label="Loading posts…" /></PageTransition>

  const posts = data || []

  return (
    <PageTransition>
      <section className="border-b border-white/10 bg-ink py-20 text-white">
        <div className="container-page">
          <p className="eyebrow">Blog</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">News & Stories</h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Updates, behind-the-scenes notes, and stories from the {posts.length ? '' : 'Indi Radio '}community.
          </p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          {error && (
            <div className="mb-8 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-center text-xs text-ink/50">
              {error}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink/15 px-6 py-20 text-center">
              <HiOutlineDocumentText className="text-4xl text-ink/20" />
              <h2 className="mt-4 text-xl font-bold text-ink">No posts published yet</h2>
              <p className="mt-2 max-w-sm text-sm text-ink/50">
                New Blog Post entries added in the Studio will show up here automatically.
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <motion.article
                  key={post._id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-2xl border border-ink/10"
                >
                  <Link to={`/blog/${post.slug?.current}`}>
                    {post.coverImage && (
                      <img
                        src={urlFor(post.coverImage).width(500).height(300).url()}
                        alt={post.title}
                        className="h-48 w-full object-cover"
                      />
                    )}
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {post.publishedAt &&
                          new Date(post.publishedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                      </p>
                      <h2 className="mt-2 font-display text-xl font-bold text-ink">{post.title}</h2>
                      {post.excerpt && (
                        <p className="mt-2 line-clamp-3 text-sm text-ink/60">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
