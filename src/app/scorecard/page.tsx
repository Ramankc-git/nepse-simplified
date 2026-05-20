import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllScorecardStocks } from "@/lib/merged-data";
import ScorecardClient from "./ScorecardClient";

export const metadata: Metadata = {
  title: "Scorecard | NEPSE SIMPLIFIED",
  description:
    "Evaluate NEPSE-listed stocks using a weighted multi-factor scoring system. Adjust weights, compare sectors, and find your next investment opportunity.",
  openGraph: {
    title: "NEPSE Scorecard | NEPSE SIMPLIFIED",
    description:
      "Evaluate NEPSE-listed stocks using a weighted multi-factor scoring system. Adjust weights to match your investment strategy.",
    url: "https://nepsesimplified.com/scorecard",
  },
  alternates: { canonical: "/scorecard" },
};

export default function ScorecardPage() {
  const stocks = getAllScorecardStocks();

  // Determine lastUpdated from the most recent file modification in content/scorecard-stocks/
  let lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  try {
    const scorecardDir = path.join(process.cwd(), "content", "scorecard-stocks");
    if (fs.existsSync(scorecardDir)) {
      const files = fs.readdirSync(scorecardDir);
      let latestMtime = 0;
      for (const file of files) {
        if (file.endsWith(".md") || file.endsWith(".mdx")) {
          const stat = fs.statSync(path.join(scorecardDir, file));
          if (stat.mtimeMs > latestMtime) {
            latestMtime = stat.mtimeMs;
          }
        }
      }
      if (latestMtime > 0) {
        lastUpdated = new Date(latestMtime).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }
  } catch {
    // Fall back to current date
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScorecardClient initialStocks={stocks} lastUpdated={lastUpdated} />
      <Footer />
    </div>
  );
}
