import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "NEPSE SIMPLIFIED | Understand • Interpret • Invest Smart",
  description:
    "Your go-to source for Nepal Stock Exchange (NEPSE) market analysis, tutorials, and investment insights. We simplify complex market data so you can invest smarter.",
  keywords: [
    "NEPSE",
    "Nepal Stock Exchange",
    "Nepal share market",
    "stock analysis",
    "investment",
    "share market Nepal",
    "NEPSE news",
    "market data",
    "trading",
    "portfolio",
  ],
  authors: [{ name: "NEPSE SIMPLIFIED" }],
  openGraph: {
    title: "NEPSE SIMPLIFIED | Understand • Interpret • Invest Smart",
    description:
      "Your go-to source for Nepal Stock Exchange market analysis, tutorials, and investment insights.",
    siteName: "NEPSE SIMPLIFIED",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEPSE SIMPLIFIED | Understand • Interpret • Invest Smart",
    description:
      "Your go-to source for Nepal Stock Exchange market analysis, tutorials, and investment insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NEPSE SIMPLIFIED",
              alternateName: "Nepse Simplified",
              url: "https://nepsesimplified.com",
              description:
                "Your go-to source for Nepal Stock Exchange (NEPSE) market analysis, tutorials, and investment insights.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://nepsesimplified.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        style={{ backgroundColor: "#f8fafc" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
