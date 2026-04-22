import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, TerminalSquare } from 'lucide-react';

const navLinks = [
  { name: '// EDU', href: '#education' },
  { name: '// SKILL', href: '#skills' },
  { name: '// EXPE', href: '#experience' },
  { name: '// WORK', href: '#portfolio' },
  { name: '// ACHIEVE', href: '#achievements' },
  { name: '// CERTI', href: '#certifications' },
  { name: '// CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NEW: Helper function to ensure navigation triggers correctly
  const handleMobileNav = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    setMobileMenuOpen(false); // Close menu first

    if (elem) {
      // Small timeout ensures the menu starts closing before the scroll begins
      setTimeout(() => {
        elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 font-mono ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-white flex items-center gap-2 group"
        >
          <TerminalSquare size={20} className="text-primary group-hover:text-secondary transition-colors" />
          <span>JEEL_DARJI<span className="text-primary animate-pulse">_</span></span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-primary hover:text-secondary transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface/95 backdrop-blur-md border-b border-primary/20 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 space-y-6 text-center">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  
                  href={link.href}
                  // UPDATED: Use the helper function here
                  onClick={(e) => handleMobileNav(e, link.href)}
                  className="text-gray-300 hover:text-primary font-medium tracking-widest text-sm py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}