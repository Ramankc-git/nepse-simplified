import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ThemeProvider } from "next-themes";
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
  title: {
    default: "NEPSE SIMPLIFIED | Understand • Interpret • Invest Smart",
    template: "%s | NEPSE SIMPLIFIED",
  },
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
    "NEPSE tutorial",
    "Nepal stock market guide",
    "NEPSE analysis",
  ],
  authors: [{ name: "NEPSE SIMPLIFIED", url: "https://nepsesimplified.com" }],
  creator: "NEPSE SIMPLIFIED",
  publisher: "NEPSE SIMPLIFIED",
  metadataBase: new URL("https://nepsesimplified.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NEPSE SIMPLIFIED | Understand • Interpret • Invest Smart",
    description:
      "Your go-to source for Nepal Stock Exchange market analysis, tutorials, and investment insights.",
    siteName: "NEPSE SIMPLIFIED",
    type: "website",
    locale: "en_US",
    url: "https://nepsesimplified.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEPSE SIMPLIFIED | Understand • Interpret • Invest Smart",
    description:
      "Your go-to source for Nepal Stock Exchange market analysis, tutorials, and investment insights.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
            }),
          }}
        />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NEPSE SIMPLIFIED",
              url: "https://nepsesimplified.com",
              logo: "https://nepsesimplified.com/logo.jpg",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@nepsesimplified.com",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
        style={{ backgroundColor: "#f8fafc" }}
      >
        {/* Auto-redirect invite/confirmation URLs to /admin/ (only from non-admin pages) */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            if (window.location.pathname.startsWith('/admin')) return;
            var hash = window.location.hash;
            var search = window.location.search;
            if (hash.includes('invite_token') || hash.includes('confirmation_token') || hash.includes('recovery_token') || search.includes('invite_token') || search.includes('confirmation_token') || search.includes('recovery_token')) {
              window.location.replace('/admin/' + hash + search.replace('?', '&'));
            }
          })();
        `}} />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip to main content - Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0a2141] focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
          >
            Skip to main content
          </a>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
