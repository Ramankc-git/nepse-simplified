import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";
import { ContentRenderer } from "@/components/common/ContentRenderer";
import ShareLinks from "@/components/common/ShareLinks";
import { getAllLearningArticles, getLearningArticle } from "@/lib/merged-data";
import type { ContentBlock } from "@/lib/data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Calculator,
  LineChart,
  Ticket,
  FileText,
  AlertTriangle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryConfig: Record<
  string,
  { color: string; bgColor: string; icon: React.ElementType }
> = {
  Fundamentals: {
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    icon: BookOpen,
  },
  Valuation: {
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    icon: Calculator,
  },
  "Technical Analysis": {
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    icon: LineChart,
  },
  IPO: {
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    icon: Ticket,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getLearningArticle(slug);

  if (!article) {
    return {
      title: "Guide Not Found | NEPSE SIMPLIFIED",
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

// Revalidate every hour so new CMS content appears automatically
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllLearningArticles().map((article) => ({
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

function collectMetrics(blocks: ContentBlock[]) {
  return blocks.filter((b) => b.type === "metric") as {
    type: "metric";
    label: string;
    value: string;
  }[];
}

export default async function LearningArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getLearningArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
              <FileText className="w-10 h-10 text-slate-400" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-[#0a2141] mb-3">
              Guide Not Found
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              The learning guide you&apos;re looking for doesn&apos;t exist or
              has been moved.
            </p>
            <Link
              href="/learning"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a2141] text-white text-sm font-semibold rounded-2xl hover:bg-[#0a2141]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Learning Hub
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const config = categoryConfig[article.category] || {
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    icon: BookOpen,
  };
  const CategoryIcon = config.icon;

  const metrics = collectMetrics(article.content);
  const nonMetricBlocks = article.content.filter((b) => b.type !== "metric");

  // Find the first heading block to render metrics after the first section
  const firstHeadingIdx = nonMetricBlocks.findIndex(
    (b) => b.type === "heading"
  );
  const secondHeadingIdx = nonMetricBlocks.findIndex(
    (b, i) => i > firstHeadingIdx && b.type === "heading"
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Back Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a2141] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Learning Hub
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          {/* Category Badge */}
          <div className="mb-5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bgColor} ${config.color} text-[10px] font-bold uppercase tracking-wider`}
            >
              <CategoryIcon className="w-3 h-3" />
              {article.category}
            </span>
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

        {/* Article Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
            <div className="p-8 sm:p-12">
              {/* Overview highlight */}
              <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-6 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700 mb-2">
                  Overview
                </p>
                <p className="text-sm text-blue-900/80 leading-relaxed italic">
                  {article.summary}
                </p>
              </div>

              {/* Content before metrics */}
              {firstHeadingIdx >= 0 && secondHeadingIdx > firstHeadingIdx && (
                <>
                  <ContentRenderer
                    blocks={nonMetricBlocks.slice(0, secondHeadingIdx)}
                  />

                  {/* Metrics card after first section */}
                  {metrics.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 my-8">
                      <div className="flex items-center gap-2 mb-4">
                        <Calculator className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Key Metrics
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                        {metrics.map((metric, i) => (
                          <div key={i} className="flex items-baseline justify-between gap-2">
                            <span className="text-xs text-slate-500 shrink-0">{metric.label}</span>
                            <span className="text-sm font-bold text-[#0a2141] text-right">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining content */}
                  {secondHeadingIdx < nonMetricBlocks.length && (
                    <ContentRenderer
                      blocks={nonMetricBlocks.slice(secondHeadingIdx)}
                    />
                  )}
                </>
              )}

              {/* Fallback: render all content without metrics separation */}
              {(firstHeadingIdx < 0 || secondHeadingIdx <= firstHeadingIdx) && (
                <ContentRenderer blocks={nonMetricBlocks} />
              )}

              {/* Remaining metrics (if more than 6) */}
              {metrics.length > 6 && (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 my-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      More Metrics
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                    {metrics.slice(6).map((metric, i) => (
                      <div key={`extra-${i}`} className="flex items-baseline justify-between gap-2">
                        <span className="text-xs text-slate-500 shrink-0">{metric.label}</span>
                        <span className="text-sm font-bold text-[#0a2141] text-right">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Share Links */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <ShareLinks title={article.title} />
        </section>

        {/* Disclaimer */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-50 border border-amber-200/60">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">
                Disclaimer
              </p>
              <p className="text-sm text-amber-800/80 leading-relaxed">
                All content is for educational purposes only. Not financial
                advice. Always do your own research before making investment
                decisions.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
