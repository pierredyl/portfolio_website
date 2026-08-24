import { useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'

const EMAIL = site.email
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(site.contact.subject)}`

/** Copies text without depending on the async clipboard API being available. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return
  } catch {
    const el = document.createElement('textarea')
    el.value = text
    el.setAttribute('readonly', '')
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

const elsewhere = [
  { label: 'GitHub', href: site.github },
  { label: 'LinkedIn', href: site.linkedin },
]

/**
 * The page's closing block.
 *
 * Deliberately does NOT use the Section primitive. Every other section on the
 * home page opens with a headline and lays content out beneath it; if this one
 * did too, the page would read as though another chapter were starting rather
 * than ending. So the structure inverts: the statement itself is the headline,
 * there is exactly one primary action beneath it, and the colophon sits on the
 * same closing rule as the secondary links instead of in a detached strip.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copyText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section id="contact" className="relative bg-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-14 md:pb-20"
        >
          <p className="meta text-text-faint">{site.contact.title}</p>

          <h2 className="h2 text-text balance max-w-3xl mt-5">
            {site.contact.headline}
          </h2>

          {/* One primary action. The glow sits behind it so the eye lands here
              rather than on the links below. */}
          <div className="glow relative mt-12 md:mt-16">
            <div className="relative z-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href={MAILTO}
                className="group inline-flex items-baseline gap-3 text-text hover:text-accent transition-colors duration-300"
              >
                <span className="h3 relative">
                  {EMAIL}
                  <span className="absolute left-0 -bottom-1.5 h-px w-full bg-border-hi group-hover:bg-accent transition-colors duration-300" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`meta shrink-0 px-4 py-2 rounded-full border transition-colors duration-200 ${
                    copied
                      ? 'border-accent text-accent'
                      : 'border-border text-text-faint hover:border-text hover:text-text'
                  }`}
                >
                  {copied ? 'Copied \u2713' : 'Copy'}
                </button>

                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta text-text-faint hover:text-text transition-colors duration-200"
                >
                  R&eacute;sum&eacute; &#8599;
                </a>
              </div>

              <span aria-live="polite" className="sr-only">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Colophon — same band, sharing the closing rule with the section above,
          so contact and footer read as a single block rather than two strips. */}
      <footer className="bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-10 pb-14">
          <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
            <ul className="flex items-center gap-x-6">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta text-text-faint hover:text-text transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="meta text-text-faint">
              {site.colophon} &nbsp;&middot;&nbsp; &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
