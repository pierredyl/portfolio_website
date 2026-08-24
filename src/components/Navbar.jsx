import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import useActiveSection from "../hooks/useActiveSection";
import { site } from "../data/site";

const links = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";
  const ids = useMemo(() => links.map((l) => l.id), []);
  const active = useActiveSection(ids, isHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border/70 bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              navigate("/");
            }
          }}
          className="meta meta-lg text-text hover:text-accent transition-colors duration-200"
        >
          Dylan Pierre
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={`meta meta-md transition-colors duration-200 ${
                  active === link.id
                    ? "text-accent"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}

          <li className="flex items-center gap-4 pl-1">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <img src="/github_logo.svg" alt="" className="w-[22px] h-[22px] brightness-0 invert" />
            </a>

            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <img src="/linkedin_logo.svg" alt="" className="w-[22px] h-[22px]" />
            </a>
          </li>

          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="meta meta-md px-5 py-2.5 rounded-full bg-accent text-bg font-bold hover:bg-accent-hi transition-colors duration-200"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`block w-6 h-px bg-text transition-transform duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
          <span className={`block w-6 h-px bg-text transition-opacity duration-150 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-text transition-transform duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
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
            <div className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  className={`h3 py-4 border-b border-border/50 transition-colors duration-200 ${
                    active === link.id ? "text-accent" : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <div className="flex items-center gap-5 pt-6 pb-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <img src="/github_logo.svg" alt="" className="w-6 h-6 brightness-0 invert" />
                </a>

                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                  <img src="/linkedin_logo.svg" alt="" className="w-6 h-6" />
                </a>

                <a
                  href={site.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta meta-md ml-auto px-5 py-2.5 rounded-full bg-accent text-bg font-bold hover:bg-accent-hi transition-colors duration-200"
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
