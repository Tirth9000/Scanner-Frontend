'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  ShieldCheck,
  AlertCircle,
  Clock,
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

// ─── Real scan data from score2.json + data2.json ────────────────────────────

const DOMAIN_SCORE = 73;

const SUBDOMAINS = [
  { subdomain: 'facilis.officebeacon.com',      score: 75, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'southafrica.officebeacon.com',  score: 75, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'ambassador.officebeacon.com',   score: 77, issues: ['Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'mail.officebeacon.com',         score: 45, issues: ['Missing NS record','Missing TXT record','Missing MX record','HTTP without HTTPS','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','443 open without TLS'] },
  { subdomain: 'book.officebeacon.com',         score: 75, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'events.officebeacon.com',       score: 75, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'go.officebeacon.com',           score: 77, issues: ['Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'webmail.officebeacon.com',      score: 77, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Unexpected open port 143'] },
  { subdomain: 'insurance.officebeacon.com',    score: 77, issues: ['Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'www.officebeacon.com',          score: 75, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options','Risky port exposed 8080'] },
  { subdomain: 'careers.officebeacon.com',      score: 85, issues: ['Missing NS record','Missing TXT record','Missing MX record','Missing CSP header','Missing HSTS header','Missing X-Frame-Options','Missing X-Content-Type-Options'] },
];

// Derived exposure counts by category
const CATEGORIZED = {
  'DNS Health': {
    'Missing NS record':  ['facilis','southafrica','mail','book','events','webmail','www','careers'].map(s => s + '.officebeacon.com'),
    'Missing TXT record': SUBDOMAINS.map(s => s.subdomain),
    'Missing MX record':  SUBDOMAINS.map(s => s.subdomain),
  },
  'Application Security': {
    'Missing CSP header':              SUBDOMAINS.map(s => s.subdomain),
    'Missing HSTS header':             SUBDOMAINS.map(s => s.subdomain),
    'Missing X-Frame-Options':         SUBDOMAINS.map(s => s.subdomain),
    'Missing X-Content-Type-Options':  SUBDOMAINS.map(s => s.subdomain),
    'HTTP without HTTPS':              ['mail.officebeacon.com'],
  },
  'Network Security': {
    'Risky port exposed':    ['facilis','southafrica','ambassador','book','events','go','insurance','www'].map(s => s + '.officebeacon.com'),
    'Unexpected open port':  ['webmail.officebeacon.com'],
  },
  'TLS Security': {
    '443 open without TLS': ['mail.officebeacon.com'],
  },
};

// ─── Security factor cards (left sidebar) ────────────────────────────────────
// Scores derived from actual findings:
//  - Application Security: all 11 subdomains missing 4 headers + 1 HTTP issue → avg penalty ~31 → score ~69
//  - DNS Health: widespread NS/TXT/MX gaps → avg penalty ~4 → score ~96 
//  - Network Security: 8 risky ports + 1 unexpected → score ~77
//  - TLS Security: 1 critical (mail) out of 11 → score ~98 (low spread)
//  - Others: no data in scan, kept as placeholder

const securityFactors = [
  { id: 'Network Security',    count: 9,  score: 77,  icon: <Globe size={14} />,       color: 'slate-600' },
  { id: 'Application Security',count: 11, score: 69,  icon: <Shield size={14} />,      color: 'slate-500' },
  { id: 'DNS Health',          count: 11, score: 96,  icon: <Zap size={14} />,         color: 'slate-600' },
  { id: 'TLS Security',        count: 1,  score: 98,  icon: <Lock size={14} />,        color: 'slate-400' },
  { id: 'Patching',            count: 0,  score: 100, icon: <Activity size={14} />,    color: 'slate-500' },
  { id: 'IP Reputation',       count: 0,  score: 100, icon: <Search size={14} />,      color: 'slate-500' },
  { id: 'Cubit Score',         count: 0,  score: 100, icon: <ShieldCheck size={14} />, color: 'slate-600' },
  { id: 'Hacker Chatter',      count: 0,  score: 100, icon: <MessageSquare size={14} />,color: 'slate-400' },
  { id: 'Information Leak',    count: 0,  score: 100, icon: <Database size={14} />,    color: 'slate-500' },
  { id: 'Social Eng.',         count: 0,  score: 100, icon: <Users size={14} />,       color: 'slate-400' },
];

// ─── Issues per factor (derived directly from score2.json) ───────────────────

const issuesData: Record<string, any[]> = {
  'Network Security': [
    {
      id: 1,
      title: 'Risky Port 8080 Exposed',
      severity: 'High',
      category: 'Open Ports',
      desc: 'Port 8080 is open on 8 subdomains. This is a well-known alternative HTTP port frequently targeted by scanners and automated attack tools. Exposing it unnecessarily increases the attack surface.',
      remediation: 'Close port 8080 on all affected hosts or restrict access via firewall rules to trusted IPs only.',
      breachRisk: 'High',
      impact: 10,
      findings: [
        { status: 'Open', target: 'facilis.officebeacon.com',     port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'southafrica.officebeacon.com', port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'ambassador.officebeacon.com',  port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'book.officebeacon.com',        port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'events.officebeacon.com',      port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'go.officebeacon.com',          port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'insurance.officebeacon.com',   port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
        { status: 'Open', target: 'www.officebeacon.com',         port: '8080', cvss: '7.5', observation: 'Mar 15, 2026' },
      ]
    },
    {
      id: 2,
      title: 'Unexpected Port 143 (IMAP) Open',
      severity: 'Medium',
      category: 'Open Ports',
      desc: 'Port 143 (unencrypted IMAP) is open on webmail.officebeacon.com. This port was not expected and transmits email credentials in plain text, making it susceptible to eavesdropping.',
      remediation: 'Disable plain IMAP (port 143) and only allow IMAPS (port 993). Enforce TLS for all mail traffic.',
      breachRisk: 'Medium',
      impact: 8,
      findings: [
        { status: 'Open', target: 'webmail.officebeacon.com', port: '143', cvss: '6.5', observation: 'Mar 15, 2026' },
      ]
    },
  ],

  'Application Security': [
    {
      id: 3,
      title: 'HTTP Served Without HTTPS',
      severity: 'Critical',
      category: 'Encryption',
      desc: 'mail.officebeacon.com is being served over unencrypted HTTP with no HTTPS redirect. All traffic — including credentials and session tokens — is transmitted in plain text.',
      remediation: 'Configure a permanent 301 redirect from HTTP to HTTPS and enable HSTS on mail.officebeacon.com.',
      breachRisk: 'Critical',
      impact: 20,
      findings: [
        { status: 'Open', target: 'mail.officebeacon.com', port: '80', cvss: '9.1', observation: 'Mar 15, 2026' },
      ]
    },
    {
      id: 4,
      title: 'Missing Content Security Policy (CSP)',
      severity: 'High',
      category: 'Security Headers',
      desc: 'The Content-Security-Policy header is absent on all 11 scanned subdomains. Without CSP, browsers cannot restrict which resources may be loaded, enabling XSS and data injection attacks.',
      remediation: 'Add a Content-Security-Policy header via your web server or CDN (e.g. Cloudflare) configuration. A restrictive policy like default-src \'self\' should be the baseline.',
      breachRisk: 'High',
      impact: 3,
      findings: SUBDOMAINS.map((s, i) => ({ status: 'Open', target: s.subdomain, port: '443', cvss: '6.1', observation: 'Mar 15, 2026' }))
    },
    {
      id: 5,
      title: 'Missing HSTS Header',
      severity: 'High',
      category: 'Security Headers',
      desc: 'Strict-Transport-Security is missing on all 11 subdomains despite TLS being present. Without HSTS, browsers may allow downgrade attacks, stripping HTTPS to HTTP.',
      remediation: 'Set Strict-Transport-Security: max-age=31536000; includeSubDomains on your server or Cloudflare settings.',
      breachRisk: 'High',
      impact: 4,
      findings: SUBDOMAINS.map(s => ({ status: 'Open', target: s.subdomain, port: '443', cvss: '6.5', observation: 'Mar 15, 2026' }))
    },
    {
      id: 6,
      title: 'Missing X-Frame-Options',
      severity: 'Medium',
      category: 'Security Headers',
      desc: 'The X-Frame-Options header is absent on all subdomains, leaving them vulnerable to clickjacking attacks where a malicious page embeds your site in an invisible iframe.',
      remediation: 'Add X-Frame-Options: SAMEORIGIN (or DENY) to all HTTP responses across all subdomains.',
      breachRisk: 'Medium',
      impact: 2,
      findings: SUBDOMAINS.map(s => ({ status: 'Open', target: s.subdomain, port: '443', cvss: '5.4', observation: 'Mar 15, 2026' }))
    },
    {
      id: 7,
      title: 'Missing X-Content-Type-Options',
      severity: 'Medium',
      category: 'Security Headers',
      desc: 'X-Content-Type-Options: nosniff is missing on all 11 subdomains. Without it, browsers may perform MIME-type sniffing, which can allow certain injection attacks via script execution.',
      remediation: 'Add X-Content-Type-Options: nosniff globally via reverse proxy, CDN rules, or framework middleware.',
      breachRisk: 'Medium',
      impact: 2,
      findings: SUBDOMAINS.map(s => ({ status: 'Open', target: s.subdomain, port: '443', cvss: '4.3', observation: 'Mar 15, 2026' }))
    },
  ],

  'DNS Health': [
    {
      id: 8,
      title: 'Missing NS Records',
      severity: 'High',
      category: 'DNS Config',
      desc: 'NS (Name Server) records are missing on 8 out of 11 subdomains. This can cause DNS resolution failures and indicates subdomains may not have proper authoritative delegation, which can allow subdomain takeover.',
      remediation: 'Review DNS zone configuration and ensure each subdomain has valid NS records pointing to authoritative servers. Verify with your registrar (ns09.domaincontrol.com found on some).',
      breachRisk: 'High',
      impact: 2,
      findings: ['facilis','southafrica','mail','book','events','webmail','www','careers'].map(s => ({
        status: 'Open', target: s + '.officebeacon.com', port: 'DNS', cvss: '6.8', observation: 'Mar 15, 2026'
      }))
    },
    {
      id: 9,
      title: 'Missing TXT Records (SPF/DMARC)',
      severity: 'High',
      category: 'Email Security',
      desc: 'TXT records are absent on all 11 subdomains. This means no SPF or DMARC policies are in place, leaving the domain open to email spoofing and phishing attacks using your brand.',
      remediation: 'Publish SPF TXT record: v=spf1 include:_spf.hubspot.com -all. Add DMARC policy at _dmarc.officebeacon.com: v=DMARC1; p=quarantine; rua=mailto:dmarc@officebeacon.com.',
      breachRisk: 'High',
      impact: 1,
      findings: SUBDOMAINS.map(s => ({ status: 'Open', target: s.subdomain, port: 'DNS', cvss: '7.1', observation: 'Mar 15, 2026' }))
    },
    {
      id: 10,
      title: 'Missing MX Records',
      severity: 'Medium',
      category: 'Email Security',
      desc: 'MX records are absent on all 11 subdomains. While mail delivery to subdomains may not be intended, missing MX records can be a sign of incomplete DNS configuration and hinders email authentication enforcement.',
      remediation: 'If mail is not intended for these subdomains, publish a null MX record (v=spf1 -all) to explicitly indicate this and prevent abuse.',
      breachRisk: 'Medium',
      impact: 1,
      findings: SUBDOMAINS.map(s => ({ status: 'Open', target: s.subdomain, port: 'DNS', cvss: '5.0', observation: 'Mar 15, 2026' }))
    },
  ],

  'TLS Security': [
    {
      id: 11,
      title: 'Port 443 Open Without Active TLS',
      severity: 'Critical',
      category: 'TLS Config',
      desc: 'mail.officebeacon.com has port 443 open but TLS is not active. Combined with HTTP being served without HTTPS, all mail-related traffic is fully exposed to interception. This is the most critical finding in this scan.',
      remediation: 'Immediately provision a TLS certificate for mail.officebeacon.com (Let\'s Encrypt is free) and configure the mail server to terminate TLS on port 443. Also force HTTPS redirect on port 80.',
      breachRisk: 'Critical',
      impact: 20,
      findings: [
        { status: 'Open', target: 'mail.officebeacon.com', port: '443', cvss: '9.8', observation: 'Mar 15, 2026' },
      ]
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function SecurityReport() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain') || 'officebeacon.com';
  const [activeFactor, setActiveFactor] = useState('Network Security');
  const [activeIssueCategory, setActiveIssueCategory] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [globalScore, setGlobalScore] = useState(DOMAIN_SCORE);
  const [isFixing, setIsFixing] = useState<number | null>(null);
  const [fixedIssues, setFixedIssues] = useState<number[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);

  // Counts for the threat intelligence panel
  const totalVulns = securityFactors.reduce((sum, f) => sum + f.count, 0);
  const criticalCount = Object.values(issuesData).flat().filter(i => i.severity === 'Critical').length;
  const highCount = Object.values(issuesData).flat().filter(i => i.severity === 'High').length;

  const handleFix = (issueId: number) => {
    setIsFixing(issueId);
    setTimeout(() => {
      setFixedIssues(prev => [...prev, issueId]);
      setIsFixing(null);
      setGlobalScore(prev => Math.min(100, prev + 2));
    }, 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.score-counter',
        { innerHTML: 0 },
        { innerHTML: DOMAIN_SCORE, duration: 2, snap: { innerHTML: 1 }, ease: 'power2.out' }
      );
      gsap.fromTo('.factor-bar',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 1.2, stagger: 0.1, ease: 'power2.out', delay: 0.8 }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const factorIssues = (issuesData[activeFactor] || []).filter(i => !fixedIssues.includes(i.id));
  const factorSubCategories = ['All', ...Array.from(new Set(factorIssues.map((i: any) => i.category)))];
  const activeIssues = activeIssueCategory === 'All'
    ? factorIssues
    : factorIssues.filter((i: any) => i.category === activeIssueCategory);

  const activeFactorData = securityFactors.find(f => f.id === activeFactor);

  // Score label
  const scoreLabel = globalScore >= 90 ? 'Excellent' : globalScore >= 75 ? 'Fair' : globalScore >= 60 ? 'Needs Work' : 'Critical';
  const scoreLabelColor = globalScore >= 90 ? 'text-green-500' : globalScore >= 75 ? 'text-orange-500' : 'text-red-500';

  return (
    <div className="min-h-full flex flex-col gap-6 p-8 bg-[#f8fbff]" ref={mainRef}>

      {/* Header */}
      <div className="flex justify-between items-end mb-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">{domain}</h1>
            <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-black rounded border border-slate-800 uppercase tracking-tighter">Verified</span>
          </div>
          <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em]">
            Tier-1 Security Assessment — {SUBDOMAINS.length} Subdomains Scanned · Last run: Mar 15, 2026
          </p>
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
        <div className="xl:col-span-12 bg-white rounded-2xl p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-slate-50/50 rounded-full -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-1000" />

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="text-9xl font-black text-slate-900 score-counter leading-none tracking-tighter">{globalScore}</div>
              <div className={`absolute top-0 -right-16 px-2 py-0.5 text-[10px] font-black rounded border-2 border-white shadow-xl ${
                globalScore >= 75 ? 'bg-orange-500 text-white' : 'bg-red-600 text-white'
              }`}>
                {scoreLabel}
              </div>
            </div>
            <p className="text-[9px] font-black text-slate-400 mt-4 tracking-[0.4em] uppercase">Global Security Health Index</p>
          </div>

          <div className="flex-1 w-full space-y-10">
            <div className="space-y-5">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Security Score Progress</span>
                <span className="text-[10px] font-black text-blue-600 px-2 py-1 bg-blue-50 rounded uppercase tracking-tighter">Target 98%</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-sm overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${globalScore}%` }}
                  transition={{ duration: 1.5, ease: 'circOut' }}
                  className="h-full bg-slate-900 rounded-sm"
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Deep Analysis Explorer */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Deep Analysis Explorer</h3>
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Scan completed Mar 15, 2026 · 11 subdomains</span>
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
                  setActiveFactor(factor.id);
                  setActiveIssueCategory('All');
                  setSelectedIssue(null);
                }}
                animate={{
                  backgroundColor: activeFactor === factor.id ? '#0f172a' : 'rgba(255, 255, 255, 1)',
                  borderColor: activeFactor === factor.id ? '#1e293b' : '#f1f5f9',
                  x: activeFactor === factor.id ? 4 : 0
                }}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative flex items-center justify-between p-4 rounded-xl border mb-2 overflow-hidden shadow-sm"
              >
                <AnimatePresence>
                  {activeFactor === factor.id && (
                    <motion.div
                      layoutId="active-indicator"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 z-10"
                    />
                  )}
                </AnimatePresence>
                <div className="flex items-center space-x-3 relative z-20">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    activeFactor === factor.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {factor.icon}
                  </div>
                  <div className="text-left">
                    <motion.span
                      animate={{ color: activeFactor === factor.id ? '#ffffff' : '#0f172a' }}
                      className="block text-[11px] font-black tracking-tight"
                    >
                      {factor.id}
                    </motion.span>
                    <motion.span
                      animate={{ color: activeFactor === factor.id ? 'rgba(96,165,250,0.8)' : '#94a3b8' }}
                      className="text-[8.5px] font-black uppercase tracking-[0.1em]"
                    >
                      {factor.count > 0 ? `${factor.count} issue${factor.count > 1 ? 's' : ''} found` : 'No issues'}
                    </motion.span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 relative z-20">
                  <div className="flex items-center space-x-1">
                    <motion.span
                      animate={{ color: activeFactor === factor.id ? '#93c5fd' : '#0f172a' }}
                      className="text-[12px] font-black"
                    >
                      {factor.score}
                    </motion.span>
                    <span className={`text-[8px] font-bold ${activeFactor === factor.id ? 'text-slate-500' : 'text-slate-400'}`}>/100</span>
                  </div>
                  {factor.count > 0 && (
                    <div className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                      activeFactor === factor.id ? 'bg-blue-500/20 text-blue-400' : 'bg-red-50 text-red-500'
                    }`}>
                      {factor.count} {factor.count === 1 ? 'Vulnerability' : 'Vulnerabilities'}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Issues List */}
          <div className="lg:col-span-9 p-8 bg-slate-50/20 relative">
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
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Issues · {activeFactor}</h4>
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

                  {/* Sub-category filters */}
                  <div className="flex space-x-3 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {factorSubCategories.map((cat) => {
                      const countInCat = cat === 'All' ? factorIssues.length : factorIssues.filter((i: any) => i.category === cat).length;
                      const isActive = activeIssueCategory === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveIssueCategory(cat)}
                          className={`flex items-center space-x-2 px-5 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap ${
                            isActive
                              ? 'bg-slate-900 text-white border-slate-800 shadow-xl shadow-slate-900/10'
                              : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <span className="text-[13px] font-black">{cat}</span>
                          <span className={`text-[10px] font-bold ${isActive ? 'text-white/70' : 'text-slate-500'}`}>({countInCat})</span>
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
                                  issue.severity === 'High'     ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                  issue.severity === 'Medium'   ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                                                                   'bg-blue-50 text-blue-600 border border-blue-100'
                                }`}>
                                  {issue.severity}
                                </span>
                                <h5 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors uppercase">{issue.title}</h5>
                              </div>
                              <p className="text-[13px] text-slate-500 font-medium leading-relaxed max-w-2xl line-clamp-2">{issue.desc}</p>
                              <div className="flex items-center space-x-2 pt-1">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Affected:</span>
                                <span className="text-[10px] font-bold text-blue-600">{issue.findings.length} {issue.findings.length === 1 ? 'host' : 'hosts'}</span>
                                <span className="text-[9px] text-slate-300">·</span>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Score impact:</span>
                                <span className="text-[10px] font-bold text-red-500">−{issue.impact} pts</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 ml-4">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleFix(issue.id); }}
                                disabled={isFixing === issue.id}
                                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all inline-flex items-center space-x-2 ${
                                  isFixing === issue.id
                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 shadow-sm'
                                }`}
                              >
                                {isFixing === issue.id ? (
                                  <><div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /><span>Resolving...</span></>
                                ) : (
                                  <><ShieldCheck size={12} /><span>Fix</span></>
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
                    {[
                      { label: 'Threat Level',  value: selectedIssue.severity,   sub: 'Expert Calibration' },
                      { label: 'Breach Risk',   value: selectedIssue.breachRisk, sub: 'Vector Likelihood' },
                      { label: 'Score Delta',   value: `-${selectedIssue.impact}`, sub: 'Per-Subdomain Impact' },
                    ].map((card, i) => (
                      <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-2 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12" />
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{card.label}</p>
                        <p className={`text-xl font-black ${
                          card.value === 'Critical' || card.value.startsWith('-2') ? 'text-red-500' :
                          card.value === 'High'     || card.value.startsWith('-1') ? 'text-orange-500' :
                          card.value === 'Medium'   ? 'text-yellow-400' : 'text-white'
                        }`}>{card.value}</p>
                        <p className="text-[8px] text-slate-600 font-extrabold uppercase tracking-tighter">{card.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-3 shadow-sm">
                    <div className="flex items-center space-x-2 text-slate-400">
                      <AlertCircle size={14} className="stroke-[3]" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em]">Vector Description</p>
                    </div>
                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{selectedIssue.desc}</p>
                  </div>

                  {/* Remediation */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3 shadow-2xl">
                    <div className="flex items-center space-x-2 text-blue-500">
                      <ShieldCheck size={14} className="stroke-[3]" />
                      <p className="text-[9px] font-black uppercase tracking-[0.2em]">Remediation Strategy</p>
                    </div>
                    <p className="text-[13px] text-slate-300 font-medium leading-relaxed">{selectedIssue.remediation}</p>
                  </div>

                  {/* Findings Table */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                      Findings ({selectedIssue.findings.length} hosts)
                    </h4>
                    <div className="bg-slate-900 rounded-[32px] overflow-hidden border border-slate-800 max-h-72 overflow-y-auto">
                      <table className="w-full text-left text-[11px]">
                        <thead className="sticky top-0 bg-slate-900">
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
                            <tr key={i} className="group hover:bg-white/5 transition-colors border-b border-slate-800/50 last:border-0">
                              <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded-full border border-orange-500/30 text-orange-500 bg-orange-500/5 font-bold uppercase text-[9px]">
                                  {f.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-mono text-slate-400 text-[10px]">{f.target}</td>
                              <td className="px-6 py-4 font-bold">{f.port}</td>
                              <td className="px-6 py-4 font-black text-white">{f.cvss}</td>
                              <td className="px-6 py-4 text-slate-500 font-medium uppercase text-[10px]">{f.observation}</td>
                              <td className="px-6 py-4 text-right">
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
                                    <><div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /><span>Resolving...</span></>
                                  ) : (
                                    <><ShieldCheck size={12} /><span>Fix</span></>
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
