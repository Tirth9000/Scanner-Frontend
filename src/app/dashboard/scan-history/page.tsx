'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { History, Globe, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const previousScans = [
  { domain: 'google.com', date: 'Mar 14, 2026', score: 92, status: 'Healthy' },
  { domain: 'officebeacon.com', date: 'Mar 13, 2026', score: 86, status: 'Healthy' },
  { domain: 'microsoft.com', date: 'Mar 11, 2026', score: 74, status: 'Warning' },
  { domain: 'apple.com', date: 'Mar 09, 2026', score: 89, status: 'Healthy' },
  { domain: 'amazon.com', date: 'Mar 05, 2026', score: 42, status: 'Critical' },
];

export default function ScanHistoryPage() {
  return (
    <div className="min-h-full flex flex-col gap-8 p-8 bg-[#fcfcfc]">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Scan History</h1>
        <p className="text-sm text-slate-500 font-medium">Review and access detailed reports of previous security assessments.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {previousScans.map((scan, i) => (
          <motion.div
            key={scan.domain}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link 
              href={`/dashboard/report?domain=${scan.domain}`}
              className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{scan.domain}</h3>
                  <p className="text-xs text-slate-400 font-medium">{scan.date} • Security Audit</p>
                </div>
              </div>

              <div className="flex items-center space-x-12">
                <div className="text-right">
                  <div className="flex items-center space-x-2 justify-end mb-1">
                    {scan.status === 'Healthy' ? (
                      <ShieldCheck size={14} className="text-green-500" />
                    ) : (
                      <AlertTriangle size={14} className="text-orange-500" />
                    )}
                    <span className="text-xs font-black text-slate-900">{scan.score}</span>
                  </div>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${scan.score > 80 ? 'bg-green-500' : scan.score > 60 ? 'bg-orange-500' : 'bg-red-500'}`} 
                      style={{ width: `${scan.score}%` }}
                    />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
