'use client';

import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface MarketSnapshotProps {
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
}

export default function MarketSnapshot({
  asOfDate,
  indexClosing,
  indexPrevious,
  indexChange,
  indexChangePoints,
  indexPositive,
  turnoverThisWeek,
  turnoverPrevWeek,
  turnoverChange,
  turnoverPositive,
  topSectorName,
  topSectorChange,
  secondSectorName,
  secondSectorChange,
  laggardSector,
  marketContext,
}: MarketSnapshotProps) {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="w-8 h-8 rounded-full bg-[#0a2141] text-white text-sm font-bold flex items-center justify-center">
          1
        </span>
        <div className="flex items-center gap-3 flex-1">
          <h2 className="font-heading text-sm font-black tracking-wider text-[#0a2141] uppercase">
            Market Snapshot as of {asOfDate}
          </h2>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
      </div>

      {/* White Card with 3-column grid */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Column 1: NEPSE Index */}
          <div className="p-8">
            <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-4">
              NEPSE Index
            </p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-3">
              Weekly Closing
            </p>
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className="font-heading text-3xl font-black text-[#0a2141] leading-none">
                  {indexClosing}
                </span>
                <div
                  className={`flex items-center gap-1 text-sm font-bold ${
                    indexPositive ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {indexPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{indexChange}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Prev: {indexPrevious}</span>
                <span className={indexPositive ? 'text-green-600' : 'text-red-500'}>
                  {indexChangePoints}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Total Weekly Turnover */}
          <div className="p-8">
            <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-4">
              Total Weekly Turnover
            </p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-3">
              Weekly Volume
            </p>
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                <span className="font-heading text-3xl font-black text-[#0a2141] leading-none">
                  Rs. {turnoverThisWeek}
                </span>
                <div
                  className={`flex items-center gap-1 text-sm font-bold ${
                    turnoverPositive ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {turnoverPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{turnoverChange}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Prev Week: Rs. {turnoverPrevWeek}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Weekly Sector Performance */}
          <div className="p-8 bg-slate-50/50">
            <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-4">
              Weekly Sector Performance
            </p>
            <div className="space-y-3">
              {/* Top Sector */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  {topSectorName}
                </span>
                <span className="text-sm font-bold text-green-600">
                  {topSectorChange}
                </span>
              </div>
              {/* Second Sector */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  {secondSectorName}
                </span>
                <span className="text-sm font-bold text-green-600">
                  {secondSectorChange}
                </span>
              </div>
              {/* Laggard */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-sm font-semibold text-red-500">
                  {laggardSector}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Context Box */}
        <div className="px-8 pb-8">
          <div className="bg-indigo-50/80 border border-indigo-100/60 p-4 rounded-xl">
            <p className="text-[9px] uppercase font-black tracking-widest text-indigo-400 mb-2">
              Market Context
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {marketContext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
