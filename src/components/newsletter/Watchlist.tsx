interface WatchlistStock {
  symbol: string;
  badge: string;
  badgeColor: string; // "green" | "blue" | "orange"
  reasoning: string;
  tip: string;
}

interface WatchlistProps {
  stocks: WatchlistStock[];
}

const badgeStyles: Record<string, string> = {
  green: 'bg-green-100 text-green-700 border-green-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function Watchlist({ stocks }: WatchlistProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          3
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            Stock Watchlist
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-premium p-8">
        <div className="divide-y divide-slate-100">
          {stocks.map((stock, i) => (
            <div
              key={stock.symbol}
              className={
                i < stocks.length - 1 ? 'pb-6' : ''
              }
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-heading font-black text-xl text-[#0a2141]">
                  {stock.symbol}
                </span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                    badgeStyles[stock.badgeColor] || badgeStyles.blue
                  }`}
                >
                  {stock.badge}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">
                {stock.reasoning}
              </p>
              <p className="text-xs italic text-slate-400">{stock.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
