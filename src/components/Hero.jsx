import { motion } from "framer-motion";
import ParticleImage from "./ParticleImage";

const text = "Hey, I'm Dylan";

const badges = [
  { label: "Backend",     color: "cyan"   },
  { label: "Go",          color: "cyan"   },
  { label: "C++",         color: "orange" },
  { label: "Systems",     color: "orange" },
  { label: "Security",    color: "violet" },
]

const colorMap = {
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-400",
  violet: "bg-violet-500/10 border-violet-500/30 text-violet-400",
};

export default function Hero() {
  return (
    <section className="min-h-screen section-fade flex items-center lg:px-40">
      <div className="mx-auto w-full xl:max-w-5xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="flex flex-col order-2 lg:order-1">
            <motion.h1 className="text-5xl md:text-7xl 2xl:text-8xl font-semibold tracking-tight mb-6 leading-[1.3] py-2">
              {text.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, 20, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }}
                  className="letter-sweep inline-block"
                  style={{ animationDelay: `${i * (2 / text.length)}s` }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text text-lg 2xl:text-xl max-w-xl 2xl:max-w-2xl mb-8"
            >
              Software Engineer · Computer Science @ SSU
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text text-lg 2xl:text-xl max-w-xl 2xl:max-w-2xl mb-8"
            >
              Currently looking for software engineering opportunities.
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`font-mono text-xl font-semibold px-3 py-1.5 rounded-md border ${colorMap[badge.color]}`}
                >
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Image column */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="block sm:hidden">
              <ParticleImage src="/finn.png" size={280} />
            </div>
            <div className="hidden sm:block lg:hidden">
              <ParticleImage src="/finn.png" size={340} />
            </div>
            <div className="hidden lg:block xl:hidden">
              <ParticleImage src="/finn.png" size={360} />
            </div>
            <div className="hidden xl:block 2xl:hidden">
              <ParticleImage src="/finn.png" size={392} />
            </div>
            <div className="hidden 2xl:block">
              <ParticleImage src="/finn.png" size={500} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
