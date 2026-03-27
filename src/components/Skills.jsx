import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const techSkills = [
  { name: 'HTML5', color: '#E34F26', short: 'HT' },
  { name: 'CSS3', color: '#1572B6', short: 'CS' },
  { name: 'JS', color: '#F7DF1E', short: 'JS' },
  { name: 'React', color: '#61DAFB', short: 'RE' },
  { name: 'Next.js', color: '#00f0ff', short: 'NX' },
  { name: 'Tailwind', color: '#38B2AC', short: 'TW' },
  { name: 'Node.js', color: '#339933', short: 'NO' },
  { name: 'C#', color: '#a179dc', short: 'C#' },
  { name: 'PHP', color: '#777BB4', short: 'PH' },
  { name: 'SQL', color: '#4479A1', short: 'SQ' },
  { name: 'MongoDB', color: '#47A248', short: 'MD' },
  { name: 'Figma', color: '#F24E1E', short: 'FI' },
  { name: 'Sanity', color: '#F03E2F', short: 'SA' },
  { name: 'Vercel', color: '#ffffff', short: 'VE' },
  { name: 'Wordpress', color: '#21759B', short: 'WP' }
];

export default function Skills() {
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playHoverSound = () => {
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      
      // Increased volume for hover from 0.015 to 0.1
      gain.gain.setValueAtTime(0.1, ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch(e) { console.error("Audio error", e) }
  };

  const playClickSound = () => {
    try {
      const ctx = initAudio();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
      
      // Increased volume for click from 0.08 to 0.4
      gain.gain.setValueAtTime(0.4, ctx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch(e) { console.error("Audio error", e) }
  };

  return (
    <section id="skills" className="py-24 px-6 lg:px-12 relative w-full">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="w-full flex items-center gap-4 mb-16">
          <Cpu size={24} className="text-secondary" />
          <h2 className="text-3xl font-mono text-secondary uppercase font-bold tracking-widest">
            Tech Arsenal
          </h2>
          <div className="h-[1px] bg-secondary/20 flex-1 ml-4" />
        </div>

        {/* 5 Column Grid Configuration as requested for the Dark OS Theme */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full relative z-10">
          {techSkills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="group cursor-pointer aspect-square bg-[#0a0f1a] border border-white/5 rounded-2xl flex flex-col justify-center items-center gap-4 hover:border-primary/30 hover:shadow-[0_4px_25px_rgba(0,240,255,0.08)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover background glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300"
                style={{ backgroundColor: skill.color }}
              />

              {/* Icon Placeholder */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-black shadow-[0_4px_10px_rgba(0,0,0,0.5)] relative z-10"
                style={{ backgroundColor: skill.color, color: skill.short === 'VE' || skill.short === 'NX' ? '#000' : '#fff' }}
              >
                {skill.short}
              </div>
              
              <span className="font-mono text-sm font-bold text-gray-300 tracking-wide relative z-10 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
