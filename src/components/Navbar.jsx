import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 duration-300 ${
        scrolled || menuOpen ? "border-b border-border/60" : ""
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-text font-medium tracking-tight"
        >
          Dylan Pierre
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
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

          <a
            href="https://github.com/pierredyl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <img src="/github_logo.svg" alt="" className="w-8 h-8 brightness-0 invert" />
          </a>

          <a
            href="https://www.linkedin.com/in/pierredylan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <img src="/linkedin_logo.svg" alt="" className="w-8 h-8" />
          </a>

          <a
            href="/DylanPierre_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 rounded-full bg-text text-bg hover:opacity-80 transition-opacity duration-200"
          >
            Resume
          </a>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-5 h-px bg-text transition-transform duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-text transition-opacity duration-150 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-text transition-transform duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border/60 bg-bg"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  className="text-base text-text-muted hover:text-text transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}

              <div className="flex items-center gap-5 pt-2 border-t border-border/40">
                <a
                  href="https://github.com/pierredyl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <img src="/github_logo.svg" alt="" className="w-7 h-7 brightness-0 invert" />
                </a>

                <a
                  href="https://www.linkedin.com/in/pierredylan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <img src="/linkedin_logo.svg" alt="" className="w-7 h-7" />
                </a>

                <a
                  href="/DylanPierre_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-sm px-4 py-1.5 rounded-full bg-text text-bg hover:opacity-80 transition-opacity duration-200"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}