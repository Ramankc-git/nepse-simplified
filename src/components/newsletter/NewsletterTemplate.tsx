import NewsletterHeader from './NewsletterHeader';
import MarketSnapshot from './MarketSnapshot';
import PestleAnalysis from './PestleAnalysis';
import Watchlist from './Watchlist';
import UpcomingEvents from './UpcomingEvents';
import CompanyAnalysis from './CompanyAnalysis';
import LearnersInsight from './LearnersInsight';
import NewsletterSummary from './NewsletterSummary';

// ---- Sub-types ----

export interface PestleItem {
  title: string;
  takeaway: string;
}

export interface WatchlistStock {
  symbol: string;
  badge: string;
  badgeColor: 'green' | 'blue' | 'orange';
  reasoning: string;
  tip: string;
}

export interface InsightCard {
  category: string;
  title: string;
  description: string;
}

// ---- Combined Newsletter Data ----

export interface NewsletterData {
  // Header
  volume: string;
  dateRange: string;
  title?: string;

  // Market Snapshot (Section 1)
  asOfDate: string;
  indexClosing: string;
  indexPrevious: string;
  indexChange: string;
  indexChangePoints: string;
  indexPositive: boolean;
  turnoverThisWeek: string;
  turnoverPrevWeek: string;
  turnoverChange: string;
  turnoverPositive: boolean;
  topSectorName: string;
  topSectorChange: string;
  secondSectorName: string;
  secondSectorChange: string;
  laggardSector: string;
  marketContext: string;

  // PESTLE Analysis (Section 2)
  opportunities: PestleItem[];
  risks: PestleItem[];
  strategicFocus: PestleItem[];

  // Watchlist (Section 3)
  stocks: WatchlistStock[];

  // Upcoming Events (Section 4)
  iposAndAuctions: string[];
  policyNotices: string[];

  // Company Analysis (Section 5)
  companyName: string;
  ltp: string;
  weeklyHigh: string;
  trend: string;
  description: string;
  strategicOpinion: string;
  supportZone: string;
  resistance: string;
  institutionalDemand: string;
  marketFloat: string;

  // Learner's Insight (Section 6)
  insights: InsightCard[];

  // Summary (Section 7)
  summaryText: string;
}

interface NewsletterTemplateProps {
  data: NewsletterData;
}

export default function NewsletterTemplate({ data }: NewsletterTemplateProps) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sticky Header */}
      <NewsletterHeader
        volume={data.volume}
        dateRange={data.dateRange}
        title={data.title}
      />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Section 1: Market Snapshot */}
        <MarketSnapshot
          asOfDate={data.asOfDate}
          indexClosing={data.indexClosing}
          indexPrevious={data.indexPrevious}
          indexChange={data.indexChange}
          indexChangePoints={data.indexChangePoints}
          indexPositive={data.indexPositive}
          turnoverThisWeek={data.turnoverThisWeek}
          turnoverPrevWeek={data.turnoverPrevWeek}
          turnoverChange={data.turnoverChange}
          turnoverPositive={data.turnoverPositive}
          topSectorName={data.topSectorName}
          topSectorChange={data.topSectorChange}
          secondSectorName={data.secondSectorName}
          secondSectorChange={data.secondSectorChange}
          laggardSector={data.laggardSector}
          marketContext={data.marketContext}
        />

        {/* Section 2: PESTLE Analysis */}
        <PestleAnalysis
          opportunities={data.opportunities}
          risks={data.risks}
          strategicFocus={data.strategicFocus}
        />

        {/* Section 3: Stock Watchlist */}
        <Watchlist stocks={data.stocks} />

        {/* Section 4: Upcoming Events */}
        <UpcomingEvents
          iposAndAuctions={data.iposAndAuctions}
          policyNotices={data.policyNotices}
        />

        {/* Section 5: Company Analysis */}
        <CompanyAnalysis
          companyName={data.companyName}
          ltp={data.ltp}
          weeklyHigh={data.weeklyHigh}
          trend={data.trend}
          description={data.description}
          strategicOpinion={data.strategicOpinion}
          supportZone={data.supportZone}
          resistance={data.resistance}
          institutionalDemand={data.institutionalDemand}
          marketFloat={data.marketFloat}
        />

        {/* Section 6: Learner's Insight */}
        <LearnersInsight insights={data.insights} />

        {/* Section 7: Weekly Summary */}
        <NewsletterSummary summaryText={data.summaryText} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center">
          <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-2">
            NEPSE SIMPLIFIED
          </p>
          <p className="text-xs text-slate-400">
            Weekly market intelligence for informed investors.
          </p>
        </div>
      </footer>
    </div>
  );
}
