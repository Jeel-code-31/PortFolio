import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

// Lazy load non-critical sections
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Achievements = lazy(() => import('./components/Achievements'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen cursor-none selection:bg-primary/40 selection:text-white bg-background">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <div className="fixed inset-0 bg-background -z-20" />
          
          {/* Simplified Background */}
          <div className="fixed inset-0 opacity-10 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10" />

          <Navbar />
          <main className="pt-32 pb-16">
            <Hero />
            
            <Suspense fallback={
              <div className="h-40 flex items-center justify-center font-mono text-primary/30 text-xs tracking-widest uppercase">
                // Firing neural buffers...
              </div>
            }>
              <Education />
              <Skills />
              <Experience />
              <Portfolio />
              <Achievements />
              <Certifications />
              <Contact />
            </Suspense>
          </main>
          
          <footer className="text-center py-8 text-primary/50 text-xs font-mono tracking-widest border-t border-primary/10">
            <p>// SYSTEM ONLINE. © 2025 JEEL DARJI _</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
