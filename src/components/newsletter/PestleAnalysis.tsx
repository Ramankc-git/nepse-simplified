import { Check, X, Eye } from 'lucide-react';

interface PestleItem {
  title: string;
  takeaway: string;
}

interface PestleAnalysisProps {
  opportunities: PestleItem[];
  risks: PestleItem[];
  strategicFocus: PestleItem[];
}

function ColumnHeader({
  icon: Icon,
  label,
  iconColor,
  iconBg,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  iconColor: string;
  iconBg: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}
      >
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <h3 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
        {label}
      </h3>
    </div>
  );
}

function TakeawayBox({ takeaway }: { takeaway: string }) {
  return (
    <div className="bg-white/60 border border-black/5 p-3 rounded-xl">
      <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-1">
        The Takeaway:
      </p>
      <p className="text-sm text-slate-600 leading-relaxed">{takeaway}</p>
    </div>
  );
}

export default function PestleAnalysis({
  opportunities,
  risks,
  strategicFocus,
}: PestleAnalysisProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          2
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            PESTLE Analysis
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Opportunities Column */}
        <div className="bg-green-50/50 border border-green-100 rounded-3xl p-6 flex flex-col h-full">
          <ColumnHeader
            icon={Check}
            label="Opportunities"
            iconColor="text-green-600"
            iconBg="bg-green-600/10"
          />
          <div className="space-y-4 flex-1">
            {opportunities.map((item, i) => (
              <div key={i}>
                <p className="text-sm font-bold text-slate-900 mb-2">
                  {item.title}
                </p>
                <TakeawayBox takeaway={item.takeaway} />
              </div>
            ))}
          </div>
        </div>

        {/* Risks Column */}
        <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 flex flex-col h-full">
          <ColumnHeader
            icon={X}
            label="Risks"
            iconColor="text-red-600"
            iconBg="bg-red-600/10"
          />
          <div className="space-y-4 flex-1">
            {risks.map((item, i) => (
              <div key={i}>
                <p className="text-sm font-bold text-slate-900 mb-2">
                  {item.title}
                </p>
                <TakeawayBox takeaway={item.takeaway} />
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Focus Column */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col h-full">
          <ColumnHeader
            icon={Eye}
            label="Strategic Focus"
            iconColor="text-blue-900"
            iconBg="bg-blue-900/10"
          />
          <div className="space-y-4 flex-1">
            {strategicFocus.map((item, i) => (
              <div key={i}>
                <p className="text-sm font-bold text-slate-900 mb-2">
                  {item.title}
                </p>
                <TakeawayBox takeaway={item.takeaway} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
