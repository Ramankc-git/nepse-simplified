// NEPSE Market Data Integration
// ========================================
// NEPSE's official API (nepalstock.com) requires authentication — it returns 401 for unauthenticated requests.
// Third-party APIs (nepsealpha.com, heroku apps) are behind Cloudflare or offline.
//
// CURRENT STATE: This module serves static/sample data instantly.
//
// HOW TO CONNECT A REAL DATA SOURCE:
// 1. NEPSE Official: Contact NEPSE for API access, or use browser cookies via a proxy.
// 2. Third-party: Use services like Sharesansar API (paid) or set up a CORS proxy.
// 3. Custom: Add your own API URL to the NEPSE_APIS array below.
//
// To update data manually, edit the getSampleMarketData() function below.

export interface NepseIndex {
  value: number;
  change: number;
  changePercent: number;
}

export interface NepseStock {
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  turnover: number;
}

export interface NepseSector {
  name: string;
  index: number;
  change: number;
  changePercent: number;
}

export interface MarketDataResult {
  timestamp: string;
  nepseIndex: NepseIndex;
  turnover: number;
  turnoverChange: number;
  topGainers: NepseStock[];
  topLosers: NepseStock[];
  sectorIndices: NepseSector[];
  source: "api" | "manual";
  dataSource: string;
}

// ============================================================
// API Sources — add your working API endpoint here
// ============================================================
// If you get access to a working NEPSE data API, add it below.
// The fetcher will try each endpoint with a short timeout (3s).
const NEPSE_APIS: { name: string; url: string }[] = [
  // Example: { name: "My NEPSE Proxy", url: "https://my-proxy.example.com/api/nepse" },
  // NEPSE official API requires auth — uncomment if you have credentials:
  // { name: "NEPSE Official", url: "https://www.nepalstock.com/api/nots/market-summary" },
];

// ============================================================
// Editable Sample Data — update these values manually
// This data is shown on the Market Data page when no API is connected.
// ============================================================
function getSampleMarketData(): MarketDataResult {
  return {
    timestamp: "2026-05-12T10:45:00+05:45", // Update to latest trading session timestamp
    nepseIndex: {
      value: 2768.41,
      change: 22.76,
      changePercent: 0.83,
    },
    turnover: 19.45, // in Billions (Rs.)
    turnoverChange: 13.6,
    topGainers: [
      { symbol: "JHPL", name: "Jhapa Power", ltp: 425.0, change: 65.0, changePercent: 18.06, open: 360.0, high: 430.0, low: 358.0, volume: 125000, turnover: 53125000 },
      { symbol: "SOAL", name: "Siddhartha Oxygen", ltp: 875.0, change: 52.0, changePercent: 6.32, open: 823.0, high: 882.0, low: 820.0, volume: 45000, turnover: 39375000 },
      { symbol: "LSCF", name: "Life Insurance Corp", ltp: 680.0, change: 38.5, changePercent: 6.0, open: 641.5, high: 685.0, low: 638.0, volume: 28000, turnover: 19040000 },
      { symbol: "CBBL", name: "Citizen Bank Int'l", ltp: 342.0, change: 18.0, changePercent: 5.56, open: 324.0, high: 345.0, low: 322.0, volume: 85000, turnover: 29070000 },
      { symbol: "PBL", name: "Prabhu Bank", ltp: 148.5, change: 7.5, changePercent: 5.32, open: 141.0, high: 150.0, low: 140.0, volume: 220000, turnover: 32670000 },
    ],
    topLosers: [
      { symbol: "SWBBL", name: "Swabhiman Laghubitta", ltp: 512.0, change: -36.0, changePercent: -6.57, open: 548.0, high: 550.0, low: 510.0, volume: 32000, turnover: 16384000 },
      { symbol: "GMFBS", name: "Global IME Micro", ltp: 78.5, change: -5.0, changePercent: -5.99, open: 83.5, high: 84.0, low: 78.0, volume: 180000, turnover: 14130000 },
      { symbol: "LBBL", name: "Lumbini Bikas Bank", ltp: 298.0, change: -14.0, changePercent: -4.49, open: 312.0, high: 314.0, low: 296.0, volume: 42000, turnover: 12516000 },
      { symbol: "NLIC", name: "Nepal Life Insurance", ltp: 2150.0, change: -95.0, changePercent: -4.23, open: 2245.0, high: 2250.0, low: 2140.0, volume: 5500, turnover: 11825000 },
      { symbol: "SLBSL", name: "Sanima Laghubitta", ltp: 1650.0, change: -62.0, changePercent: -3.62, open: 1712.0, high: 1720.0, low: 1640.0, volume: 8500, turnover: 14025000 },
    ],
    sectorIndices: [
      { name: "Commercial Banking", index: 3125.45, change: 28.12, changePercent: 0.91 },
      { name: "Development Banking", index: 1456.78, change: -34.11, changePercent: -2.29 },
      { name: "Finance", index: 987.32, change: 33.78, changePercent: 3.54 },
      { name: "Hydro Power", index: 2456.89, change: 52.34, changePercent: 2.17 },
      { name: "Investment", index: 876.54, change: 12.45, changePercent: 1.44 },
      { name: "Manufacturing", index: 1567.23, change: 8.9, changePercent: 0.57 },
      { name: "Mutual Fund", index: 45.67, change: -0.34, changePercent: -0.74 },
      { name: "Life Insurance", index: 5678.9, change: -45.67, changePercent: -0.80 },
      { name: "Non-Life Insurance", index: 2345.67, change: 34.56, changePercent: 1.50 },
      { name: "Microfinance", index: 1234.56, change: -51.23, changePercent: -3.98 },
      { name: "Trading", index: 678.9, change: 12.34, changePercent: 1.85 },
      { name: "Hotels & Tourism", index: 1890.12, change: 23.45, changePercent: 1.26 },
      { name: "Others", index: 567.89, change: -5.67, changePercent: -0.99 },
    ],
    source: "manual" as const,
    dataSource: "Sample data — edit src/lib/nepse-api.ts to update, or add an API endpoint for live data",
  };
}

