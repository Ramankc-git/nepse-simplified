import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllAnalysisArticles } from "@/lib/merged-data";
import type { AnalysisArticle } from "@/lib/data";
import AnalysisClient from "./AnalysisClient";

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
