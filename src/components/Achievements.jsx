import React from 'react';
import { motion } from 'framer-motion';
import { Award, Terminal, Activity, ShieldAlert, Cpu, CheckCircle2, LayoutTemplate, Users } from 'lucide-react';

const stats = [
  { id: "S1", label: "Prod Deployments", value: "7+", icon: <Terminal size={16} className="text-primary" /> },
  { id: "S2", label: "Tech Seminars", value: "15+", icon: <Activity size={16} className="text-secondary" /> },
  { id: "S3", label: "Academic Boards", value: "3+", icon: <ShieldAlert size={16} className="text-white" /> },
  { id: "S4", label: "Internship Time", value: "6 Mo", icon: <Cpu size={16} className="text-gray-400" /> }
];

const achievementsData = [
  {
    id: "ACHV_01",
    type: "LEADERSHIP",
    description: "Successfully managed and co-ordinated 15+ technical seminars across different universities, demonstrating strong organizational and communication skills.",
    highlight: "15+ Seminars",
    icon: <Activity size={20} className="text-secondary" />
  },
  {
    id: "ACHV_02",
    type: "EVALUATION",
    description: "Served as an External Examiner for 3+ academic examination boards, evaluating student projects and practical assessments.",
    highlight: "3+ Boards",
    icon: <ShieldAlert size={20} className="text-secondary" />
  },
  {
    id: "ACHV_03",
    type: "DEPLOYMENT",
    description: "Delivered 7+ production websites for real clients including Perfect Pixel, Badhuche, KailasEngineering, Paradigm Managing Quality, and Om Sai Ladies Tailor.",
    highlight: "7+ Prod Sites",
    icon: <Terminal size={20} className="text-primary" />
  },
  {
    id: "ACHV_04",
    type: "DESIGN OPS",
    description: "Designed and executed graphic design campaigns for multiple businesses, producing social media posts, branding assets, and marketing collateral.",
    highlight: "Brand Campaigns",
    icon: <LayoutTemplate size={20} className="text-primary" />
  },
  {
    id: "ACHV_05",
    type: "COLLABORATION",
    description: "Participated actively as a core part of the management team during my internship, collaborating closely with mentors to ensure project success.",
    highlight: "Core Management",
    icon: <Users size={20} className="text-white" />
  },
  {
    id: "ACHV_06",
    type: "STANDARDS",
    description: "Consistently applied version control best practices using Git and GitHub across all professional and personal projects.",
    highlight: "Version Control",
    icon: <CheckCircle2 size={20} className="text-white" />
  }
];

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="achievements" className="py-24 px-6 lg:px-12 relative w-full">
      <div className="max-w-5xl mx-auto">
        <div className="w-full flex items-center gap-4 mb-8">
          <Award size={24} className="text-primary" />
          <h2 className="text-3xl font-mono text-primary uppercase font-bold tracking-widest">
            SYS.ACHIEVEMENTS //
          </h2>
          <div className="h-[1px] bg-primary/20 flex-1 ml-4 relative">
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary"></div>
          </div>
        </div>

        {/* Console Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-6">
           {stats.map((stat, i) => (
             <motion.div 
               key={stat.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className={`os-panel p-4 flex flex-col gap-3 transition-colors border-white/10 bg-white/5 hover:border-white/30`}
             >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-white/10 rounded-md">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">[{stat.id}]</span>
                </div>
                <div>
                   <h4 className="text-2xl md:text-3xl font-bold text-white font-mono leading-none tracking-tighter">
                     {stat.value}
                   </h4>
                   <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.1em] mt-3">{stat.label}</p>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Detailed Logs (Grid) */}
        <motion.div
           variants={containerVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-50px" }}
           className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
           {achievementsData.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                className="os-panel p-6 md:p-8 border-white/10 bg-[#0b1120] hover:border-primary/40 hover:bg-primary/5 transition-all group relative overflow-hidden"
              >
                {/* Decorative border line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300" />

                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-white/5 border border-white/10 rounded-md shadow-inner group-hover:bg-white/10 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase block mb-1">
                        TYPE: {item.type}
                      </span>
                      <span className="text-xs text-white font-mono tracking-widest uppercase bg-white/10 px-2 py-0.5 border border-white/10">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-primary/50 uppercase tracking-widest">
                    //{item.id}
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed font-mono text-sm relative z-10 group-hover:text-gray-300 transition-colors">
                  <span className="text-primary font-bold mr-2">&gt;</span>
                  {item.description}
                </p>
              </motion.div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}
