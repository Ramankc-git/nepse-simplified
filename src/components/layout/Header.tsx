"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Newsletters", href: "/newsletters" },
  { label: "Market Data", href: "/market" },
  { label: "Scorecard", href: "/scorecard" },
  { label: "Events", href: "/events" },
  { label: "Analysis", href: "/analysis" },
  { label: "Learning", href: "/learning" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b-4 border-[#0a2141] shadow-premium" role="banner">
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
              <span className="brand-font text-lg sm:text-xl font-extrabold text-[#0a2141] dark:text-white tracking-tight leading-tight">
                NEPSE SIMPLIFIED
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">
                Understand &bull; Interpret &bull; Invest Smart
              </span>
            </div>
          </Link>

          {/* Desktop Nav + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0a2141] dark:hover:text-white transition-colors rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2 border-l border-slate-200 dark:border-slate-700 pl-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#0a2141] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
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
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-slate-100 dark:border-slate-800 pt-3 animate-in fade-in slide-in-from-top-2 duration-200" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-[#0a2141] dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
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
