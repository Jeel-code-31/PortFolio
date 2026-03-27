import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database } from 'lucide-react';

const experiences = [
  {
    id: "EXP_001",
    role: "JR. WEBSITE DEVELOPER",
    company: "Perfect Pixels",
    link: "https://www.perfectpixel.co.in",
    duration: "Sep 2025 – Present",
    description: "Develop modern web interfaces and managing Wordpress architecture, building scalable digital assets with pixel-perfect precision.",
    skills: ["Next.js", "Sanity", "Node.js", "Wordpress", "Github",'vercel','css3']
  },
  {
    id: "EXP_002",
    role: "Intern. Web Development",
    company: "Venom Technologies",
    link: "https://www.venomtechnologies.in",
    duration: "March 2025 – Sep 2025",
    description: "Spearheaded the development of high-performance internal dashboards. Focused on bridging the gap between complex data and intuitive user interfaces.",
    skills: ["ReactJS", "Node.js", "Vercel","css3"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 lg:px-12 relative w-full">
      <div className="max-w-4xl mx-auto">
        
        <div className="w-full flex items-center gap-4 mb-16">
          <Network size={24} className="text-secondary" />
          <h2 className="text-3xl font-mono text-secondary uppercase font-bold tracking-widest">
            Execution Timeline
          </h2>
          <div className="h-[1px] bg-secondary/20 flex-1 ml-4" />
        </div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline Node */}
              <div className="absolute top-0 left-[-6px] w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_#7000ff] group-hover:scale-150 transition-transform" />
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-secondary/30 mt-1.5" />

              <div className="os-panel p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 relative z-10">
                  <div>
                    <span className="font-mono text-xs text-primary mb-2 block tracking-widest">// {exp.id}</span>
                    <h3 className="text-2xl font-bold text-gray-100">{exp.role}</h3>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white font-mono text-sm tracking-wider uppercase transition-colors">
                      @ {exp.company}
                    </a>
                  </div>
                  <span className="font-mono text-sm px-4 py-2 border border-white/10 bg-white/5 text-gray-400">
                    {exp.duration}
                  </span>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-6 font-mono text-sm relative z-10">
                  &gt; {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-3 relative z-10">
                  {exp.skills.map(skill => (
                    <span key={skill} className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-secondary/10 text-secondary border border-secondary/20">
                      <Database size={10} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
