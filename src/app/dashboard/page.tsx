'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Activity, 
  ShieldCheck, 
  Globe, 
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AssessmentOverview() {
  return (
    <div className="min-h-full flex flex-col gap-6 p-8">
      
      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Security Assessment</h1>
          <p className="text-sm text-slate-500 font-medium">Enterprise-wide security posture and aggregate monitoring.</p>
        </div>
        <Link href="/dashboard/new-scan">
          <button className="px-4 py-2 bg-[#3b2a8d] text-white text-sm font-bold hover:bg-[#2d1f70] transition-all flex items-center space-x-2 rounded-xl shadow-lg shadow-[#3b2a8d]/20">
            <Plus className="w-4 h-4" />
            <span>New Assessment</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <ShieldCheck className="text-green-500" />, label: 'Health Score', value: '86', trend: '+2.4%', sub: 'Global Average' },
          { icon: <Activity className="text-blue-500" />, label: 'Active Scans', value: '12', trend: 'Stable', sub: 'Last 24 hours' },
          { icon: <AlertTriangle className="text-orange-500" />, label: 'Critical Risks', value: '3', trend: '-1', sub: 'Requires Attention' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h2 className="text-3xl font-black text-slate-900">{stat.value}</h2>
            </div>
            <p className="text-[10px] font-medium text-slate-400">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-[400px] flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
               <TrendingUp size={32} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Aggregate Trends</h3>
              <p className="text-sm text-slate-500 max-w-sm">Visualization of security score improvements across all monitored assets.</p>
            </div>
            <div className="w-full max-w-md h-32 bg-slate-50 rounded-2xl animate-pulse" />
          </div>
        </div>

        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
               <Link href="/dashboard/scan-history" className="text-[10px] font-bold text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {[
                { domain: 'google.com', time: '2h ago', status: 'Healthy' },
                { domain: 'microsoft.com', time: '5h ago', status: 'Warning' },
                { domain: 'apple.com', time: '1d ago', status: 'Healthy' },
                { domain: 'amazon.com', time: '2d ago', status: 'Critical' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                       <Globe size={16} />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{activity.domain}</p>
                       <p className="text-[10px] text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${activity.status === 'Healthy' ? 'bg-green-500' : activity.status === 'Warning' ? 'bg-orange-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] font-bold text-slate-500">{activity.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
