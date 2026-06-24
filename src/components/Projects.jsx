import { motion } from 'framer-motion'

const projects = [
  {
    title: 'redis-mini',
    description:
      'A Redis-compatible in-memory key-value store in Go — implements the RESP wire protocol, AOF persistence, and goroutine-per-connection concurrency.',
    lang: { label: 'Go', color: 'cyan' },
    concepts: ['Concurrency', 'Backend', 'Databases', 'Networking'],
    video: 'redis_video.mp4',
    link: 'https://github.com/pierredyl/redis-mini',
  },
  {
    title: 'Secure API Gateway',
    description:
      'Stateless auth gateway in Go: PASETO tokens, Argon2id, RBAC.',
    lang: { label: 'Go', color: 'cyan' },
    concepts: ['Microservices', 'RESTful APIs', 'Security', 'Cryptography'],
    video: 'gateway_video.mp4',
    link: 'https://github.com/pierredyl/secure-auth-gateway',
  },
{
    title: 'C-Like Interpreter',
    description:
      'Tree-walking interpreter for a C-like language, built from scratch in C++',
    lang: { label: 'C++', color: 'orange' },
    concepts: ['Compiler Design', 'Data Structures & Algorithms', 'Memory Management', 'Software Architecture', 'Systems Programming'],
    video: 'interpreter_video.mp4',
    link: 'https://github.com/pierredyl/c-like-language-interpreter',
  },
]

const colorMap = {
  cyan:   { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/30',   text: 'text-cyan-400',   dot: 'bg-cyan-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', dot: 'bg-orange-400' },
}

function LangBadge({ label, color }) {
  const c = colorMap[color]
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold px-3 py-1.5 rounded-md border ${c.bg} ${c.border} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {label}
    </span>
  )
}

function ConceptBadge({ label }) {
  return (
    <span className="font-mono text-[11px] px-2.5 py-1 rounded border border-border text-text-muted bg-surface/60">
      {label}
    </span>
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
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-text-special)] tracking-tight">
          Projects
        </h2>
      </motion.div>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-stretch border-t border-border py-10 md:py-14 transition-colors duration-300"
            >
              {/* Left */}
              <div className="flex-1 flex flex-col pr-0 md:pr-16">

                {/* Lang badge at top */}
                <div className="mb-5">
                  <LangBadge label={project.lang.label} color={project.lang.color} />
                </div>

                {/* Title */}
                <h3 className="font-mono text-2xl md:text-3xl font-bold text-text mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-muted leading-relaxed mb-8 max-w-md">
                  {project.description}
                </p>

                {/* Concepts */}
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.concepts.map((c) => (
                    <ConceptBadge key={c} label={c} />
                  ))}
                </div>
              </div>

              {/* Right — video */}
              <div className="w-full md:w-[55%] shrink-0 mt-8 md:mt-0 rounded-xl overflow-hidden border border-border aspect-video md:aspect-auto relative min-h-[280px]">
                <div className="absolute inset-0 bg-surface" />
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Fallback placeholder shown if video hasn't loaded */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                  <span className="font-mono text-[11px] tracking-widest text-text-muted opacity-30">
                    {project.title}
                  </span>
                </div>
              </div>
            </a>
          </motion.div>
        ))}

        <div className="border-t border-border" />
      </div>

    </section>
  )
}