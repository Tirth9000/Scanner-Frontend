'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Globe, 
  Zap, 
  Mail, 
  Activity, 
  Target, 
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Lock,
  Server,
  Database
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ScanStatusProps {
  domain: string;
}

type ScanStageType = 
  | 'dns' 
  | 'http' 
  | 'ssl' 
  | 'headers' 
  | 'discovery' 
  | 'email' 
  | 'intel' 
  | 'ports' 
  | 'ai';

export const ScanStatus: React.FC<ScanStatusProps> = ({ domain }) => {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState<ScanStageType>('dns');
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showProceed, setShowProceed] = useState(false);

  const stages = [
    { id: 'dns', label: 'DNS Reconnaissance', icon: <Globe size={20} />, description: 'Analyzing name server records and zone files' },
    { id: 'http', label: 'HTTP & Technology', icon: <Cpu size={20} />, description: 'Fingerprinting web server and stack components' },
    { id: 'ssl', label: 'SSL/TLS Analysis', icon: <Lock size={20} />, description: 'Evaluating encryption strength and certificate chain' },
    { id: 'headers', label: 'Security Headers', icon: <ShieldCheck size={20} />, description: 'Checking CSP, HSTS, and X-Frame-Options' },
    { id: 'discovery', label: 'Subdomain Discovery', icon: <Search size={20} />, description: 'Mapping organizational attack surface' },
    { id: 'email', label: 'Email Security', icon: <Mail size={20} />, description: 'Verifying SPF, DKIM, and DMARC policies' },
    { id: 'intel', label: 'Reputation & Intel', icon: <Activity size={20} />, description: 'Checking blacklists and threat intelligence feeds' },
    { id: 'ports', label: 'Port Scanning', icon: <Target size={20} />, description: 'Identifying exposed services and vulnerabilities' },
    { id: 'ai', label: 'AI Risk Scoring', icon: <Zap size={20} />, description: 'Synthesizing findings into executive risk score' },
  ];

  useEffect(() => {
    let currentIdx = 0;
    const intervalTime = 1200; // Slightly faster than before for better feel

    const scrollInterval = setInterval(() => {
      if (currentIdx < stages.length - 1) {
        currentIdx++;
        setCurrentStage(stages[currentIdx].id as ScanStageType);
        setProgress(Math.floor((currentIdx / stages.length) * 100));
      } else {
        clearInterval(scrollInterval);
        setProgress(100);
        setIsDone(true);
        setTimeout(() => setShowProceed(true), 800);
      }
    }, intervalTime);

    return () => clearInterval(scrollInterval);
  }, []);

  const activeIndex = stages.findIndex(s => s.id === currentStage);

  const handleProceed = () => {
    router.push(`/dashboard/report?domain=${encodeURIComponent(domain)}`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Scanning: {domain}</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter"
            >
              Security Assessment <br/>
              <span className="text-blue-500">In Progress</span>
            </motion.h1>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <div className="text-5xl font-black text-white tracking-tighter tabular-nums">
              {progress}%
            </div>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stage List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stages.map((stage, index) => {
                const isActive = index === activeIndex && !isDone;
                const isCompleted = index < activeIndex || isDone;
                
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isCompleted || isActive ? 1 : 0.4, 
                      y: 0,
                      scale: isActive ? 1.02 : 1
                    }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-5 rounded-2xl border transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-800/50 border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]' 
                        : isCompleted 
                          ? 'bg-slate-800/30 border-emerald-500/30' 
                          : 'bg-transparent border-slate-800'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl transition-colors duration-300 ${
                        isActive ? 'bg-blue-600 text-white' : 
                        isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 
                        'bg-slate-800 text-slate-500'
                      }`}>
                        {isCompleted ? <ShieldCheck size={20} /> : stage.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-sm font-bold tracking-tight uppercase ${
                          isActive ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                        }`}>
                          {stage.label}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">
                          {stage.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="flex space-x-0.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [4, 12, 4] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                              className="w-0.5 bg-blue-500 rounded-full"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Status Summary */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sticky top-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-black text-white mb-2 tracking-tight">System Status</h2>
                  <div className="h-0.5 w-12 bg-blue-600 mb-6" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Engine</span>
                    <span className="text-xs font-black text-emerald-400 uppercase tracking-tighter">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Modules</span>
                    <span className="text-xs font-black text-white uppercase tracking-tighter">{activeIndex + 1} / {stages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Threat Level</span>
                    <span className="text-xs font-black text-blue-400 uppercase tracking-tighter">Monitoring</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <AnimatePresence mode="wait">
                    {!showProceed ? (
                      <motion.div 
                        key="scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-3 text-slate-400"
                      >
                        <div className="w-8 h-8 rounded-full border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                        <span className="text-xs font-bold italic">Synthesizing telemetry...</span>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="proceed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleProceed}
                        className="w-full bg-[#FCFCFC] hover:bg-white text-[#0F172A] py-5 px-6 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 shadow-2xl transition-all group"
                      >
                        <span>Proceed to Report</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/20 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Latency</p>
                <p className="text-lg font-bold text-white tracking-tighter">124ms</p>
              </div>
              <div className="bg-slate-800/20 border border-slate-800 p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Encryption</p>
                <p className="text-lg font-bold text-white tracking-tighter">AES-256</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
