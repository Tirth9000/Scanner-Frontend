import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ASSESSMENT_CATEGORIES,
  getInitialSelections,
  getMetricColor,
  getMetricTextColor,
  getRadarPoint,
} from "../utils/assessmentUtils";

function ScanDashboard() {
  const metrics = useMemo(() => {
    const selections = getInitialSelections();
    return ASSESSMENT_CATEGORIES.map((category) => {
      const selectedCount = category.items.filter(
        (item) => selections[category.id]?.[item.id],
      ).length;
      const value = Math.round((selectedCount / category.items.length) * 100);

      return {
        ...category,
        selectedCount,
        value,
      };
    });
  }, []);

  const radarPoints = useMemo(() => {
    const [network, application, dns, endpoint] = metrics;
    return [
      getRadarPoint(network.value, "top"),
      getRadarPoint(application.value, "right"),
      getRadarPoint(dns.value, "bottom"),
      getRadarPoint(endpoint.value, "left"),
    ].join(" ");
  }, [metrics]);
  return (
    <div className="min-h-screen bg-surface relative">
      <main className="flex-1 overflow-y-auto pt-8 pb-16 px-12 max-w-[1600px] mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
            Security Overview
          </h1>
          <p className="text-on-surface-variant text-sm mt-2">
            Comprehensive security posture across all scanning vectors.
          </p>
        </header>

        <section className="flex flex-col gap-6 mb-12">
          
          {/* 1. Assessment Overview Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col xl:flex-row items-center xl:items-stretch gap-8 relative">
            
            {/* Left: Spider Net */}
            <div className="w-full xl:w-64 shrink-0 border border-slate-100 rounded-xl p-5 flex flex-col items-center justify-center bg-slate-50/50">
              <div className="w-full flex items-center justify-center xl:justify-start gap-2 mb-2">
                <span className="material-symbols-outlined text-indigo-600 text-lg">assignment_turned_in</span>
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Spider Net Graph
                </h2>
              </div>
              <div className="relative flex aspect-square w-full max-w-[150px] items-center justify-center">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                  {metrics[0].axisLabel}
                </div>
                <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                  {metrics[1].axisLabel}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                  {metrics[2].axisLabel}
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                  {metrics[3].axisLabel}
                </div>

                <svg className="h-full w-full" viewBox="0 0 400 400">
                  <polygon points="200,40 360,200 200,360 40,200" fill="none" stroke="#e2e8f0" strokeDasharray="4" />
                  <polygon points="200,80 320,200 200,320 80,200" fill="none" stroke="#e2e8f0" strokeDasharray="4" />
                  <polygon points="200,120 280,200 200,280 120,200" fill="none" stroke="#e2e8f0" strokeDasharray="4" />
                  <polygon points="200,160 240,200 200,240 160,200" fill="none" stroke="#e2e8f0" strokeDasharray="4" />
                  <line x1="200" y1="40" x2="200" y2="360" stroke="#e2e8f0" />
                  <line x1="40" y1="200" x2="360" y2="200" stroke="#e2e8f0" />

                  <polygon
                    points={radarPoints}
                    fill="rgba(79,70,229,0.15)"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                  />

                  {radarPoints.split(" ").map((point, index) => {
                    const [cx, cy] = point.split(",");
                    const value = metrics[index].value;
                    const fill = value >= 55 ? "#4f46e5" : "#e11d48";
                    return <circle key={metrics[index].id} cx={cx} cy={cy} r="5" fill={fill} />;
                  })}
                </svg>
              </div>
            </div>

            {/* Middle: Metric Breakdown */}
            <div className="flex-1 w-full flex flex-col justify-center py-2">
              <div className="inline-flex items-center gap-2 px-0 py-1 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> 
                Assessment Control Domains
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {metrics.map((metric) => (
                  <div key={metric.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">{metric.icon}</span>
                        {metric.label}
                      </span>
                      <span className={`font-black text-xs ${getMetricTextColor(metric.value)}`}>
                        {metric.value}%
                      </span>
                    </div>

                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getMetricColor(metric.value)}`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right: Full Info Button */}
            <div className="shrink-0 w-full xl:w-auto flex items-center mt-6 xl:mt-0 justify-center">
              <Link to="/assessment" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-indigo-600 text-sm font-bold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 w-full xl:w-auto">
                Full Info <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* 2. Regular Scan Card (Horizontal, matching reference image) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-stretch gap-8 relative">
            <div className="md:w-64 shrink-0 border border-slate-100 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Security Grade</span>
                  <span className="material-symbols-outlined text-indigo-600 text-sm" style={{ fontVariationSettings: `"FILL" 1` }}>verified_user</span>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-emerald-600">84</h2>
                  <span className="text-lg text-slate-400 font-medium">/100</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: "84%" }} />
                </div>
                <div className="text-right">
                  <span className="font-bold font-headline uppercase tracking-widest text-[10px] text-emerald-600">Optimal</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-2">
              <div className="inline-flex items-center gap-2 px-0 py-1 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" /> 
                Active Scan Result
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-slate-900 mb-6 truncate" title="example.com">
                example.com
              </h3>

              <div className="flex flex-wrap gap-x-12 gap-y-6">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 border-b border-slate-100 pb-1">IP Address</span>
                  <span className="text-sm font-semibold text-slate-800">192.168.1.1</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 border-b border-slate-100 pb-1">Last Scan</span>
                  <span className="text-sm font-semibold text-slate-800">Oct 28, 2023 - 14:30</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 border-b border-slate-100 pb-1">Environment</span>
                  <span className="text-sm font-semibold text-slate-800">Production (AWS-East)</span>
                </div>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center mt-6 md:mt-0 justify-center">
              <Link to="/scan-details" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-emerald-700 text-sm font-bold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2 w-full md:w-auto">
                Full Info <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* 3. Malware Scan Card (Horizontal) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-64 shrink-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="material-symbols-outlined text-rose-600 text-2xl">bug_report</span>
                <h3 className="font-bold text-slate-800 text-lg">Malware Intel</h3>
              </div>
              <span className="px-3 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold tracking-widest rounded-full inline-block mb-3">Clean Status</span>
              <p className="text-xs text-slate-500 max-w-xs mx-auto md:mx-0">
                Continuous file monitoring and real-time blacklisting checks across all endpoints.
              </p>
            </div>

            <div className="flex-1 flex flex-wrap gap-4 justify-center md:justify-start w-full">
              <div className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex items-center gap-5 hover:border-slate-200 transition-colors flex-1 min-w-[140px] max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <span className="material-symbols-outlined text-base">coronavirus</span>
                </div>
                <div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Malicious</div>
                   <div className="text-xl font-black text-slate-900 leading-tight">0</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex items-center gap-5 hover:border-slate-200 transition-colors flex-1 min-w-[140px] max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <span className="material-symbols-outlined text-base">warning</span>
                </div>
                <div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Suspicious</div>
                   <div className="text-xl font-black text-slate-900 leading-tight">0</div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 flex items-center gap-5 hover:border-slate-200 transition-colors flex-1 min-w-[140px] max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                </div>
                <div>
                   <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Clean File</div>
                   <div className="text-xl font-black text-slate-900 leading-tight">1,204</div>
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link to="/malware-dashboard" className="px-8 py-3 bg-slate-50 hover:bg-slate-100 text-rose-600 text-sm font-bold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-2">
                Full Info <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default ScanDashboard;
