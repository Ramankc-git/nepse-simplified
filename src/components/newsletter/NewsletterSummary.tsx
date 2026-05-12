import { AlertTriangle } from 'lucide-react';

interface NewsletterSummaryProps {
  summaryText: string;
}

export default function NewsletterSummary({
  summaryText,
}: NewsletterSummaryProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          7
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            Weekly Summary
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium p-10">
        <blockquote className="text-xl text-slate-600 text-center italic leading-relaxed mb-8">
          &ldquo;{summaryText}&rdquo;
        </blockquote>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[9px] uppercase font-black tracking-widest text-[#0a2141]">
            &mdash; NEPSE SIMPLIFIED TEAM
          </p>

          {/* Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wider">
              For Educational Purposes Only — Not Financial Advice
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
