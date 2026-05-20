import React from "react";
import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Latest Newsletters", href: "/newsletters" },
  { label: "Market Overview", href: "/market" },
  { label: "Stock Scorecard", href: "/scorecard" },
  { label: "Learning Hub", href: "/learning" },
  { label: "Analysis & Reports", href: "/analysis" },
  { label: "Upcoming Events", href: "/events" },
];

const platforms = [
  { label: "Blog", href: "/" },
  { label: "Facebook", href: "https://facebook.com/nepsesimplified", external: true },
  { label: "TikTok", href: "https://tiktok.com/@nepsesimplified", external: true },
];

export function Footer() {
  return (
    <footer className="bg-[#0a2141] text-white mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Platforms */}
          <div>
            <h4 className="brand-font text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
              Platforms
            </h4>
            <ul className="space-y-2.5">
              {platforms.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    {...(p.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-white/70 hover:text-green-400 transition-colors"
                  >
                    {p.label}
                    {p.external && (
                      <svg
                        className="inline-block w-3 h-3 ml-1 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h4 className="brand-font text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* About Us */}
          <div>
            <h4 className="brand-font text-xs font-bold uppercase tracking-widest text-white/60 mb-4">
              About Us
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">
              NEPSE Simplified breaks down Nepal Stock Exchange data into
              clear, actionable insights. We help investors at every level
              understand the market and make informed decisions.
            </p>
          </div>

          {/* Logo + Brand */}
          <div className="flex flex-col items-start col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="NEPSE SIMPLIFIED Home">
              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white/10">
                <Image
                  src="/logo.jpg"
                  alt="NEPSE SIMPLIFIED logo"
                  fill
                  className="object-cover rounded-full"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="brand-font text-lg font-extrabold text-white tracking-tight leading-tight">
                  NEPSE SIMPLIFIED
                </span>
                <span className="text-[9px] uppercase font-black tracking-widest text-white/40">
                  Understand &bull; Interpret &bull; Invest Smart
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/40 leading-relaxed mt-2">
              Making Nepal&apos;s stock market accessible to everyone.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} NEPSE SIMPLIFIED. All rights
              reserved.
            </p>
            <p className="text-[9px] uppercase font-black tracking-widest text-white/30 text-center sm:text-right">
              FOR EDUCATIONAL PURPOSES ONLY &bull; NOT FINANCIAL ADVICE
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
