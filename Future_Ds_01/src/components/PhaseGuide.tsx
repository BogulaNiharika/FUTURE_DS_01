/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Check, 
  Copy, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Award, 
  BookOpen, 
  FileCode, 
  Layers, 
  Lightbulb, 
  Terminal, 
  TrendingUp, 
  Building2,
  Volume2
} from "lucide-react";
import { PhaseItem, phases1to5 } from "../data/phaseContent_1_5";
import { phases6to10 } from "../data/phaseContent_6_10";
import { phases11to13, presentationSlides } from "../data/phaseContent_11_13";

export default function PhaseGuide() {
  const [activePhaseId, setActivePhaseId] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [notesCopied, setNotesCopied] = useState<boolean>(false);

  // Combine our split phases into a contiguous list of 12 academic modules + slide deck
  const allPhases: PhaseItem[] = [
    ...phases1to5,
    ...phases6to10,
    ...phases11to13
  ];

  const currentPhase = allPhases.find(p => p.id === activePhaseId) || allPhases[0];

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyNotes = (notesText: string) => {
    navigator.clipboard.writeText(notesText);
    setNotesCopied(true);
    setTimeout(() => setNotesCopied(false), 2000);
  };

  const getPhaseIcon = (id: number) => {
    switch (id) {
      case 1: return <Building2 className="w-5 h-5" />;
      case 2: return <Layers className="w-5 h-5" />;
      case 3: return <Terminal className="w-5 h-5" />;
      case 4: return <BookOpen className="w-5 h-5" />;
      case 5: return <Award className="w-5 h-5" />;
      case 6: return <TrendingUp className="w-5 h-5" />;
      case 7: return <FileCode className="w-5 h-5" />;
      case 8: return <Layers className="w-5 h-5" />;
      case 9: return <Lightbulb className="w-5 h-5" />;
      case 10: return <TrendingUp className="w-5 h-5" />;
      default: return <FileCode className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
      {/* LEFT NAVIGATION COLUMN */}
      <div className="w-full lg:w-1/4 flex flex-col gap-3">
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-4">
          <h3 className="font-sans font-semibold text-white text-sm mb-1 uppercase tracking-wider">
            Curriculum Path
          </h3>
          <p className="font-sans text-xs text-slate-400">
            Progress step-by-step through 13 corporate modules to craft your portfolio dashboard.
          </p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-xl overflow-hidden shadow-md flex flex-col max-h-[550px] overflow-y-auto">
          {allPhases.map((phase) => {
            const isSelected = phase.id === activePhaseId;
            return (
              <button
                key={phase.id}
                onClick={() => {
                  setActivePhaseId(phase.id);
                  if (phase.id === 13) setSlideIndex(0);
                }}
                className={`w-full text-left p-3 border-b border-slate-800/60 transition-all flex items-start gap-3 outline-none ${
                  isSelected 
                    ? "bg-slate-800/80 text-white shadow-inner border border-blue-500/30" 
                    : "hover:bg-slate-800/40 text-slate-400"
                }`}
              >
                <div className={`mt-0.5 p-1 rounded-md ${isSelected ? "bg-slate-700/60 text-blue-400" : "bg-slate-850 text-slate-500"}`}>
                  {getPhaseIcon(phase.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-semibold text-blue-400">
                      Module {phase.id}
                    </span>
                    <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 px-1 rounded">
                      Verified
                    </span>
                  </div>
                  <h4 className="font-sans text-xs font-semibold truncate">
                    {phase.title}
                  </h4>
                </div>
              </button>
            );
          })}

          {/* Special trigger link for Slide Deck */}
          <button
            onClick={() => {
              setActivePhaseId(13);
              setSlideIndex(0);
            }}
            className={`w-full text-left p-3 transition-all flex items-start gap-3 outline-none ${
              activePhaseId === 13 
                ? "bg-blue-600/85 text-white shadow-inner" 
                : "hover:bg-slate-800/40 text-slate-400"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-md ${activePhaseId === 13 ? "bg-slate-900 text-blue-400" : "bg-slate-850 text-slate-550"}`}>
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <span className={`font-mono text-[10px] uppercase font-semibold block ${activePhaseId === 13 ? "text-blue-105" : "text-slate-450"}`}>
                Module 13
              </span>
              <h4 className="font-sans text-xs font-semibold truncate">
                Interactive Presenter
              </h4>
            </div>
          </button>
        </div>
      </div>

      {/* RIGHT CONTENT COLUMN */}
      <div className="flex-1 bg-[#111827] border border-slate-800 rounded-xl p-6 shadow-lg min-w-0">
        {activePhaseId < 13 ? (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-450 font-bold">
                  Module {currentPhase.id} // Full Documentation
                </span>
                <h2 className="font-sans text-2xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h2>
              </div>
              <div className="bg-slate-800/60 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-mono self-start flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" /> Academic Sandbox
              </div>
            </div>

            {/* Goal Banner */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
              <span className="text-blue-400 font-bold text-sm mt-0.5 uppercase tracking-wide font-sans">Objective:</span>
              <p className="font-sans text-sm text-slate-300 font-medium">
                {currentPhase.goal}
              </p>
            </div>

            {/* Senior Analyst Mentorship Card */}
            <div className="bg-[#1E1B4B]/30 border border-indigo-950/80 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span className="font-sans font-bold text-xs uppercase tracking-wider text-indigo-400">
                  Senior Director Mentorship Memo
                </span>
              </div>
              <p className="font-sans text-sm text-slate-300 italic leading-relaxed">
                "{currentPhase.mentorMemo}"
              </p>
            </div>

            {/* Rich Content Render */}
            <div className="prose prose-slate max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
              {currentPhase.content.split("\n\n").map((block, idx) => {
                if (block.startsWith("###")) {
                  return (
                    <h3 key={idx} className="font-sans font-bold text-white text-base border-l-4 border-blue-500 pl-3 mt-4">
                      {block.replace("### ", "")}
                    </h3>
                  );
                }
                if (block.startsWith("* ")) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-300">
                      {block.split("\n").map((li, liIdx) => (
                        <li key={liIdx}>{li.replace("* ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.startsWith("1. ")) {
                  return (
                    <ol key={idx} className="list-decimal pl-5 space-y-1 text-slate-300">
                      {block.split("\n").map((li, liIdx) => (
                        <li key={liIdx}>{li.substring(3)}</li>
                      ))}
                    </ol>
                  );
                }
                if (block.startsWith("```")) {
                  return (
                    <pre key={idx} className="bg-[#0A0C10] text-[#00F5FF] p-4 rounded-xl font-mono text-xs overflow-x-auto whitespace-pre border border-slate-850">
                      {block.replaceAll("```", "")}
                    </pre>
                  );
                }
                return <p key={idx} className="font-sans text-slate-300">{block}</p>;
              })}
            </div>

            {/* Python / DAX Code block with copy utility (if applies) */}
            {currentPhase.code && (
              <div className="flex flex-col border border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-900/80 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    <span className="font-mono text-[10px] text-slate-400 ml-2 uppercase font-bold">
                      {currentPhase.language || "python"} production script
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(currentPhase.code || "")}
                    className="flex items-center gap-1 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-slate-705 text-xs px-2.5 py-1 rounded-md transition-all active:scale-95 cursor-pointer outline-none font-sans font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-450" />
                        <span className="text-emerald-450">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#0A0C10] p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[400px] leading-relaxed">
                  <pre className="whitespace-pre">{currentPhase.code}</pre>
                </div>
              </div>
            )}

            {/* Takeaways Checkbox Footer */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h4 className="font-sans text-xs uppercase tracking-wider font-semibold text-white mb-3 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Mentor Submission Checklist
              </h4>
              <ul className="space-y-2 text-xs text-slate-350">
                {currentPhase.keyTakeaways.map((task, idx) => (
                  <li key={idx} className="flex gap-2.5">
                    <span className="text-[#00F5FF]/80 font-bold">✓</span>
                    <span className="font-sans leading-normal">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* MODULE 13: INTERACTIVE PRESENTATION SYSTEM PLAYER */
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-450 font-bold">
                  Module 13 // Intern Presentation Sandbox
                </span>
                <h2 className="font-sans text-2xl font-bold text-white mt-1 flex items-center gap-2">
                  <Play className="w-6 h-6 text-blue-400 fill-blue-400" />
                  10-Slide Portfolio Presentation
                </h2>
              </div>
              <div className="bg-[#064E3B]/40 border border-emerald-950 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold self-start flex items-center gap-1">
                ✓ Ready for Client Demo
              </div>
            </div>

            {/* Presentation Layout */}
            <div className="flex flex-col xl:flex-row gap-6">
              {/* Virtual Projector screen */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="bg-[#0A0C10] border border-slate-850 rounded-xl p-8 aspect-video flex flex-col justify-between text-white relative shadow-lg overflow-hidden select-none">
                  {/* Grid overlay for tech look */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>

                  {/* Header info */}
                  <div className="z-10 flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-sans font-extrabold text-[11px] tracking-widest text-[#00F5FF] uppercase">
                      FUTURE INTERNS CO. // SALES BI REPORT
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">
                      SLIDE {presentationSlides[slideIndex].number} OF 10
                    </span>
                  </div>

                  {/* Body Slide Content */}
                  <div className="z-10 my-auto flex flex-col justify-center">
                    <h3 className="font-sans font-black text-xl md:text-3xl tracking-tight text-white leading-tight">
                      {presentationSlides[slideIndex].title}
                    </h3>
                    {presentationSlides[slideIndex].subtitle && (
                      <p className="font-sans text-xs md:text-sm text-slate-400 mt-1 md:mt-2 font-medium">
                        ✦ {presentationSlides[slideIndex].subtitle}
                      </p>
                    )}

                    <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
                      {presentationSlides[slideIndex].bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 leading-normal">
                          <span className="text-[#00F5FF] font-sans font-bold mt-0.5">•</span>
                          <span className="font-sans">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer metadata */}
                  <div className="z-10 flex items-center justify-between border-t border-slate-900 pt-3 text-[10px] text-slate-500 font-mono">
                    <span>STATUS: EXECUTIVE PORTFOLIO BUILD</span>
                    <span>© {new Date().getFullYear()} SUPERSTORE CORP.</span>
                  </div>
                </div>

                {/* Control Panel */}
                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <button
                    disabled={slideIndex === 0}
                    onClick={() => setSlideIndex(prev => Math.max(0, prev - 1))}
                    className="flex items-center gap-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-all font-sans text-xs font-semibold cursor-pointer outline-none"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous Slide
                  </button>
                  <div className="flex gap-1">
                    {presentationSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSlideIndex(idx)}
                        className={`w-7 h-2 rounded transition-all outline-none ${
                          idx === slideIndex ? "bg-blue-500 w-9" : "bg-slate-800 hover:bg-slate-700"
                        }`}
                      ></button>
                    ))}
                  </div>
                  <button
                    disabled={slideIndex === presentationSlides.length - 1}
                    onClick={() => setSlideIndex(prev => Math.min(presentationSlides.length - 1, prev + 1))}
                    className="flex items-center gap-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-all font-sans text-xs font-semibold cursor-pointer outline-none"
                  >
                    Next Slide <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Speaker notes right column */}
              <div className="w-full xl:w-96 flex flex-col gap-4">
                <div className="bg-[#1E1B4B]/30 border border-indigo-950 rounded-xl p-5 shadow-sm flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-900">
                      <div className="flex items-center gap-1.5 text-indigo-400">
                        <Volume2 className="w-5 h-5 text-indigo-400" />
                        <span className="font-sans font-bold text-xs uppercase tracking-wider">
                          Speaker Presentation Notes
                        </span>
                      </div>
                      <button 
                        onClick={() => handleCopyNotes(presentationSlides[slideIndex].notes)}
                        className="text-[10px] bg-slate-900 border border-indigo-950 text-indigo-400 px-2 py-1 rounded hover:bg-slate-800 font-sans font-medium hover:text-indigo-300 transition-all cursor-pointer outline-none"
                      >
                        {notesCopied ? "Copied!" : "Copy Notes"}
                      </button>
                    </div>

                    <p className="font-sans text-sm text-slate-300 leading-relaxed italic">
                      "{presentationSlides[slideIndex].notes}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-indigo-900/60 flex items-start gap-2 text-xs text-[#00F5FF]/85">
                    <span className="font-sans font-bold">💡 Director Tip:</span>
                    <p className="font-sans">
                      Start your explanation with the top line metric, call out the problem, and slide instantly into the action blueprint. Never read bullets verbatim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
