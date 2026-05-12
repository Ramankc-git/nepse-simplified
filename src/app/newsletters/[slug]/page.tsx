import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import NewsletterTemplate, {
  type NewsletterData,
} from "@/components/newsletter/NewsletterTemplate";
import { getNewsletter, newsletters } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = getNewsletter(slug);

  if (!newsletter) {
    return {
      title: "Newsletter Not Found — NEPSE SIMPLIFIED",
    };
  }

  return {
    title: `${newsletter.volume} — NEPSE SIMPLIFIED Weekly Newsletter`,
    description: newsletter.marketContext.slice(0, 160),
    openGraph: {
      title: `${newsletter.volume} — NEPSE SIMPLIFIED`,
      description: newsletter.marketContext.slice(0, 160),
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return newsletters.map((n) => ({
    slug: n.slug,
  }));
}

export default async function IndividualNewsletterPage({ params }: PageProps) {
  const { slug } = await params;
  const newsletter = getNewsletter(slug);

  if (!newsletter) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 px-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-50">
              <span className="text-4xl">📄</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-[#0a2141]">
              Newsletter Not Found
            </h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              The newsletter edition you&apos;re looking for doesn&apos;t exist or
              may have been moved. Browse our available editions below.
            </p>
            <Link
              href="/newsletters"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a2141] hover:bg-[#0d2d56] text-white text-sm font-bold rounded-2xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse All Newsletters
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link
              href="/"
              className="hover:text-[#0a2141] transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/newsletters"
              className="hover:text-[#0a2141] transition-colors"
            >
              Newsletters
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600 font-semibold">
              {newsletter.volume}
            </span>
          </nav>
        </div>
      </div>

      {/* Newsletter Content */}
      <main className="flex-1">
        <NewsletterTemplate data={newsletter as NewsletterData} />
      </main>

      <Footer />
    </div>
  );
}
