import { motion } from 'framer-motion'

const links = [
  { label: 'Email', href: 'mailto:you@example.com' },
  { label: 'GitHub', href: 'https://github.com/yourusername' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
]

export default function Contact() {
  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-text tracking-tight mb-4">
          Let's talk
        </h2>
        <p className="text-text-muted text-base mb-10 max-w-md mx-auto">
          I'm currently looking for software engineering opportunities.
          Feel free to reach out — I'd love to hear from you.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="px-6 py-3 rounded-full border border-border text-text text-sm font-medium hover:border-accent hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>

      <p className="text-text-muted/50 text-xs mt-24">
        Built with React, Tailwind, and Framer Motion.
      </p>
    </section>
  )
}
