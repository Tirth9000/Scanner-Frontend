'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, Activity, Search } from 'lucide-react';
import { LoadingScan } from '@/components/LoadingScan';

export default function NewScanPage() {
  const [domain, setDomain] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      setIsScanning(true);
    }
  };

  const handleScanComplete = () => {
    router.push(`/dashboard/report?domain=${encodeURIComponent(domain)}`);
  };

  return (
    <div className="min-h-full flex flex-col items-center pt-24 px-8 bg-[#fcfcfc]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-12"
      >
        {/* Input & Branding Section */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 rounded-full">
            <Search className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Assessment</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Initiate Security Scan</h1>
          <p className="text-sm text-slate-500 font-medium">Enter a domain to begin an automated security posture assessment.</p>
        </div>

        <form onSubmit={handleStartScan} className="relative group max-w-2xl mx-auto w-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition-opacity duration-500"></div>
          <div className={`relative flex items-center bg-white border ${isScanning ? 'border-slate-100' : 'border-slate-200'} p-2 rounded-2xl shadow-sm focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all`}>
            <div className="flex items-center flex-1 px-4 text-slate-400">
              <Globe className="w-5 h-5 mr-3" />
              <input 
                type="text" 
                placeholder="Enter domain (e.g. example.com)" 
                value={domain}
                onChange={(e) => setDomain(e.target.value.toLowerCase())}
                className="bg-transparent flex-1 py-4 text-sm font-bold text-slate-800 focus:outline-none placeholder:text-slate-300"
                required
                autoFocus
                disabled={isScanning}
              />
            </div>
            <button 
              type="submit"
              disabled={isScanning}
              className={`${isScanning ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 hover:bg-black text-white'} px-8 py-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center space-x-2 active:scale-95`}
            >
              <span>{isScanning ? 'Scan in Progress' : 'Start Scan'}</span>
              {!isScanning && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>

        {/* Dynamic Scan Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!isScanning ? (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto"
              >
                 {[
                   { label: 'Network', icon: <Activity className="w-4 h-4" /> },
                   { label: 'Malware', icon: <Activity className="w-4 h-4" /> },
                   { label: 'History', icon: <Activity className="w-4 h-4" /> }
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center space-y-2 opacity-30 grayscale">
                      <div className="p-3 bg-slate-100 rounded-xl">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.label}</span>
                   </div>
                 ))}
              </motion.div>
            ) : (
              <motion.div 
                key="active-scan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm">
                   <LoadingScan domain={domain} onComplete={handleScanComplete} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
