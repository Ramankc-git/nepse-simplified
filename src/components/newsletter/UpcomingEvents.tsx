import {
  FileText,
  Building2,
  Calendar,
  ChevronRight,
} from 'lucide-react';

interface UpcomingEventsProps {
  iposAndAuctions: string[];
  policyNotices: string[];
}

export default function UpcomingEvents({
  iposAndAuctions,
  policyNotices,
}: UpcomingEventsProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          4
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            Upcoming Events &amp; Deadlines
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Stacked cards */}
      <div className="space-y-4">
        {/* Card 1: IPOs, Rights & Auctions */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase mb-3">
              IPOs, Rights &amp; Auctions
            </h3>
            <ul className="space-y-2.5">
              {iposAndAuctions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Policy Notices */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase mb-3">
              Policy Notices
            </h3>
            <ul className="space-y-2.5">
              {policyNotices.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
