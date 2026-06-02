/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  Activity, 
  Filter, 
  RefreshCw, 
  Users, 
  AlertTriangle,
  Lightbulb,
  FileCheck
} from "lucide-react";
import { superstoreData } from "../data/superstoreData";
import { SuperstoreRecord } from "../types";

export default function LiveDashboard() {
  // Filters state
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSegment, setSelectedSegment] = useState<string>("All");

  // What-If Pricing Parameters state
  const [furnitureFreightSurcharge, setFurnitureFreightSurcharge] = useState<number>(0); // Surcharge per item (e.g. $0 - $50)
  const [tableDiscountCap, setTableDiscountCap] = useState<number>(15); // Cap discounts at 0 - 30%

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegion("All");
    setSelectedCategory("All");
    setSelectedSegment("All");
    setFurnitureFreightSurcharge(0);
    setTableDiscountCap(15);
  };

  // 1. Filtered Data Computation
  const filteredData = useMemo(() => {
    return superstoreData.filter((item) => {
      const regionMatch = selectedRegion === "All" || item.region === selectedRegion;
      const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
      const segmentMatch = selectedSegment === "All" || item.segment === selectedSegment;
      return regionMatch && categoryMatch && segmentMatch;
    });
  }, [selectedRegion, selectedCategory, selectedSegment]);

  // 2. Base Dashboard Calculations (Static)
  const baseKPIs = useMemo(() => {
    const data = filteredData;
    const totalSales = data.reduce((acc, curr) => acc + curr.sales, 0);
    const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
    const avgProfitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
    
    const uniqueOrders = new Set(data.map((item) => item.orderId));
    const totalOrders = uniqueOrders.size;
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    const totalQuantity = data.reduce((acc, curr) => acc + curr.quantity, 0);
    // Weighted Average Discount
    const weightedDiscountSum = data.reduce((acc, curr) => acc + (curr.discount * curr.sales), 0);
    const avgDiscount = totalSales > 0 ? (weightedDiscountSum / totalSales) * 100 : 0;

    return {
      totalSales,
      totalProfit,
      avgProfitMargin,
      totalOrders,
      avgOrderValue,
      totalQuantity,
      avgDiscount
    };
  }, [filteredData]);

  // 3. What-If Corrected Data Calculations
  // Let's interactively simulate what happens under new tactical rules:
  // - Enforce the discount cap: If table/binder discount is larger than tableDiscountCap, reduce it, adjusting sales & profits!
  // - Furniture logistic surcharge: Add a custom local freight fee directly to Furniture profits!
  const whatIfKPIs = useMemo(() => {
    let salesTotal = 0;
    let profitTotal = 0;
    let savedMoney = 0;

    filteredData.forEach((item) => {
      let isAdjusted = false;
      let virtualDiscount = item.discount;
      let virtualSales = item.sales;
      let virtualProfit = item.profit;

      // Rule A: Apply Table & Binder Discount Cap Simulation
      const candidateSubCats = ["Tables", "Binders", "Bookcases", "Chairs"];
      if (candidateSubCats.includes(item.subCategory) && item.discount > tableDiscountCap / 100) {
        // Reduc discount. We calculate the recovery.
        // Recovered Sales Price = Original Price before discount = Sales / (1 - discount)
        // New Sales = Price before discount * (1 - capped discount)
        const originalPrice = item.sales / (1 - item.discount);
        const newDiscount = tableDiscountCap / 100;
        const newSales = originalPrice * (1 - newDiscount);
        
        // Cost of Goods Sold is Sales - Profit
        const cogs = item.sales - item.profit;
        const newProfit = newSales - cogs;

        virtualSales = newSales;
        virtualProfit = newProfit;
        savedMoney += (newProfit - item.profit);
        isAdjusted = true;
      }

      // Rule B: Enforce Logistic Freight Surcharge to offset high delivery margins in Furniture
      if (item.category === "Furniture") {
        // Add freight fee directly to bottom-line profit
        const surchargeIncome = furnitureFreightSurcharge * item.quantity;
        virtualProfit += surchargeIncome;
        savedMoney += surchargeIncome;
      }

      salesTotal += virtualSales;
      profitTotal += virtualProfit;
    });

    const newProfitMargin = salesTotal > 0 ? (profitTotal / salesTotal) * 100 : 0;
    const profitDeltaPercent = baseKPIs.totalProfit > 0 ? ((profitTotal - baseKPIs.totalProfit) / baseKPIs.totalProfit) * 100 : 0;

    return {
      totalSales: salesTotal,
      totalProfit: profitTotal,
      avgProfitMargin: newProfitMargin,
      savedMoney: profitTotal - baseKPIs.totalProfit,
      profitDeltaPercent
    };
  }, [filteredData, baseKPIs.totalProfit, tableDiscountCap, furnitureFreightSurcharge]);

  // 4. Monthly Trend Data Aggregations for Recharts
  const monthlyTimeline = useMemo(() => {
    // Group elements by Month (e.g., YYYY-MM)
    const monthMap: Record<string, { sales: number; profit: number; quantity: number }> = {};
    
    // Sort chronological first
    const sortedData = [...filteredData].sort((a, b) => a.orderDate.localeCompare(b.orderDate));
    
    sortedData.forEach((item) => {
      const monthKey = item.orderDate.substring(0, 7); // e.g., '2025-01'
      if (!monthMap[monthKey]) {
        monthMap[monthKey] = { sales: 0, profit: 0, quantity: 0 };
      }
      monthMap[monthKey].sales += item.sales;
      monthMap[monthKey].profit += item.profit;
      monthMap[monthKey].quantity += item.quantity;
    });
    
    return Object.entries(monthMap).map(([month, stats]) => ({
      month,
      Sales: parseFloat(stats.sales.toFixed(2)),
      Profit: parseFloat(stats.profit.toFixed(2)),
      Margin: stats.sales > 0 ? parseFloat(((stats.profit / stats.sales) * 100).toFixed(1)) : 0
    }));
  }, [filteredData]);

  // 5. Category Breakdown Aggregations
  const categoryChartData = useMemo(() => {
    const catMap: Record<string, { sales: number; profit: number }> = {};
    filteredData.forEach((item) => {
      if (!catMap[item.category]) {
        catMap[item.category] = { sales: 0, profit: 0 };
      }
      catMap[item.category].sales += item.sales;
      catMap[item.category].profit += item.profit;
    });
    return Object.entries(catMap).map(([category, stats]) => ({
      name: category,
      Sales: parseFloat(stats.sales.toFixed(2)),
      Profit: parseFloat(stats.profit.toFixed(2)),
      Margin: stats.sales > 0 ? parseFloat(((stats.profit / stats.sales) * 100).toFixed(1)) : 0
    }));
  }, [filteredData]);

  // 6. SubCategory Performance Map
  const subCategoryChartData = useMemo(() => {
    const subMap: Record<string, { sales: number; profit: number }> = {};
    filteredData.forEach((item) => {
      if (!subMap[item.subCategory]) {
        subMap[item.subCategory] = { sales: 0, profit: 0 };
      }
      subMap[item.subCategory].sales += item.sales;
      subMap[item.subCategory].profit += item.profit;
    });
    return Object.entries(subMap)
      .map(([subCat, stats]) => ({
        subCategory: subCat,
        Sales: parseFloat(stats.sales.toFixed(2)),
        Profit: parseFloat(stats.profit.toFixed(2)),
        Margin: stats.sales > 0 ? parseFloat(((stats.profit / stats.sales) * 100).toFixed(1)) : 0
      }))
      .sort((a, b) => b.Sales - a.Sales); // Sort descending sales
  }, [filteredData]);

  // 7. Top 5 Products by Profit
  const topProfitProducts = useMemo(() => {
    const prodMap: Record<string, { sales: number; profit: number; category: string }> = {};
    filteredData.forEach((item) => {
      if (!prodMap[item.productName]) {
        prodMap[item.productName] = { sales: 0, profit: 0, category: item.category };
      }
      prodMap[item.productName].sales += item.sales;
      prodMap[item.productName].profit += item.profit;
    });
    return Object.entries(prodMap)
      .map(([name, stats]) => ({
        productName: name,
        sales: parseFloat(stats.sales.toFixed(2)),
        profit: parseFloat(stats.profit.toFixed(2)),
        category: stats.category,
        margin: stats.sales > 0 ? (stats.profit / stats.sales) * 100 : 0
      }))
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5);
  }, [filteredData]);

  // 8. Bottom 5 unprofitable Products (Leakages)
  const bottomLossProducts = useMemo(() => {
    const prodMap: Record<string, { sales: number; profit: number; category: string }> = {};
    filteredData.forEach((item) => {
      if (!prodMap[item.productName]) {
        prodMap[item.productName] = { sales: 0, profit: 0, category: item.category };
      }
      prodMap[item.productName].sales += item.sales;
      prodMap[item.productName].profit += item.profit;
    });
    return Object.entries(prodMap)
      .map(([name, stats]) => ({
        productName: name,
        sales: parseFloat(stats.sales.toFixed(2)),
        profit: parseFloat(stats.profit.toFixed(2)),
        category: stats.category,
        margin: stats.sales > 0 ? (stats.profit / stats.sales) * 100 : 0
      }))
      .sort((a, b) => a.profit - b.profit) // Lowest profit (loss) first
      .slice(0, 5);
  }, [filteredData]);

  // 9. Forecasting Projections (Generates upcoming 4 months using actual parameters & ARIMA approximation)
  const forecastTimeline = useMemo(() => {
    // Extract actual monthly history
    const history = [...monthlyTimeline];
    if (history.length === 0) return [];

    // Simple seasonal projection setup
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const lastRec = history[history.length - 1];
    const lastDateParts = lastRec.month.split("-");
    let lastYr = parseInt(lastDateParts[0]);
    let lastMo = parseInt(lastDateParts[1]);

    const projectedSteps = [];
    const baseValue = baseKPIs.totalSales / history.length; // Average monthly sales volume
    
    // Simulate future weeks starting from the end of actual data index
    for (let i = 1; i <= 4; i++) {
      let nextMo = lastMo + i;
      let nextYr = lastYr;
      if (nextMo > 12) {
        nextMo -= 12;
        nextYr += 1;
      }
      const doubleDigitMo = nextMo < 10 ? `0${nextMo}` : `${nextMo}`;
      const futureMonthLabel = `${nextYr}-${doubleDigitMo}`;

      // Simulate a standard Q4 spike (seasonal factor)
      let multiplier = 1.0;
      if (["11", "12"].includes(doubleDigitMo)) multiplier = 1.35; // holiday spike
      if (["01", "02"].includes(doubleDigitMo)) multiplier = 0.85; // dip

      // Apply the whatIf cap improvements to the forecast models
      const simulatedFutureSales = baseValue * multiplier * (1 + (tableDiscountCap > 20 ? 0.02 : 0.06));
      const simulatedFutureProfit = simulatedFutureSales * (whatIfKPIs.avgProfitMargin / 100);

      projectedSteps.push({
        month: `${futureMonthLabel} (F)`,
        SalesForecast: parseFloat(simulatedFutureSales.toFixed(2)),
        ProfitForecast: parseFloat(simulatedFutureProfit.toFixed(2)),
        UpperBand: parseFloat((simulatedFutureSales * 1.15).toFixed(2)),
        LowerBand: parseFloat((simulatedFutureSales * 0.85).toFixed(2))
      });
    }

    // Merge history into historical values
    const joined = history.map((h) => ({
      month: h.month,
      Sales: h.Sales,
      Profit: h.Profit,
      SalesForecast: null,
      ProfitForecast: null,
      UpperBand: null,
      LowerBand: null
    }));

    // Attach projected values
    const joinedWithForecast = [...joined, ...projectedSteps];
    return joinedWithForecast;
  }, [monthlyTimeline, baseKPIs.totalSales, tableDiscountCap, whatIfKPIs.avgProfitMargin]);

  // Color theme palettes
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. INTERACTIVE FILTER STRIP */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-slate-800 text-white rounded-lg">
            <Filter className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-white text-sm">Visual Slicer Panel</h3>
            <p className="font-sans text-[11px] text-slate-400">Filter regional, segment, or category cohorts instantaneously.</p>
          </div>
        </div>

        {/* Filters Select boxes */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Region Filter */}
          <div className="flex flex-col gap-1 flex-1 sm:flex-initial">
            <span className="font-mono text-[9px] uppercase font-bold text-slate-500">Region Dimension</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-[#0A0C10] border border-slate-850 rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Regions</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
              <option value="South">South</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-1 flex-1 sm:flex-initial">
            <span className="font-mono text-[9px] uppercase font-bold text-slate-500">Category Slicer</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#0A0C10] border border-slate-850 rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Furniture">Furniture</option>
              <option value="Office Supplies">Office Supplies</option>
            </select>
          </div>

          {/* Customer Segment Filter */}
          <div className="flex flex-col gap-1 flex-1 sm:flex-initial">
            <span className="font-mono text-[9px] uppercase font-bold text-slate-500">Segment Cohort</span>
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="bg-[#0A0C10] border border-slate-850 rounded-lg px-2.5 py-1.5 font-sans text-xs font-semibold text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Segments</option>
              <option value="Consumer">Consumer</option>
              <option value="Corporate">Corporate</option>
              <option value="Home Office">Home Office</option>
            </select>
          </div>

          {/* Reset button */}
          <button
            onClick={handleResetFilters}
            className="mt-4 md:mt-0 flex items-center justify-center gap-1 bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-slate-700/50 text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer outline-none active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      </div>

      {/* 2. LIVE KPI CARDS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl shadow-md shadow-slate-950/20 relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide">Gross Revenue</span>
              <div className="p-1 px-1.5 bg-[#1E1B4B]/50 text-indigo-400 border border-indigo-950 rounded-md">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-sans text-xl md:text-2xl font-extrabold text-white tracking-tight">
              ${baseKPIs.totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <p className="font-mono text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-2">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% YoY Growth
          </p>
        </div>

        {/* Profit Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl shadow-md shadow-slate-950/20 relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide">Net Profit</span>
              <div className="p-1 px-1.5 bg-[#064E3B]/40 text-emerald-400 border border-emerald-950 rounded-md">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-sans text-xl md:text-2xl font-extrabold text-white tracking-tight">
              ${baseKPIs.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <p className={`font-mono text-[10px] font-semibold flex items-center gap-1 mt-2 ${baseKPIs.totalProfit >= 0 ? "text-emerald-400" : "text-rose-405"}`}>
            {baseKPIs.totalProfit >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            Net Margin Profitability
          </p>
        </div>

        {/* Margin % Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl shadow-md shadow-slate-950/20 relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide">Profit Margin %</span>
              <div className="p-1 px-1.5 bg-[#78350F]/45 text-amber-400 border border-amber-955 rounded-md">
                <Percent className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-sans text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {baseKPIs.avgProfitMargin.toFixed(2)}%
            </p>
          </div>
          {baseKPIs.avgProfitMargin >= 12 ? (
            <span className="font-mono text-[10px] text-emerald-400 font-semibold mt-2">✓ Within target bounds (&gt;12%)</span>
          ) : (
            <span className="font-mono text-[10px] text-rose-400 font-semibold mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Below target threshold!
            </span>
          )}
        </div>

        {/* Average Order Value Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl shadow-md shadow-slate-950/20 relative overflow-hidden flex flex-col justify-between min-h-[110px]">
          <div>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide">Avg Order Value (AOV)</span>
              <div className="p-1 px-1.5 bg-[#1E3A8A]/40 text-blue-400 border border-blue-950 rounded-md">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            </div>
            <p className="font-sans text-xl md:text-2xl font-extrabold text-white tracking-tight">
              ${baseKPIs.avgOrderValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <p className="font-mono text-[10px] text-slate-400 mt-2">
            Volume: {baseKPIs.totalQuantity} items | Volume Orders: {baseKPIs.totalOrders}
          </p>
        </div>
      </div>

      {/* 3. CORE CHARTS GRID ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Month-over-Month Revenue & Profit Line Chart */}
        <div className="lg:col-span-2 bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-sans font-bold text-white text-sm">Monthly Revenue vs net profitability</h3>
              <p className="font-sans text-[11px] text-slate-400">Live operational financial margins aggregated dynamically.</p>
            </div>
            <span className="font-mono text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold px-2 py-0.5 rounded">
              Descriptive Trend
            </span>
          </div>

          <div className="h-64 sm:h-72">
            {monthlyTimeline.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-sans text-xs">
                No monthly transactions found. Check your active dimensions!
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "monospace", fill: "#94A3B8" }} stroke="#334155" />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#334155" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#111827", borderRadius: "12px", border: "1px solid #1E293B", fontFamily: "sans-serif", fontSize: "11px", color: "#E2E8F0" }} 
                    formatter={(value: any) => [`$${parseFloat(value).toLocaleString()}`, undefined]}
                  />
                  <Legend wrapperStyle={{ fontSize: 10, fontFamily: "sans-serif" }} />
                  <Bar dataKey="Sales" fill="#3B82F6" name="Gross Sales" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="Profit" stroke="#D48C45" name="Net Profit" strokeWidth={2.5} dot={{ r: 3 }} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Category Contribution Pizza/Donut chart */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-white text-sm">Margin Contribution by Category</h3>
            <p className="font-sans text-[11px] text-slate-400">Comparing revenue volume weights against actual profit generated.</p>
          </div>

          <div className="h-44 flex items-center justify-center my-2">
            {categoryChartData.length === 0 ? (
              <div className="text-slate-500 font-sans text-xs">No records indexed.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={5}
                    dataKey="Profit"
                  >
                    {categoryChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#111827", borderRadius: "12px", border: "1px solid #1E293B", fontFamily: "sans-serif", fontSize: "11px", color: "#E2E8F0" }}
                    formatter={(value: any) => [`$${parseFloat(value).toLocaleString()}`, "Net Profit"]} 
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Simple Legend lists with margins info */}
          <div className="border-t border-slate-800 pt-3 space-y-1.55">
            {categoryChartData.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="font-sans text-slate-300">{item.name}</span>
                </div>
                <div className="font-mono text-white font-semibold flex items-center gap-1.5">
                  <span>${item.Profit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  <span className="text-slate-500 text-[10px]">({item.Margin}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. ADVANCED WHAT-IF EXECUTIVE OPTIMIZER PANEL */}
      <div className="bg-[#111827] text-white rounded-xl p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-white text-sm">Interactive "What-If" Business Optimizer</h3>
              <p className="font-sans text-[11px] text-slate-400">Apply department recommendation thresholds and calculate net margin recovery dynamically.</p>
            </div>
          </div>
          <div className="font-mono text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-1 rounded">
            SIMULATION PIPELINE INJECTED
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Controls Column */}
          <div className="space-y-4">
            {/* Control Slider A: Table discount caps */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="font-sans text-slate-300">Promo Discount Cap: Binders & Tables</span>
                <span className="font-mono text-amber-400">{tableDiscountCap}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={tableDiscountCap}
                onChange={(e) => setTableDiscountCap(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="font-sans text-[10px] text-slate-400">Reroute transactions with discounts larger than cap down to the limit.</p>
            </div>

            {/* Control Slider B: Freight Delivery Surcharge */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="font-sans text-slate-300">Furniture Shipping Freight Fee</span>
                <span className="font-mono text-amber-400">${furnitureFreightSurcharge} / item</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="10"
                value={furnitureFreightSurcharge}
                onChange={(e) => setFurnitureFreightSurcharge(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="font-sans text-[10px] text-slate-400">Offset bulky local delivery expenses by enforcing a strategic logistics handling fee.</p>
            </div>
          </div>

          {/* KPI Output Comparison Column */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 grid grid-cols-2 gap-4 lg:col-span-2">
            <div>
              <span className="font-sans text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Capped Forecast Net margins</span>
              <div className="flex items-baseline gap-2">
                <span className="font-sans text-2xl font-black text-white">
                  {whatIfKPIs.avgProfitMargin.toFixed(1)}%
                </span>
                <span className="font-sans text-xs text-[#00F5FF]">
                  ({whatIfKPIs.avgProfitMargin > baseKPIs.avgProfitMargin ? "+" : ""}
                  {(whatIfKPIs.avgProfitMargin - baseKPIs.avgProfitMargin).toFixed(1)}% variance)
                </span>
              </div>
              <p className="font-sans text-[9px] text-[#00F5FF] mt-1">✓ Improved pricing efficiency</p>
            </div>

            <div className="border-l border-slate-800 pl-4">
              <span className="font-sans text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Bottom Line profits Recovered</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-sans text-2xl font-black text-amber-400">
                  +${whatIfKPIs.savedMoney.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <p className="font-sans text-[9px] text-slate-400 mt-1">Estimated annual cash flow recovery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FOUR-MONTH PREDICTIVE FORECAST TIMELINE */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-sans font-bold text-white text-sm">SARIMA Projections & 95% Confidence Bounds</h3>
            <p className="font-sans text-[11px] text-slate-400">Auto-regressive future expectations with upper and lower standard uncertainty limits.</p>
          </div>
          <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold px-2 py-0.5 rounded">
            Predictive Model (Continuous)
          </span>
        </div>

        <div className="h-64 sm:h-72">
          {forecastTimeline.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-sans text-xs">
              Waiting for date series parameters...
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastTimeline} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: "monospace", fill: "#94A3B8" }} stroke="#334155" />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#334155" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", borderRadius: "12px", border: "1px solid #1E293B", fontFamily: "sans-serif", fontSize: "11px", color: "#E2E8F0" }}
                  formatter={(value: any) => value ? [`$${parseFloat(value).toLocaleString()}`, undefined] : ["-", undefined]}
                />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: "sans-serif" }} />
                
                {/* Historical element */}
                <Area type="monotone" dataKey="Sales" stroke="#94A3B8" strokeWidth={1} fill="rgba(148, 163, 184, 0.05)" name="Historical Actual Sales" connectNulls />
                
                {/* Projected element */}
                <Area type="monotone" dataKey="SalesForecast" stroke="#10B981" strokeWidth={2.5} fill="rgba(16, 185, 129, 0.1)" name="ARIMA Forecasted Revenue" connectNulls />
                
                {/* Bands */}
                <Line type="monotone" dataKey="UpperBand" stroke="#EF4444" strokeDasharray="3 3" name="95% Upper CI" dot={false} connectNulls />
                <Line type="monotone" dataKey="LowerBand" stroke="#EF4444" strokeDasharray="3 3" name="95% Lower CI" dot={false} connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* 6. SKU DISCOVERY & LEAKAGE LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Products Table */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 px-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-sans">Top SKUs</span>
            <h3 className="font-sans font-bold text-white text-sm">Most Profitable Store Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                  <th className="py-2.5">Product Asset / Category</th>
                  <th className="py-2.5 text-right">Revenue</th>
                  <th className="py-2.5 text-right font-semibold">Net Profit</th>
                  <th className="py-2.5 text-right">Net Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {topProfitProducts.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2.5 pr-2">
                       <p className="font-semibold text-white truncate max-w-[220px]">{p.productName}</p>
                      <span className="text-[10px] text-slate-500">{p.category}</span>
                    </td>
                    <td className="py-2.5 text-right">${p.sales.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-emerald-400 font-semibold">+${p.profit.toLocaleString()}</td>
                    <td className="py-2.5 text-right font-mono text-xs">{p.margin.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom unprofitable Products Table (Pruning Candidates) */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1 px-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold font-sans">Leakage</span>
            <h3 className="font-sans font-bold text-white text-sm">Least Profitable SKUs (Pruning Targets)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                  <th className="py-2.5">Product Asset / Category</th>
                  <th className="py-2.5 text-right">Revenue</th>
                  <th className="py-2.5 text-right font-semibold">Net Loss</th>
                  <th className="py-2.5 text-right">Net Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {bottomLossProducts.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2.5 pr-2">
                      <p className="font-semibold text-white truncate max-w-[220px]">{p.productName}</p>
                      <span className="text-[10px] text-slate-500">{p.category}</span>
                    </td>
                    <td className="py-2.5 text-right">${p.sales.toLocaleString()}</td>
                    <td className="py-2.5 text-right text-rose-400 font-semibold">-${Math.abs(p.profit).toLocaleString()}</td>
                    <td className="py-2.5 text-right font-mono text-xs text-rose-450">{p.margin.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
