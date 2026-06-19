import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-16 max-h-1/2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl text-[var(--color-text-special)] md:text-4xl font-semibold mb-6 tracking-tight">
          Who am I?
        </h2>
        <div className="space-y-4 text-text-muted text-base leading-relaxed">
          <p>
            I'm a software engineer with a focus on backend and systems development. I 
            take pride in taking complex problems and solving them with clean and efficient
            solutions.
          </p>

          <p>
            I'm always on the lookout for new ways to challenge myself and grow as a developer
            and a person.
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl text-[var(--color-text-special)] md:text-4xl font-semibold mb-6 py-36 tracking-tight">
            What have I worked with?
          </h2>
        </div>
      </motion.div>
    </section>
  )
}
