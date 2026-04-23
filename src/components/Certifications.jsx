"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import {
  Award,
  ExternalLink,
  FileText,
  ShieldCheck,
  Zap,
  CalendarDays,
  Building2,
} from "lucide-react";

const CERTIFICATES = [
  {
    id: "CERT_01",
    title: "INTERNSHIP COMPLETION LETTER- 6 MONTHS",
    issuer: "VENOM TECHNOLOGIES ,ANAND",
    date: "SEPTEMBER 2025",
    file: "/Certifications/IC.jpg",
    category: "Professional",
  },
  {
    id: "CERT_02",
    title: "REST API (INTERMEDIATE)",
    issuer: "HackerRank",
    date: "2026",
    file: "/Certifications/Certi1.pdf",
    category: "Technical",
  },
  {
    id: "CERT_03",
    title: "Problem Solving IN C++ (BASIC)",
    issuer: "HackerRank",
    date: "2026",
    file: "/Certifications/Certi2.pdf",
    category: "Technical",
  },
  {
    id: "CERT_04",
    title: "Backend SQL-DATABASE(ADVANCED)",
    issuer: "HackerRank",
    date: "2026",
    file: "/Certifications/Certi3.pdf",
    category: "Technical",
  },
  {
    id: "CERT_05",
    title: "Front-end (REACT.js)",
    issuer: "HackerRank",
    date: "2026",
    file: "/Certifications/Certi4.pdf",
    category: "Professional",
  },
];

export default function Certifications() {
  const sectionRef = useRef(null);
  const [activeCertId, setActiveCertId] = useState(CERTIFICATES[0]?.id ?? null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // Open PDF in a new tab for inline browser viewing.
  // Note: Browser settings can still allow users to download manually.
  const getCertViewUrl = (file) => {
    const normalizedBase = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
    const normalizedFile = file.startsWith("/") ? file : `/${file}`;
    return `${normalizedBase}${normalizedFile}#view=FitH`;
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 lg:px-12 bg-[#010408] font-mono border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1 bg-primary" />
            <h2 className="text-xl text-white uppercase font-bold tracking-wider">
              System.Auth / Certifications
            </h2>
          </div>
          <span className="hidden sm:block text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
            Registry Mode: Active
          </span>
        </div>

        <div className="relative border border-primary/15 bg-white/[0.02] rounded-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500">
              <span className="h-2 w-2 rounded-full bg-primary/70" />
              Certificate Ledger
            </div>
            <div className="text-[10px] text-zinc-600 uppercase">
              Records: {CERTIFICATES.length.toString().padStart(2, "0")}
            </div>
          </div>

          <div className="relative px-5 py-4 sm:px-6 sm:py-5">
            <div className="pointer-events-none absolute left-[20px] sm:left-[24px] top-0 bottom-0 w-px bg-white/10" />
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="pointer-events-none absolute left-[20px] sm:left-[24px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/70 to-primary/20"
            />

          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24, x: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.55 }}
              transition={{ delay: index * 0.1 }}
              onViewportEnter={() => setActiveCertId(cert.id)}
              className="group relative mb-4 last:mb-0"
            >
              <div className="absolute left-[20px] sm:left-[24px] -translate-x-1/2 top-6 h-3.5 w-3.5 rounded-full border border-primary/60 bg-[#010408] z-20">
                <div className="m-[3px] h-1.5 w-1.5 rounded-full bg-primary/70" />
              </div>

              <div className="ml-8 relative overflow-hidden border border-white/10 group-hover:border-primary/30 bg-white/[0.015] group-hover:bg-white/[0.03] transition-all rounded-sm px-4 py-4 sm:px-5">
                <div className="absolute -top-8 -right-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-md group-hover:scale-105 transition-transform">
                    <Award size={24} />
                  </div>
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-bold leading-tight transition-colors ${
                          activeCertId === cert.id
                            ? "text-primary"
                            : "text-white group-hover:text-primary"
                        }`}
                      >
                        {cert.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px]">
                        <span className="text-primary/70 px-2 py-0.5 border border-primary/20 rounded-full uppercase">
                          {cert.category}
                        </span>
                        <span className="text-zinc-600 font-bold">{cert.id}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      activeCertId === cert.id ? "text-primary/80" : "text-zinc-600"
                    }`}
                  >
                    status_verified
                  </span>
                </div>

                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Building2 size={13} className="text-primary/70" />
                    <span>
                      Issuer: <span className="text-zinc-300">{cert.issuer}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CalendarDays size={13} className="text-primary/70" />
                    <span>
                      Year: <span className="text-zinc-300">{cert.date}</span>
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wide">
                    <FileText size={14} />
                    <span>PDF Record</span>
                  </div>
                  <a
                    href={getCertViewUrl(cert.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-primary font-bold px-2.5 py-1 border border-primary/30 hover:border-primary/60 hover:bg-primary/10 rounded-sm transition-all"
                    aria-label={`View ${cert.title} certificate PDF`}
                  >
                    VIEW MORE <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}