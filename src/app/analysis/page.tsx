import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllAnalysisArticles } from "@/lib/merged-data";
import type { AnalysisArticle } from "@/lib/data";
import AnalysisClient from "./AnalysisClient";

export const metadata: Metadata = {
  title: "Analysis | NEPSE SIMPLIFIED",
  description:
    "In-depth company and sector analysis for the Nepal Stock Exchange. Fundamental and technical analysis of NEPSE-listed companies to support informed investment decisions.",
  openGraph: {
    title: "Analysis | NEPSE SIMPLIFIED",
    description:
      "In-depth company and sector analysis for NEPSE-listed companies to support informed investment decisions.",
    url: "https://nepsesimplified.com/analysis",
  },
  alternates: { canonical: "/analysis" },
};

export default function AnalysisPage() {
  const articles = getAllAnalysisArticles();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AnalysisClient articles={articles} />
      <Footer />
    </div>
  );
}
