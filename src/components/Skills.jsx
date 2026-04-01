import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

const techSkills = [
  { name: 'HTML5', color: '#E34F26', slug: 'html5' },
  { name: 'CSS3', color: '#1572B6', slug: 'css3' },
  { name: 'JS', color: '#F7DF1E', slug: 'javascript' },
  { name: 'React', color: '#61DAFB', slug: 'react' },
  { name: 'Next.js', color: '#000000', slug: 'nextdotjs' },
  { name: 'Tailwind', color: '#06B6D4', slug: 'tailwindcss' },
  { name: 'Node.js', color: '#339933', slug: 'nodedotjs' },
  { name: 'C#', color: '#512BD4', slug: 'csharp' },
  { name: 'PHP', color: '#777BB4', slug: 'php' },
  { name: 'SQL', color: '#4479A1', slug: 'mysql' },
  { name: 'MongoDB', color: '#47A248', slug: 'mongodb' },
  { name: 'Figma', color: '#F24E1E', slug: 'figma' },
  { name: 'Sanity', color: '#F03E2F', slug: 'sanity' },
  { name: 'Vercel', color: '#FFFFFF', slug: 'vercel' },
  { name: 'Wordpress', color: '#21759B', slug: 'wordpress' }
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

              {/* Original Icon */}
              <div 
                className="w-16 h-16 flex items-center justify-center p-2 group-hover:bg-white/5 rounded-2xl transition-all duration-300 relative z-10"
              >
                <img 
                  src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color.replace('#', '')}`}
                  alt={skill.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden font-mono text-xl font-black text-white">{skill.name.charAt(0)}</span>
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
