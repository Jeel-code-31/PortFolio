import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, MapPin, Zap, Code } from 'lucide-react';

const statusItems = [
  { icon: <Terminal size={18} className="text-primary" />, label: "READINESS", value: "Ready for Opportunities" },
  { icon: <Zap size={18} className="text-primary" />, label: "LEVEL", value: "Website Developer" },
  { icon: <Code size={18} className="text-primary" />, label: "MODE", value: "Developing" },
];

export default function StatusGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-4xl font-mono text-sm z-10 relative">
      {statusItems.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
          className="os-panel p-4 flex flex-col gap-2 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-2 text-gray-400">
            {item.icon}
            <span className="tracking-widest text-xs">{item.label}</span>
          </div>
          <p className="text-gray-100 font-medium">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
