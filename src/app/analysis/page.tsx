"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";
import { analysisArticles } from "@/lib/data";
import type { AnalysisArticle } from "@/lib/data";
import {
  BarChart3,
  Building2,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  AlertTriangle,
  FileSearch,
} from "lucide-react";

const categories = ["All", "Company Analysis", "Sector Analysis"] as const;
type CategoryFilter = (typeof categories)[number];

function getCategoryFromFilter(filter: CategoryFilter): AnalysisArticle["category"] | null {
  if (filter === "All") return null;
  return filter === "Company Analysis" ? "company" : "sector";
}

function CategoryBadge({ category }: { category: AnalysisArticle["category"] }) {
  if (category === "company") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
        <Building2 className="w-3 h-3" />
        Company Analysis
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
      <TrendingUp className="w-3 h-3" />
      Sector Analysis
    </span>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function AnalysisCard({ article }: { article: AnalysisArticle }) {
  return (
    <article className="group bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col">
      {/* Color accent bar */}
      <div
        className={`h-1.5 ${
          article.category === "company" ? "bg-blue-500" : "bg-green-500"
        }`}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Category + Date */}
        <div className="flex items-center justify-between mb-4">
          <CategoryBadge category={article.category} />
          <span className="text-[11px] text-slate-400">{formatDate(article.date)}</span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-[#0a2141] leading-snug mb-3 group-hover:text-green-700 transition-colors">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-lg bg-slate-50 text-[11px] font-semibold text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom: ReadTime + Link */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <Link
            href={`/analysis/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group/link"
          >
            Read Analysis
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function AnalysisPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredArticles = analysisArticles.filter((article) => {
    const cat = getCategoryFromFilter(activeFilter);
    if (!cat) return true;
    return article.category === cat;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-[#0a2141] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
              <FileSearch className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                Research &amp; Analysis
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Analysis &amp; Reports
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              Deep dives into companies and sectors listed on NEPSE
            </p>
          </div>
        </section>

        {/* Ad Space */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
          <AdPlaceholder size="banner" />
        </div>

        {/* Category Tabs + Articles */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#0a2141] text-white shadow-premium"
                      : "bg-white text-slate-500 hover:text-[#0a2141] hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
            <span className="ml-auto text-xs text-slate-400 hidden sm:block">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <AnalysisCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No articles found for this category.</p>
            </div>
          )}
        </section>

        {/* Coming Soon + Subscribe */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-8 sm:p-12">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 mb-4">
                <FileSearch className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#0a2141] mb-3">
                More Analysis Coming Soon
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We&apos;re working on new deep-dive analyses of companies and sectors. Stay updated
                by subscribing to our newsletter.
              </p>
            </div>
            <div className="max-w-lg mx-auto">
              <SubscribeForm variant="inline" />
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-50 border border-amber-200/60">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">
                Disclaimer
              </p>
              <p className="text-sm text-amber-800/80 leading-relaxed">
                All analysis is for educational purposes only. Not financial advice. Always do your
                own research before making investment decisions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
