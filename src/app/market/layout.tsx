import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Data | NEPSE SIMPLIFIED",
  description:
    "Weekly NEPSE index comparison, top gainers & losers, sector performance, and turnover data for the Nepal Stock Exchange. Updated every Friday.",
  openGraph: {
    title: "Market Data | NEPSE SIMPLIFIED",
    description:
      "Weekly NEPSE index comparison, top gainers & losers, sector performance, and turnover data.",
    url: "https://nepsesimplified.com/market",
  },
  alternates: { canonical: "/market" },
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
