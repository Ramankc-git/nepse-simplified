import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home, ArrowRight, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on NEPSE SIMPLIFIED.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0a2141] rounded-b-[3rem] sm:rounded-b-[4rem]" />
          <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-36">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/10 border border-white/10">
                <Search className="w-10 h-10 text-green-400" />
              </div>

              <h1 className="font-heading text-6xl sm:text-8xl font-extrabold text-white tracking-tight">
                404
              </h1>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white/80 tracking-tight">
                Page Not Found
              </h2>

              <p className="max-w-md mx-auto text-sm sm:text-base text-white/50 leading-relaxed">
                The page you are looking for may have been moved, deleted, or
                does not exist. Try starting from the homepage or browse our
                latest content.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-[#0a2141] text-sm font-bold rounded-2xl hover:bg-green-50 transition-colors group"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/newsletters"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white text-sm font-bold rounded-2xl hover:bg-white/5 transition-colors group"
                >
                  Browse Newsletters
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
