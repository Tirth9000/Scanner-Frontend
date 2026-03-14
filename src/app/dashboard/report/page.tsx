'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  UploadCloud,
  ShieldCheck,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Globe,
  Shield,
  Zap,
  Search,
  Activity,
  Bug,
  Lock,
  MessageSquare,
  Database,
  Users
} from 'lucide-react';

const securityFactors = [
  { id: 'Network Security', count: 4, score: 81, icon: <Globe size={14} />, color: 'slate-600' },
  { id: 'Application', count: 2, score: 94, icon: <Shield size={14} />, color: 'slate-500' },
  { id: 'DNS Health', count: 3, score: 100, icon: <Zap size={14} />, color: 'slate-600' },
  { id: 'Patching', count: 5, score: 87, icon: <Activity size={14} />, color: 'slate-500' },
  { id: 'Endpoints', count: 1, score: 72, icon: <Bug size={14} />, color: 'slate-400' },
  { id: 'IP Reputation', count: 0, score: 98, icon: <Search size={14} />, color: 'slate-500' },
  { id: 'Cubit Score', count: 2, score: 85, icon: <ShieldCheck size={14} />, color: 'slate-600' },
  { id: 'Hacker Chatter', count: 0, score: 100, icon: <MessageSquare size={14} />, color: 'slate-400' },
  { id: 'Information Leak', count: 3, score: 91, icon: <Database size={14} />, color: 'slate-500' },
  { id: 'Social Eng.', count: 1, score: 78, icon: <Users size={14} />, color: 'slate-400' }
];

