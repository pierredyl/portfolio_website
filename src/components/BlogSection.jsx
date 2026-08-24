import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from './Section'
import FeaturedPost from './FeaturedPost'
import PostRow from './PostRow'
import { posts } from '../data/posts'
import { site } from '../data/site'

export default function BlogSection() {
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
  const [featured, ...rest] = sorted

  if (!featured) return null

  return (
    <Section
      id="blog"
      title={site.blog.title}
      intro={site.blog.intro}
      band="raised"
      action={
        <Link
          to="/blog"
          className="meta text-text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap"
        >
          All posts &rarr;
        </Link>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
        <FeaturedPost post={featured} />
      </motion.div>

      {/* Older posts, if there are any yet */}
      {rest.length > 0 && (
        <div className="flex flex-col mt-12">
          {rest.slice(0, 2).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <PostRow post={post} />
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      )}
    </Section>
  )
}
