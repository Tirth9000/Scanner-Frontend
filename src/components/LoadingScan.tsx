'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Search, Filter, Loader, Check, Circle, ShieldCheck, CheckCircle2, Cloud } from 'lucide-react';

interface LoadingScanProps {
  domain: string;
  onComplete: () => void;
}

type ScanStage = 'verifying' | 'subdomains' | 'filtering' | 'processing';

export const LoadingScan: React.FC<LoadingScanProps> = ({ domain, onComplete }) => {
  const [stage, setStage] = useState<ScanStage>('verifying');
  const [subdomainCount, setSubdomainCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage 1: Verifying (2s)
    const verifyTimer = setTimeout(() => {
      setStage('subdomains');
    }, 2000);

    return () => clearTimeout(verifyTimer);
  }, []);

  useEffect(() => {
    if (stage === 'subdomains') {
      const interval = setInterval(() => {
        setSubdomainCount(prev => {
          if (prev >= 42) {
            clearInterval(interval);
            setTimeout(() => setStage('filtering'), 1000);
            return 42;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'filtering') {
      const filterTimer = setTimeout(() => {
        setStage('processing');
      }, 2500);
      return () => clearTimeout(filterTimer);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDone(true);
            setTimeout(onComplete, 2000);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
      return () => clearInterval(interval);
    }
  }, [stage, onComplete]);

  const stages = [
    { id: 'verifying', label: 'Verifying Entity', icon: <Shield className="w-5 h-5 text-blue-600" /> },
    { id: 'subdomains', label: 'Discovering Assets', icon: <Search className="w-5 h-5 text-blue-600" /> },
    { id: 'filtering', label: 'Filtering Protocols', icon: <Filter className="w-5 h-5 text-blue-600" /> },
    { id: 'processing', label: 'Aggregating Score', icon: <Cloud className="w-5 h-5 text-blue-600" /> },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-10 md:p-16 relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-50 rounded-full -ml-12 -mb-12 opacity-50" />

        <div className="relative z-10 space-y-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
               <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center relative">
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-3xl border-t-transparent animate-spin" />
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
               </div>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight underline decoration-blue-500/20 underline-offset-8 decoration-4">
              Analyzing Target
            </h2>
            <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full">
              <span className="font-mono text-sm font-bold text-slate-700">{domain}</span>
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((s, index) => {
              const isActive = stage === s.id;
              const isPast = currentStageIndex > index || isDone;
              
              return (
                <div 
                  key={s.id}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-500 border ${
                    isActive ? 'bg-blue-50 border-blue-200 shadow-sm overflow-hidden relative' : 
                    isPast ? 'bg-white border-transparent' : 'bg-white border-transparent opacity-40'
                  }`}
                >
                  <div className="flex items-center space-x-6 relative z-10">
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'bg-gray-50 text-gray-400'}`}>
                      {s.icon}
                    </div>
                    <div className="flex flex-col">
                       <span className={`text-sm font-bold ${isActive ? 'text-blue-900' : 'text-slate-600'}`}>
                         {s.label}
                       </span>
                       <AnimatePresence>
                         {isActive && (
                           <motion.span 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="text-[10px] font-bold text-blue-600/60 uppercase"
                           >
                             {s.id === 'subdomains' ? `Found ${subdomainCount} assets...` : 
                              s.id === 'processing' ? `Preparing scorecard...` : 'Sequence active...'}
                           </motion.span>
                         )}
                       </AnimatePresence>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    {isPast ? (
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : isActive ? (
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Loader className="w-6 h-6 text-blue-600 animate-spin" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-100 rounded-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {(stage === 'processing' || isDone) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                 <div className="flex justify-between items-end">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Score Synthesis</span>
                    <span className="text-xl font-black text-[#3b2a8d]">{progress}%</span>
                 </div>
                 <div className="w-full bg-slate-100 h-4 p-1 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#3b2a8d] to-blue-500 rounded-full shadow-[0_0_10px_rgba(59,42,141,0.3)]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isDone && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center pt-4"
            >
              <div className="inline-flex items-center space-x-2 text-green-600 font-bold text-sm bg-green-50 px-6 py-3 rounded-full border border-green-100">
                <CheckCircle2 className="w-5 h-5" />
                <span>Security Analysis Complete</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Footer Text */}
      <p className="mt-8 text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
        System Protocol v4.0.2 // Secured Connection
      </p>
    </div>
  );
};
