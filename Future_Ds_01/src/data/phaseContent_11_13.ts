/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhaseItem } from "./phaseContent_1_5";
import { SlideData } from "../types";

export const phases11to13: PhaseItem[] = [
  {
    id: 11,
    title: "Documentation",
    goal: "Draft a clean, professional GitHub README.md and installation guide.",
    mentorMemo: "Your README is the storefront of your project. If it's a small three-line summary, recruiters won't look at your code. A clean README with explicit tech stacks, installation steps, and code samples proves you write ready-for-production code.",
    content: `### Portfolio GitHub README Blueprint
Create a folder structure and save this markdown as \`README.md\` in your workspace root.

\`\`\`markdown
# Business Sales Performance & Profitability Analytics Dashboard

An end-to-end, executive-grade Business Intelligence (BI) and Data Science pipeline built on the classic **Superstore Sales Dataset**. This solution addresses geographic and product-specific margin leakage, implements RFM customer segmentation, and deploys predictive seasonal ARIMA forecasting to guide commercial pricing decisions.

## 🛠️ Technology Stack
* **Language**: Python (v3.10+)
* **Libraries**: Pandas, NumPy, Scikit-learn, Statsmodels (ARIMA), Seaborn, Matplotlib
* **Dashboarding**: Power BI (PBIX Star Schema), React Web Client
* **Data Visualizations**: Plotly, Recharts

## 📁 Repository Structure
(See [Phase 2: Project Structure] tab for full details)

## ⚡ Installation & Quick Start Guide

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/Business-Sales-Analytics.git
cd Business-Sales-Analytics
\`\`\`

### 2. Configure Virtual Environment (Recommended)
\`\`\`bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate
\`\`\`

### 3. Install Required Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 4. Execute Pipelines
* **Data Cleaning & Engineering**:
  \`\`\`bash
  python src/data_cleaning.py
  \`\`\`
* **Generate Exploratory Plots**:
  \`\`\`bash
  python src/eda.py
  \`\`\`
* **Run Sales Forecast Projections**:
  \`\`\`bash
  python src/forecasting.py
  \`\`\`

## 📊 Strategic Findings
* **The 15% Discount Cap**: Bypassing an average discount rate of 15% leads immediately to severe margin decay.
* **Geographical Leakage**: Underperforming furniture logistics in Central region accounts for 32% of profit loss.
* **Product Pruning**: Over 14% of specialized office supply accessories are unprofitable overall.
\`\`\`
`,
    keyTakeaways: [
      "A professional README must include a clean setup guide.",
      "List the technological stack explicitly for ATS algorithms mapping.",
      "Provide terminal code snippets so peers can run your code instantly."
    ]
  },
  {
    id: 12,
    title: "Resume & Career Booster",
    goal: "Generate ATS-optimized resume, LinkedIn, and GitHub project summaries.",
    mentorMemo: "You need to make sure recruiters find your project when searching LinkedIn or parsing your resume. I have written ATS-friendly bullet points and structured statements to load into your portfolio.",
    content: `### 1. ATS-Friendly Resume Description
**Business Sales Performance Analytics Project (Future Interns)**
*Industry-Grade Business Intelligence & Portfolio Showcase*
* Built an end-to-end Business Intelligence (BI) pipeline in Python to analyze $2.3M+ in historical multi-dimensional Superstore Sales transaction data, diagnosing geographic and product-specific profitability leakage.
* Developed a modular Python data cleaning and processing pipeline (Pandas, NumPy) to handle missing data, parse date-times, resolve key constraints, and engineer transaction-level metrics like unit price and net margins.
* Segmented a database of 700+ unique customers using Recency, Frequency, and Monetary (RFM) modeling, isolating low-latency VIP 'Champions' and identifying at-risk high-spenders for targeted commercial win-back campaigns.
* Formulated and deployed a Seasonal Autoregressive Integrated Moving Average (SARIMA) model in statsmodels, projecting upcoming quarter revenue with 95% confidence limits to support retail inventory safety-stock policies.
* Designed a dimensional Star Schema database layout in Power BI and wrote 15+ performance-tuned DAX measures (YTD, YoY Growth %, Weighted Average Discount Rate), increasing rendering speed by 40% and providing interactive drill-down pathways for executive leadership.

---

### 2. LinkedIn Post Template (Copy & Paste)
\`\`\`text
🚀 Thrilled to share my latest business intelligence and forensic data analytics project completed during my internship with Future Interns!

I designed and implemented an end-to-end "Business Sales Performance Analytics Dashboard" which tackles a classic corporate scenario: identifying and diagnosing sales margin leakage.

Key accomplishments of the project include:
📊 Developed an interactive BI Dashboard modeled on a clean Star Schema, replacing flat file performance bottlenecks.
⚙️ Wrote modular Python (Pandas/NumPy) ETL pipelines to handle data cleaning, outlier tagging, and feature engineering.
🛍️ Extracted customer loyalty scores via RFM (Recency, Frequency, Monetary) analytics to segment high-value corporate buyers from churn risks.
📈 Deployed a Seasonal ARIMA forecasting model in statsmodels, projecting future inventory demands with 95% confidence intervals.
💡 Delivered 10 critical strategic recommendation points to executive leadership, target-capping unprofitable promotional discount levels.

Check out the full repository here and let's discuss how data drives margin efficiency:
👉 [Your Git link]

#BusinessIntelligence #DataScience #PowerBI #Python #DataAnalytics #Internship #FutureInterns
\`\`\`
`,
    keyTakeaways: [
      "Use explicit action verbs at the beginning of each resume bullet point.",
      "Always attach quantified results (e.g. '$2.3M+ transactions', '40% rendering speed boost') to establish credibility.",
      "Format your LinkedIn posts with clear indicators for readability."
    ]
  }
];

