import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import StatusGrid from './StatusGrid';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-4.51-2-7-2" /></svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="home" className="min-h-[90vh] flex flex-col justify-center relative px-6 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start pt-10">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full relative z-10"
        >
          {/* Status logs */}
          <motion.div variants={itemVariants} className="font-mono text-xs md:text-sm text-primary mb-8 tracking-widest opacity-80 flex flex-col gap-1">
            <span>&gt; SYSTEM INITIALIZED</span>
            <span>&gt; DEVELOPER PROFILE LOADED</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
            />
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-8xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            JEEL DARJI.
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-mono text-secondary tracking-widest uppercase mb-8 ml-1">
            Website DEVELOPER - UI/UX DESIGNER
          </motion.h2>

          <motion.p variants={itemVariants} className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mb-12 border-l-2 border-primary/30 pl-4">
            A passionate web developer skilled in HTML, CSS, JavaScript, C#, PHP, and Python. Designing modern interfaces and building scalable digital assets with robust backend architectures.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center font-mono text-sm">
            <a href="#portfolio" className="relative group overflow-hidden px-8 py-4 bg-primary/10 border border-primary text-primary hover:text-background uppercase tracking-widest font-bold">
              <span className="relative z-10 flex items-center gap-2">View Deployed Systems <ArrowRight size={16} /></span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </a>
            <a href="/Jeel_Darji_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 uppercase tracking-widest text-gray-300 hover:text-white group border-r border-white/10 pr-6 mr-2">
              <Download size={16} className="text-secondary group-hover:-translate-y-1 transition-transform" /> Fetch CV
            </a>
            <div className="flex gap-4 items-center">
              <a href="https://github.com/Jeel-code-31" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10">
                <GithubIcon />
              </a>
              <a href="https://www.linkedin.com/in/jeeldarji07/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10">
                <LinkedinIcon />
              </a>
            </div>
          </motion.div>

          <StatusGrid />
        </motion.div>

      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 right-12 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
      <div className="absolute top-0 right-24 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-secondary/10 to-transparent hidden lg:block" />
    </section>
  );
}
