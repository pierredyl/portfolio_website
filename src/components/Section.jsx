import { motion } from 'framer-motion'

/**
 * Layout primitive for every home-page section.
 *
 * Renders a full-bleed band carrying the background, and an inner container
 * holding the content — so section backgrounds can alternate tonally while the
 * content stays on one grid. Also owns the single heading treatment (cream
 * headline, optional intro, optional action) so it isn't duplicated per section.
 */
export default function Section({ id, title, intro, action, band = 'deep', children }) {
  const bandClass = band === 'raised' ? 'bg-bg-band' : 'bg-bg'

  return (
    <section id={id} className={`relative ${bandClass}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 className="h2 text-text balance">{title}</h2>
            {action}
          </div>

          {intro && <p className="lead text-text-muted mt-5 max-w-xl">{intro}</p>}
        </motion.header>

        {children}
      </div>
    </section>
  )
}
