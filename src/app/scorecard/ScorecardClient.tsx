"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Info,
  X,
  Plus,
  AlertTriangle,
  Target,
  Award,
  ShieldCheck,
  Zap,
  Building2,
  Droplets,
  Scale,
  Users,
  Coins,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Star,
} from "lucide-react";
import {
  type ScorecardStock,
  type ScorecardMetricKey,
  type Verdict,
  SCORECARD_METRICS,
  DEFAULT_WEIGHTS,
  METRIC_LABELS,
  METRIC_DESCRIPTIONS,
  calculateWeightedScore,
  getVerdict,
  getVerdictColor,
  getVerdictDarkColor,
} from "@/lib/data";

// ==================== ICON MAP ====================
const METRIC_ICONS: Record<ScorecardMetricKey, React.ElementType> = {
  headwind: Zap,
  fundamentals: ShieldCheck,
  growth: TrendingUp,
  eps: Coins,
  regulatory: Scale,
  promoter: Users,
  dividend: Award,
};

// ==================== SECTOR FILTER ====================
const SECTOR_FILTERS = [
  "All",
  "Banking",
  "Manufacturing",
  "Investment",
  "Insurance",
  "Hydro",
  "Finance",
] as const;

type SectorFilter = (typeof SECTOR_FILTERS)[number];

// ==================== SUB-COMPONENTS ====================

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
      : score >= 6
      ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
      : score >= 4
      ? "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
      : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400";
  return (
    <span className={`inline-flex items-center justify-center min-w-[2rem] px-1.5 py-0.5 rounded-md text-xs font-bold ${color}`}>
      {score}
    </span>
  );
}

function VerdictBadge({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getVerdictColor(verdict)} ${getVerdictDarkColor(verdict)}`}
    >
      {verdict}
    </span>
  );
}

function ProgressBar({ value, max = 10, color }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  const barColor =
    color ||
    (pct >= 70
      ? "bg-emerald-500"
      : pct >= 45
      ? "bg-amber-500"
      : "bg-red-500");
  return (
    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ==================== WEIGHT PANEL ====================

function WeightPanel({
  weights,
  onWeightChange,
  onReset,
}: {
  weights: Record<ScorecardMetricKey, number>;
  onWeightChange: (metric: ScorecardMetricKey, value: number) => void;
  onReset: () => void;
}) {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const isValid = totalWeight === 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-premium border border-slate-100 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#0a2141] dark:text-white" />
          <h3 className="font-heading text-lg font-bold text-[#0a2141] dark:text-white">
            Weight Configuration
          </h3>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-[#0a2141] dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ResetCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {SCORECARD_METRICS.map((metric) => {
          const Icon = METRIC_ICONS[metric];
          return (
            <div key={metric} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {METRIC_LABELS[metric]}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#0a2141] dark:text-white tabular-nums min-w-[2.5rem] text-right">
                  {weights[metric]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={1}
                value={weights[metric]}
                onChange={(e) => onWeightChange(metric, Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#0a2141] dark:accent-green-400 bg-slate-100 dark:bg-slate-700"
              />
            </div>
          );
        })}
      </div>

      <div className={`mt-5 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between`}>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Weight</span>
        <span
          className={`text-sm font-bold ${
            isValid
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {totalWeight}%
          {!isValid && (
            <span className="ml-1 text-xs font-normal">(must equal 100%)</span>
          )}
        </span>
      </div>

      {!isValid && (
        <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
          Weights should total 100% for accurate scoring. Scores are calculated proportionally regardless.
        </p>
      )}
    </div>
  );
}

function ResetCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

// ==================== STOCK TABLE ====================

