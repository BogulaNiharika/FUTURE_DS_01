/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SuperstoreRecord {
  orderId: string;
  orderDate: string; // YYYY-MM-DD
  shipDate: string;  // YYYY-MM-DD
  customerId: string;
  customerName: string;
  segment: "Consumer" | "Corporate" | "Home Office";
  country: string;
  city: string;
  state: string;
  region: "East" | "West" | "Central" | "South";
  productId: string;
  category: "Technology" | "Furniture" | "Office Supplies";
  subCategory: string;
  productName: string;
  sales: number;
  quantity: number;
  discount: number; // e.g. 0.2 means 20%
  profit: number;
}

export interface KPIMetrics {
  totalSales: number;
  totalProfit: number;
  avgProfitMargin: number;
  totalOrders: number;
  avgOrderValue: number;
  avgDiscount: number;
  salesGrowth: number;
  profitGrowth: number;
}

export interface CategoryStats {
  category: string;
  sales: number;
  profit: number;
  profitMargin: number;
  quantity: number;
}

export interface RegionStats {
  region: string;
  sales: number;
  profit: number;
  profitMargin: number;
}

export interface MonthlyTrend {
  month: string; // YYYY-MM
  sales: number;
  profit: number;
  orders: number;
}

export interface CustomerStats {
  customerName: string;
  segment: string;
  orders: number;
  sales: number;
  profit: number;
}

export interface SlideData {
  number: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  notes: string;
}
