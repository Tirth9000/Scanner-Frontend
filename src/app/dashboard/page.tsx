'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  ShieldCheck, 
  Loader2,
  CheckCircle2,
  Shield,
  ArrowRight,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getLatestAssessment, getAssessmentHistory } from '@/api/assessment';
import { AssessmentResult } from '@/components/AssessmentResult';
import { ScoreCircularGauge } from '@/components/charts/ScoreCircularGauge';
import { RiskRadarChart } from '@/components/charts/RiskRadarChart';
import { ScoreTrendChart } from '@/components/charts/ScoreTrendChart';

export default function AssessmentOverview() {
  const searchParams = useSearchParams();
  const showSuccess = searchParams.get('assessment_complete') === 'true';
  const [assessment, setAssessment] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latestData, historyData] = await Promise.all([
          getLatestAssessment(),
          getAssessmentHistory(10)
        ]);

        if (latestData && latestData.summary) {
          setAssessment(latestData);
        }

        if (Array.isArray(historyData)) {
          // Format history data for the trend chart
          const formattedHistory = historyData.map(h => ({
            date: new Date(h.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: h.summary?.score || 0
          })).reverse();

          // If the latest assessment isn't in history yet, add it to the trend
          if (latestData && latestData.summary && !historyData.some(h => h._id === latestData._id)) {
            formattedHistory.push({
              date: new Date(latestData.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              score: latestData.summary.score
            });
          }

          setHistory(formattedHistory);
        }


      } catch (err) {
        console.error('Failed to fetch assessment data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-full flex flex-col gap-6 p-8 bg-[#fcfcfc]">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 mb-2"
          >
            <CheckCircle2 size={20} />
            <span className="text-sm font-bold">Assessment successfully completed! Your security posture has been updated.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Security Assessment</h1>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Enterprise-wide security posture and maturity monitoring.</p>
        </div>
        {assessment && (
          <Link href="/dashboard/assessment/questionnaire">
            <button className="px-5 py-2.5 bg-[#3b2a8d] text-white text-xs font-black uppercase tracking-widest hover:bg-[#2d1f70] transition-all flex items-center space-x-2 rounded-xl shadow-lg shadow-[#3b2a8d]/20 active:scale-95">
              <Plus className="w-4 h-4" />
              <span>Retake Assessment</span>
            </button>
          </Link>
        )}
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Security Data...</p>
          </div>
        ) : assessment ? (
          <div className="space-y-8 pb-12">
             <AssessmentResult summary={assessment.summary} />
             
             {/* Secondary Analytics */}
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Portfolio Score & Radar Chart */}
                <div className="lg:col-span-12 bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center min-h-[350px]">
                   <div className="w-full md:w-1/3 h-full">
                      <ScoreCircularGauge 
                        score={assessment.summary.score} 
                        grade={assessment.summary.grade} 
                      />
                   </div>
                   <div className="w-full md:w-2/3 h-full min-h-[300px]">
                      <RiskRadarChart data={[]} /> {/* Using default data for now or mapping answers */}
                   </div>
                </div>

                {/* Score Trend */}
                <div className="lg:col-span-12 bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-[350px]">
                   <ScoreTrendChart history={history} />
                </div>
             </div>
          </div>

        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center py-20 px-8"
          >
            <div className="max-w-2xl w-full bg-white rounded-[3rem] border border-slate-100 p-12 shadow-sm text-center space-y-8 relative overflow-hidden group">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors duration-700" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto text-blue-600 mb-4 transition-transform group-hover:rotate-12 duration-500">
                  <ClipboardCheck size={40} />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Unlock Your Security Score</h2>
                  <p className="text-slate-500 font-medium text-base leading-relaxed max-w-md mx-auto">
                    Evaluate your organization&apos;s digital safety through a comprehensive 40-question maturity assessment based on enterprise security benchmarks.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/dashboard/assessment/questionnaire">
                    <button className="px-10 py-4 bg-[#3b2a8d] hover:bg-[#2a1d6a] text-white font-black text-sm rounded-2xl transition-all shadow-xl shadow-blue-900/10 flex items-center gap-3 active:scale-95 group/btn uppercase tracking-widest">
                      Start Assessment
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-50 opacity-50">
                   {[
                     { label: '40 Questions', sub: 'Guided review' },
                     { label: 'A-F Rating', sub: 'Maturity grade' },
                     { label: 'Risk Analysis', sub: 'Instant feedback' },
                   ].map((feature, i) => (
                     <div key={i} className="space-y-1">
                        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{feature.label}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">{feature.sub}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>


    </div>
  );
}
