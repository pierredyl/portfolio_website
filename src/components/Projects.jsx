import { motion } from 'framer-motion'

const projects = [
  {
    title: 'redis-mini',
    description:
      'A Redis clone built in Go — RESP protocol parsing, AOF persistence, and goroutine-per-connection concurrency with a full table-driven test suite.',
    tech: ['Go', 'Concurrency', 'Networking'],
    link: '#',
  },
  {
    title: 'Secure API Gateway',
    description:
      'A microservice gateway implementing PASETO-based auth, Argon2 password hashing, and role-based access control from the ground up.',
    tech: ['Go', 'Security', 'RBAC'],
    link: '#',
  },
  {
    title: 'C-Like Language Interpreter',
    description:
      'A ~3,600 line interpreter for a custom C-like language, including a hand-written lexer, parser, AST, and tree-walking evaluator.',
    tech: ['C++', 'Compilers'],
    link: '#',
  },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-surface p-6 hover:border-accent/50 transition-colors duration-300"
    >
      <h3 className="text-xl font-medium text-text mb-2">{project.title}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-accent-soft text-accent"
          >
            {t}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        className="text-sm text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
      >
        View project →
      </a>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
          Projects
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-text tracking-tight">
          Things I've built
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
