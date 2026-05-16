import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllMarketEvents } from "@/lib/merged-data";
import type { MarketEvent } from "@/lib/data";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Market Events | NEPSE SIMPLIFIED",
  description:
    "Track upcoming IPOs, right shares, auctions, dividends, AGMs, and policy updates for Nepal Stock Exchange. Stay informed with the NEPSE events calendar.",
  openGraph: {
    title: "Market Events | NEPSE SIMPLIFIED",
    description:
      "Track upcoming IPOs, right shares, auctions, dividends, AGMs, and policy updates for NEPSE.",
    url: "https://nepsesimplified.com/events",
  },
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  const events = getAllMarketEvents();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <EventsClient events={events} />
      <Footer />
    </div>
  );
}
