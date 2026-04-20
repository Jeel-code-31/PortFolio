import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 lg:px-12 relative w-full">
      <div className="max-w-4xl mx-auto">
        <div className="w-full flex items-center gap-4 mb-8">
          <Award size={24} className="text-primary" />
          <h2 className="text-3xl font-mono text-primary uppercase font-bold tracking-widest">
            Achievements & Highlights
          </h2>
          <div className="h-[1px] bg-primary/20 flex-1 ml-4" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="os-panel p-6 md:p-10 border-primary/20 relative"
        >
          <ul className="space-y-4 mb-8 text-gray-300 font-mono text-[13px] md:text-sm">
            <li className="flex gap-4 items-start group">
              <span className="text-secondary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">As a Part of management team during 6 month internship i have Successfully managed and co-ordinated 15+ technical seminars across different universities, demonstrating strong organizational and communication skills.</span>
            </li>
            <li className="flex gap-4 items-start group">
              <span className="text-secondary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">As a Part of management team during 6 month internship i have Served as an External Examiner for 3+ academic examination boards, evaluating student projects and practical assessments.</span>
            </li>
            <li className="flex gap-4 items-start group">
              <span className="text-secondary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">Participated actively as a core part of the management team during my internship, collaborating closely with mentors and the team to ensure project success.</span>
            </li>
          </ul>

          <div className="flex items-center gap-4 my-8">
            <div className="w-full h-[1px] bg-white/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="w-full h-[1px] bg-white/10" />
          </div>

          <ul className="space-y-4 text-gray-300 font-mono text-[13px] md:text-sm">
            <li className="flex gap-4 items-start group">
              <span className="text-primary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">Delivered 7+ production websites for real clients including Perfect Pixel (perfectpixel.co.in) ,Badhuche (badhuche.co.in), KailasEngineering, Paradigm Managing Quality ,and VrindaAagro, Om Sai Ladies Trailor (FreeLance) using modern web technologies.</span>
            </li>
            <li className="flex gap-4 items-start group">
              <span className="text-primary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">Designed and executed graphic design campaigns for multiple businesses, producing social media posts, branding assets, and marketing collateral.</span>
            </li>
            <li className="flex gap-4 items-start group">
              <span className="text-primary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">Built and deployed personal portfolio at port-folio-jeel-darji.vercel.app showcasing projects, skills, and professional profile.</span>
            </li>
            <li className="flex gap-4 items-start group">
              <span className="text-primary mt-1 group-hover:translate-x-1 transition-transform">&gt;</span>
              <span className="leading-relaxed">Consistently applied version control best practices using Git and GitHub across all professional and personal projects.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
