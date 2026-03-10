'use client'

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Search,
  Bell,
  Settings,
  HelpCircle,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  UploadCloud,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function SecurityDashboard() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Counter for main score
      gsap.fromTo('.score-counter',
        { innerHTML: 0 },
        { 
          innerHTML: 86,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: "power2.out",
        }
      );

      // Gauge animation (needle rotation)
      gsap.fromTo('.gauge-needle',
        { rotation: -90, transformOrigin: "bottom center" },
        { rotation: -45, duration: 1.5, ease: "back.out(1.7)", delay: 0.5 }
      );

      // Score factors bars
      gsap.fromTo('.factor-bar',
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, stagger: 0.1, ease: "power2.out", delay: 0.8 }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfc] text-slate-800 font-sans" ref={mainRef}>
      
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#3b2a8d] rounded flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">SecurityScorecard</span>
          </div>
          <button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors shadow-sm">
            Upgrade today
          </button>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm font-medium border-r pr-2 border-gray-300">All <ChevronDown className="inline w-4 h-4" /></span>
            </div>
            <div className="absolute inset-y-0 left-20 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="w-full pl-32 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b2a8d] focus:border-transparent transition-all"
              placeholder="Search companies, scorecards, portfolios and tags..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 text-gray-500">
          <button className="hover:text-gray-700 transition-colors"><Settings className="w-5 h-5" /></button>
          <button className="hover:text-gray-700 transition-colors"><Bell className="w-5 h-5" /></button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm ring-2 ring-gray-100 cursor-pointer">
            RJ
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <nav className="flex items-center space-x-1 px-6 py-2 bg-white border-b border-gray-200 text-sm font-medium text-gray-600 overflow-x-auto">
        <a href="#" className="px-3 py-2 hover:text-[#3b2a8d] transition-colors flex items-center">Home <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></a>
        <a href="#" className="px-3 py-2 text-[#3b2a8d] border-b-2 border-[#3b2a8d] flex items-center">My Organization <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></a>
        <a href="#" className="px-3 py-2 hover:text-[#3b2a8d] transition-colors flex items-center">Companies <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></a>
        <a href="#" className="px-3 py-2 hover:text-[#3b2a8d] transition-colors flex items-center">Communication <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></a>
        <a href="#" className="px-3 py-2 hover:text-[#3b2a8d] transition-colors flex items-center">Automation <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></a>
        <a href="#" className="px-3 py-2 hover:text-[#3b2a8d] transition-colors flex items-center">Threat Intelligence <ChevronDown className="w-4 h-4 ml-1 opacity-50" /></a>
      </nav>

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-6">
        
        {/* Company Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between"
        >
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center border-2 border-orange-200 relative">
                <span className="text-orange-500 font-bold text-2xl">B</span>
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold score-counter">0</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded border border-gray-200 flex items-center"><ArrowUpRight className="w-3 h-3 text-red-500 mr-1"/> 8</span>
              </div>
            </div>

            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center text-sm text-brand font-semibold mb-1 hover:underline cursor-pointer">
                 Create Action Plan <HelpCircle className="w-3.5 h-3.5 ml-1 text-gray-400 inline"/>
              </div>
              <p className="text-xs text-brand hover:underline cursor-pointer">or Score Planner</p>
            </div>

            <div className="h-12 w-px bg-gray-200 mx-2"></div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Officebeacon</h1>
                <div className="p-1 bg-blue-50 rounded-full cursor-help" title="Verified Domain">
                   <ShieldCheck className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                <a href="#" className="hover:text-blue-600 hover:underline transition-colors">officebeacon.com</a>
                <span>•</span>
                <span>Information services</span>
                <span>•</span>
                <span>7 followers</span>
              </div>
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <FileText className="w-3.5 h-3.5 mr-1" /> No artifacts shared
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
             <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                Add Tag
             </button>
             <button className="flex items-center px-4 py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-md transition-colors">
                <AlertCircle className="w-4 h-4 mr-1.5" /> Recommended Rules
             </button>
             <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm">
                Send Request
             </button>
             <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm flex items-center">
                Actions <MoreHorizontal className="w-4 h-4 ml-1 text-gray-500" />
             </button>
          </div>
        </motion.div>

        {/* Floating Action Buttons */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden xl:flex">
           <button className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors" title="Accessibility Focus">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
           </button>
        </div>
        <div className="fixed left-6 bottom-20 flex flex-col gap-4 z-40 hidden xl:flex">
           <button className="w-10 h-10 bg-blue-600 text-white rounded flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors" title="Quick Support">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
           </button>
        </div>
        <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-40">
           <button className="w-12 h-12 bg-[#5f42d6] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4a31b6] transition-transform hover:scale-105" title="Chat Assistance">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
           </button>
        </div>

        <div className="flex gap-8 relative">
          {/* Left Sidebar Menu */}
          <aside className="w-56 flex-shrink-0 hidden md:block border-r border-gray-100 pr-4">
             <nav className="space-y-1">
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-900 bg-gray-100 rounded-md">
                 Overview
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Score Factors
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 History
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 <span>Issues</span>
                 <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs">11</span>
               </a>
               <div className="my-2 border-t border-gray-100"></div>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Compliance
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Incidents
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Digital Footprint
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Vendor Detection
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Hierarchy
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Evidence Locker
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Company Profile
               </a>
               <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-md transition-colors">
                 Risk Quantification
               </a>
             </nav>
          </aside>

          {/* Main Dashboard Content Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-6 pb-20">
            {/* Breadcrumb & Title */}
            <div>
              <div className="flex items-center text-xs text-gray-500 mb-2 font-medium">
                <a href="#" className="hover:underline">Home</a>
                <ChevronRight className="w-3 h-3 mx-1" />
                <a href="#" className="hover:underline">Officebeacon Scorecard</a>
                <ChevronRight className="w-3 h-3 mx-1" />
                <span className="text-gray-400">Company Overview</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Company Overview</h2>
            </div>
            
            {/* Top Tag Placeholder (as seen in image) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-center min-h-[100px] border-dashed">
               <div className="flex items-center justify-between">
                 <div className="flex items-center">
                   <div className="p-1.5 bg-gray-100 rounded mr-3">
                     <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                   </div>
                   <span className="text-sm font-semibold text-gray-700">Tags</span>
                 </div>
                 <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
               </div>
               <div className="flex mt-2 ml-10">
                 <button className="flex items-center text-blue-600 text-sm font-medium hover:underline">
                   <Plus className="w-4 h-4 mr-1" /> Add Tag
                 </button>
               </div>
            </div>

            {/* Overall Score Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Side: Score Widget */}
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 mb-6">
                    Overall Score
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-end">
                       <span className="text-orange-500 font-bold text-5xl score-counter">0</span>
                       <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded border border-gray-200 ml-3 flex items-center mb-1"><ArrowUpRight className="w-3 h-3 text-red-500 mr-1"/> 8</span>
                       <HelpCircle className="w-4 h-4 text-gray-400 ml-2 mb-2 cursor-help" />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex-1 max-w-sm flex flex-col justify-center relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-orange-500 font-bold text-sm bg-orange-100 px-2 py-0.5 rounded">B</span>
                          <span className="font-bold text-gray-800">86</span>
                        </div>
                        <div className="h-0.5 bg-gray-300 w-8 mx-2 relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-gray-400 rotate-45"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                           <ShieldCheck className="w-4 h-4 text-green-500" />
                           <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-1.5 rounded">A</span>
                           <span className="font-bold text-gray-800">100</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Need to improve a score? Create Action Plan.</p>
                      <a href="#" className="text-sm text-blue-600 font-medium hover:underline shrink-0">Customize your score improvement plan.</a>
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition-colors shadow-sm">
                        Create Action Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: Score Status info */}
                <div className="w-full xl:w-72 flex flex-col gap-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-500">Score stability</span>
                      <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </div>
                    <div className="flex items-center text-sm font-bold text-slate-800">
                      <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                      Unstable
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                     <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-500">Breach history</span>
                      <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </div>
                    <div className="flex items-center text-sm font-bold text-slate-800">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      No recent breaches
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-500">Verified Assessments</span>
                      <HelpCircle className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </div>
                    <div className="flex items-center text-sm font-bold text-slate-800">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      Not enabled
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Placeholder Area */}
              <div className="mt-10 border-t border-gray-100 pt-6">
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-600 font-medium">Score change <span className="text-gray-400 font-normal">Past 6 months</span></span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5"><div className="w-2 h-2 rounded-full bg-orange-400"></div><span className="text-xs text-gray-500">This organization</span></div>
                    <div className="flex items-center space-x-1.5"><div className="w-2 h-2 rounded-full bg-slate-800"></div><span className="text-xs text-gray-500">Industry average</span></div>
                    <a href="#" className="text-blue-600 font-medium hover:underline text-xs ml-4">See full history</a>
                  </div>
                </div>
                {/* Mock SVG Line Chart */}
                <div className="relative h-40 w-full overflow-hidden mt-6">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-100 w-full h-0"></div>
                    <div className="border-b border-gray-200 w-full h-0"></div>
                  </div>
                  {/* Lines */}
                  <svg className="w-full h-full absolute inset-0 preserve-3d" preserveAspectRatio="none" viewBox="0 0 1000 100">
                     <path d="M0 60 Q 250 60, 500 55 T 1000 65" fill="none" stroke="#f1922c" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
                     <path d="M0 20 L 250 20 L 260 25 L 300 25 L 500 25 L 700 20 L 800 20 L 850 30 L 950 30 L 1000 35" fill="none" stroke="#1fae62" strokeWidth="2.5" />
                     <circle cx="250" cy="20" r="4" fill="#1fae62" />
                     <circle cx="260" cy="25" r="4" fill="#1fae62" />
                     <circle cx="700" cy="20" r="4" fill="#1fae62" />
                     <circle cx="800" cy="20" r="4" fill="#1fae62" />
                  </svg>
                  <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-200 font-medium px-4">
                     <span>Oct 5</span><span>Oct 19</span><span>Oct 27</span><span>Dec 6</span><span>Jan 18</span><span>Feb 8</span><span>Feb 17</span><span>Mar 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breach Susceptibility & Rating */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center">
                    Very Low Breach Susceptibility Indicator 
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Last Updated: 05/06/2026</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                    Learn more
                  </button>
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                    View Breach Incidents
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center bg-gray-50 border border-gray-100 rounded-xl p-6 relative overflow-hidden">
                 <div className="relative w-48 h-24 shrink-0 flex justify-center overflow-hidden">
                    {/* Gauge Chart SVG */}
                    <svg viewBox="0 0 200 100" className="w-full h-full absolute bottom-0">
                      <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="30" strokeLinecap="round" />
                      <path d="M 20 100 A 80 80 0 0 1 100 20" fill="none" stroke="#1fae62" strokeWidth="30" strokeLinecap="round" />
                    </svg>
                    <div className="absolute bottom-[-16px] left-[50%] -translate-x-[50%] w-32 h-32 gauge-needle">
                       <div className="w-1.5 h-16 bg-slate-800 absolute top-0 left-[50%] -translate-x-[50%] rounded-full shadow-sm"></div>
                       <div className="w-6 h-6 bg-slate-800 rounded-full border-4 border-white absolute top-14 left-[50%] -translate-x-[50%] shadow-md"></div>
                    </div>
                 </div>
                 <div className="flex-1 md:ml-12 mt-6 md:mt-0">
                   <h4 className="font-semibold text-sm text-gray-700 mb-2">Quantifying this company's risk</h4>
                   <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                     The Breach Susceptibility Indicator looks at a company's security posture along with the size of its digital footprint. It maximizes breach prediction because it is trained using a hyper-optimized, non-linear model with carefully curated training data.
                   </p>
                 </div>
                 <div className="absolute bottom-4 left-16 text-[10px] font-bold text-gray-400">less</div>
                 <div className="absolute bottom-4 left-52 text-[10px] font-bold text-gray-400">more</div>
                 <div className="absolute bottom-1 left-32 text-xs font-bold text-slate-800">Very Low</div>
              </div>
            </div>

            {/* Enhance Scorecard Banner */}
            <div className="bg-[#462d98] rounded-xl shadow-md p-6 flex flex-col md:flex-row text-white overflow-hidden relative">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#36217c] to-transparent pointer-events-none"></div>
              <div className="flex-1 pr-6 pb-6 md:pb-0 relative z-10 border-b md:border-b-0 md:border-r border-[#5740b0]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-sm flex items-center">Enhance your Scorecard <HelpCircle className="w-3.5 h-3.5 ml-1.5 opacity-70" /></h3>
                </div>
                
                <div className="mb-6 w-full max-w-sm">
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Weak</span>
                    <span>40% <span className="text-xs font-normal opacity-80 pl-1 block text-right">Complete</span></span>
                  </div>
                  <div className="flex space-x-1 w-full">
                     <div className="h-1.5 flex-1 bg-white rounded-l-full factor-bar"></div>
                     <div className="h-1.5 flex-1 bg-white factor-bar"></div>
                     <div className="h-1.5 flex-1 bg-white opacity-20 factor-bar"></div>
                     <div className="h-1.5 flex-1 bg-white opacity-20 factor-bar"></div>
                     <div className="h-1.5 flex-1 bg-white opacity-20 rounded-r-full factor-bar"></div>
                  </div>
                </div>
                
                <p className="text-[13px] opacity-90 max-w-md leading-relaxed">
                  Showcase your organization's critical security information in a meaningful way to facilitate proactive communication with your partners.
                </p>
              </div>

              <div className="flex-1 md:pl-8 pt-6 md:pt-0 relative z-10">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider opacity-70 mb-4">
                  <span>Suggested actions</span>
                  <span>&lt; 1/5 &gt;</span>
                </div>
                <div className="bg-white rounded-lg p-5 text-slate-800 shadow-sm flex items-start cursor-pointer hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center shrink-0 mr-4 border border-blue-100">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Upload at least one evidence document</h4>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">Show evidence of your framework compliance and good security practices.</p>
                    <a href="#" className="text-xs text-blue-600 font-semibold hover:underline bg-blue-50/50 inline-block px-2 py-1 rounded">Go to your Evidence Locker →</a>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mt-2">Security evidence</h3>

            {/* Evidence Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Documents */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-[320px]">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-sm text-gray-800 flex items-center">Documents <HelpCircle className="w-3.5 h-3.5 ml-1 text-gray-400 cursor-help" /></h4>
                      <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center"><Plus className="w-3 h-3 mr-1" /> Upload documents</button>
                    </div>
                    
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex items-start mb-4">
                       <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <UploadCloud className="w-3 h-3" />
                       </div>
                       <div>
                         <p className="font-bold text-xs text-gray-800 mb-1">Upload your SOC2 Report</p>
                         <p className="text-xs text-gray-500 mb-2">Build transparency and customer trust by promptly completing this critical questionnaire.</p>
                         <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">Upload this document →</a>
                       </div>
                    </div>

                    <div className="px-1 relative">
                       <div className="absolute -top-3 right-0 w-2 h-2 text-gray-300">▲</div>
                       <p className="text-xs font-semibold text-gray-700 mb-1">You have not uploaded any documents yet.</p>
                       <p className="text-xs text-gray-500 leading-relaxed">Once you upload evidence of your compliance and good security practices, you can control who can see or access it. This saves you time answering redundant documentation requests.</p>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer border-t border-gray-100 pt-4 mt-4 relative">
                     See all documents →
                     <div className="absolute bottom-0 right-0 w-2 h-2 text-gray-300">▼</div>
                  </div>
               </div>

               {/* Questionnaires */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between h-[320px]">
                  <div>
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-sm text-gray-800 flex items-center">Questionnaires <HelpCircle className="w-3.5 h-3.5 ml-1 text-gray-400 cursor-help" /></h4>
                      <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center"><Plus className="w-3 h-3 mr-1" /> Go to questionnaires</button>
                    </div>
                    
                    <div className="px-1 relative">
                       <div className="absolute -top-3 right-0 w-2 h-2 text-gray-300">▲</div>
                       <p className="text-xs font-semibold text-gray-700 mb-1">You have not completed any questionnaires yet.</p>
                       <p className="text-xs text-gray-500 leading-relaxed">Your completed questionnaires appear here, so customers and prospects can verify that you meet their security requirements. This saves you time answering redundant questionnaires.</p>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer border-t border-gray-100 pt-4 mt-4 relative">
                     See all questionnaires →
                     <div className="absolute bottom-0 right-0 w-2 h-2 text-gray-300">▼</div>
                  </div>
               </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mt-2">Score details</h3>

            {/* Score Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
               
               {/* Highest-risk score factors */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                  <h4 className="font-bold text-sm text-gray-800 flex items-center mb-5">Highest-risk score factors <HelpCircle className="w-3.5 h-3.5 ml-1 text-gray-400 cursor-help" /></h4>
                  
                  <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                     {/* Factor */}
                     <div>
                       <p className="text-xs font-semibold text-gray-600 mb-1">Network Security</p>
                       <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
                         <span>81</span> <span className="text-orange-400">B</span>
                       </div>
                       <div className="w-full bg-gray-100 h-1 mb-2 rounded-full overflow-hidden">
                         <div className="bg-orange-400 h-1 rounded-full factor-bar w-[81%]"></div>
                       </div>
                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded">— 0</span>
                     </div>
                     {/* Factor */}
                     <div>
                       <p className="text-xs font-semibold text-gray-600 mb-1">Application Security</p>
                       <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
                         <span>87</span> <span className="text-orange-400">B</span>
                       </div>
                       <div className="w-full bg-gray-100 h-1 mb-2 rounded-full overflow-hidden">
                         <div className="bg-orange-400 h-1 rounded-full factor-bar w-[87%]"></div>
                       </div>
                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded">— 0</span>
                     </div>
                     {/* Factor */}
                     <div>
                       <p className="text-xs font-semibold text-gray-600 mb-1">Cubit Score</p>
                       <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
                         <span>100</span> <span className="text-green-500">A</span>
                       </div>
                       <div className="w-full bg-gray-100 h-1 mb-2 rounded-full overflow-hidden">
                         <div className="bg-green-500 h-1 rounded-full factor-bar w-full"></div>
                       </div>
                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded">— 0</span>
                     </div>
                     
                     {/* Next row */}
                     <div>
                       <p className="text-xs font-semibold text-gray-600 mb-1">DNS Health</p>
                       <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
                         <span>100</span> <span className="text-green-500">A</span>
                       </div>
                       <div className="w-full bg-gray-100 h-1 mb-2 rounded-full overflow-hidden">
                         <div className="bg-green-500 h-1 rounded-full factor-bar w-full"></div>
                       </div>
                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded">— 0</span>
                     </div>
                     <div>
                       <p className="text-xs font-semibold text-gray-600 mb-1">Endpoint Security</p>
                       <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
                         <span>100</span> <span className="text-green-500">A</span>
                       </div>
                       <div className="w-full bg-gray-100 h-1 mb-2 rounded-full overflow-hidden">
                         <div className="bg-green-500 h-1 rounded-full factor-bar w-full"></div>
                       </div>
                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded">— 0</span>
                     </div>
                     <div>
                       <p className="text-xs font-semibold text-gray-600 mb-1">Hacker Chatter</p>
                       <div className="flex items-center space-x-2 text-sm font-bold text-slate-800 mb-2">
                         <span>100</span> <span className="text-green-500">A</span>
                       </div>
                       <div className="w-full bg-gray-100 h-1 mb-2 rounded-full overflow-hidden">
                         <div className="bg-green-500 h-1 rounded-full factor-bar w-full"></div>
                       </div>
                       <span className="text-xs text-gray-500 bg-gray-100 px-1.5 rounded">— 0</span>
                     </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                     <a href="#" className="flex items-center text-xs font-semibold text-blue-600 hover:underline">
                        View all factors →
                     </a>
                  </div>
               </div>

               {/* Issues by breach risk */}
               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-center mb-5">
                      <h4 className="font-bold text-sm text-gray-800 flex items-center">Issues by breach risk <HelpCircle className="w-3.5 h-3.5 ml-1 text-gray-400 cursor-help" /></h4>
                      <a href="#" className="text-xs font-semibold text-blue-600 hover:underline">View all issues</a>
                    </div>
                    
                    <div className="flex space-x-4 mb-6">
                       <div className="flex-1 border border-gray-200 rounded-lg p-3">
                         <p className="text-xs font-semibold text-gray-600 mb-2">High risk</p>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center font-bold text-slate-800"><span className="w-1.5 h-4 bg-red-500 rounded-sm mr-1"></span><span className="w-1 h-3 bg-red-500 rounded-sm mr-1 opacity-50"></span><span className="w-1 h-2 bg-red-500 rounded-sm mr-2 opacity-30"></span> 2</div>
                            <div className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex items-center">↘ 7</div>
                         </div>
                       </div>
                       <div className="flex-1 border border-gray-200 rounded-lg p-3">
                         <p className="text-xs font-semibold text-gray-600 mb-2">Medium risk</p>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center font-bold text-slate-800"><span className="w-1.5 h-4 bg-orange-400 rounded-sm mr-1"></span><span className="w-1 h-3 bg-orange-400 rounded-sm mr-1 opacity-50"></span><span className="w-1 h-2 bg-orange-400 rounded-sm mr-2 opacity-30"></span> 2</div>
                            <div className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex items-center">↘ 8</div>
                         </div>
                       </div>
                       <div className="flex-1 border border-gray-200 rounded-lg p-3">
                         <p className="text-xs font-semibold text-gray-600 mb-2">Low risk</p>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center font-bold text-slate-800"><span className="w-1.5 h-4 bg-yellow-500 rounded-sm mr-1"></span><span className="w-1 h-3 bg-yellow-500 rounded-sm mr-1 opacity-50"></span><span className="w-1 h-2 bg-yellow-500 rounded-sm mr-2 opacity-30"></span> 7</div>
                            <div className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex items-center">↘ 8</div>
                         </div>
                       </div>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex items-start">
                       <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <AlertCircle className="w-3.5 h-3.5" />
                       </div>
                       <div>
                         <p className="font-bold text-xs text-gray-800 mb-1">Improve your score by 10.8 points</p>
                         <p className="text-xs text-gray-500 mb-2">Resolve 5 issues with the biggest score impact.</p>
                         <a href="#" className="text-xs text-blue-600 font-semibold hover:underline">See most impacting issues</a>
                       </div>
                    </div>
                 </div>
               </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary icon component for missing lucide-react imports if any
function ChevronRight(props: any) {
  return <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;
}
