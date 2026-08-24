import { Link } from 'react-router-dom'
import { readingTime } from '../lib/readingTime'

/** Compact list row, used by the /blog index and by the home section's older posts. */
export default function PostRow({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-3 md:gap-10 border-t border-border py-8 md:py-10"
    >
      <span className="meta text-text-faint md:pt-1.5">{post.date}</span>

      <div>
        <h3 className="h3 text-text mb-3 group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-sm text-text-muted leading-relaxed mb-5 max-w-2xl">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {post.tags.map((t) => (
            <span key={t} className="meta text-text-faint">
              {t}
            </span>
          ))}
          <span className="meta text-text-faint">{readingTime(post)} min read</span>
          <span className="meta ml-auto inline-flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read &rarr;
          </span>
        </div>
      </div>
    </Link>
  )
}
