import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? "glass-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-max px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group" data-cursor-hover>
          <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md-blue">
            <span className="font-display font-bold text-sm text-white">IB</span>
          </div>
          <span className="font-display font-bold text-lg text-navy group-hover:text-primary transition-colors">
            Bayu<span className="text-primary">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/6283109105308"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
            data-cursor-hover
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-primary/8 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          data-cursor-hover
        >
          <span className={`w-5 h-0.5 bg-navy rounded transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-navy rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-navy rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden glass-card border-t border-border"
          >
            <div className="container-max px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-medium text-navy hover:text-primary py-2 border-b border-border/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/6283109105308"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center px-5 py-3 rounded-xl font-semibold text-sm mt-2"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
