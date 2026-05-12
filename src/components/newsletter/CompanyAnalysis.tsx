import { Check } from 'lucide-react';

interface CompanyAnalysisProps {
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
}

export default function CompanyAnalysis({
  companyName,
  ltp,
  weeklyHigh,
  trend,
  description,
  strategicOpinion,
  supportZone,
  resistance,
  institutionalDemand,
  marketFloat,
}: CompanyAnalysisProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          5
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            Deep Dive: Company Analysis
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Dark Card */}
      <div className="bg-slate-900 text-white rounded-[3rem] shadow-2xl p-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <h3 className="font-heading text-lg font-bold text-green-400 uppercase tracking-tighter mb-6">
              {companyName}
            </h3>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-slate-500 mb-1">
                  LTP
                </p>
                <p className="font-heading text-xl font-black text-white">
                  {ltp}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-slate-500 mb-1">
                  Weekly High
                </p>
                <p className="font-heading text-xl font-black text-white">
                  {weeklyHigh}
                </p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-widest text-slate-500 mb-1">
                  Trend
                </p>
                <p className="font-heading text-xl font-black text-green-400">
                  {trend}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right Column */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-4">
              Strategic Opinion
            </p>
            <blockquote className="text-sm text-slate-200 leading-relaxed italic mb-8 border-l-2 border-green-500/50 pl-4">
              {strategicOpinion}
            </blockquote>

            {/* Checklist */}
            <div className="space-y-3">
              {[
                { label: 'Support Zone', value: supportZone },
                { label: 'Resistance', value: resistance },
                { label: 'Institutional Demand', value: institutionalDemand },
                { label: 'Market Float', value: marketFloat },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="text-[9px] uppercase font-black tracking-widest text-slate-500 shrink-0">
                    {item.label}:
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
