import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Mail,
  Facebook,
  Shield,
  BarChart3,
  BookOpen,
  LineChart,
  CalendarDays,
  Target,
  Eye,
  AlertTriangle,
  Heart,
  TrendingUp,
  Users,
  Info,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0a2141] py-20 sm:py-28 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-500/5 rounded-full translate-y-1/2" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
              <Info className="w-4 h-4 text-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                Our Story
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
              About NEPSE SIMPLIFIED
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              Making Nepal&apos;s stock market accessible to everyone through clear, unbiased,
              and actionable insights.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="nepse-label text-green-600">Purpose</p>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0a2141]">
                  Our Mission
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-8 sm:p-10">
              <p className="text-sm text-slate-600 leading-relaxed text-lg">
                NEPSE SIMPLIFIED was created with a simple mission:{" "}
                <span className="font-semibold text-[#0a2141]">
                  to make Nepal&apos;s stock market accessible to everyone.
                </span>{" "}
                We believe that every Nepali investor deserves clear, unbiased, and actionable market
                insights — without the jargon.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 leading-relaxed">
                  Whether you&apos;re a complete beginner trying to understand what NEPSE is, or an
                  experienced investor looking for deeper analysis, we&apos;re here to help you
                  navigate the market with confidence. We break down complex financial concepts into
                  simple, digestible content that anyone can understand and apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Cover */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="text-center mb-12">
            <p className="nepse-label text-green-600 mb-2">Content</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a2141] tracking-tight">
              What We Cover
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Weekly Newsletter */}
            <div className="group bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#0a2141] mb-3">
                Weekly Newsletter
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our flagship weekly newsletter breaks down market movements, sector performance, and
                key events into digestible insights.
              </p>
            </div>

            {/* Company Analysis */}
            <div className="group bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-5 group-hover:bg-green-100 transition-colors">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#0a2141] mb-3">
                Company Analysis
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                In-depth fundamental and technical analysis of individual companies listed on NEPSE.
              </p>
            </div>

            {/* Learning Resources */}
            <div className="group bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#0a2141] mb-3">
                Learning Resources
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Step-by-step guides, tutorials, and explainers designed for investors at every level.
              </p>
            </div>

            {/* Market Data */}
            <div className="group bg-white rounded-[2.5rem] shadow-premium border border-slate-100 p-6 sm:p-8 hover:shadow-lg hover:border-slate-200 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-5 group-hover:bg-orange-100 transition-colors">
                <LineChart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-heading text-base font-bold text-[#0a2141] mb-3">
                Market Data
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Real-time market snapshots, IPO tracker, and event calendar to keep you informed.
              </p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="nepse-label text-green-600 mb-2">Methodology</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0a2141] tracking-tight">
                Our Approach
              </h2>
              <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto leading-relaxed">
                We follow a principled approach to market analysis and education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Data-driven */}
              <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-[#f8fafc] border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#0a2141] mb-2">
                    Data-Driven Analysis
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Every insight we share is backed by data — from financial statements to market
                    trends. We let the numbers tell the story.
                  </p>
                </div>
              </div>

              {/* Educational Focus */}
              <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-[#f8fafc] border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#0a2141] mb-2">
                    Educational Focus
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We don&apos;t just tell you what to think — we teach you how to think about
                    markets. Our goal is to empower informed decision-making.
                  </p>
                </div>
              </div>

              {/* Transparency */}
              <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-[#f8fafc] border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#0a2141] mb-2">
                    Transparency &amp; Honesty
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We highlight both the opportunities and risks. If the data doesn&apos;t support
                    a bullish case, we&apos;ll say so. No sugar-coating.
                  </p>
                </div>
              </div>

              {/* Risk Awareness */}
              <div className="flex items-start gap-4 p-6 rounded-[2rem] bg-[#f8fafc] border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#0a2141] mb-2">
                    Risk Awareness
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    We always discuss potential downsides and risk factors. Protecting your capital
                    is just as important as growing it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50/80 rounded-[2.5rem] border border-amber-200/60 p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-bold text-amber-900 mb-3">
                    Important Financial Disclaimer
                  </h2>
                  <p className="text-sm text-amber-800/80 leading-relaxed">
                    All content on NEPSE SIMPLIFIED is for educational and informational purposes only.
                    It should not be considered financial advice. Always conduct your own research and
                    consult with a qualified financial advisor before making investment decisions. Past
                    performance is not indicative of future results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connect With Us */}
        <section className="bg-[#0a2141] py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
                <Heart className="w-4 h-4 text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                  Get In Touch
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                Connect With Us
              </h2>
              <p className="text-sm text-white/50 max-w-lg mx-auto leading-relaxed mb-10">
                Have questions or suggestions? We&apos;d love to hear from you. Follow us on social
                media or reach out via email.
              </p>

              {/* Social Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
                {/* Facebook */}
                <a
                  href="https://facebook.com/nepsesimplified"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow NEPSE SIMPLIFIED on Facebook"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 text-white/70 group-hover:text-green-400 transition-colors" />
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    Facebook
                  </span>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com/@nepsesimplified"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow NEPSE SIMPLIFIED on TikTok"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-white/70 group-hover:text-green-400 transition-colors"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.15V11.7a4.83 4.83 0 01-3.77-1.85V6.69h3.77z" />
                  </svg>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    TikTok
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@nepsesimplified.com"
                  aria-label="Email NEPSE SIMPLIFIED"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-green-400 transition-colors" />
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    Email
                  </span>
                </a>
              </div>

              {/* Bottom text */}
              <p className="text-xs text-white/30 mt-10 leading-relaxed max-w-md mx-auto">
                NEPSE SIMPLIFIED is an independent educational platform. We are not affiliated with
                NEPSE, SEBON, or any brokerage firm.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
