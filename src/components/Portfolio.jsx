import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Database, Cpu } from 'lucide-react';

const portfolioProjects = [
  { id: "MOD_001", title: "PortFolio Website CV", img: "/assets/images/projects/PortFolio.png", category: "FRONT-END", link: "#", text: "Responsive personal CV website.", tags: ["HTML", "CSS", "JS"] },
  { id: "MOD_003", title: "Perfectpixel Website", img: "/assets/images/projects/Perfectpixel.png", category: "FULL-STACK", link: "https://perfectpixels.co", text: "IT.Service Based Company Website Build Main Focuse on it.", tags: ["Next.js", "SANITY",'SQL', "Dashboard"] },
  { id: "MOD_004", title: "Badhuche", img: "/assets/images/projects/Badhuche.png", category: "FULL-STACK", link: "https://vrindaaagro.com/", text: "Website for show the work of Art in the website.", tags: ["NEXT.JS",'SANITY','NODE.JS', "Admin Pannel"] },
  { id: "MOD_005", title: "Vrinda Aagro", img: "/assets/images/projects/Vrinda.png", category: "FULL-STACK", link: "https://vrindaaagro.com/", text: "Product Based Company Website build which Focuse on the Prodct Show Case.", tags: ["Css3",'Next.js','Sanity','Mail Tio', "Admin Pannel"] },
  { id: "MOD_006", title: "Kailas Engineering", img: "/assets/images/projects/Kailas.png", category: "FRONT-END", link: "https://kailasengineering.com/", text: "React web app for managing events.", tags: ["WordPress",'PHP', "State Management"] },
  {id:' MOD_007', title:'OM SAI LADIES TAILOR',img:'/assets/images/projects/sai.png',category:'FRONT-END',link:'https://om-sai-ladies-tailor.vercel.app/',text:'FREELANCE:-Tailoring Service Based Shop',tags:["WordPress",'PHP']}
];

const categories = ["ALL", ...Array.from(new Set(portfolioProjects.map(p => p.category)))];

export default function Portfolio() {
  const [filter, setFilter] = useState("ALL");
  const filteredProjects = portfolioProjects.filter(p => filter === "ALL" || p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-12 relative w-full border-t border-b border-white/5 bg-[#010408]">
      <div className="max-w-7xl mx-auto">
        
        <div className="w-full flex items-center gap-4 mb-12">
          <Cpu size={24} className="text-primary" />
          <h2 className="text-3xl font-mono text-primary uppercase font-bold tracking-widest">
            Deployed Systems
          </h2>
          <div className="h-[1px] bg-primary/20 flex-1 ml-4" />
        </div>

        <div className="flex flex-wrap gap-4 mb-12 font-mono text-sm">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 border uppercase tracking-wider transition-colors ${
                filter === cat 
                ? "bg-primary/20 text-primary border-primary shadow-[0_0_10px_rgba(0,240,255,0.2)]" 
                : "bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              [{cat}]
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="os-panel group hover:border-primary/60 transition-colors"
              >
                {/* Header terminal bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5 font-mono text-xs">
                  <span className="text-primary">{project.id}</span>
                  <div className="flex gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500/50" />
                     <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                     <span className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
                </div>

                {/* Project Image Area */}
                <div className="relative aspect-video overflow-hidden p-4">
                  <div className="absolute inset-0  mix-blend-overlay pointer-events-none z-10" />
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-full object-cover object-top  transition-opacity duration-300 border border-white/5"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0a0a0a/00f0ff?text=SYS_IMG_MISSING"; }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 font-mono text-sm bg-primary text-background font-bold tracking-widest hover:bg-white transition-colors flex items-center gap-2">
                      INITIATE <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-white font-mono">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">&gt; {project.text}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 font-mono text-[10px] px-2 py-1 bg-white/5 text-gray-300 border border-white/10 uppercase tracking-widest">
                        <Database size={10} className="text-primary" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
