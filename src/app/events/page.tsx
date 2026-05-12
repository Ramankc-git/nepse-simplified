'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SubscribeForm } from '@/components/common/SubscribeForm';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import {
  marketEvents,
  getEventEffectiveStatus,
  type MarketEvent,
} from '@/lib/data';
import {
  Calendar,
  Ticket,
  PieChart,
  Gavel,
  Banknote,
  ShieldAlert,
  Info,
  Archive,
} from 'lucide-react';

type EventType = 'all' | 'archive' | MarketEvent['type'];
type StatusType = MarketEvent['status'];

const FILTER_TABS: { label: string; value: EventType; icon?: React.ElementType }[] = [
  { label: 'All', value: 'all' },
  { label: 'IPO', value: 'ipo' },
  { label: 'Right Share', value: 'right-share' },
  { label: 'Auction', value: 'auction' },
  { label: 'Dividend', value: 'dividend' },
  { label: 'Policy', value: 'policy' },
  { label: 'Archive', value: 'archive', icon: Archive },
];

function getTypeConfig(type: MarketEvent['type']) {
  switch (type) {
    case 'ipo':
      return {
        label: 'IPO',
        color: 'bg-green-100 text-green-700',
        border: 'border-green-200',
        icon: Ticket,
      };
    case 'right-share':
      return {
        label: 'Right Share',
        color: 'bg-blue-100 text-blue-700',
        border: 'border-blue-200',
        icon: PieChart,
      };
    case 'auction':
      return {
        label: 'Auction',
        color: 'bg-orange-100 text-orange-700',
        border: 'border-orange-200',
        icon: Gavel,
      };
    case 'dividend':
      return {
        label: 'Dividend',
        color: 'bg-purple-100 text-purple-700',
        border: 'border-purple-200',
        icon: Banknote,
      };
    case 'policy':
      return {
        label: 'Policy',
        color: 'bg-red-100 text-red-700',
        border: 'border-red-200',
        icon: ShieldAlert,
      };
    case 'agm':
      return {
        label: 'AGM',
        color: 'bg-slate-100 text-slate-700',
        border: 'border-slate-200',
        icon: Calendar,
      };
    default:
      return {
        label: 'Event',
        color: 'bg-slate-100 text-slate-700',
        border: 'border-slate-200',
        icon: Calendar,
      };
  }
}

