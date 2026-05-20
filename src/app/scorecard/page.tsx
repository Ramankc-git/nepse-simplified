import type { Metadata } from "next";
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScorecardClient initialStocks={stocks} />
      <Footer />
    </div>
  );
}
