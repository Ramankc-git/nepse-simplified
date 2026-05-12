"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Market Data", href: "/market" },
  { label: "Events", href: "/events" },
  { label: "Analysis", href: "/analysis" },
  { label: "Learning", href: "/learning" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-[#0a2141] shadow-premium">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top row: Logo + Brand + Mobile toggle */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 relative rounded-full overflow-hidden bg-[#0a2141] flex items-center justify-center shrink-0">
              <Image
                src="/logo.jpg"
                alt="NEPSE SIMPLIFIED"
                fill
                className="object-cover rounded-full"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col">
              <span className="brand-font text-lg sm:text-xl font-extrabold text-[#0a2141] tracking-tight leading-tight">
                NEPSE SIMPLIFIED
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-black tracking-widest text-slate-400">
                Understand &bull; Interpret &bull; Invest Smart
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-[#0a2141] transition-colors rounded-lg hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-[#0a2141] hover:bg-slate-50 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-slate-100 pt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-[#0a2141] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
