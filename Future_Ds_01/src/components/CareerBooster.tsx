/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Copy, Check, FileText, Linkedin, Github, Send, RefreshCw } from "lucide-react";

export default function CareerBooster() {
  const [candidateName, setCandidateName] = useState<string>("Jane Doe");
  const [targetRole, setTargetRole] = useState<string>("Junior Data Analyst");
  const [internshipProvider, setInternshipProvider] = useState<string>("Future Interns");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Compile personalization tags dynamically
  const resumeBullets = [
    `Conducted a thorough financial margin audit on over 5,000 multi-dimensional Superstore transaction lines during my ${targetRole} internship at ${internshipProvider}, successfully identifying five critical leakage roots in bulky Furniture shipping lines and Binders promotional channels.`,
    `Developed and automated a complete data cleaning and feature engineering pipeline in Python (Pandas, NumPy) to audit raw transaction data, resolving primary key duplicates and establishing unit prices, unit net margins, and quarterly timeframes.`,
    `Segmented a 700+ customer registry using quantitative Recency, Frequency, and Monetary (RFM) modeling, classifying VIP active 'Champions' and detecting inactive high-value accounts to support re-engagement marketing.`,
    `Constructed a multi-page interactive Executive Dashboard in Power BI, mapping a streamlined Star Schema star relational database; wrote 15+ complex DAX calculations (YTD Sales, YoY % variance, and weighted discount averages) that optimized database rendering speed by 40%.`,
    `Programmatically fitted and evaluated a Seasonal ARIMA time-series forecasting model using statsmodels, projecting gross revenue for the next fiscal quarter within 95% statistical confidence limits to guide warehouse storage capacities.`
  ];

  const linkedinPost = `🚀 Proud to share the conclusion of my data analytics portfolio project completed during my ${targetRole} internship with ${internshipProvider}!

I built an end-to-end "Business Sales Performance Analytics Dashboard" designed to identify and eliminate revenue margin leaks in retail operations.

Key technical outputs:
📊 Modeled a multi-dimensional Star Schema database in Power BI, writing 15+ optimized DAX calculations instead of flat data structures.
⚙️ Wrote fully commented, modular Python (Pandas/NumPy) ETL scripts to clean data, tag outliers, and engineer transactional indexes.
🛍️ Segmented a 700+ buyer register via RFM (Recency, Frequency, Monetary) analytics, isolating VIP shoppers from churn threats.
📈 Deployed a Seasonal ARIMA regression model in Python to forecast upcoming quarter volumes with 95% confidence intervals.
💡 Furnished 10 tactical recommendations for department managers, centered on hard margin-saving promotional caps.

Massive thanks to ${internshipProvider} for the excellent learning sandbox! You can review my code and layouts on GitHub:
👉 [Insert your link]

#DataAnalytics #BusinessIntelligence #PowerBI #Python #Forecasting #Internship #${internshipProvider}`;

  const emailCoverLetter = `Subject: Submission of Internship Project - Business Sales Performance Analytics Dashboard

Dear Evaluation Team,

Please find enclosed my final project submission for the ${targetRole} internship. The project is titled "Business Sales Performance Analytics Dashboard".

Applying senior data architecture methodologies learned during my internship, I have completed:
1. An operational BI dashboard designed with live filters, interactive What-If simulators, and forecasting visualizers.
2. An end-to-end Python pipeline resolving duplicate entries, handling null coordinates, and generating metrics.
3. Advanced RFM buyer segmentations and SARIMA monthly revenue predictions.
4. A 10-slide executive presentation detailing major leakage insights.

The code and design artifacts have been fully documented and pushed to GitHub for public review:
Repository: [Insert GitHub Repository link]

I look forward to your valuable feedback and my internship certification.

Best regards,
${candidateName}
${targetRole} Intern`;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Introduction Card */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="font-mono text-[10px] uppercase font-bold text-blue-400 tracking-wider">
            PORTFOLIO BOOSTER CORE
          </span>
          <h2 className="font-sans text-2xl font-black text-white tracking-tight">
            Personalized Career Assets Hub
          </h2>
          <p className="font-sans text-xs text-slate-400 md:max-w-xl">
            Type your metrics below to personalize your resume bullets, LinkedIn posts, and evaluation submissions in real-time.
          </p>
        </div>
        <FileText className="w-12 h-12 text-blue-500 opacity-60 hidden md:block" />
      </div>

      {/* Inputs Form */}
      <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-[10px] font-mono uppercase font-semibold text-slate-400 mb-1 tracking-wider">Your Full Name</label>
          <input
            type="text"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            className="w-full bg-[#0A0C10] border border-slate-850 rounded-lg px-3 py-2 font-sans text-xs text-white focus:outline-none focus:border-blue-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase font-semibold text-slate-400 mb-1 tracking-wider">Target Job Title</label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-[#0A0C10] border border-slate-850 rounded-lg px-3 py-2 font-sans text-xs text-white focus:outline-none focus:border-blue-500"
            placeholder="Junior Data Analyst"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase font-semibold text-slate-400 mb-1 tracking-wider">Internship Provider</label>
          <input
            type="text"
            value={internshipProvider}
            onChange={(e) => setInternshipProvider(e.target.value)}
            className="w-full bg-[#0A0C10] border border-slate-850 rounded-lg px-3 py-2 font-sans text-xs text-white focus:outline-none focus:border-blue-500"
            placeholder="Future Interns"
          />
        </div>
      </div>

      {/* Generated Columns */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* SECTION 1: ATS RESUME */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-sans font-bold text-xs uppercase text-white tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-450" /> ATS-Friendly Resume Bullets
            </span>
            <button
              onClick={() => handleCopy(resumeBullets.join("\n"), "resume")}
              className="text-xs bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-slate-700/50 px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer outline-none"
            >
              {copiedSection === "resume" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-450" />
                  <span className="text-emerald-450">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy All</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 text-xs font-sans text-slate-300 leading-relaxed max-h-[350px] overflow-y-auto pr-1">
            {resumeBullets.map((bullet, idx) => (
              <div key={idx} className="flex gap-2 p-2 border border-slate-850 hover:border-slate-800 rounded-lg bg-[#0A0C10]/60 relative group">
                <span className="text-blue-400 font-bold">•</span>
                <p className="flex-1 select-all">{bullet}</p>
                <button
                  onClick={() => handleCopy(bullet, `r-${idx}`)}
                  className="absolute right-2 top-2 p-1 bg-slate-900 border border-slate-800 rounded hidden group-hover:flex hover:bg-slate-800"
                  title="Copy this bullet"
                >
                  {copiedSection === `r-${idx}` ? (
                    <Check className="w-3 h-3 text-emerald-440" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: LINKEDIN PORTFOLIO PROMOTION */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-sans font-bold text-xs uppercase text-white tracking-wider flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn Campaign Copy
            </span>
            <button
              onClick={() => handleCopy(linkedinPost, "linkedin")}
              className="text-xs bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer outline-none"
            >
              {copiedSection === "linkedin" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-450" />
                  <span className="text-emerald-450 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="font-semibold">Copy Post</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#0A0C10] border border-slate-850 rounded-xl p-4 max-h-[350px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed select-all">
              {linkedinPost}
            </pre>
          </div>
        </div>

        {/* SECTION 3: SUBMISSION PORTAL EMAIL */}
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="font-sans font-bold text-xs uppercase text-white tracking-wider flex items-center gap-1.5">
              <Send className="w-4 h-4 text-emerald-400" /> Project Submission Email
            </span>
            <button
              onClick={() => handleCopy(emailCoverLetter, "submission")}
              className="text-xs bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/10 px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer outline-none"
            >
              {copiedSection === "submission" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-450" />
                  <span className="text-emerald-450 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="font-semibold">Copy Email</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#0A0C10] border border-slate-850 rounded-xl p-4 max-h-[350px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300 leading-relaxed select-all">
              {emailCoverLetter}
            </pre>
          </div>
        </div>

      </div>

    </div>
  );
}
