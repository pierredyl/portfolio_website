import { motion } from "framer-motion";
import ParticleImage from "./ParticleImage";

const text = "Hey, I'm Dylan";


export default function Hero() {
  return (
    <section className="min-h-screen section-fade flex items-center lg:px-40">
      <div className="mx-auto w-full xl:max-w-5xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="flex flex-col order-2 lg:order-1">
<motion.h1 className="
  text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl
  font-bold tracking-tight
  mb-16 leading-[1.3] py-2
  whitespace-nowrap
">              {text.split("").map((char, i) => (
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
              className="text-text text-lg text-bold font-bold 2xl:text-xl max-w-xl 2xl:max-w-2xl mb-8"
            >
              Software Engineer · Computer Science @ SSU
            </motion.p>
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
