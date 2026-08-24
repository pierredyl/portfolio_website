import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Section from './Section'
import LangBadge from './LangBadge'
import { stackLine } from '../lib/stackLine'
import { projects } from '../data/projects'
import { site } from '../data/site'

export default function Projects() {
  return (
    <Section id="projects" title={site.projects.title} intro={site.projects.intro}>
      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <Link to={`/projects/${project.slug}`} className="card card-hover group block p-6 md:p-8">
              <div className="mb-5">
                <LangBadge label={project.lang.label} color={project.lang.color} />
              </div>

              <h3 className="h3 text-text mb-4 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed mb-6 max-w-2xl">
                {project.description}
              </p>

              <p className="meta text-text-faint leading-relaxed mb-7">
                {stackLine(project).join('  ·  ')}
              </p>

              <span className="meta inline-flex items-center gap-2 text-accent">
                View project
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
