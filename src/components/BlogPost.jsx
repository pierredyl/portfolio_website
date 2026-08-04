import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts'

function TagBadge({ label }) {
  return (
    <span className="font-mono text-[11px] px-2.5 py-1 rounded border border-border text-text-muted bg-surface/60">
      {label}
    </span>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="max-w-5xl mx-auto px-6 pt-40 pb-32">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--color-text-special)] tracking-tight mb-4">
          Post not found
        </h1>
        <p className="text-sm text-text-muted mb-8">
          This post doesn't exist or may have been moved.
        </p>
        <Link
          to="/blog"
          className="text-sm text-accent hover:opacity-80 transition-opacity duration-200"
        >
          &larr; Back to Blog
        </Link>
      </section>
    )
  }

  return (
    <section className="max-w-3xl mx-auto px-6 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/blog"
          className="text-sm text-text-muted hover:text-text transition-colors duration-200"
        >
          &larr; Back to Blog
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-text tracking-tight mt-6 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-8">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover border border-border"
          />
          <div className="flex flex-col">
            <span className="text-sm text-text">{post.author.name}</span>
            <span className="font-mono text-xs text-text-muted">{post.date}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-12">
          {post.tags.map((t) => (
            <TagBadge key={t} label={t} />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {post.content.map((block, i) => {
            if (block.type === 'embed') {
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border"
                  style={{ height: block.height ?? 450 }}
                >
                  <iframe
                    src={block.src}
                    title={block.title}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              )
            }
            if (block.type === 'image') {
              return (
                <figure key={i}>
                  <div
                    className="rounded-xl overflow-hidden border border-border mx-auto"
                    style={{ width: block.width ?? '100%', height: block.height, maxWidth: '100%' }}
                  >
                    <img
                      src={block.src}
                      alt={block.alt ?? ''}
                      loading="lazy"
                      className="block w-full h-full object-contain"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="font-mono text-xs text-text-muted mt-2">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            }
            return (
              <p key={i} className="text-sm text-text-muted leading-relaxed">
                {block.text}
              </p>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
