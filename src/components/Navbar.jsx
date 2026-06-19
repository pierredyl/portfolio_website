import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

// Paste the contents of your GitHub SVG inside this component.
// Keep fill="currentColor" (or replace any hardcoded fill values with it)
// so the icon inherits the hover color transition like the rest of the nav.
function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      {/* <-- paste your SVG's <path>/<g> contents here --> */}
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
  ? 'bg-transparent border-b border-border/60'
  : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-text font-medium tracking-tight"
        >
          Dylan Pierre
        </a>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://github.com/pierredyl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-text transition-colors duration-200"
          >
            <GithubIcon />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}