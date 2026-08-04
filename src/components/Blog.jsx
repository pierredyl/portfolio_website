import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from '../data/posts'

function TagBadge({ label }) {
  return (
    <span className="font-mono text-[11px] px-2.5 py-1 rounded border border-border text-text-muted bg-surface/60">
      {label}
    </span>
  )
}

export default function Blog() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-text-special)] tracking-tight">
          Blog
        </h1>
      </motion.div>

      <div className="flex flex-col">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <Link
              to={`/blog/${post.slug}`}
              className="group flex flex-col border-t border-border py-10 md:py-14 transition-colors duration-300"
            >
              <span className="font-mono text-xs text-text-muted mb-4">
                {post.date}
              </span>

              <h3 className="font-mono text-2xl md:text-3xl font-bold text-text mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                {post.title}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed mb-8 max-w-2xl">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <TagBadge key={t} label={t} />
                ))}
              </div>
            </Link>
          </motion.div>
        ))}

        <div className="border-t border-border" />
      </div>
    </section>
  )
}