const issuesData: Record<string, any[]> = {
  'Network Security': [
    { 
      id: 1, 
      title: 'Exposed SSH Port', 
      severity: 'Critical', 
      category: 'Ports', 
      desc: 'Port 22 (SSH) is open to the public internet. SSH is a common target for brute-force attacks and vulnerability exploitation, which can lead to full server compromise if not properly secured.', 
      remediation: 'Restrict access to port 22 (SSH) to trusted IP addresses only, or place it behind a VPN or firewall.',
      breachRisk: 'Critical',
      impact: 9.5,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: '22', cvss: '9.8', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 2, 
      title: 'Insecure SSL Version', 
      severity: 'High', 
      category: 'SSL/TLS', 
      desc: 'The server supports TLS 1.0/1.1 which are deprecated and vulnerable to man-in-the-middle attacks such as BEAST and POODLE.',
      remediation: 'Disable TLS 1.0 and 1.1 on the server and ensure only TLS 1.2 and 1.3 are enabled.',
      breachRisk: 'High',
      impact: 7.5,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: '443', cvss: '7.5', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 3, 
      title: 'Missing WAF', 
      severity: 'Medium', 
      category: 'Firewall', 
      desc: 'No Web Application Firewall (WAF) was detected. WAFs are essential for protecting against common web attacks like SQL injection and Cross-Site Scripting.',
      remediation: 'Deploy a cloud-based or on-premise WAF to inspect and filter incoming web traffic.',
      breachRisk: 'Medium',
      impact: 5.0,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: '80/443', cvss: '5.0', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 4, 
      title: 'Unencrypted HTTP', 
      severity: 'Low', 
      category: 'Encryption', 
      desc: 'The website is accessible via unencrypted HTTP (Port 80). Traffic sent over HTTP can be intercepted and read by attackers.',
      remediation: 'Configure a permanent redirect from HTTP to HTTPS and enable HSTS.',
      breachRisk: 'Low',
      impact: 4.0,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: '80', cvss: '4.3', observation: 'Mar 14, 2026' }
      ]
    }
  ],
  'Application': [
    { 
      id: 5, 
      title: 'Cross-Site Scripting (XSS)', 
      severity: 'High', 
      category: 'Injection', 
      desc: 'A reflected XSS vulnerability exists on the search parameter, allowing attackers to execute arbitrary scripts in a user\'s browser.',
      remediation: 'Implement proper output encoding and input validation for all user-supplied data.',
      breachRisk: 'High',
      impact: 8.0,
      findings: [
        { status: 'Open', target: 'app.officebeacon.com', port: '443', cvss: '8.2', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 6, 
      title: 'Outdated Framework', 
      severity: 'Medium', 
      category: 'Dependencies', 
      desc: 'The application is using an outdated version of React (v17.2) which has known security vulnerabilities that are fixed in later versions.',
      remediation: 'Upgrade the application to use the latest stable version of React and related dependencies.',
      breachRisk: 'Medium',
      impact: 5.5,
      findings: [
        { status: 'Open', target: 'app.officebeacon.com', port: 'N/A', cvss: '6.1', observation: 'Mar 14, 2026' }
      ]
    }
  ],
  'Information Leak': [
    { 
      id: 7, 
      title: 'Source Maps Exposed', 
      severity: 'Medium', 
      category: 'Code Exposure', 
      desc: 'Production source maps are accessible. This can assist attackers in reverse-engineering your frontend application logic.',
      remediation: 'Configure your build process to not deploy .map files to production servers.',
      breachRisk: 'Medium',
      impact: 4.5,
      findings: [
        { status: 'Open', target: 'static.officebeacon.com', port: '443', cvss: '4.8', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 8, 
      title: 'Verbose Error Headers', 
      severity: 'Low', 
      category: 'Headers', 
      desc: 'The server returns descriptive error headers that reveal internal software versions and configuration details.',
      remediation: 'Configure the server to return generic error messages and remove identifying headers like X-Powered-By.',
      breachRisk: 'Low',
      impact: 3.0,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: '443', cvss: '3.2', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 9, 
      title: 'Public Git Folder', 
      severity: 'Critical', 
      category: 'Code Exposure', 
      desc: 'A public .git directory was found in the website root, potentially exposing your entire source code history and internal configurations.',
      remediation: 'Immediately remove the .git folder from the production server and restrict access to dot-files.',
      breachRisk: 'Critical',
      impact: 10.0,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: '443', cvss: '10.0', observation: 'Mar 14, 2026' }
      ]
    }
  ],
  'DNS Health': [
    { 
      id: 10, 
      title: 'Missing DMARC', 
      severity: 'High', 
      category: 'Email Security', 
      desc: 'No DMARC record was found for the domain. DMARC helps prevent email spoofing and phishing by specifying how to handle failed SPF/DKIM checks.',
      remediation: 'Publish a DMARC policy (TXT record) at _dmarc.officebeacon.com.',
      breachRisk: 'High',
      impact: 7.0,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: 'DNS', cvss: '7.1', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 11, 
      title: 'Incomplete SPF', 
      severity: 'Medium', 
      category: 'Email Security', 
      desc: 'The SPF record contains "all" instead of "-all", which means it only provides soft-fail and doesn\'t strictly block unauthorized senders.',
      remediation: 'Update the SPF record to end with "-all" to strictly enforce authorized sending IPs.',
      breachRisk: 'Medium',
      impact: 5.0,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: 'DNS', cvss: '5.2', observation: 'Mar 14, 2026' }
      ]
    },
    { 
      id: 12, 
      title: 'DNSSEC Disabled', 
      severity: 'Low', 
      category: 'DNS Config', 
      desc: 'DNSSEC is not enabled for the domain. DNSSEC adds a layer of security to the DNS process by digitally signing data to verify its origin.',
      remediation: 'Enable DNSSEC at your domain registrar and publish the DS records.',
      breachRisk: 'Low',
      impact: 3.5,
      findings: [
        { status: 'Open', target: 'officebeacon.com', port: 'DNS', cvss: '3.5', observation: 'Mar 14, 2026' }
      ]
    }
  ]
};

