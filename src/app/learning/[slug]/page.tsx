import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";
import { learningArticles, getLearningArticle } from "@/lib/data";
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
  GraduationCap,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryConfig: Record<string, { color: string; bgColor: string; icon: React.ElementType }> = {
  Fundamentals: { color: "text-blue-700", bgColor: "bg-blue-50", icon: BookOpen },
  Valuation: { color: "text-purple-700", bgColor: "bg-purple-50", icon: Calculator },
  "Technical Analysis": { color: "text-orange-700", bgColor: "bg-orange-50", icon: LineChart },
  IPO: { color: "text-emerald-700", bgColor: "bg-emerald-50", icon: Ticket },
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

export function generateStaticParams() {
  return learningArticles.map((article) => ({
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

export default async function LearningArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getLearningArticle(slug);

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
              Guide Not Found
            </h1>
            <p className="text-sm text-slate-500 mb-6">
              The learning guide you&apos;re looking for doesn&apos;t exist or has been moved.
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
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

        {/* Article Body Placeholder */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 overflow-hidden">
            {/* Placeholder Content */}
            <div className="p-8 sm:p-12">
              {/* Summary highlight */}
              <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-6 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700 mb-2">
                  Overview
                </p>
                <p className="text-sm text-blue-900/80 leading-relaxed italic">
                  {article.summary}
                </p>
              </div>

              {/* Placeholder skeleton — tutorial-style layout */}
              <div className="space-y-6">
                {/* Introduction */}
                <div className="space-y-3">
                  <div className="h-5 w-2/5 bg-slate-200 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded-lg" />
                </div>

                {/* Key concepts box */}
                <div className="bg-green-50/60 border border-green-200/60 rounded-2xl p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-green-700 mb-3">
                    Key Concepts You&apos;ll Learn
                  </p>
                  <div className="space-y-2.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-green-200/60 shrink-0" />
                        <div className="h-3.5 flex-1 bg-green-200/60 rounded" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-step section */}
                <div className="h-5 w-3/5 bg-slate-200 rounded-lg mt-8" />

                {/* Steps */}
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-[#0a2141] text-white flex items-center justify-center text-xs font-bold">
                      {step}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-2/3 bg-slate-100 rounded" />
                      <div className="h-4 w-full bg-slate-100 rounded" />
                      <div className="h-4 w-4/5 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}

                {/* Example/visual placeholder */}
                <div className="bg-slate-50 rounded-2xl border border-slate-200 h-48 sm:h-56 flex items-center justify-center my-6">
                  <div className="text-center">
                    <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Example / Visual Guide
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Step-by-step visuals and examples will appear here
                    </p>
                  </div>
                </div>

                {/* Pro tip */}
                <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-2">
                    Pro Tip
                  </p>
                  <div className="h-4 w-full bg-amber-200/60 rounded" />
                  <div className="h-4 w-3/4 bg-amber-200/60 rounded mt-2" />
                </div>

                {/* Conclusion */}
                <div className="h-5 w-2/5 bg-slate-200 rounded-lg mt-8" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded-lg" />
                  <div className="h-4 w-2/3 bg-slate-100 rounded-lg" />
                </div>
              </div>

              {/* Coming soon notice */}
              <div className="mt-10 pt-8 border-t border-slate-200 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a2141]/5 mb-3">
                  <GraduationCap className="w-4 h-4 text-[#0a2141]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#0a2141]">
                    Guide In Progress
                  </span>
                </div>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  This learning guide is being prepared. The full guide with detailed explanations,
                  examples, and visuals will be available here once the CMS is configured.
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
                All content is for educational purposes only. Not financial advice. Always do your
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
