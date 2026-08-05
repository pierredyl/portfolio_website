import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import ParticleImage from "./ParticleImage";

const prefix = "Hey, I'm ";
const name = "Dylan";

function BuzzLetter({ char, spaced }) {
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let timeoutId;
    const schedule = () => {
      timeoutId = setTimeout(() => {
        controls.start({
          x: [0, -4, 4, -4, 4, -4, 4, -2.5, 2.5, 0],
          y: [0, 2, -2, 2, -2, 2, -2, 1, -1, 0],
          // mirrors --color-text / --color-text-special from index.css
          color: ["#f5f0e1", "#2563eb", "#f5f0e1"],
          transition: { duration: 0.35, ease: "linear" },
        });
        schedule();
      }, 2000 + Math.random() * 6000);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, [controls, reduceMotion]);

  return (
    <motion.span
      animate={controls}
      className={`letter-3d inline-block ${spaced ? "tracking-[0.1em]" : ""}`}
    >
      {char}
    </motion.span>
  );
}


export default function Hero() {
  return (
    <section className="min-h-screen section-fade flex items-center lg:px-40">
      <div className="mx-auto xl:max-w-5xl 2xl:max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4 items-center">
          {/* Text column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1">
            <h1
              className="
  text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl
  font-bold tracking-tight
  mb-4 leading-[1.3] py-2
  whitespace-nowrap
">
              {prefix}
              {name.split("").map((char, i) => (
                <BuzzLetter key={i} char={char} spaced={i < name.length - 1} />
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-sm 2xl:text-base leading-relaxed max-w-xl 2xl:max-w-2xl mb-8"
            >
              Computer science graduate and software engineer.

            </motion.p>
          </div>

          {/* Image column */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-2">
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