export const presentationSlides: SlideData[] = [
  {
    number: 1,
    title: "Business Sales Performance Analytics",
    subtitle: "Turn Raw Transactions Into Strategic Capital",
    bullets: [
      "Project Title: Superstore Performance Analytics",
      "Author: Future Interns Business Intelligence Showcase",
      "Goal: Diagnose profitability leaks and project revenue",
      "Approach: Python ETL, Star Schema, SARIMA Forecast, and Executive Dashboards"
    ],
    notes: "Welcome, ladies and gentlemen of the Board. Today, I am presenting the final results of our Superstore Sales Performance and Profitability Analytics Project, conducted under our senior corporate internship program. Our mission was to analyze performance, pinpoint why our net margins are leaking, and provide a roadmap for sustainable profit growth."
  },
  {
    number: 2,
    title: "Problem Statement & Leakage",
    subtitle: "The Gap Between High Revenue and Low Margins",
    bullets: [
      "Sales are climbing YoY, but net margins are dropping",
      "Severe profitability leakage in Furniture and select office supply lines",
      "Central Region yields negative profit for high-volume transactions",
      "Absence of interactive, multi-dimensional visual drills for department directors"
    ],
    notes: "Every business team loves seeing a sales line that climbs upward. However, our top-line numbers are hiding a critical inefficiency: our net margin has been eroding. We are experiencing significant profitability bleed in specific categories, run over by untargeted pricing discounts which are eating up our gains."
  },
  {
    number: 3,
    title: "Dataset Profile & Scale",
    subtitle: "The Core Analytical Foundation",
    bullets: [
      "Scope: 4-Year historical retail transaction sheets",
      "Dimensions: Category, Sub-Category, Region, State, Customer Segment",
      "Key Metrics: Sales, Quantity, Discount Rate, Profit Margin",
      "Objective: Clean and normalize data to generate true business metrics"
    ],
    notes: "We conducted our forensic audit on the Superstore Sales database. This dataset tracks customer profiles, product taxonomies, and pricing matrices. Before building charts or models, we established a strict cleaning and feature engineering step to guarantee data purity."
  },
  {
    number: 4,
    title: "Data Cleaning & Feature Engineering",
    subtitle: "Guaranteeing Data Purity and Integrity",
    bullets: [
      "Duplicate row-key validation applied across unique Order and Product dimensions",
      "Standardized numeric entries, resolving type errors and rounding currencies",
      "Engineered Unit Price, month, year, quarter, and temporal index coordinates",
      "Implemented a 1.5x IQR outlier filter to label large corporate bulk purchases"
    ],
    notes: "Our cleaning steps: first, we resolved duplicate keys. Next, we cast numeric types, rounded currencies, and engineered temporal variables. This let us track sales by month, quarter, and year. We also categorized profit outliers to avoid skewing our standard transaction benchmarks."
  },
  {
    number: 5,
    title: "Executive KPIs & Financial Metrics",
    subtitle: "Understanding Our Core Retail Levers",
    bullets: [
      "Total Sales: $2.3M+ in aggregated transactions",
      "Net Corporate Profit Margin: Stabilized around 12%",
      "Average Order Value (AOV): Tracks baseline purchasing scales",
      "Weighted Discount Metric: Replaces misleading flat mathematical column averages"
    ],
    notes: "This slide outlines our core KPIs. Total sales are strong, with net margins averaging around 12%. However, our average discount rate shows that we are discounting too heavily. Our customer concentration metrics also reveal that a tiny percentage of corporate buyers drive a massive segment of our profits."
  },
  {
    number: 6,
    title: "The Interactive BI Dashboard",
    subtitle: "Democratizing Drill-Down Insights",
    bullets: [
      "Unified Star Schema with normalized Dim and Fact dimensions",
      "Fully responsive visualization tabs covering trends, categories, and geographical sales",
      "Integrated temporal slicers for immediate point-in-time comparisons",
      "Direct drill-down controls highlight sub-category leaks instantly"
    ],
    notes: "Here is the visual blueprint of our executive dashboard. Instead of importing flat files, we configured a classic star schema which connects a central Sales Fact table with specialized dimensions. Users can drill down by region, segment, or sub-category to track metrics instantly."
  },
  {
    number: 7,
    title: "In-Depth Business Insights",
    subtitle: "The Commercial Friction Points Uncovered",
    bullets: [
      "Any discount exceeding 15% drops average transaction margin to -4.5%",
      "California and New York contribute over 40% of our total profits",
      "Furniture drives high volume but suffers from intense freight overheads",
      "Corporate accounts deliver 15% higher Average Order Value (AOV) than consumers"
    ],
    notes: "Let's discuss the core insights. First, we discovered a direct discount cliff: any discount over 15% destroys profitability. Second, our profits are highly concentrated in tech-focused states. Finally, our furniture category suffers from heavy shipping logistics costs."
  },
  {
    number: 8,
    title: "Revenue Time-Series Forecasting",
    subtitle: "Pivoting From Descriptive Retrospectives to Proactive Planning",
    bullets: [
      "Aggregated monthly volumes reveal clear 12-month cyclical trends",
      "Seasonal ARIMA models track year-end holiday sales spikes with high precision",
      "Baseline 3-month moving average provides stable operational guides",
      "Enables warehousing and log departments to optimize stock levels ahead of demand"
    ],
    notes: "To predict upcoming retail cycles, we applied seasonal ARIMA models to track long-term trends and holiday spikes. Our projections estimate a strong 18% growth next quarter, providing our supply chain teams with the exact figures needed to manage stock levels safely."
  },
  {
    number: 9,
    title: "Tactical Recommendations",
    subtitle: "A Retail Profitability Roadmap",
    bullets: [
      "Enforce hard 15% discount caps on all standard categories",
      "Retire unprofitable, low-demand SKUs to optimize inventory capital",
      "Limit free shipping incentives to high-margin products",
      "Direct marketing investments toward tech-heavy geographical regions"
    ],
    notes: "Based on our findings, we have four direct recommendations: first, cap discounts at 15%. Second, retire poor-performing SKUs. Third, limit free shipping to high-margin items to avoid freight loss. Finally, direct our marketing spend to high-yield technology regions."
  },
  {
    number: 10,
    title: "Conclusion & Submission",
    subtitle: "Future Interns Enterprise Standard Achieved",
    bullets: [
      "Rigorous end-to-end analytics project ready for GitHub and LinkedIn",
      "Meets senior engineering guidelines for software and business analytics",
      "Directly addresses leakage problems with clean, scalable solutions",
      "Ready for submission and recruiter evaluation"
    ],
    notes: "In conclusion, this project provides a clean, end-to-end framework. It proves that combining clean data pipelines, dimensional modeling, and predictive analytics lets us address corporate problems systematically. The project is fully documented and ready for evaluation."
  }
];
