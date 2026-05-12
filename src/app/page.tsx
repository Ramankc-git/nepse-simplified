import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  BookOpen,
  BarChart3,
  Calendar,
  Clock,
  Tag,
  Info,
  Zap,
  Globe,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SubscribeForm } from "@/components/common/SubscribeForm";
import { AdPlaceholder } from "@/components/common/AdPlaceholder";
import {
  newsletters,
  analysisArticles,
  learningArticles,
  getLatestNewsletter,
  marketEvents,
} from "@/lib/data";

export default function Home() {
  const latestNewsletter = getLatestNewsletter();
  const upcomingEvents = marketEvents
    .filter((e) => e.status === "upcoming" || e.status === "open")
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main className="flex-1">
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative overflow-hidden">
          {/* Navy background accent */}
          <div className="absolute inset-0 bg-[#0a2141] rounded-b-[3rem] sm:rounded-b-[4rem]" />
          <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-20 sm:pb-28">
            <div className="text-center space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10">
                <BarChart3 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[9px] uppercase font-black tracking-widest text-green-400">
                  Nepal&apos;s Stock Market Newsletter
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                NEPSE
                <span className="block text-green-400">SIMPLIFIED</span>
              </h1>

              {/* Tagline */}
              <p className="text-lg sm:text-xl text-white/70 font-medium tracking-wide">
                Understand &bull; Interpret &bull; Invest Smart
              </p>

              {/* Description */}
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/50 leading-relaxed">
                We break down Nepal Stock Exchange data into clear, actionable
                insights. Whether you&apos;re a beginner or a seasoned investor,
                our weekly newsletter helps you make informed decisions.
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 sm:gap-12 pt-4">
                {[
                  { icon: Globe, value: "Weekly", label: "Newsletter" },
                  { icon: Users, value: "2,500+", label: "Subscribers" },
                  { icon: Zap, value: "Free", label: "Forever" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <stat.icon className="w-4 h-4 text-green-400" />
                    <div className="text-left">
                      <p className="text-sm font-bold text-white">
                        {stat.value}
                      </p>
                      <p className="text-[9px] uppercase font-black tracking-widest text-white/40">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe form */}
            <div className="mt-12">
              <SubscribeForm variant="hero" />
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 space-y-20 py-16 sm:py-20">
          {/* ==================== LATEST NEWSLETTER PREVIEW ==================== */}
          {latestNewsletter && (
            <section id="newsletters">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#0a2141] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </span>
                <h2 className="font-heading text-2xl font-bold text-[#0a2141] uppercase tracking-tight">
                  Latest Newsletter
                </h2>
                <div className="flex-1 h-px bg-slate-200 min-w-[2rem]" />
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-premium overflow-hidden">
                {/* Green accent bar */}
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-green-400" />
                <div className="p-6 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      {/* Volume badge */}
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 border border-green-200">
                          <span className="text-[9px] uppercase font-black tracking-widest text-green-700">
                            {latestNewsletter.volume}
                          </span>
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {latestNewsletter.dateRange}
                        </span>
                      </div>

                      {/* Market headline */}
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0a2141] tracking-tight leading-snug">
                        NEPSE closes at {latestNewsletter.indexClosing} &mdash;{" "}
                        {latestNewsletter.indexChangePoints} ({latestNewsletter.indexChange})
                      </h3>

                      {/* Summary excerpt */}
                      <p className="text-sm text-slate-600 leading-relaxed max-w-2xl line-clamp-3">
                        {latestNewsletter.marketContext}
                      </p>

                      {/* Quick stats */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          {latestNewsletter.indexPositive ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              latestNewsletter.indexPositive
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            {latestNewsletter.indexChange} this week
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-500">
                            Turnover:{" "}
                            <span className="font-semibold text-slate-700">
                              Rs. {latestNewsletter.turnoverThisWeek}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Read button */}
                    <Link
                      href={`/newsletters/${latestNewsletter.slug}`}
                      className="group inline-flex items-center gap-2 px-6 py-3.5 bg-[#0a2141] hover:bg-[#0d2d56] text-white text-sm font-bold rounded-2xl transition-colors shrink-0"
                    >
                      Read Full Newsletter
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Ad Banner */}
          <AdPlaceholder size="banner" />

          {/* ==================== MARKET SNAPSHOT ==================== */}
          {latestNewsletter && (
            <section id="market-data">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#0a2141] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  2
                </span>
                <h2 className="font-heading text-2xl font-bold text-[#0a2141] uppercase tracking-tight">
                  Market at a Glance
                </h2>
                <div className="flex-1 h-px bg-slate-200 min-w-[2rem]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* NEPSE Index */}
                <div className="bg-white rounded-[2rem] shadow-premium p-6 text-center">
                  <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-3">
                    NEPSE Index
                  </p>
                  <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0a2141]">
                    {latestNewsletter.indexClosing}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-bold ${
                      latestNewsletter.indexPositive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {latestNewsletter.indexPositive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {latestNewsletter.indexChange}{" "}
                    {latestNewsletter.indexChangePoints}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    As of {latestNewsletter.asOfDate}
                  </p>
                </div>

                {/* Turnover */}
                <div className="bg-white rounded-[2rem] shadow-premium p-6 text-center">
                  <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-3">
                    Weekly Turnover
                  </p>
                  <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0a2141]">
                    Rs. {latestNewsletter.turnoverThisWeek}
                  </p>
                  <div
                    className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-bold ${
                      latestNewsletter.turnoverPositive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {latestNewsletter.turnoverPositive ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {latestNewsletter.turnoverChange} vs prev week
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    Prev: Rs. {latestNewsletter.turnoverPrevWeek}
                  </p>
                </div>

                {/* Top Sectors */}
                <div className="bg-white rounded-[2rem] shadow-premium p-6 text-center">
                  <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-3">
                    Top Performing Sectors
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        {latestNewsletter.topSectorName}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {latestNewsletter.topSectorChange}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        {latestNewsletter.secondSectorName}
                      </span>
                      <span className="text-sm font-bold text-green-600">
                        {latestNewsletter.secondSectorChange}
                      </span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Laggard</span>
                      <span className="text-xs font-semibold text-red-500">
                        {latestNewsletter.laggardSector}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/market"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a2141] hover:text-green-600 transition-colors group"
                >
                  View Full Market Data
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </section>
          )}

          {/* Ad Banner */}
          <AdPlaceholder size="banner" />

          {/* ==================== FEATURED CONTENT GRID ==================== */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#0a2141] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                3
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#0a2141] uppercase tracking-tight">
                Featured Content
              </h2>
              <div className="flex-1 h-px bg-slate-200 min-w-[2rem]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Latest Analysis */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <h3 className="font-heading text-lg font-bold text-[#0a2141] uppercase tracking-tight">
                      Latest Analysis
                    </h3>
                  </div>
                  <Link
                    href="/analysis"
                    className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    View All &rarr;
                  </Link>
                </div>

                <div className="space-y-4">
                  {analysisArticles.slice(0, 2).map((article) => (
                    <Link
                      key={article.slug}
                      href={`/analysis/${article.slug}`}
                      className="group block bg-white rounded-[2rem] shadow-premium p-6 hover:shadow-lg transition-shadow"
                    >
                      {/* Category badge */}
                      <span className="inline-block text-[9px] uppercase font-black tracking-widest text-green-600 mb-2">
                        {article.category === "company"
                          ? "Company Analysis"
                          : "Sector Analysis"}
                      </span>

                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#0a2141] group-hover:text-green-700 transition-colors leading-snug mb-2">
                        {article.title}
                      </h4>

                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
                        {article.summary}
                      </p>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-[10px] font-semibold text-slate-500"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Learning Hub */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <h3 className="font-heading text-lg font-bold text-[#0a2141] uppercase tracking-tight">
                      Learning Hub
                    </h3>
                  </div>
                  <Link
                    href="/learning"
                    className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                  >
                    View All &rarr;
                  </Link>
                </div>

                <div className="space-y-4">
                  {learningArticles.slice(0, 2).map((article) => (
                    <Link
                      key={article.slug}
                      href={`/learning/${article.slug}`}
                      className="group block bg-white rounded-[2rem] shadow-premium p-6 hover:shadow-lg transition-shadow"
                    >
                      {/* Category badge */}
                      <span className="inline-block text-[9px] uppercase font-black tracking-widest text-green-600 mb-2">
                        {article.category}
                      </span>

                      <h4 className="font-heading text-base sm:text-lg font-bold text-[#0a2141] group-hover:text-green-700 transition-colors leading-snug mb-2">
                        {article.title}
                      </h4>

                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
                        {article.summary}
                      </p>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 text-[10px] font-semibold text-slate-500"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Ad Banner */}
          <AdPlaceholder size="banner" />

          {/* ==================== UPCOMING EVENTS ==================== */}
          <section id="events">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#0a2141] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#0a2141] uppercase tracking-tight">
                Upcoming Events
              </h2>
              <div className="flex-1 h-px bg-slate-200 min-w-[2rem]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {upcomingEvents.map((event) => {
                const typeColors: Record<string, string> = {
                  ipo: "bg-green-50 text-green-700 border-green-200",
                  "right-share": "bg-blue-50 text-blue-700 border-blue-200",
                  auction: "bg-orange-50 text-orange-700 border-orange-200",
                  dividend: "bg-emerald-50 text-emerald-700 border-emerald-200",
                  agm: "bg-purple-50 text-purple-700 border-purple-200",
                  policy: "bg-slate-100 text-slate-700 border-slate-200",
                };
                const typeLabels: Record<string, string> = {
                  ipo: "IPO",
                  "right-share": "Right Share",
                  auction: "Auction",
                  dividend: "Dividend",
                  agm: "AGM",
                  policy: "Policy",
                };
                const statusColors: Record<string, string> = {
                  upcoming: "bg-yellow-100 text-yellow-700",
                  open: "bg-green-100 text-green-700",
                  closed: "bg-slate-100 text-slate-500",
                };

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-[2rem] shadow-premium p-6 space-y-4 hover:shadow-lg transition-shadow"
                  >
                    {/* Badges */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[9px] uppercase font-black tracking-widest border ${
                          typeColors[event.type] || typeColors.policy
                        }`}
                      >
                        {typeLabels[event.type] || event.type}
                      </span>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                          statusColors[event.status]
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-heading text-base font-bold text-[#0a2141] leading-snug">
                      {event.title}
                    </h4>

                    {/* Company */}
                    <p className="text-xs text-slate-500">{event.company}</p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.startDate}
                      {event.startDate !== event.endDate &&
                        ` — ${event.endDate}`}
                    </div>

                    {/* Details */}
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {event.details}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a2141] hover:text-green-600 transition-colors group"
              >
                View All Events
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Ad Banner */}
          <AdPlaceholder size="banner" />

          {/* ==================== ABOUT TEASER ==================== */}
          <section>
            <div className="bg-[#0a2141] rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-green-500/10" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-green-500/5" />

              <div className="relative space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/10">
                  <Info className="w-7 h-7 text-green-400" />
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  About NEPSE SIMPLIFIED
                </h2>

                <p className="max-w-2xl mx-auto text-sm text-white/60 leading-relaxed">
                  We&apos;re on a mission to demystify Nepal&apos;s stock
                  market for everyday investors. Through clear analysis,
                  educational content, and weekly market intelligence, we help
                  you cut through the noise and focus on what truly matters for
                  your investment decisions.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a2141] text-sm font-bold rounded-2xl hover:bg-green-50 transition-colors group"
                  >
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/newsletters"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-bold rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    Browse All Newsletters
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
