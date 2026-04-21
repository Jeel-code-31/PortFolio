import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldAlert, CheckCircle2, LayoutTemplate, GraduationCap, Mic2, Cpu } from 'lucide-react';

const LOGS = [
  {
    id: "LOG_01",
    type: "LEADERSHIP",
    description: "As a Part Of Management team during internship i managed and coordinated 15+ technical seminars across different universities, demonstrating strong organizational and communication skills.",
    highlight: "15+ Seminars",
    icon: <Mic2 size={20} className="text-blue-400" />
  },
  {
    id: "LOG_02",
    type: "ACADEMIC",
    description: "As a part of Management Team i have to go with sir Mr.Sumit Chawla (CEO of Venom Technologies) Served as an External Examiner for 3+ academic examination boards, evaluating student projects and practical assessments.",
    highlight: "Examiner Role",
    icon: <GraduationCap size={20} className="text-emerald-400" />
  },
  {
    id: "LOG_03",
    type: "DEPLOYMENT",
    description: "Delivered 5+ production websites for real clients including Badhuche, Kailas Engineering, and Vrinda Aagro using modern web technologies and still somewebsites are in maintenance.",
    highlight: "Client Success",
    icon: <Terminal size={20} className="text-purple-400" />
  }
];

const STATS = [
  { label: "Production Sites", value: "5+", icon: <Terminal size={16} /> },
  { label: "Seminars Led", value: "15+", icon: <Mic2 size={16} /> },
  { label: "Exam Boards", value: "3+", icon: <GraduationCap size={16} /> },
  { label: "Uptime", value: "6 Mo", icon: <Cpu size={16} /> }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 lg:px-12 relative w-full bg-[#010408] font-mono border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Minimal Header */}
        <div className="w-full flex items-center gap-4 mb-12">
          <div className="h-8 w-1 bg-blue-500"></div>
          <h2 className="text-xl text-white uppercase font-bold">
            System.Logs / Achievements
          </h2>
        </div>
        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LOGS.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-zinc-500 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-bold">
                      {item.type}
                    </div>
                    <div className="text-xs text-blue-400 uppercase font-bold tracking-tight">
                      {item.highlight}
                    </div>
                  </div>
                </div>
                <span className="text-[9px] text-zinc-700">{item.id}</span>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">
                <span className="text-blue-500/50 mr-2">»</span>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}