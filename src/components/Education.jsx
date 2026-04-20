import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const educationLevels = [
  {
    id: "KNOWLEDGE_001",
    degree: "Master of Computer Applications (MCA)",
    institution: "Sardar Institue of Science & Technology For Advance Studies & Research (ISTAR) - CVM University",
    duration: "2026-Present",
    status: "Pursuing",
    description: "Focused on core programming principles, systemic logic, and full-stack software engineering structures.",
  },
  {
    id: "KNOWLEDGE_002",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "D.N Institue of Computer Applications - S.P. University",
    duration: "2021-2024",
    status: "Completed",
    description: "Focused on core programming principles, systemic logic, and full-stack software engineering structures.",
  },
  {
    id: "KNOWLEDGE_003",
    degree: "12th Grade (HSC)",
    institution: "MVS High School",
    duration: "2020-2021",
    status: "Completed",
    description: "Strengthened fundamentals in advanced logic and applied Commerce, serving as the foundation for computational reasoning.",
  }
];

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 lg:px-12 relative w-full">
      <div className="max-w-4xl mx-auto">
        
        <div className="w-full flex items-center gap-4 mb-16">
          <BookOpen size={24} className="text-secondary" />
          <h2 className="text-3xl font-mono text-secondary uppercase font-bold tracking-widest">
            Knowledge Base
          </h2>
          <div className="h-[1px] bg-secondary/20 flex-1 ml-4" />
        </div>

        <div className="grid gap-8 relative z-10 w-full">
          {educationLevels.map((edu, index) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15 }}
              className="os-panel p-6 md:p-8 group hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300 bg-[#0c1220] border-white/5"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4 relative z-10">
                <div>
                  <span className="font-mono text-xs text-primary mb-2 block tracking-widest">// {edu.id}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-100">{edu.degree}</h3>
                  <span className="text-secondary font-mono text-xs tracking-wider uppercase inline-block mt-2">
                    @ {edu.institution}
                  </span>
                </div>
                <div className="flex flex-col md:items-end gap-2 self-start md:self-auto group/edu w-fit">
                  <div className="font-mono text-xs inline-flex items-stretch border border-white/10 bg-black/40 rounded-sm overflow-hidden w-fit">
                    <span className="px-3 py-1.5 text-gray-400 border-r border-white/10 flex items-center whitespace-nowrap">
                      {edu.duration}
                    </span>
                    {edu.status === 'Pursuing' ? (
                      <div className="relative overflow-hidden flex items-center justify-center bg-primary/10 px-3 py-1.5 cursor-default whitespace-nowrap">
                         <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/edu:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase group-hover/edu:text-white transition-colors duration-300">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                          </span>
                          {edu.status}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center bg-white/5 px-3 py-1.5 cursor-default group-hover/edu:bg-white/10 transition-colors duration-300 whitespace-nowrap">
                        <span className="flex items-center gap-2 text-gray-400 font-bold tracking-widest text-[10px] uppercase">
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-secondary/70"></span>
                          {edu.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed font-mono text-sm relative z-10 mt-4 border-l-2 border-white/10 pl-4">
                &gt; {edu.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
