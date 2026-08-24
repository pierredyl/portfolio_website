import { Link } from 'react-router-dom'
import { readingTime } from '../lib/readingTime'

/**
 * The most recent post, given more presence than a plain list row — no cover
 * image or graphic standing in for one, just the entry itself at a larger scale.
 */
export default function FeaturedPost({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card card-hover group block p-6 md:p-8">
      <div className="flex items-center gap-4 mb-5">
        <span className="meta text-accent">Latest</span>
        <span className="meta text-text-faint">{post.date}</span>
      </div>

      <h3 className="h3 text-text mb-4 group-hover:text-accent transition-colors duration-300">
        {post.title}
      </h3>

      <p className="text-sm text-text-muted leading-relaxed mb-7 max-w-2xl">{post.excerpt}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {post.tags.map((t) => (
          <span key={t} className="meta text-text-faint">
            {t}
          </span>
        ))}
        <span className="meta text-text-faint">{readingTime(post)} min read</span>
        <span className="meta ml-auto inline-flex items-center gap-2 text-accent">
          Read
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
