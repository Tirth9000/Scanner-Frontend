'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Globe, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-[#fcfcfc]">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-50 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl w-full space-y-12"
      >
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100/50"
          >
            <Activity className="w-3 h-3" />
            <span>System Operational</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Security. <span className="text-blue-600">Simplified.</span>
          </h1>
          
          <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
            Welcome to ShieldStat. Your central hub for professional security assessment, threat monitoring, and real-time risk analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: <Shield className="text-blue-500" />, title: 'Real-time Monitoring', desc: 'Continuous threat analysis.' },
            { icon: <Globe className="text-blue-500" />, title: 'Global Database', desc: 'Access to millions of records.' },
            { icon: <ShieldCheck className="text-blue-500" />, title: 'Advanced Scans', desc: 'Deeper heuristic analysis.' },
            { icon: <Activity className="text-blue-500" />, title: 'Detailed Reports', desc: 'Actionable security insights.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-default group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
