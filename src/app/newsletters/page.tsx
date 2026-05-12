import Link from "next/link";
import { ArrowRight, Calendar, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { newsletters } from "@/lib/data";

export default function NewslettersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Page Header */}
        <section className="bg-[#0a2141] rounded-b-[3rem] sm:rounded-b-[4rem]">
          <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-20 pb-12 sm:pb-16 text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10">
              <BarChart3 className="w-3.5 h-3.5 text-green-400" />
              <span className="text-[9px] uppercase font-black tracking-widest text-green-400">
                Newsletter Archive
              </span>
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Weekly Newsletters
            </h1>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-white/50 leading-relaxed">
              All editions of the NEPSE SIMPLIFIED weekly newsletter. Catch up on
              past market analysis, insights, and investment ideas.
            </p>
          </div>
        </section>

        {/* Newsletter List */}
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
          <div className="space-y-6">
            {newsletters.map((newsletter, index) => (
              <Link
                key={newsletter.slug}
                href={`/newsletters/${newsletter.slug}`}
                className="group block bg-white rounded-[2rem] shadow-premium hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left: Volume indicator */}
                  <div className="sm:w-48 shrink-0 bg-gradient-to-br from-[#0a2141] to-[#0d2d56] flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                    <span className="text-[9px] uppercase font-black tracking-widest text-white/40 mb-2">
                      Edition
                    </span>
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                      {newsletter.volume.replace("Vol. ", "")}
                    </span>
                    <span className="text-[9px] uppercase font-black tracking-widest text-green-400 mt-1">
                      Volume
                    </span>
                  </div>

                  {/* Right: Content */}
                  <div className="flex-1 p-6 sm:p-8 space-y-3">
                    {/* Top row: Volume badge + Date */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 border border-green-200">
                        <span className="text-[9px] uppercase font-black tracking-widest text-green-700">
                          {newsletter.volume}
                        </span>
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {newsletter.dateRange}
                      </span>

                      {/* Index change pill */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          newsletter.indexPositive
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {newsletter.indexPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        NEPSE {newsletter.indexChange}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {newsletter.marketContext}
                    </p>

                    {/* Quick stats row */}
                    <div className="flex flex-wrap items-center gap-6 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>
                          Index:{" "}
                          <span className="font-semibold text-slate-700">
                            {newsletter.indexClosing}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>
                          Turnover:{" "}
                          <span className="font-semibold text-slate-700">
                            Rs. {newsletter.turnoverThisWeek}
                          </span>
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                        <span>
                          Top:{" "}
                          <span className="font-semibold text-green-600">
                            {newsletter.topSectorName} ({newsletter.topSectorChange})
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Read link */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-sm font-semibold text-green-600 group-hover:text-green-700 transition-colors">
                        Read Newsletter
                      </span>
                      <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
