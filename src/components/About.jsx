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
  I'm a recent Computer Science graduate from Sonoma State University and a software engineer with a strong foundation in systems-level and backend programming.
</p>

<p>
  While I enjoy programming, I'm also an IT generalist. I've troubleshooted hundreds of issues and helped people with a wide range of technology problems. That IT experience gives me a practical perspective when building tools for organizations and designing features for users.
</p>

<p>
  Security is something I build into my work. Earning the Security+ certification gave me a solid foundation in writing secure code and strengthening existing infrastructure.
</p>

<p>
  I'm always looking for new ways to challenge myself and grow as both a developer and a person. I'm currently seeking software engineering opportunities.
</p>
        </div>
      </motion.div>
    </section>
  );
}
