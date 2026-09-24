import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import HeroConsole from './HeroConsole'

export default function Hero() {
  // The console eases the page down to About when it finishes booting — but
  // only if the reader hasn't already taken over. Any scroll, key, or click
  // means they're driving, and the page should not yank itself out from under
  // them.
  {/*
  const interrupted = useRef(false)

  useEffect(() => {
    const takeOver = () => {
      interrupted.current = true
    }

    const events = ['wheel', 'touchmove', 'keydown', 'pointerdown']
    events.forEach((e) => window.addEventListener(e, takeOver, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, takeOver))
  }, [])

  const handleBootFinish = useCallback(() => {
    if (interrupted.current) return
    if (window.scrollY > 8) return // they've moved; leave them where they are
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <section className="relative bg-bg min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-32 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <HeroConsole onFinish={handleBootFinish} />
        </motion.div>
      </div>
    </section>
)*/}
}
