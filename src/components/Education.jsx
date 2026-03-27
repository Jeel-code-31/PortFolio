import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const educationLevels = [
  {
    id: "KNOWLEDGE_001",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Graduation",
    duration: "Completed",
    description: "Focused on core programming principles, systemic logic, and full-stack software engineering structures.",
  },
  {
    id: "KNOWLEDGE_002",
    degree: "12th Grade (HSC)",
    institution: "Higher Secondary Education",
    duration: "Completed",
    description: "Strengthened fundamentals in advanced logic and applied sciences, serving as the foundation for computational reasoning.",
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
                <span className="font-mono text-xs px-4 py-2 border border-white/10 bg-black/40 text-gray-400 self-start md:self-auto uppercase tracking-widest">
                  {edu.duration}
                </span>
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