export async function fetchMarketData(): Promise<MarketDataResult> {
  // If no APIs are configured, return sample data instantly (no waiting)
  if (NEPSE_APIS.length === 0) {
    return getSampleMarketData();
  }

  // Try each configured API source with a short timeout
  for (const api of NEPSE_APIS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

      const response = await fetch(api.url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "NEPSE-Simplified-Bot/1.0",
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const data = await response.json();

      if (data && (data.index || data.nepseIndex)) {
        return {
          timestamp: new Date().toISOString(),
          nepseIndex: {
            value: Number(data.index || data.nepseIndex?.value || 0),
            change: Number(data.change || data.nepseIndex?.change || 0),
            changePercent: Number(
              data.changePercent || data.nepseIndex?.changePercent || 0
            ),
          },
          turnover: Number(data.totalTurnover || data.turnover || 0),
          turnoverChange: Number(data.turnoverChange || 0),
          topGainers: (data.topGainers || []).slice(0, 5).map(
            (s: Record<string, unknown>) => ({
              symbol: String(s.symbol || ""),
              name: String(s.name || ""),
              ltp: Number(s.ltp || 0),
              change: Number(s.change || 0),
              changePercent: Number(s.changePercent || 0),
              open: Number(s.open || 0),
              high: Number(s.high || 0),
              low: Number(s.low || 0),
              volume: Number(s.volume || 0),
              turnover: Number(s.turnover || 0),
            })
          ),
          topLosers: (data.topLosers || []).slice(0, 5).map(
            (s: Record<string, unknown>) => ({
              symbol: String(s.symbol || ""),
              name: String(s.name || ""),
              ltp: Number(s.ltp || 0),
              change: Number(s.change || 0),
              changePercent: Number(s.changePercent || 0),
              open: Number(s.open || 0),
              high: Number(s.high || 0),
              low: Number(s.low || 0),
              volume: Number(s.volume || 0),
              turnover: Number(s.turnover || 0),
            })
          ),
          sectorIndices: (data.sectorIndices || []).map(
            (s: Record<string, unknown>) => ({
              name: String(s.name || ""),
              index: Number(s.index || 0),
              change: Number(s.change || 0),
              changePercent: Number(s.changePercent || 0),
            })
          ),
          source: "api" as const,
          dataSource: api.name,
        };
      }
    } catch {
      continue;
    }
  }

  // All APIs failed — return sample data instantly
  return getSampleMarketData();
}
