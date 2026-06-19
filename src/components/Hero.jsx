import { motion } from 'framer-motion'
import ParticleImage from './ParticleImage'

const text = "Hey, I'm Dylan"
const letterCount = "Hey, I'm Dylan".length

export default function Hero() {
  return (
    <section className="min-h-[100vh] section-fade flex flex-col justify-center px-50 relative overflow-hidden">
      {/* subtle background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 0%)' }}
      />

      <div className="flex items-center justify-between gap-12">
        <div className="flex flex-col">
          <motion.h1
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-[1.3] py-2"
          >
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, 20, 0] }}
                transition={{
                  duration: 2.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.05,
                }}
                className="wave-rainbow inline-block"
                style={{
                  backgroundPositionX: `${i * -40}px`,
                  animationDelay: `${i * 0.10}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mb-5"
          >
            Software Engineer; Computer Science @ SSU.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mb-5"
          >
            Currently building efficient and secure software.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-muted text-lg max-w-xl mb-5"
          >
            Also improving AI through code analysis and RLHF.
          </motion.p>
        </div>

        <ParticleImage
          src="/finn.png"
          size={392}
        />
      </div>
    </section>
  )
}