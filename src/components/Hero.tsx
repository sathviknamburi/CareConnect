"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, HeartHandshake, Users, Cpu, Activity } from "lucide-react";

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  // AI Showcase presets
  const presets = [
    {
      text: "My grandmother has high fever, shivering, and can barely stand since last night.",
      priority: "High",
      category: "Medical Support",
      summary: "Elder patient reports acute high fever and mobility impairment. Urgent clinical triage recommended.",
      color: "text-red-500 bg-red-500/10 border-red-500/20"
    },
    {
      text: "Need a monthly prescription refill for hypertension medications (Amlodipine).",
      priority: "Low",
      category: "Medicines",
      summary: "Routine pharmacy supply request for maintenance hypertension medicines.",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      text: "Landed awkwardly on my ankle during sports. Swelling and sharp pain when walking.",
      priority: "Medium",
      category: "Diagnostics",
      summary: "Sub-acute musculoskeletal injury. Diagnostic scan (X-ray) recommended.",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [showcaseState, setShowcaseState] = useState(presets[0]);
  const [isTypingEffect, setIsTypingEffect] = useState(false);

  // Run AI analysis on custom or preset input
  const analyzeInput = (text: string) => {
    setIsTypingEffect(true);
    setTimeout(() => {
      const query = text.toLowerCase();
      let priority = "Low";
      let category = "Medical Assistance";
      let summary = "Routine checkup or guidance request. Standard callback scheduled.";
      let color = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";

      const highKeywords = ["fever", "shivering", "severe", "chest", "breath", "fracture", "bleed", "stroke", "accident", "critical"];
      const medKeywords = ["pain", "swelling", "injury", "diabetes", "diagnose", "scan", "mri", "ankle", "infection"];

      let matchedHigh = highKeywords.some(kw => query.includes(kw));
      let matchedMed = medKeywords.some(kw => query.includes(kw));

      if (matchedHigh) {
        priority = "High";
        category = "Medical Support";
        summary = "Acute symptoms detected. Rapid clinical triage and immediate coordination recommended.";
        color = "text-red-500 bg-red-500/10 border-red-500/20";
      } else if (matchedMed) {
        priority = "Medium";
        category = "Diagnostics";
        summary = "Sub-acute clinical symptoms. General physician consult and diagnostic scans recommended.";
        color = "text-amber-500 bg-amber-500/10 border-amber-500/20";
      }

      setShowcaseState({
        text,
        priority,
        category,
        summary,
        color
      });
      setIsTypingEffect(false);
    }, 600);
  };

  const [stats, setStats] = useState({
    pending: 0,
    volunteersCount: 0,
    resolvedRate: 100,
  });

  useEffect(() => {
    const storedReqs = localStorage.getItem("careconnect_patient_requests");
    const storedVols = localStorage.getItem("careconnect_volunteer_registrations");
    
    const reqs = storedReqs ? JSON.parse(storedReqs) : [];
    const vols = storedVols ? JSON.parse(storedVols) : [];
    
    const pendingCount = reqs.filter((r: any) => r.status === "Pending").length;
    const resolvedCount = reqs.filter((r: any) => r.status === "Resolved").length;
    const totalCount = reqs.length;
    
    const rate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 100;
    
    setStats({
      pending: pendingCount,
      volunteersCount: vols.length,
      resolvedRate: rate,
    });
  }, []);

  useEffect(() => {
    if (!customInput) {
      setShowcaseState(presets[activeIndex]);
    }
  }, [activeIndex, customInput]);

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300"
    >
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-teal-400/10 dark:bg-teal-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 dark:bg-teal-950/50 border border-teal-200/50 dark:border-teal-800/50 text-teal-600 dark:text-teal-400 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="h-4 w-4" />
              Trusted Healthcare NGO
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white font-sans leading-tight">
              Caring for Lives,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-600 dark:from-teal-400 dark:to-indigo-400">
                Connecting Communities
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-350 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              At **CareConnect**, we bridge the gap between healthcare resources and patients in need. Fill out a request to receive medical aid, or register as a volunteer to help run our health camps and clinics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                id="hero-request-cta"
                onClick={() => setActiveTab("patient-support")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-teal-500 text-white font-medium shadow-lg shadow-teal-500/20 hover:bg-teal-600 hover:shadow-teal-600/30 active:scale-[0.98] transition-all duration-200 group cursor-pointer"
              >
                Request Support
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="hero-volunteer-cta"
                onClick={() => setActiveTab("volunteer")}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Volunteer Registration
              </button>
            </div>

            {/* Dynamic Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-150 dark:border-slate-750 shadow-sm text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.pending}+</h3>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">Pending Cases</p>
              </div>
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-150 dark:border-slate-750 shadow-sm text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.volunteersCount}+</h3>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">Verified Volunteers</p>
              </div>
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-150 dark:border-slate-750 shadow-sm text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.resolvedRate}%</h3>
                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">Help Rate</p>
              </div>
            </div>
          </div>
          
          {/* Interactive AI Triage Showcase Visual (replaces static visuals) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl border border-slate-150 dark:border-slate-700 shadow-2xl p-5 space-y-4 relative overflow-hidden transition-all">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-teal-500/10 text-teal-650 dark:bg-teal-500/20 dark:text-teal-400 rounded-lg">
                    <Cpu className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">AI Triage Priority Sandbox</span>
                </div>
                <div className="flex gap-1.5">
                  {presets.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCustomInput(""); setActiveIndex(i); }}
                      className={`w-5 h-5 rounded-md text-[10px] font-bold transition-all flex items-center justify-center cursor-pointer ${
                        activeIndex === i && !customInput
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Showcase Body */}
              <div className="space-y-3.5 min-h-[200px] flex flex-col justify-between">
                
                {/* Input block */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Input Description</span>
                  {isTypingEffect ? (
                    <div className="h-10 flex items-center justify-start">
                      <div className="dot-flashing text-teal-500 dark:text-teal-400"></div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-semibold bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-150 dark:border-slate-850">
                      "{customInput || showcaseState.text}"
                    </p>
                  )}
                </div>

                {/* Analysis Row */}
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-700/60 pt-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Priority Level</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 mt-1 rounded-lg text-[10px] font-extrabold border ${showcaseState.color}`}>
                      <Activity className="h-3 w-3" />
                      {showcaseState.priority}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Triage Category</span>
                    <span className="inline-block px-2.5 py-1 mt-1 rounded-lg text-[10px] font-extrabold bg-teal-500/10 text-teal-600 border border-teal-500/10 dark:text-teal-450 dark:bg-teal-500/20">
                      {showcaseState.category}
                    </span>
                  </div>
                </div>

                {/* AI Summary Block */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">NLP Summary Triage</span>
                  <p className="text-xs text-slate-550 dark:text-slate-350 leading-relaxed italic">
                    "{showcaseState.summary}"
                  </p>
                </div>

              </div>

              {/* Custom input tester */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => { setCustomInput(e.target.value); analyzeInput(e.target.value); }}
                  placeholder="Test custom query (e.g. chest pain)..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/25 text-slate-900 dark:text-white"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
