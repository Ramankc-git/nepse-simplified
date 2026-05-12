interface InsightCard {
  category: string;
  title: string;
  description: string;
}

interface LearnersInsightProps {
  insights: InsightCard[];
}

export default function LearnersInsight({ insights }: LearnersInsightProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          6
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            Learner&apos;s Insight
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* 3-column grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="bg-slate-50 p-8 rounded-3xl border border-slate-100"
          >
            <p className="text-[9px] uppercase font-black tracking-widest text-[#0a2141] mb-3">
              {insight.category}
            </p>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              {insight.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {insight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
