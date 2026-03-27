import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([
    "> INITIALIZING SYSTEM_CORE...",
    "> LOADING NEURAL_MOD_01...",
    "> ESTABLISHING SECURE_LINK..."
  ]);

  const playBootSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // Multi-tone notification
      const frequencies = [440, 660, 880]; // A4, E5, A5 for a bright chord
      
      frequencies.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5 + (i * 0.1));
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + (i * 0.05));
        osc.stop(audioCtx.currentTime + 0.8);
      });
    } catch (e) {
      console.warn("Audio Context blocked or unsupported");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          playBootSound();
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    const logTimer = setInterval(() => {
      const newLogs = [
        "> FETCHING ARSENAL_DATA...",
        "> SYNCING TIMELINE_NODES...",
        "> DEPLOYING INTERFACE_V2.0...",
        "> OPTIMIZING ASSET_LOAD...",
        "> CLEARANCE GRANTED."
      ];
      setLogs(prev => [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]].slice(-6));
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6 font-mono overflow-hidden"
    >
      {/* Background Grid for Preloader */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-between items-end mb-2">
          <div className="flex flex-col">
            <span className="text-secondary text-[10px] tracking-widest uppercase mb-1">Boot Sequence</span>
            <h2 className="text-primary text-xl font-black tracking-tighter">PLEASE WAIT WHILE LOADING</h2>
          </div>
          <span className="text-primary text-sm font-bold">{Math.min(100, progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden mb-8 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Boot Logs */}
        <div className="space-y-1 h-32 overflow-hidden opacity-50">
          {logs.map((log, i) => (
            <motion.p 
              key={i + log}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-gray-400 tracking-wider"
            >
              {log}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Decorative center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </motion.div>
  );
}
