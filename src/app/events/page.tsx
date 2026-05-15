import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllMarketEvents } from "@/lib/merged-data";
import type { MarketEvent } from "@/lib/data";
import EventsClient from "./EventsClient";

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
