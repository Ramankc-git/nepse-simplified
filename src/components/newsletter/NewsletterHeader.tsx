import { BarChart3 } from 'lucide-react';

interface NewsletterHeaderProps {
  volume: string;
  dateRange: string;
  title?: string;
}

export default function NewsletterHeader({
  volume,
  dateRange,
  title = 'NEPSE SIMPLIFIED',
}: NewsletterHeaderProps) {
  return (
    <header className="bg-white border-b-4 border-[#0a2141]">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0a2141] rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-black tracking-tight text-[#0a2141] leading-none">
              {title}
            </h1>
            <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mt-0.5">
              Weekly Market Intelligence
            </p>
          </div>
        </div>

        {/* Right: Volume + Date */}
        <div className="text-right">
          <div className="flex items-baseline gap-1.5 justify-end">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
              Volume
            </span>
            <span className="font-heading text-sm font-bold text-[#0a2141]">
              {volume}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{dateRange}</p>
        </div>
      </div>
    </header>
  );
}
