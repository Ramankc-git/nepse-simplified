import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";
import { analysisArticles, getAnalysisArticle } from "@/lib/data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Building2,
  TrendingUp,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getAnalysisArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | NEPSE SIMPLIFIED",
    };
  }

  return {
    title: `${article.title} | NEPSE SIMPLIFIED`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export function generateStaticParams() {
  return analysisArticles.map((article) => ({
    slug: article.slug,
  }));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AnalysisArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getAnalysisArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
              <FileText className="w-10 h-10 text-slate-400" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#0a2141] mb-3">
              Article Not Found
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              The analysis article you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              href="/analysis"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a2141] text-white text-sm font-semibold rounded-2xl hover:bg-[#0a2141]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Analysis
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a2141] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Analysis
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          {/* Category Badge */}
          <div className="mb-5">
            {article.category === "company" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                <Building2 className="w-3 h-3" />
                Company Analysis
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" />
                Sector Analysis
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a2141] leading-tight tracking-tight mb-5">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-slate-200" />
        </div>

        {/* Ad Placeholder */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <AdPlaceholder size="banner" />
        </div>

        {/* Article Body Placeholder */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
            {/* Placeholder Content */}
            <div className="p-8 sm:p-12">
              {/* Summary highlight */}
              <div className="bg-green-50/60 border border-green-200/60 rounded-2xl p-6 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-700 mb-2">
                  Summary
                </p>
                <p className="text-sm text-green-900/80 leading-relaxed italic">
                  {article.summary}
                </p>
              </div>

              {/* Placeholder skeleton */}
              <div className="space-y-6">
                {/* Paragraph 1 */}
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded-lg" />
                </div>

                {/* Subheading */}
                <div className="h-5 w-2/5 bg-slate-200 rounded-lg mt-8" />

                {/* Paragraph 2 */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-4/5 bg-slate-100 rounded-lg" />
                </div>

                {/* Chart placeholder */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 h-48 sm:h-64 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Chart / Visual Analysis
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Charts and data visualizations will appear here
                    </p>
                  </div>
                </div>

                {/* Subheading */}
                <div className="h-5 w-3/5 bg-slate-200 rounded-lg mt-8" />

                {/* Paragraph 3 */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded-lg" />
                </div>

                {/* Key metrics placeholder */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-center"
                    >
                      <div className="h-3 w-12 bg-slate-200 rounded mx-auto mb-2" />
                      <div className="h-6 w-16 bg-slate-300 rounded mx-auto" />
                    </div>
                  ))}
                </div>

                {/* Final paragraph */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
                </div>
              </div>

              {/* Coming soon notice */}
              <div className="mt-10 pt-8 border-t border-slate-200 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2141]/5 mb-3">
                  <FileText className="w-4 h-4 text-[#0a2141]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0a2141]">
                    Article In Progress
                  </span>
                </div>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  This analysis article is being prepared. The full article with detailed
                  analysis, charts, and insights will be available here once the CMS is configured.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Disclaimer */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
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
