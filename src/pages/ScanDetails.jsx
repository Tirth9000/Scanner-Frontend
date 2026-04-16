import React from "react";

function ScanDetails() {
  return (
    <div className="min-h-screen bg-surface">
      <main className="flex-1 overflow-y-auto pt-8 pb-16 px-12 max-w-[1600px] mx-auto w-full">
        {/* Dashboard Top Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Security Score */}
          <div className="md:col-span-5 lg:col-span-4 p-8 rounded-xl shadow-sm relative overflow-hidden group border border-slate-200 bg-surface-container-lowest">
            <div className="security-pulse absolute -right-10 -top-10 w-40 h-40 rounded-full group-hover:scale-110 transition-transform duration-700" />
            <div className="flex justify-between items-start mb-4">
              <span className="label-md uppercase tracking-widest text-on-surface-variant text-[11px] font-bold">
                Security Grade
              </span>
              <span
                className="material-symbols-outlined text-emerald-600"
                style={{ fontVariationSettings: `"FILL" 1` }}
              >
                verified_user
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-7xl font-extrabold font-headline tracking-tighter text-emerald-600">
                84
              </h1>
              <span className="text-2xl text-on-surface-variant font-medium">
                /100
              </span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex-grow h-1.5 bg-surface-container rounded-full overflow-hidden mr-4">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: "84%" }}
                />
              </div>
              <span className="font-bold font-headline uppercase tracking-widest text-sm text-emerald-600">
                Optimal
              </span>
            </div>
          </div>

          {/* Domain Info */}
          <div className="md:col-span-7 lg:col-span-8 p-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4 border border-indigo-100">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />{" "}
              Active Scan Result
            </div>
            <div className="mb-8">
              <h2 className="text-6xl md:text-7xl font-extrabold font-headline tracking-tighter text-on-surface inline-block relative">
                <span className="relative z-10">example.com</span>
                <span className="absolute -bottom-2 left-0 w-full h-4 bg-indigo-100 -z-10 rounded-full" />
              </h2>
            </div>
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-slate-100 pb-1">
                  IP Address
                </span>
                <span className="text-lg font-semibold text-on-surface mt-1">
                  192.168.1.1
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-slate-100 pb-1">
                  Last Scan
                </span>
                <span className="text-lg font-semibold text-on-surface mt-1">
                  Oct 28, 2023 - 14:30
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-slate-100 pb-1">
                  Environment
                </span>
                <span className="text-lg font-semibold text-on-surface mt-1">
                  Production (AWS-East)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="mb-8">
          <h3 className="text-sm uppercase tracking-widest text-on-surface-variant font-bold mb-6">
            Security Vectors
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <button className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-indigo-600 text-white shadow-sm transition-all active:scale-95 border border-indigo-600">
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: `"FILL" 1` }}
              >
                apps
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight">
                  Application Security
                </span>
                <span className="text-[10px] opacity-80 font-medium">
                  12 Findings
                </span>
              </div>
            </button>
            <button className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm transition-all active:scale-95 group">
              <span className="material-symbols-outlined text-lg group-hover:text-indigo-600 transition-colors">
                lan
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight text-slate-900">
                  Network Security
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  3 Findings
                </span>
              </div>
            </button>
            <button className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm transition-all active:scale-95 group">
              <span className="material-symbols-outlined text-lg group-hover:text-indigo-600 transition-colors">
                public
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight text-slate-900">
                  IP Reputation
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  Clean
                </span>
              </div>
            </button>
            <button className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm transition-all active:scale-95 group">
              <span className="material-symbols-outlined text-lg group-hover:text-indigo-600 transition-colors">
                mail
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight text-slate-900">
                  Mail Security
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  SPF Fail
                </span>
              </div>
            </button>
            <button className="flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm transition-all active:scale-95 group">
              <span className="material-symbols-outlined text-lg group-hover:text-indigo-600 transition-colors">
                dns
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold leading-tight text-slate-900">
                  DNS Security
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  DNSSEC Missing
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Vulnerabilities Section */}
        <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="text-2xl font-extrabold font-headline tracking-tight text-on-surface">
                Critical Vulnerabilities
              </h3>
              <p className="text-on-surface-variant text-sm">
                Reviewing 12 findings in 'Application Security'
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-50 text-on-surface font-semibold text-sm rounded-lg flex items-center gap-2 hover:bg-slate-100 border border-slate-200 transition-all">
                <span className="material-symbols-outlined text-sm">
                  filter_list
                </span>{" "}
                Filter
              </button>
              <button className="px-4 py-2 bg-slate-50 text-on-surface font-semibold text-sm rounded-lg flex items-center gap-2 hover:bg-slate-100 border border-slate-200 transition-all">
                <span className="material-symbols-outlined text-sm">
                  download
                </span>{" "}
                Export
              </button>
            </div>
          </div>

          {/* Vulnerability List */}
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="group flex flex-wrap md:flex-nowrap items-center gap-6 p-5 rounded-xl bg-red-50 border border-red-100 transition-colors">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: `"FILL" 1` }}
                >
                  warning
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-red-900 mb-1">
                  Expired SSL Certificate
                </h4>
                <div className="flex flex-col text-[12px] text-red-700/80 font-medium">
                  <span className="uppercase tracking-wider">
                    api.example.com
                  </span>
                  <span>IP: 192.168.1.1</span>
                  <span>Port: 443</span>
                </div>
              </div>
              <div className="shrink-0 px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                Critical
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
                  Fix
                </button>
                <button className="px-4 py-2 border border-red-200 text-red-700 text-sm font-semibold rounded-lg hover:bg-white transition-all bg-red-50">
                  Share
                </button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group flex flex-wrap md:flex-nowrap items-center gap-6 p-5 rounded-xl bg-amber-50 border border-amber-100 transition-colors">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: `"FILL" 1` }}
                >
                  sensors_off
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-amber-900 mb-1">
                  Open Port 80
                </h4>
                <div className="flex flex-col text-[12px] text-amber-700/80 font-medium">
                  <span className="uppercase tracking-wider">
                    dev.example.com
                  </span>
                  <span>IP: 192.168.1.5</span>
                  <span>Port: 80</span>
                </div>
              </div>
              <div className="shrink-0 px-3 py-1 bg-amber-500 text-white rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                High
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
                  Fix
                </button>
                <button className="px-4 py-2 border border-amber-200 text-amber-700 text-sm font-semibold rounded-lg hover:bg-white transition-all bg-amber-50">
                  Share
                </button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group flex flex-wrap md:flex-nowrap items-center gap-6 p-5 rounded-xl bg-slate-50 border border-slate-200 transition-colors">
              <div className="w-12 h-12 bg-slate-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: `"FILL" 1` }}
                >
                  javascript
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Vulnerable JS Library (jQuery 1.12)
                </h4>
                <div className="flex flex-col text-[12px] text-slate-600 font-medium">
                  <span className="uppercase tracking-wider">
                    cdn.example.com
                  </span>
                  <span>IP: 192.168.1.10</span>
                  <span>Port: 443</span>
                </div>
              </div>
              <div className="shrink-0 px-3 py-1 bg-slate-500 text-white rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                Medium
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
                  Fix
                </button>
                <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-white transition-all bg-slate-50">
                  Share
                </button>
              </div>
            </div>

            {/* Item 4 */}
            <div className="group flex flex-wrap md:flex-nowrap items-center gap-6 p-5 rounded-xl bg-red-50 border border-red-100 transition-colors">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: `"FILL" 1` }}
                >
                  lock_open
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-red-900 mb-1">
                  Unprotected SQL Endpoint
                </h4>
                <div className="flex flex-col text-[12px] text-red-700/80 font-medium">
                  <span className="uppercase tracking-wider">
                    portal.example.com
                  </span>
                  <span>IP: 192.168.1.20</span>
                  <span>Port: 3306</span>
                </div>
              </div>
              <div className="shrink-0 px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                Critical
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-all">
                  Fix
                </button>
                <button className="px-4 py-2 border border-red-200 text-red-700 text-sm font-semibold rounded-lg hover:bg-white transition-all bg-red-50">
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ScanDetails;
