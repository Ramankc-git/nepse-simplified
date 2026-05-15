import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllLearningArticles } from "@/lib/merged-data";
import type { LearningArticle } from "@/lib/data";
import LearningClient from "./LearningClient";

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
