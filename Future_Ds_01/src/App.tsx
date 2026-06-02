/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  BarChart3, 
  BookOpen, 
  Award, 
  Briefcase, 
  GraduationCap, 
  FolderHeart,
  ExternalLink
} from "lucide-react";
import LiveDashboard from "./components/LiveDashboard";
import PhaseGuide from "./components/PhaseGuide";
import CareerBooster from "./components/CareerBooster";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "curriculum" | "booster">("dashboard");

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#E2E8F0] flex flex-col antialiased selection:bg-blue-900/50 selection:text-white">
      
      {/* PROFESSIONAL PORTFOLIO APP BAR HEADER */}
      <header className="bg-[#0B0F17]/85 border-b border-slate-850 sticky top-0 z-50 shadow-lg shadow-slate-950/25 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Portfolio details */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-900/20 text-white">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-black text-white text-base md:text-lg tracking-tight uppercase">
                  Business Sales Performance Analytics
                </h1>
                <span className="font-sans text-[10px] uppercase font-bold tracking-wider bg-slate-800/80 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded">
                  Superstore Dataset
                </span>
              </div>
              <p className="font-sans text-[10px] text-slate-400 tracking-wider font-semibold uppercase">
                INTERNSHIP PROJECT PHASE 1-13
              </p>
            </div>
          </div>

          {/* Social / Portfolio indicators */}
          <div className="flex gap-4">
            <div className="bg-slate-800/40 px-4 py-2 rounded-md border border-slate-800 text-center">
              <p className="text-[10px] text-slate-505 uppercase">Project Progress</p>
              <p className="text-xs font-bold text-blue-400">PHASE 1-13 COMPLETE</p>
            </div>
            <div className="bg-slate-800/40 px-4 py-2 rounded-md border border-slate-800 text-center">
              <p className="text-[10px] text-slate-505 uppercase">Senior Analyst Mentor</p>
              <p className="text-xs font-bold text-emerald-400 uppercase">Verified Content (A+)</p>
            </div>
          </div>

        </div>
      </header>

      {/* CORE CONTROL TABS STRIP */}
      <div className="bg-[#0B0F17] border-b border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 py-3 col-span-12">
            
            {/* Tab A: Executive Dashboard */}
            <button
              id="tab-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer outline-none ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Interactive BI Dashboard</span>
            </button>

            {/* Tab B: Academic Curriculum Guide */}
            <button
              id="tab-curriculum"
              onClick={() => setActiveTab("curriculum")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer outline-none ${
                activeTab === "curriculum"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>13-Phase Mentorship Masterclass</span>
            </button>

            {/* Tab C: Career Accelerator */}
            <button
              id="tab-booster"
              onClick={() => setActiveTab("booster")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all cursor-pointer outline-none ${
                activeTab === "booster"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Portfolio & Career Booster</span>
            </button>

          </div>
        </div>
      </div>

      {/* MAIN CONTAINER BODY AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic Tab component mounting */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Sub-header instructions for Live Dashboard */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-sans font-extrabold text-white text-base flex items-center gap-1.5">
                  <FolderHeart className="w-5 h-5 text-blue-400" /> Operational Sales Monitor
                </h2>
                <p className="font-sans text-xs text-slate-400 mt-1 md:max-w-2xl leading-normal">
                  You are evaluating the mock Superstore Sales Performance database. Click on any slicer below to filter segment sales, or use the sliders to run margin optimizer simulations.
                </p>
              </div>
              <button 
                id="view-curriculum-btn"
                onClick={() => setActiveTab("curriculum")}
                className="bg-blue-600 border border-blue-500/30 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-500 transition-all flex items-center gap-1 select-none outline-none cursor-pointer active:scale-95 shadow-lg shadow-blue-900/20"
              >
                Learn Data Process <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Live BI Component */}
            <LiveDashboard />
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-4">
            {/* Phase Curriculum Panel */}
            <PhaseGuide />
          </div>
        )}

        {activeTab === "booster" && (
          <div className="space-y-4">
            <CareerBooster />
          </div>
        )}

      </main>

      {/* EXECUTIVE CORPORATE STATEMENT FOOTER */}
      <footer className="bg-[#07090D] border-t border-slate-900 py-6 text-center text-xs font-sans mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="mb-1 leading-normal text-slate-500">
            Business Sales Performance Analytics Dashboard Academy — Prepared for Future Interns submission review.
          </p>
          <p className="font-mono text-[10px] text-slate-600">
            Created by Senior Business Intelligence Consultant & Mentor Alliance Partner. Version 1.2.0 (Stable)
          </p>
        </div>
      </footer>

    </div>
  );
}
