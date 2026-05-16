// NEPSE Market Data Integration
// ========================================
// NEPSE's official API (nepalstock.com) requires authentication — it returns 401 for unauthenticated requests.
// Third-party APIs (nepsealpha.com, heroku apps) are behind Cloudflare or offline.
//
// CURRENT STATE: Tries real NEPSE API endpoints, falls back to sample data.
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
// API Sources — free NEPSE API endpoints with CORS proxy fallback
// ============================================================
const NEPSE_APIS: { name: string; url: string }[] = [
  { name: "NEPSE API", url: "https://nepse-api.onrender.com/api/nepse" },
  { name: "NEPSE CORS Proxy", url: "https://corsproxy.io/?https://nepse-api.onrender.com/api/nepse" },
];

// ============================================================
// Editable Sample Data — matches Vol. 002 newsletter values
// This data is shown on the Market Data page when no API is connected.
// ============================================================
function getSampleMarketData(): MarketDataResult {
  return {
    timestamp: "2026-05-15T15:00:00+05:45", // Vol. 002 close
    nepseIndex: {
      value: 2731.94,
      change: -13.71,
      changePercent: -0.5,
    },
    turnover: 18.45, // in Billions (Rs.)
    turnoverChange: 7.7,
    topGainers: [
      { symbol: "NIFRA", name: "Nepal Infra", ltp: 238.0, change: 12.5, changePercent: 5.54, open: 225.5, high: 240.0, low: 224.0, volume: 185000, turnover: 44030000 },
      { symbol: "HDL", name: "Hydro Dev Ltd", ltp: 312.0, change: 14.0, changePercent: 4.7, open: 298.0, high: 315.0, low: 296.0, volume: 62000, turnover: 19344000 },
      { symbol: "CBBL", name: "Citizen Bank Int'l", ltp: 342.0, change: 14.0, changePercent: 4.26, open: 328.0, high: 345.0, low: 326.0, volume: 78000, turnover: 26676000 },
      { symbol: "NABIL", name: "Nabil Bank", ltp: 1025.0, change: 32.0, changePercent: 3.22, open: 993.0, high: 1030.0, low: 990.0, volume: 45000, turnover: 46125000 },
      { symbol: "PBL", name: "Prabhu Bank", ltp: 148.5, change: 4.5, changePercent: 3.12, open: 144.0, high: 149.5, low: 143.0, volume: 195000, turnover: 28957500 },
    ],
    topLosers: [
      { symbol: "JHPL", name: "Jhapa Power", ltp: 360.0, change: -65.0, changePercent: -15.29, open: 425.0, high: 425.0, low: 355.0, volume: 98000, turnover: 35280000 },
      { symbol: "LBBL", name: "Lumbini Bikas Bank", ltp: 298.0, change: -18.0, changePercent: -5.7, open: 316.0, high: 318.0, low: 295.0, volume: 38000, turnover: 11324000 },
      { symbol: "GMFBS", name: "Global IME Micro", ltp: 78.5, change: -4.5, changePercent: -5.42, open: 83.0, high: 83.5, low: 78.0, volume: 160000, turnover: 12560000 },
      { symbol: "NLIC", name: "Nepal Life Insurance", ltp: 2150.0, change: -100.0, changePercent: -4.44, open: 2250.0, high: 2255.0, low: 2145.0, volume: 4200, turnover: 9030000 },
      { symbol: "SLBSL", name: "Sanima Laghubitta", ltp: 1650.0, change: -62.0, changePercent: -3.62, open: 1712.0, high: 1720.0, low: 1640.0, volume: 8500, turnover: 14025000 },
    ],
    sectorIndices: [
      { name: "Commercial Banking", index: 3125.45, change: 34.2, changePercent: 1.12 },
      { name: "Development Banking", index: 1456.78, change: -18.45, changePercent: -1.25 },
      { name: "Finance", index: 987.32, change: -14.03, changePercent: -1.42 },
      { name: "Hydro Power", index: 2456.89, change: 20.59, changePercent: 0.85 },
      { name: "Investment", index: 876.54, change: 5.26, changePercent: 0.6 },
      { name: "Manufacturing", index: 1567.23, change: -8.92, changePercent: -0.57 },
      { name: "Mutual Fund", index: 45.67, change: -0.12, changePercent: -0.26 },
      { name: "Life Insurance", index: 5678.9, change: -22.71, changePercent: -0.4 },
      { name: "Non-Life Insurance", index: 2345.67, change: 14.07, changePercent: 0.6 },
      { name: "Microfinance", index: 1234.56, change: -38.27, changePercent: -3.0 },
      { name: "Trading", index: 678.9, change: 3.39, changePercent: 0.5 },
      { name: "Hotels & Tourism", index: 1890.12, change: 9.45, changePercent: 0.5 },
      { name: "Others", index: 567.89, change: -2.84, changePercent: -0.5 },
    ],
    source: "manual" as const,
    dataSource: "Derived from Vol. 002 newsletter data (week ending May 15, 2026)",
  };
}

export async function fetchMarketData(): Promise<MarketDataResult> {
  // Try each configured API source with a short timeout
  for (const api of NEPSE_APIS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

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

  // All APIs failed — return sample data
  return getSampleMarketData();
}

// Weekly turnover trend data for charts (based on Vol. 001 and Vol. 002)
export function getWeeklyTurnoverTrend() {
  return [
    { week: "Week 1 (Apr)", turnover: 21.18 },
    { week: "Week 2 (May)", turnover: 17.12 },
    { week: "Week 3 (May)", turnover: 18.45 },
  ];
}
