import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { demos } from './demos'
import LangBadge from './LangBadge'

/**
 * Every block gets a full-width hairline and a real heading at .h3 scale —
 * previously the heading itself was tiny mono text while the Challenges
 * sub-items used that same .h3 scale, which inverted the hierarchy and made
 * sections blend together. The heading is now clearly the biggest thing in
 * the block; sub-items are demoted to a plain semibold label.
 */
function Block({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mt-16 md:mt-10"
    >
      <h2 className="h3 text-text mb-6">{title}</h2>
      {children}
    </motion.section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-40 pb-32">
        <span className="meta text-accent">404</span>
        <h1 className="h2 text-text mt-5 mb-4">Project not found.</h1>
        <p className="lead text-text-muted mb-10">
          This project doesn&rsquo;t exist or may have been moved.
        </p>
        <Link
          to="/#projects"
          className="meta text-text-muted hover:text-accent transition-colors duration-200"
        >
          &larr; Back to Projects
        </Link>
      </section>
    )
  }

  const Demo = project.demo ? demos[project.demo.type] : null

  return (
    <article className="max-w-4xl mx-auto px-6 md:px-10 pt-40 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/#projects"
          className="meta text-text-muted hover:text-accent transition-colors duration-200"
        >
          &larr; Back to Projects
        </Link>

        <header className="mt-8 pb-10 border-b border-border">
          <div className="mb-6">
            <LangBadge label={project.lang.label} color={project.lang.color} />
          </div>

          <h1 className="h2 text-text balance mb-6">{project.title}</h1>

          <p className="lead text-text-muted max-w-2xl mb-7">{project.description}</p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="meta inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-200"
            >
              View source
              <span>&#8599;</span>
            </a>
          )}
        </header>

        {/* No placeholder when there's no real demo yet — an empty-looking
            "coming soon" box isn't worth the space it takes up. */}
        {Demo && (
          <Block title="Demo">
            <Demo {...project.demo} />
          </Block>
        )}

        {project.overview && (
          <Block title="Overview">
            <p className="lead text-text-muted leading-[1.75]">{project.overview}</p>
          </Block>
        )}

        {project.architecture && (
          <Block title="How it works">
            <p className="lead text-text-muted leading-[1.75]">{project.architecture}</p>
          </Block>
        )}

        {project.challenges?.length > 0 && (
          <Block title="Challenges & decisions">
            <div className="flex flex-col gap-8">
              {project.challenges.map((c) => (
                <div key={c.title}>
                  <h3 className="text-base font-semibold text-text mb-2">{c.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </Block>
        )}

        {project.techStack && (
          <Block title="Tech stack">
            <dl className="flex flex-col">
              {Object.entries(project.techStack).map(([label, items]) => (
                <div
                  key={label}
                  className="border-t border-border py-5 last:border-b grid grid-cols-[7rem_1fr] gap-4 items-baseline"
                >
                  <dt className="meta text-text-faint">{label}</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-2">
                    {items.map((item) => (
                      <span key={item} className="text-sm text-text-muted">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>
        )}
      </motion.div>
    </article>
  )
}
