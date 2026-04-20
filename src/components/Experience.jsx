import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Briefcase, Layers, Zap, Code, Building, Award } from 'lucide-react';
import { experiences, portfolioProjects, PRO_START_DATE } from '../constants/portfolioData';

export default function Experience() {
  const calculateDuration = (startStr, endStr) => {
    const start = new Date(startStr);
    const end = endStr ? new Date(endStr) : new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (end.getDate() < start.getDate()) {
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const durationParts = [];
    if (years > 0) durationParts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    if (months > 0) durationParts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
    
    const range = `${start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – ${endStr ? new Date(endStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}`;
    
    return { 
      range, 
      startFormat: start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      endFormat: endStr ? new Date(endStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present',
      isPresent: !endStr,
      duration: durationParts.length > 0 ? `(${durationParts.join(' ')})` : '(0 mos)' 
    };
  };

  const calculateTotalExperience = () => {
    const start = new Date(PRO_START_DATE);
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    if (now.getDate() < start.getDate()) {
      months--;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const pastMonthDate = new Date(now.getFullYear(), now.getMonth(), start.getDate());
    if (now.getDate() < start.getDate()) {
      pastMonthDate.setMonth(pastMonthDate.getMonth() - 1);
    }
    const diffTime = Math.abs(now - pastMonthDate);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return { totalYears: years, totalMonths: months, days, hours, minutes, seconds };
  };

  const [runtime, setRuntime] = useState(() => calculateTotalExperience());

  useEffect(() => {
    const timer = setInterval(() => {
      setRuntime(calculateTotalExperience());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Additional stats calculation
  const totalProjects = portfolioProjects.length;
  const totalSkills = new Set(experiences.flatMap(exp => exp.skills)).size;
  const totalCompanies = new Set(experiences.map(exp => exp.company)).size;

  return (
    <section id="experience" className="py-24 px-6 lg:px-12 relative w-full">
      <div className="max-w-4xl mx-auto">

        <div className="w-full flex items-center gap-4 mb-8">
          <Network size={24} className="text-secondary" />
          <h2 className="text-3xl font-mono text-secondary uppercase font-bold tracking-widest">
            Execution Timeline
          </h2>
          <div className="h-[1px] bg-secondary/20 flex-1 ml-4" />
        </div>
        {/* Experience Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="os-panel p-4 border-secondary/20 bg-secondary/5 flex flex-col gap-3 group hover:border-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-md group-hover:scale-110 transition-transform">
                <Zap size={18} className="text-secondary" />
              </div>
              <p className="text-[10px] font-mono text-secondary/60 tracking-widest uppercase">Exp Runtime</p>
            </div>
            <h4 className="flex flex-col gap-1">
              <span className="text-lg font-bold text-white font-mono leading-none">
                {runtime.totalYears > 0 && `${runtime.totalYears}Y `}{runtime.totalMonths}M {runtime.days}D
              </span>
              <span className="text-[12px] font-mono text-gray-500 uppercase mt-5">Professional</span>
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="os-panel p-4 border-primary/20 bg-primary/5 flex flex-col gap-3 group hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md group-hover:scale-110 transition-transform">
                <Code size={18} className="text-primary" />
              </div>
              <p className="text-[10px] font-mono text-primary/60 tracking-widest uppercase">Deployment Project's</p>
            </div>
            <h4 className="text-lg font-bold text-white font-mono">
              {totalProjects.toString().padStart(2, '0')} <span className="text-[12px] font-normal text-gray-500 block">Completed</span>
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="os-panel p-4 border-white/10 bg-white/5 flex flex-col gap-3 group hover:border-white/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-md group-hover:scale-110 transition-transform">
                <Database size={18} className="text-gray-400" />
              </div>
              <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Tech Stack</p>
            </div>
            <h4 className="text-lg font-bold text-white font-mono">
              {totalSkills.toString().padStart(2, '0')}+ <span className="text-[12px] font-normal text-gray-500 block">Tools Used</span>
            </h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="os-panel p-4 border-white/10 bg-white/5 flex flex-col gap-3 group hover:border-white/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-md group-hover:scale-110 transition-transform">
                <Building size={18} className="text-gray-400" />
              </div>
              <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Companies</p>
            </div>
            <h4 className="text-lg font-bold text-white font-mono">
              {totalCompanies.toString().padStart(2, '0')} <span className="text-[12px] font-normal text-gray-500 block">Collaborated</span>
            </h4>
          </motion.div>
        </div>
        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">
          {experiences.map((exp, index) => {
            const expDuration = calculateDuration(exp.startDate, exp.endDate);
            return (
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
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <div className="font-mono text-sm flex items-stretch bg-white/5 border border-white/10 rounded-sm overflow-hidden group/date">
                      <span className="px-3 py-1.5 text-gray-400 border-r border-white/10 flex items-center">
                        {expDuration.startFormat}
                      </span>
                      {expDuration.isPresent ? (
                        <div className="relative overflow-hidden flex items-center justify-center bg-primary/10 px-4 py-1.5 cursor-default">
                           <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover/date:translate-y-0 transition-transform duration-300 ease-out" />
                           <span className="relative z-10 flex items-center gap-2 text-primary font-bold tracking-widest text-[11px] uppercase group-hover/date:text-white transition-colors duration-300">
                             <span className="relative flex h-1.5 w-1.5">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                             </span>
                             PRESENT
                           </span>
                        </div>
                      ) : (
                        <span className="px-3 py-1.5 text-gray-500 bg-black/20 flex items-center">
                          {expDuration.endFormat}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-secondary/70 uppercase tracking-tighter mt-1 hover:text-secondary transition-colors cursor-default">
                      {expDuration.duration}
                    </span>
                  </div>
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
            );
          })}
        </div>

      </div>
    </section>
  );
}
