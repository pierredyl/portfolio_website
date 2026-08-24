import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/posts'
import { readingTime } from '../lib/readingTime'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-40 pb-32">
        <span className="meta text-accent">404</span>
        <h1 className="h2 text-text mt-5 mb-4">Post not found.</h1>
        <p className="lead text-text-muted mb-10">
          This post doesn&rsquo;t exist or may have been moved.
        </p>
        <Link
          to="/blog"
          className="meta text-text-muted hover:text-accent transition-colors duration-200"
        >
          &larr; Back to Blog
        </Link>
      </section>
    )
  }

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-10 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/blog"
          className="meta text-text-muted hover:text-accent transition-colors duration-200"
        >
          &larr; Back to Blog
        </Link>

        <header className="mt-8 pb-10 border-b border-border">
          <div className="meta text-text-faint flex flex-wrap gap-x-4 gap-y-2 mb-6">
            <span>{post.date}</span>
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
            <span>{readingTime(post)} min read</span>
          </div>

          <h1 className="h2 text-text balance mb-8">{post.title}</h1>

          <div className="flex items-center gap-3">
            {/* The avatar is decorative — the author's name sits right beside it,
                so alt text here would just make a screen reader say it twice. */}
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt=""
                width={36}
                height={36}
                decoding="async"
                className="w-9 h-9 rounded-full object-cover border border-border"
              />
            ) : (
              <span className="meta w-9 h-9 rounded-full bg-surface border border-border text-text-muted flex items-center justify-center">
                {post.author.name
                  .split(' ')
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join('')}
              </span>
            )}
            <span className="meta text-text-muted">{post.author.name}</span>
          </div>
        </header>

        <div className="flex flex-col gap-7 mt-12">
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
                    <figcaption className="meta text-text-faint mt-3">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            }
            return (
              <p key={i} className="lead text-text-muted leading-[1.75]">
                {block.text}
              </p>
            )
          })}
        </div>
      </motion.div>
    </article>
  )
}
