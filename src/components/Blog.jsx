import { motion } from 'framer-motion'
import { posts } from '../data/posts'
import PostRow from './PostRow'
import { site } from '../data/site'

export default function Blog() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 pt-40 pb-32">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14 md:mb-20"
      >
        <h1 className="h2 text-text">{site.blog.title}</h1>
        <p className="lead text-text-muted mt-5 max-w-xl">{site.blog.intro}</p>
      </motion.header>

      <div className="flex flex-col">
        {sorted.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <PostRow post={post} />
          </motion.div>
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