function StockTable({
  stocks,
  weights,
  onSelectStock,
}: {
  stocks: ScorecardStock[];
  weights: Record<ScorecardMetricKey, number>;
  onSelectStock: (stock: ScorecardStock) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-3 px-3 text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">
              Stock
            </th>
            <th className="text-center py-3 px-2 text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">
              Score
            </th>
            {SCORECARD_METRICS.map((metric) => (
              <th
                key={metric}
                className="text-center py-3 px-1.5 text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 hidden md:table-cell"
              >
                {METRIC_LABELS[metric]}
              </th>
            ))}
            <th className="text-center py-3 px-3 text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">
              Verdict
            </th>
            <th className="py-3 px-2" />
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const result = calculateWeightedScore(stock, weights);
            return (
              <tr
                key={stock.symbol}
                onClick={() => onSelectStock(stock)}
                className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-3">
                  <div>
                    <span className="text-sm font-bold text-[#0a2141] dark:text-white">
                      {stock.symbol}
                    </span>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[140px]">
                      {stock.name}
                    </p>
                  </div>
                </td>
                <td className="text-center py-3 px-2">
                  <span className="text-sm font-bold text-[#0a2141] dark:text-white tabular-nums">
                    {result.percentage}%
                  </span>
                </td>
                {SCORECARD_METRICS.map((metric) => (
                  <td
                    key={metric}
                    className="text-center py-3 px-1.5 hidden md:table-cell"
                  >
                    <ScoreBadge score={stock[metric].score} />
                  </td>
                ))}
                <td className="text-center py-3 px-3">
                  <VerdictBadge verdict={result.verdict} />
                </td>
                <td className="py-3 px-2">
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ==================== STOCK SPOTLIGHT ====================

function StockSpotlight({
  stock,
  weights,
  onClose,
}: {
  stock: ScorecardStock;
  weights: Record<ScorecardMetricKey, number>;
  onClose: () => void;
}) {
  const result = calculateWeightedScore(stock, weights);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-premium border border-slate-100 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0a2141] dark:bg-slate-800 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-extrabold text-white font-heading">
                {stock.symbol}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white/70 uppercase tracking-wider">
                {stock.sector}
              </span>
            </div>
            <p className="text-sm text-white/60">{stock.name}</p>
            <p className="text-lg font-bold text-green-400 mt-1">
              Rs. {stock.ltp.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overall Score */}
        <div className="mt-5 flex items-center gap-4">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-white tabular-nums">
              {result.percentage}%
            </p>
            <p className="text-[9px] uppercase font-black tracking-widest text-white/40 mt-0.5">
              Weighted Score
            </p>
          </div>
          <div className="flex-1">
            <ProgressBar value={result.percentage} max={100} />
          </div>
          <VerdictBadge verdict={result.verdict} />
        </div>
      </div>

      {/* Metric Breakdown */}
      <div className="p-6">
        <h4 className="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 mb-4">
          Metric Breakdown
        </h4>
        <div className="space-y-3">
          {SCORECARD_METRICS.map((metric) => {
            const Icon = METRIC_ICONS[metric];
            const metricScore = stock[metric];
            const weightPct = weights[metric];
            return (
              <div key={metric}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {METRIC_LABELS[metric]}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      (wt: {weightPct}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#0a2141] dark:text-white tabular-nums">
                      {metricScore.score}/10
                    </span>
                  </div>
                </div>
                <ProgressBar value={metricScore.score} max={10} />
                {metricScore.notes && (
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 pl-6">
                    {metricScore.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Pros & Cons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-[9px] uppercase font-black tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
              Pros
            </h4>
            <ul className="space-y-2">
              {stock.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[9px] uppercase font-black tracking-widest text-red-500 dark:text-red-400 mb-3">
              Cons
            </h4>
            <ul className="space-y-2">
              {stock.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingDown className="w-2.5 h-2.5 text-red-500 dark:text-red-400" />
                  </span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analyst View */}
        {stock.analystView && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <h4 className="text-[9px] uppercase font-black tracking-widest text-[#0a2141] dark:text-green-400 mb-2">
              Analyst View
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {stock.analystView}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== CUSTOM STOCK MODAL ====================

function CustomStockModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (stock: ScorecardStock) => void;
}) {
  const [form, setForm] = useState({
    symbol: "",
    name: "",
    sector: "Banking" as ScorecardStock["sector"],
    ltp: 0,
    headwind: 5,
    fundamentals: 5,
    growth: 5,
    eps: 5,
    regulatory: 5,
    promoter: 5,
    dividend: 5,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.symbol.trim()) return;

    const stock: ScorecardStock = {
      symbol: form.symbol.toUpperCase(),
      name: form.name || form.symbol.toUpperCase(),
      sector: form.sector,
      ltp: form.ltp,
      status: "published",
      headwind: { score: form.headwind, notes: "" },
      fundamentals: { score: form.fundamentals, notes: "" },
      growth: { score: form.growth, notes: "" },
      eps: { score: form.eps, notes: "" },
      regulatory: { score: form.regulatory, notes: "" },
      promoter: { score: form.promoter, notes: "" },
      dividend: { score: form.dividend, notes: "" },
      pros: [],
      cons: [],
      analystView: "",
    };

    onAdd(stock);
    setForm({
      symbol: "",
      name: "",
      sector: "Banking",
      ltp: 0,
      headwind: 5,
      fundamentals: 5,
      growth: 5,
      eps: 5,
      regulatory: 5,
      promoter: 5,
      dividend: 5,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl font-bold text-[#0a2141] dark:text-white">
              Custom Stock Analysis
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Symbol *
                </label>
                <input
                  type="text"
                  value={form.symbol}
                  onChange={(e) => setForm({ ...form, symbol: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0a2141] dark:text-white focus:ring-2 focus:ring-[#0a2141]/20 dark:focus:ring-green-400/20 focus:border-[#0a2141] dark:focus:border-green-400 outline-none"
                  placeholder="e.g. NABIL"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0a2141] dark:text-white focus:ring-2 focus:ring-[#0a2141]/20 dark:focus:ring-green-400/20 focus:border-[#0a2141] dark:focus:border-green-400 outline-none"
                  placeholder="e.g. Nabil Bank"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Sector
                </label>
                <select
                  value={form.sector}
                  onChange={(e) =>
                    setForm({ ...form, sector: e.target.value as ScorecardStock["sector"] })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0a2141] dark:text-white focus:ring-2 focus:ring-[#0a2141]/20 dark:focus:ring-green-400/20 focus:border-[#0a2141] dark:focus:border-green-400 outline-none"
                >
                  {["Banking", "Manufacturing", "Investment", "Insurance", "Hydro", "Finance", "Microfinance", "Trading", "Others"].map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  LTP (Rs.)
                </label>
                <input
                  type="number"
                  value={form.ltp || ""}
                  onChange={(e) => setForm({ ...form, ltp: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-[#0a2141] dark:text-white focus:ring-2 focus:ring-[#0a2141]/20 dark:focus:ring-green-400/20 focus:border-[#0a2141] dark:focus:border-green-400 outline-none"
                  placeholder="e.g. 512"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <h4 className="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Scoring (0-10)
              </h4>
              <div className="space-y-3">
                {SCORECARD_METRICS.map((metric) => (
                  <div key={metric} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 min-w-[100px]">
                      {METRIC_LABELS[metric]}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={1}
                      value={form[metric]}
                      onChange={(e) =>
                        setForm({ ...form, [metric]: Number(e.target.value) })
                      }
                      className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-[#0a2141] dark:accent-green-400 bg-slate-100 dark:bg-slate-700"
                    />
                    <span className="text-sm font-bold text-[#0a2141] dark:text-white tabular-nums min-w-[1.5rem] text-right">
                      {form[metric]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0a2141] dark:bg-green-600 hover:bg-[#0d2d56] dark:hover:bg-green-700 text-white text-sm font-bold rounded-2xl transition-colors"
            >
              Add Custom Stock
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==================== BENCHMARK GUIDE ====================

const BENCHMARK_ITEMS = [
  {
    verdict: "Strong Buy" as Verdict,
    range: "78% – 100%",
    desc: "Exceptional fundamentals across all metrics. Strong conviction pick for long-term portfolios. These stocks demonstrate consistent outperformance and resilience in adverse conditions.",
    icon: Star,
    borderColor: "border-l-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    rangeColor: "text-emerald-700 dark:text-emerald-300",
  },
  {
    verdict: "Buy" as Verdict,
    range: "58% – 77%",
    desc: "Above-average profile with manageable risks. Suitable for accumulation on dips. Fundamentals are sound, but there may be one or two areas that need monitoring.",
    icon: CheckCircle2,
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    iconColor: "text-green-600 dark:text-green-400",
    rangeColor: "text-green-700 dark:text-green-300",
  },
  {
    verdict: "Watchlist" as Verdict,
    range: "45% – 57%",
    desc: "Mixed signals — potential with significant caveats. Requires closer monitoring before committing capital. Some metrics are strong, but others raise concern.",
    icon: AlertCircle,
    borderColor: "border-l-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    rangeColor: "text-amber-700 dark:text-amber-300",
  },
  {
    verdict: "Avoid" as Verdict,
    range: "Below 45%",
    desc: "Weak profile with multiple red flags. High risk, low conviction. Proceed with caution or stay away. Fundamental deterioration or governance issues may be present.",
    icon: XCircle,
    borderColor: "border-l-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-600 dark:text-red-400",
    rangeColor: "text-red-700 dark:text-red-300",
  },
];

function BenchmarkGuide() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-premium border border-slate-100 dark:border-slate-800 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#0a2141]/5 dark:bg-white/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-[#0a2141] dark:text-green-400" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-bold text-[#0a2141] dark:text-white">
            Benchmark Guide
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            How to interpret weighted scores
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BENCHMARK_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.verdict}
              className={`rounded-2xl border-l-4 ${item.borderColor} ${item.bgColor} p-4`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
                <VerdictBadge verdict={item.verdict} />
              </div>
              <p className={`text-sm font-bold ${item.rangeColor} mb-1`}>
                {item.range}
              </p>
              <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function ScorecardClient({
  initialStocks,
  lastUpdated,
}: {
  initialStocks: ScorecardStock[];
  lastUpdated: string;
}) {
  const [stocks, setStocks] = useState<ScorecardStock[]>(initialStocks);
  const [weights, setWeights] = useState<Record<ScorecardMetricKey, number>>({ ...DEFAULT_WEIGHTS });
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("All");
  const [selectedStock, setSelectedStock] = useState<ScorecardStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileWeights, setShowMobileWeights] = useState(false);

  const handleWeightChange = useCallback(
    (metric: ScorecardMetricKey, value: number) => {
      setWeights((prev) => ({ ...prev, [metric]: value }));
    },
    []
  );

  const handleResetWeights = useCallback(() => {
    setWeights({ ...DEFAULT_WEIGHTS });
  }, []);

  const handleAddCustomStock = useCallback((stock: ScorecardStock) => {
    setStocks((prev) => {
      const existing = prev.findIndex((s) => s.symbol === stock.symbol);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = stock;
        return updated;
      }
      return [...prev, stock];
    });
  }, []);

  const filteredStocks = useMemo(() => {
    return stocks
      .filter((stock) => {
        if (sectorFilter !== "All" && stock.sector !== sectorFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            stock.symbol.toLowerCase().includes(q) ||
            stock.name.toLowerCase().includes(q) ||
            stock.sector.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const aScore = calculateWeightedScore(a, weights);
        const bScore = calculateWeightedScore(b, weights);
        return bScore.percentage - aScore.percentage;
      });
  }, [stocks, sectorFilter, searchQuery, weights]);

  return (
    <main id="main-content" className="flex-1">
      {/* Page Header */}
      <section className="bg-[#0a2141] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
              Stock Evaluation Tool
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            NEPSE Scorecard
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Evaluate NEPSE-listed stocks using a weighted multi-factor scoring system. Adjust weights to match your investment strategy.
          </p>
          {/* Last Updated Date Stamp */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Clock className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[11px] font-semibold text-white/50">
              Data as of {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by symbol, name, or sector..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium text-[#0a2141] dark:text-white focus:ring-2 focus:ring-[#0a2141]/20 dark:focus:ring-green-400/20 focus:border-[#0a2141] dark:focus:border-green-400 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0a2141] dark:bg-green-600 hover:bg-[#0d2d56] dark:hover:bg-green-700 text-white text-sm font-bold rounded-2xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Custom Stock
          </button>
          <button
            onClick={() => setShowMobileWeights(!showMobileWeights)}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Weights
          </button>
        </div>

        {/* Sector Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {SECTOR_FILTERS.map((sector) => {
            const isActive = sectorFilter === sector;
            const count =
              sector === "All"
                ? stocks.length
                : stocks.filter((s) => s.sector === sector).length;
            return (
              <button
                key={sector}
                onClick={() => setSectorFilter(sector)}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#0a2141] text-white shadow-premium"
                    : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-[#0a2141] dark:hover:text-white border border-slate-200 dark:border-slate-700"
                }`}
              >
                {sector}
                <span className="ml-1.5 text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Weight Panel — Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <WeightPanel
                weights={weights}
                onWeightChange={handleWeightChange}
                onReset={handleResetWeights}
              />
            </div>
          </div>

          {/* Mobile Weight Panel */}
          {showMobileWeights && (
            <div className="lg:hidden col-span-full">
              <WeightPanel
                weights={weights}
                onWeightChange={handleWeightChange}
                onReset={handleResetWeights}
              />
            </div>
          )}

          {/* Main Table + Spotlight */}
          <div className="lg:col-span-3 space-y-6">
            {/* Scored Stock Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-premium border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading text-lg font-bold text-[#0a2141] dark:text-white">
                      Scored Stocks
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      {lastUpdated}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {filteredStocks.length} stock{filteredStocks.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {filteredStocks.length > 0 ? (
                <StockTable
                  stocks={filteredStocks}
                  weights={weights}
                  onSelectStock={setSelectedStock}
                />
              ) : (
                <div className="p-12 text-center">
                  <BarChart3 className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                    No stocks match your filters.
                  </p>
                </div>
              )}
            </div>

            {/* Stock Spotlight */}
            {selectedStock && (
              <StockSpotlight
                stock={selectedStock}
                weights={weights}
                onClose={() => setSelectedStock(null)}
              />
            )}
          </div>
        </div>

        {/* Benchmark Guide — Full Width Section */}
        <div className="mt-12">
          <BenchmarkGuide />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
              Disclaimer
            </p>
            <p className="text-sm text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
              This scorecard is for educational purposes only. Scores are subjective assessments and do not constitute financial advice. 
              Always conduct your own research and consult a qualified financial advisor before making investment decisions. 
              Past scores do not guarantee future performance.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Stock Modal */}
      <CustomStockModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCustomStock}
      />
    </main>
  );
}
