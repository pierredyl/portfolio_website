import { motion } from 'framer-motion'
import Section from './Section'
import { site, credentials, skills } from '../data/site'

export default function About() {
  return (
    <Section id="about" title={site.about.title} band="raised">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20">
        {/* Left — prose + credentials */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="lead text-text-muted mb-6">{site.about.paragraphOne}</p>
          <p className="lead text-text-muted">{site.about.paragraphTwo}</p>

          <dl className="mt-12">
            {credentials.map((c) => (
              <div
                key={c.label}
                className="border-t border-border py-5 last:border-b flex gap-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                />
                <div>
                  <dt className="meta text-text-faint mb-2">{c.label}</dt>
                  <dd className="text-sm text-text-muted leading-relaxed">{c.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* Right — skills, grouped */}
        <dl className="flex flex-col">
          {skills.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="border-t border-border py-6 last:border-b"
            >
              <dt className="meta text-accent mb-3">{group.label}</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-2">
                {group.items.map((item) => (
                  <span key={item} className="text-sm text-text-muted">
                    {item}
                  </span>
                ))}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
