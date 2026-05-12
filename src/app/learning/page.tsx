"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";
import { learningArticles } from "@/lib/data";
import type { LearningArticle } from "@/lib/data";
import {
  GraduationCap,
  BookOpen,
  Calculator,
  LineChart,
  Ticket,
  Calendar,
  Clock,
  ArrowRight,
  Lightbulb,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const categories = ["All", "Fundamentals", "Valuation", "Technical Analysis", "IPO"] as const;
type CategoryFilter = (typeof categories)[number];

const categoryConfig: Record<string, { color: string; bgColor: string; icon: React.ElementType }> = {
  Fundamentals: { color: "text-blue-700", bgColor: "bg-blue-50", icon: BookOpen },
  Valuation: { color: "text-purple-700", bgColor: "bg-purple-50", icon: Calculator },
  "Technical Analysis": { color: "text-orange-700", bgColor: "bg-orange-50", icon: LineChart },
  IPO: { color: "text-emerald-700", bgColor: "bg-emerald-50", icon: Ticket },
};

function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category] || {
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    icon: BookOpen,
  };
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bgColor} ${config.color} text-[10px] font-bold uppercase tracking-wider`}
    >
      <Icon className="w-3 h-3" />
      {category}
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

function LearningCard({ article }: { article: LearningArticle }) {
  return (
    <article className="group bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden hover:shadow-lg hover:border-slate-200 transition-all duration-300 flex flex-col">
      {/* Color accent bar */}
      <div
        className={`h-1.5 ${
          categoryConfig[article.category]?.bgColor === "bg-blue-50"
            ? "bg-blue-500"
            : categoryConfig[article.category]?.bgColor === "bg-purple-50"
              ? "bg-purple-500"
              : categoryConfig[article.category]?.bgColor === "bg-orange-50"
                ? "bg-orange-500"
                : "bg-emerald-500"
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
            href={`/learning/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors group/link"
          >
            Read Guide
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function LearningPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredArticles = learningArticles.filter((article) => {
    if (activeFilter === "All") return true;
    return article.category === activeFilter;
  });

  // Beginner articles for the learning path suggestion
  const beginnerArticles = learningArticles
    .filter((a) => a.tags.includes("Beginner"))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-[#0a2141] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
              <GraduationCap className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                Education
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Learning Hub
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              Master the fundamentals of investing in Nepal
            </p>
          </div>
        </section>

        {/* Ad Space */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
          <AdPlaceholder size="banner" />
        </div>

        {/* Category Filter + Articles */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Filter Tabs */}
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
              {filteredArticles.length} guide{filteredArticles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <LearningCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No guides found for this category.</p>
            </div>
          )}
        </section>

        {/* Learning Path Suggestion */}
        {activeFilter === "All" && beginnerArticles.length > 0 && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
            <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-8 sm:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-50">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#0a2141]">
                    New to Investing?
                  </h2>
                  <p className="text-sm text-slate-500">Start with these guides:</p>
                </div>
              </div>

              <div className="space-y-4">
                {beginnerArticles.map((article, index) => {
                  const config = categoryConfig[article.category] || {
                    color: "text-slate-700",
                    bgColor: "bg-slate-100",
                  };
                  return (
                    <Link
                      key={article.slug}
                      href={`/learning/${article.slug}`}
                      className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      {/* Step number */}
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-[#0a2141] text-white flex items-center justify-center font-heading font-bold text-sm">
                        {index + 1}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CategoryBadge category={article.category} />
                          <span className="text-[11px] text-slate-400">{article.readTime}</span>
                        </div>
                        <h3 className="font-heading text-base font-bold text-[#0a2141] group-hover:text-green-700 transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-1">{article.summary}</p>
                      </div>

                      {/* Arrow */}
                      <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-green-600 shrink-0 mt-1 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-gradient-to-br from-[#0a2141] to-[#0a2141]/90 rounded-[2.5rem] p-8 sm:p-14 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4">
                  <Sparkles className="w-7 h-7 text-green-400" />
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  Never Stop Learning
                </h2>
                <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
                  Subscribe to get new guides, tutorials, and market insights delivered to your
                  inbox every week. Level up your investing game.
                </p>
              </div>
              <div className="max-w-xl mx-auto">
                <SubscribeForm variant="hero" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