function getStatusConfig(status: StatusType, isArchived: boolean) {
  if (isArchived) {
    return { label: 'Archived', color: 'bg-slate-100 text-slate-400' };
  }
  switch (status) {
    case 'upcoming':
      return { label: 'Upcoming', color: 'bg-amber-100 text-amber-700' };
    case 'open':
      return { label: 'Open', color: 'bg-green-100 text-green-700' };
    case 'closed':
      return { label: 'Closed', color: 'bg-red-100 text-red-700' };
    default:
      return { label: 'Unknown', color: 'bg-slate-100 text-slate-700' };
  }
}

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDateRange(start: string, end: string): string {
  if (start === end) return formatEventDate(start);
  const s = new Date(start);
  const e = new Date(end);
  const startStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startStr} – ${endStr}`;
}

/** Event card component with optional archived (muted) styling */
function EventCard({ event, isArchived }: { event: MarketEvent; isArchived: boolean }) {
  const effectiveStatus = getEventEffectiveStatus(event);
  const typeConfig = getTypeConfig(event.type);
  const statusConfig = getStatusConfig(effectiveStatus, isArchived);
  const TypeIcon = typeConfig.icon;

  return (
    <div
      className={`rounded-3xl p-6 border transition-all ${
        isArchived
          ? 'bg-slate-50/80 border-slate-100 opacity-70 hover:opacity-90'
          : 'bg-white border-slate-100 shadow-premium hover:shadow-lg hover:border-slate-200'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Icon + Type Badge */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:min-w-[120px]">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isArchived ? 'bg-slate-100 text-slate-400' : typeConfig.color
            }`}
          >
            <TypeIcon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isArchived ? 'bg-slate-100 text-slate-400' : typeConfig.color
              }`}
            >
              {typeConfig.label}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusConfig.color}`}
            >
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-heading text-lg font-bold mb-1 ${
              isArchived ? 'text-slate-500' : 'text-[#0a2141]'
            }`}
          >
            {event.title}
          </h3>
          <p className={`text-sm font-semibold mb-2 ${isArchived ? 'text-slate-400' : 'text-slate-700'}`}>
            {event.company}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              {getDateRange(event.startDate, event.endDate)}
            </span>
          </div>
          <p className={`text-sm leading-relaxed ${isArchived ? 'text-slate-400' : 'text-slate-600'}`}>
            {event.details}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<EventType>('all');

  // Compute effective statuses for all events
  const eventsWithStatus = useMemo(() => {
    return marketEvents.map((event) => ({
      event,
      effectiveStatus: getEventEffectiveStatus(event),
    }));
  }, []);

  const activeEvents = useMemo(
    () => eventsWithStatus.filter((e) => e.effectiveStatus !== 'closed'),
    [eventsWithStatus]
  );

  const archivedEvents = useMemo(
    () => eventsWithStatus.filter((e) => e.effectiveStatus === 'closed'),
    [eventsWithStatus]
  );

  const filteredActiveEvents = useMemo(() => {
    if (activeFilter === 'all' || activeFilter === 'archive') return activeEvents;
    return activeEvents.filter((e) => e.event.type === activeFilter);
  }, [activeFilter, activeEvents]);

  const filteredArchivedEvents = useMemo(() => {
    if (activeFilter === 'archive') return archivedEvents;
    return archivedEvents.filter((e) => e.event.type === activeFilter);
  }, [activeFilter, archivedEvents]);

  const eventCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: activeEvents.length,
      archive: archivedEvents.length,
    };
    for (const e of activeEvents) {
      counts[e.event.type] = (counts[e.event.type] || 0) + 1;
    }
    for (const e of archivedEvents) {
      if (!counts[e.event.type]) counts[e.event.type] = 0;
      // archived count shown separately
    }
    return counts;
  }, [activeEvents, archivedEvents]);

  const showArchiveSection = activeFilter !== 'archive' && filteredArchivedEvents.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0a2141] text-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-6 h-6 text-green-400" />
              <span className="text-[9px] uppercase font-black tracking-widest text-white/50">
                Events &amp; IPOs
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Upcoming Events &amp; IPOs
            </h1>
            <p className="text-sm text-white/60 leading-relaxed max-w-xl">
              Stay ahead with IPO openings, right shares, auctions, dividends, and key policy announcements affecting the Nepali stock market.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="space-y-8">
              {/* Filter Tabs */}
              <div className="bg-white rounded-3xl p-4 shadow-premium">
                <div className="flex flex-wrap gap-2">
                  {FILTER_TABS.map((tab) => {
                    const isActive = activeFilter === tab.value;
                    const count = eventCounts[tab.value] || 0;
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.value}
                        onClick={() => setActiveFilter(tab.value)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-[#0a2141] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {TabIcon && <TabIcon className="w-4 h-4" />}
                        {tab.label}
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Archive-only view */}
              {activeFilter === 'archive' ? (
                <>
                  {filteredArchivedEvents.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 shadow-premium text-center">
                      <Archive className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm font-semibold text-slate-500 mb-1">No archived events</p>
                      <p className="text-xs text-slate-400">
                        Events will appear here once their end date has passed.
                      </p>
                    </div>
                  ) : (
                    <div>
                      {/* Section header */}
                      <div className="flex items-center gap-3 mb-4">
                        <Archive className="w-5 h-5 text-slate-400" />
                        <h2 className="font-heading text-lg font-bold text-slate-500 uppercase tracking-tight">
                          Archived Events
                        </h2>
                        <span className="text-xs text-slate-400 font-medium">
                          ({filteredArchivedEvents.length} event{filteredArchivedEvents.length !== 1 ? 's' : ''})
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {filteredArchivedEvents.map(({ event }) => (
                          <EventCard key={event.id} event={event} isArchived />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Active Events */}
                  {filteredActiveEvents.length === 0 && filteredArchivedEvents.length === 0 ? (
                    <div className="bg-white rounded-3xl p-8 shadow-premium text-center">
                      <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-sm text-slate-500">No events found for this filter.</p>
                    </div>
                  ) : (
                    <>
                      {/* Active events section */}
                      {filteredActiveEvents.length > 0 && (
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Calendar className="w-5 h-5 text-green-500" />
                            <h2 className="font-heading text-lg font-bold text-[#0a2141] uppercase tracking-tight">
                              Active &amp; Upcoming Events
                            </h2>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                              {filteredActiveEvents.length}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {filteredActiveEvents.map(({ event }) => (
                              <EventCard key={event.id} event={event} isArchived={false} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Visual separator between active and archived */}
                      {showArchiveSection && (
                        <div className="flex items-center gap-4 py-2">
                          <div className="flex-1 h-px bg-slate-200" />
                          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full">
                            <Archive className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                              Archived
                            </span>
                          </div>
                          <div className="flex-1 h-px bg-slate-200" />
                        </div>
                      )}

                      {/* Archived events section (shown below active) */}
                      {showArchiveSection && filteredArchivedEvents.length > 0 && (
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Archive className="w-5 h-5 text-slate-400" />
                            <h2 className="font-heading text-lg font-bold text-slate-500 uppercase tracking-tight">
                              Archived / Closed Events
                            </h2>
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-semibold">
                              {filteredArchivedEvents.length}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {filteredArchivedEvents.map(({ event }) => (
                              <EventCard key={event.id} event={event} isArchived />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No active events but has archived */}
                      {filteredActiveEvents.length === 0 && filteredArchivedEvents.length > 0 && (
                        <div className="bg-white rounded-3xl p-8 shadow-premium text-center">
                          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                          <p className="text-sm font-semibold text-slate-500 mb-1">
                            No active events for this filter
                          </p>
                          <p className="text-xs text-slate-400">
                            All events in this category have ended. Check the Archive tab to view past events.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Disclaimer */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">
                      Verify with Official Sources
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Event dates and details are compiled from publicly available information and may change without notice.
                      Always verify dates and requirements with the official company announcement, CDSC, or NEPSE website before making any investment decisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ad Placeholder */}
              <AdPlaceholder />

              {/* Subscribe Section */}
              <SubscribeForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