export default function SecurityReport() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain') || 'officebeacon.com';
  const [activeFactor, setActiveFactor] = useState('Network Security');
  const [activeIssueCategory, setActiveIssueCategory] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [globalScore, setGlobalScore] = useState(86);
  const [isFixing, setIsFixing] = useState<number | null>(null);
  const [fixedIssues, setFixedIssues] = useState<number[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleFix = (issueId: number) => {
    setIsFixing(issueId);
    // Simulate a re-scan/fix duration
    setTimeout(() => {
      setFixedIssues(prev => [...prev, issueId]);
      setIsFixing(null);
      setGlobalScore(prev => Math.min(100, prev + 1.2));
      // In a real app, we'd also update the factor score here
    }, 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.score-counter', { innerHTML: 0 }, { 
          innerHTML: 86,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: "power2.out",
      });
      gsap.fromTo('.gauge-needle', { rotation: -90, transformOrigin: "bottom center" }, { 
        rotation: -45, duration: 1.5, ease: "back.out(1.7)", delay: 0.5 
      });
      gsap.fromTo('.factor-bar', { scaleX: 0, transformOrigin: "left center" }, { 
        scaleX: 1, duration: 1.2, stagger: 0.1, ease: "power2.out", delay: 0.8 
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Get all issues for the active factor
  const factorIssues = (issuesData[activeFactor] || []).filter(i => !fixedIssues.includes(i.id));
  
  // Get unique sub-categories for the active factor
  const factorSubCategories = ['All', ...Array.from(new Set(factorIssues.map((i: any) => i.category)))];

  // Filter issues by sub-category
  const activeIssues = activeIssueCategory === 'All' 
    ? factorIssues 
    : factorIssues.filter((i: any) => i.category === activeIssueCategory);

  return (
    <div className="min-h-full flex flex-col gap-6 p-8 bg-[#f8fbff]" ref={mainRef}>
      
      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">{domain}</h1>
            <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded border border-slate-800 uppercase tracking-tighter">Verified</span>
          </div>
          <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em]">Tier-1 Security Assessment & Logic Analysis</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 border border-slate-200 text-[10px] font-black text-slate-600 bg-white hover:bg-slate-50 transition-all rounded-lg uppercase tracking-widest shadow-sm">
            Generate Report
          </button>
          <button className="px-5 py-2.5 bg-blue-600 text-white text-[10px] font-black hover:bg-blue-700 transition-all flex items-center space-x-2 rounded-lg uppercase tracking-widest shadow-lg shadow-blue-500/20">
            <Clock className="w-3.5 h-3.5 stroke-[3]" />
            <span>Recalibrate Scan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Score Card */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-slate-50/50 rounded-full -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="text-9xl font-black text-slate-900 score-counter leading-none tracking-tighter">{globalScore.toFixed(0)}</div>
              <div className="absolute top-0 -right-8 bg-blue-600 text-white px-2 py-0.5 text-[10px] font-black rounded border-2 border-white shadow-xl">
                +2.1
              </div>
            </div>
            <p className="text-[9px] font-black text-slate-400 mt-4 tracking-[0.4em] uppercase">Global Security Health Index</p>
          </div>
          
          <div className="flex-1 w-full space-y-10">
            <div className="space-y-5">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Risk Mitigation Velocity</span>
                <span className="text-[10px] font-black text-blue-600 px-2 py-1 bg-blue-50 rounded uppercase tracking-tighter">Target 98%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-sm overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${globalScore}%` }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-full bg-slate-900 rounded-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Surface', value: 'Low', color: 'text-green-500', bg: 'bg-green-50' },
                { label: 'Exposures', value: '4', color: 'text-orange-500', bg: 'bg-orange-50' },
                { label: 'Health', value: '98%', color: 'text-blue-500', bg: 'bg-blue-50' }
              ].map((stat, i) => (
                <div key={i} className={`${stat.bg} p-4 rounded-2xl border border-white/50 text-center`}>
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-widest">{stat.label}</p>
                  <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfoilo/Stats Summary */}
        <div className="xl:col-span-4 bg-slate-900 rounded-[32px] p-8 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 px-2 border-l-2 border-blue-500">Threat Intelligence</h3>
          <div className="space-y-6">
            {[
              { label: 'Direct Threats', value: '0', color: 'bg-green-500' },
              { label: 'Heuristic Alerts', value: '12', color: 'bg-orange-500' },
              { label: 'Dark Web Leaks', value: '3', color: 'bg-red-500' }
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${row.color} shadow-[0_0_10px_rgba(34,197,94,0.5)]`} />
                  <span className="text-xs font-bold text-slate-300">{row.label}</span>
                </div>
                <span className="text-sm font-black">{row.value}</span>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-black rounded-2xl mt-10 transition-all uppercase tracking-widest border border-white/10">
            Intelligence Feed
          </button>
        </div>
      </div>

      {/* Deep Analysis Explorer */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Deep Analysis Explorer</h3>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Real-time Monitoring Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Vertical Factor Sidebar */}
          <div className="lg:col-span-3 bg-slate-50/50 border-r border-slate-50 p-6 space-y-2 overflow-y-auto">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-2">Security Factors</p>
            {securityFactors.map((factor) => (
              <motion.button
                key={factor.id}
                onClick={() => {
                    setActiveFactor(factor.id as any);
                    setActiveIssueCategory('All');
                    setSelectedIssue(null);
                }}
                whileHover={{ x: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                whileTap={{ scale: 0.99 }}
                className={`w-full group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  activeFactor === factor.id 
                    ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-slate-900/10' 
                    : 'bg-white/40 border-slate-100/60 hover:border-slate-200'
                } border mb-2 overflow-hidden`}
              >
                {/* Precise Active Indicator */}
                {activeFactor === factor.id && (
                  <motion.div 
                    layoutId="active-factor-indicator"
                    className="absolute left-0 top-1 bottom-1 w-0.5 bg-blue-500 rounded-full"
                  />
                )}

                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    activeFactor === factor.id ? 'bg-slate-800 text-blue-400 shadow-inner' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                  }`}>
                    {factor.icon}
                  </div>
                  <div className="text-left">
                    <span className={`block text-[11px] font-black tracking-tight transition-colors duration-300 ${
                      activeFactor === factor.id ? 'text-white' : 'text-slate-700 group-hover:text-slate-950'
                    }`}>
                      {factor.id}
                    </span>
                    <span className={`text-[8px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                      activeFactor === factor.id ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      Network Asset
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center space-x-1">
                    <span className={`text-[12px] font-black transition-colors duration-300 ${
                      activeFactor === factor.id ? 'text-blue-300' : 'text-slate-700 group-hover:text-blue-600'
                    }`}>
                      {factor.score}
                    </span>
                    <span className={`text-[8px] font-bold opacity-40 transition-colors duration-300 ${
                      activeFactor === factor.id ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      /100
                    </span>
                  </div>
                  
                  {factor.count > 0 && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-colors duration-300 ${
                        activeFactor === factor.id ? 'bg-blue-500/20 text-blue-400' : 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white'
                      }`}
                    >
                      {factor.count} Vulnerabilities
                    </motion.span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Factor Details & Summary */}
          <div className="lg:col-span-3 p-8 bg-white border-r border-slate-50 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sector Score</p>
                <span className="text-2xl font-black text-slate-900">{securityFactors.find(f => f.id === activeFactor)?.score}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${securityFactors.find(f => f.id === activeFactor)?.score}%` }}
                  className="h-full bg-blue-600"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Logic Summary</h4>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                Ongoing assessment of {activeFactor} vectors shows {factorIssues.length} active vulnerabilities that require immediate attention.
              </p>
            </div>

            <div className="space-y-3">
               <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-900 uppercase">Compliance</p>
                    <p className="text-[9px] text-green-500 font-bold uppercase">Pass</p>
                  </div>
               </div>
               <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Clock size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-900 uppercase">Integrity</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">Verified</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Issues List Area */}
          <div className="lg:col-span-6 p-8 bg-slate-50/20 relative">
            <AnimatePresence mode="wait">
              {!selectedIssue ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <div className="flex items-center justify-between mb-8 px-2">
                    <div className="space-y-1">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Issues</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{domain}</p>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Critical</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">High</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Sub-Category Filters */}
                  <div className="flex space-x-3 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {factorSubCategories.map((cat) => {
                      const countInCat = cat === 'All' 
                        ? factorIssues.length 
                        : factorIssues.filter((i: any) => i.category === cat).length;
                      
                      const isActive = activeIssueCategory === cat;

                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveIssueCategory(cat as string)}
                          className={`flex items-center space-x-2 px-5 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                            isActive
                              ? 'bg-slate-900 text-white border-slate-800 shadow-xl shadow-slate-900/10'
                              : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-[13px] font-black">{cat}</span>
                          <span className={`text-[10px] font-bold ${isActive ? 'text-white/70' : 'text-slate-500'}`}>
                            ({countInCat})
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-4">
                    {activeIssues.length > 0 ? (
                      activeIssues.map((issue) => (
                        <div 
                          key={issue.id} 
                          onClick={() => setSelectedIssue(issue)}
                          className="group bg-white rounded-[24px] border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center space-x-3">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${
                                  issue.severity === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                                  issue.severity === 'High' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                  issue.severity === 'Medium' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                  'bg-blue-50 text-blue-600 border border-blue-100'
                                }`}>
                                  {issue.severity}
                                </span>
                                <h5 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{issue.title}</h5>
                              </div>
                              
                              <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-2xl line-clamp-2">{issue.desc}</p>
                              
                              <div className="flex items-center space-x-8 pt-2">
                                <div className="space-y-1">
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Remediation</p>
                                  <p className="text-[11px] font-bold text-blue-600">{issue.remediation}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleFix(issue.id);
                                }}
                                disabled={isFixing === issue.id}
                                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all inline-flex items-center space-x-2 ${
                                  isFixing === issue.id 
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-sm'
                                }`}
                              >
                                {isFixing === issue.id ? (
                                  <>
                                    <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                    <span>Resolving...</span>
                                  </>
                                ) : (
                                  <>
                                    <ShieldCheck size={12} />
                                    <span>Fix</span>
                                  </>
                                )}
                              </button>
                              <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100">
                          <ShieldCheck size={32} />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-lg font-black text-slate-900 uppercase">Sector Secure</h5>
                          <p className="text-sm text-slate-400 font-medium">No active vulnerabilities detected in this sector.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Detail Header */}
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => setSelectedIssue(null)}
                      className="flex items-center space-x-2 text-slate-400 hover:text-slate-900 transition-colors group mb-2"
                    >
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{activeFactor}</span>
                    </button>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedIssue.title}</h3>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2 group/card overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover/card:scale-110 transition-transform" />
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Threat Level</p>
                      <p className={`text-xl font-black ${
                        selectedIssue.severity === 'Critical' ? 'text-red-500' : 
                        selectedIssue.severity === 'High' ? 'text-orange-500' : 'text-blue-500'
                      }`}>{selectedIssue.severity}</p>
                      <p className="text-[8px] text-slate-600 font-extrabold uppercase tracking-tighter">Expert Calibration</p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2 group/card overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover/card:scale-110 transition-transform" />
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Breach Risk</p>
                      <p className={`text-xl font-black ${
                        selectedIssue.breachRisk === 'Critical' ? 'text-red-500' : 
                        selectedIssue.breachRisk === 'High' ? 'text-orange-500' : 'text-blue-500'
                      }`}>{selectedIssue.breachRisk}</p>
                      <p className="text-[8px] text-slate-600 font-extrabold uppercase tracking-tighter">Vector Likelihood</p>
                    </div>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2 group/card overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover/card:scale-110 transition-transform" />
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Score Delta</p>
                      <p className="text-xl font-black text-white">-{selectedIssue.impact}</p>
                      <p className="text-[8px] text-slate-600 font-extrabold uppercase tracking-tighter">System-Wide Impact</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-3 shadow-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <AlertCircle size={14} className="stroke-[3]" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em]">Vector Description</p>
                    </div>
                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{selectedIssue.desc}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3 shadow-2xl">
                    <div className="flex items-center space-x-2 text-blue-500">
                      <ShieldCheck size={14} className="stroke-[3]" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em]">Remediation Strategy</p>
                    </div>
                    <p className="text-[13px] text-slate-300 font-medium leading-relaxed">{selectedIssue.remediation}</p>
                  </div>

                  {/* Findings Table */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Findings</h4>
                    <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-500">
                            <th className="px-6 py-4 font-black uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest">Target</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest">Port</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest">CVSS</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest">Last Observed</th>
                            <th className="px-6 py-4 font-black uppercase tracking-widest text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          {selectedIssue.findings.map((f: any, i: number) => (
                            <tr key={i} className="group hover:bg-white/5 transition-colors">
                              <td className="px-6 py-5">
                                <span className="px-2 py-0.5 rounded-full border border-orange-500/30 text-orange-500 bg-orange-500/5 font-bold uppercase text-[9px]">
                                  {f.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 font-mono text-slate-400">{f.target}</td>
                              <td className="px-6 py-5 font-bold">{f.port}</td>
                              <td className="px-6 py-5 font-black text-white">{f.cvss}</td>
                              <td className="px-6 py-5 text-slate-500 font-medium uppercase">{f.observation}</td>
                              <td className="px-6 py-5 text-right">
                                <button 
                                  onClick={() => handleFix(selectedIssue.id)}
                                  disabled={isFixing === selectedIssue.id}
                                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all inline-flex items-center space-x-2 ${
                                    isFixing === selectedIssue.id 
                                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                      : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-sm'
                                  }`}
                                >
                                  {isFixing === selectedIssue.id ? (
                                    <>
                                      <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                      <span>Resolving...</span>
                                    </>
                                  ) : (
                                    <>
                                      <ShieldCheck size={12} />
                                      <span>Fix</span>
                                    </>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
}
