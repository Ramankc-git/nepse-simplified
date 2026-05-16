import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllLearningArticles } from "@/lib/merged-data";
import type { LearningArticle } from "@/lib/data";
import LearningClient from "./LearningClient";

export const metadata: Metadata = {
  title: "Learning Hub | NEPSE SIMPLIFIED",
  description:
    "Learn stock market investing with beginner-friendly tutorials on NEPSE fundamentals, valuation, technical analysis, IPOs, and market psychology. Free educational resources for Nepali investors.",
  openGraph: {
    title: "Learning Hub | NEPSE SIMPLIFIED",
    description:
      "Beginner-friendly tutorials on NEPSE fundamentals, valuation, technical analysis, IPOs, and market psychology.",
    url: "https://nepsesimplified.com/learning",
  },
  alternates: { canonical: "/learning" },
};

export default function LearningPage() {
  const articles = getAllLearningArticles();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LearningClient articles={articles} />
      <Footer />
    </div>
  );
}
