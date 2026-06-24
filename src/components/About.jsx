import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 2xl:h-[50vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl text-[var(--color-text-special)] md:text-4xl font-semibold mb-6 tracking-tight text-center">
          Who am I?
        </h2>
        <div className="space-y-8 text-text text-base leading-relaxed text-indent">
          <p>
              I'm a recent Computer Science graduate from Sonoma State University
            and software engineer with a strong foundation in systems level and
            backend programming.
          </p>
          <p>
            While I love programming, I'm also an IT generalist, having
            troubleshooted hundreds of problems and helping people with any of
            their technology concerns. Having an understanding of IT provides me a
            unique perspective when creating tools for the organization or creating features for users.
          </p>
          <p>
            Security is something I bake in when it comes to my work. Having
            earned the Security+ certificate gives me a strong background in
            writing secure code and securing already existing infrastructure.
          </p>

          <p>
            I'm always on the lookout for new ways to challenge myself and grow
            as a developer and a person. I'm currently looking for software engineer opportunities.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
