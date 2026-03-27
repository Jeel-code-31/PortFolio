import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, Send, Radio, TerminalSquare } from 'lucide-react';

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-4.51-2-7-2" /></svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Connection established. Form submission demo complete.");
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 relative w-full border-t border-white/5 bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-primary/50 text-primary font-mono text-sm tracking-widest mb-6 uppercase bg-primary/5 rounded drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <Radio size={16} className="animate-pulse" /> Initiate Contact
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-mono text-white mb-4"
          >
            Open a Secure Channel
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm font-mono tracking-wide"
          >
            AVAILABLE FOR NEW MISSIONS // FREELANCE DEPLOYMENTS // FULL-TIME OPERATIONS
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 font-mono"
          >
            <div className="os-panel p-8 group transition-colors">
              <div className="text-primary mb-6 flex items-center gap-3">
                <Mail size={24} />
                <span className="text-xs tracking-widest uppercase border-b border-primary/30 pb-1">Primary Comm Link</span>
              </div>
              <p className="text-gray-400 mb-4 text-xs tracking-widest leading-relaxed pt-2">
                &gt; Ping me for inquiries, architectural talks, or casual network drops. Avg latency: 4 hours.
              </p>
              <a href="mailto:darjijeel31@gmail.com" className="text-lg text-white hover:text-primary transition-colors flex items-center gap-2 tracking-wider mt-6">
                darjijeel31@gmail.com <ExternalLink size={16} className="opacity-50" />
              </a>
            </div>

            <div className="os-panel p-8 group transition-colors">
              <div className="text-secondary mb-6 flex items-center gap-3">
                <GithubIcon />
                <span className="text-xs tracking-widest uppercase border-b border-secondary/30 pb-1">Code Repository</span>
              </div>
              <p className="text-gray-400 mb-4 text-xs tracking-widest leading-relaxed pt-2">
                &gt; Access the full source code and documentation for all deployed systems.
              </p>
              <a href="https://github.com/Jeel-code-31" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-secondary transition-colors flex items-center gap-2 tracking-wider mt-6">
                Jeel-code-31 <ExternalLink size={16} className="opacity-50" />
              </a>
            </div>

            <div className="os-panel p-8 group transition-colors">
              <div className="text-primary mb-6 flex items-center gap-3">
                <LinkedinIcon />
                <span className="text-xs tracking-widest uppercase border-b border-primary/30 pb-1">Professional Network</span>
              </div>
              <p className="text-gray-400 mb-4 text-xs tracking-widest leading-relaxed pt-2">
                &gt; Connect for professional networking, architectural consultations, and mission updates.
              </p>
              <a href="https://www.linkedin.com/in/jeeldarji07/" target="_blank" rel="noopener noreferrer" className="text-lg text-white hover:text-primary transition-colors flex items-center gap-2 tracking-wider mt-6">
                Jeel Darji <ExternalLink size={16} className="opacity-50" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="os-panel p-8 md:p-10 font-mono"
          >
            <div className="flex items-center gap-3 text-white mb-8 border-b border-white/10 pb-4">
              <TerminalSquare size={20} className="text-primary" />
              <h3 className="text-lg tracking-widest uppercase">Transmit Data</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs text-primary mb-2 tracking-widest uppercase">&gt; IDENTIFIER</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/40 border border-white/10 p-3 text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="Enter alias"
                />
              </div>
              <div>
                <label className="block text-xs text-primary mb-2 tracking-widest uppercase">&gt; RETURN ROUTE (EMAIL)</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-black/40 border border-white/10 p-3 text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all placeholder:text-gray-700 text-sm"
                  placeholder="name@domain.com"
                />
              </div>
              <div>
                <label className="block text-xs text-primary mb-2 tracking-widest uppercase">&gt; PAYLOAD</label>
                <textarea 
                  required
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 p-3 text-white focus:outline-none focus:border-primary focus:bg-primary/5 transition-all resize-none placeholder:text-gray-700 text-sm"
                  placeholder="Encrypt message here..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-background font-bold tracking-widest py-4 transition-all flex items-center justify-center gap-2 uppercase text-sm group mt-4 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">Execute Transmission <Send size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </motion.form>

        </div>
      </div>
    </section>
  );
}
