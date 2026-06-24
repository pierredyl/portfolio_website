import { useState } from 'react'
import { motion } from 'framer-motion'

const EMAIL = 'dylanpierre004@gmail.com'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.createElement('textarea')
      el.value = EMAIL
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contact" className="max-w-3xl mx-auto px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-4xl md:text-6xl font-semibold text-[var(--color-text-special)] tracking-tight mb-10">
          Let's work together.
        </h2>

        <button
          onClick={handleCopy}
          className="flex items-center gap-3 px-8 py-4 rounded-full bg-text text-bg text-base font-medium hover:opacity-80 active:scale-95 transition-all duration-200"
        >
          {copied ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy Email
            </>
          )}
        </button>
      </motion.div>

      <p className="text-text-muted/40 text-xs mt-24 font-mono">
        Built by Dylan Pierre and MrFinnegan.
      </p>
    </section>
  )
}