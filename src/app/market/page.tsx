'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SubscribeForm } from '@/components/common/SubscribeForm';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { type MarketDataResult } from '@/lib/nepse-api';
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  Activity,
  Zap,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function formatNumber(num: number, decimals = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatVolume(vol: number): string {
  if (vol >= 1000000) return (vol / 1000000).toFixed(1) + 'M';
  if (vol >= 1000) return (vol / 1000).toFixed(1) + 'K';
  return vol.toString();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function isMarketHours(): boolean {
  const now = new Date();
  // Nepal is UTC+5:45
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const nepalTime = new Date(utc + 5.75 * 3600000);

  const day = nepalTime.getDay(); // 0=Sun, 6=Sat
  const hours = nepalTime.getHours();
  const minutes = nepalTime.getMinutes();
  const timeDecimal = hours + minutes / 60;

  // Market open: Sunday-Thursday, 11:00-15:00 NST
  if (day === 0 || day === 6) return false; // Sat=6, but NEPSE open Sun-Fri mapped as 0-4
  // Actually, Nepal's week: Sunday=0, ..., Thursday=4, Friday=5, Saturday=6
  if (day === 5 || day === 6) return false;
  return timeDecimal >= 11 && timeDecimal <= 15;
}

function DataSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white rounded-3xl p-6 shadow-premium">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-12 w-48 mb-2" />
        <Skeleton className="h-5 w-32 mb-6" />
        <Skeleton className="h-4 w-52" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-premium">
          <Skeleton className="h-5 w-32 mb-4" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-premium">
          <Skeleton className="h-5 w-32 mb-4" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-3xl p-6 shadow-premium">
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketPage() {
  const [data, setData] = useState<MarketDataResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/market-data');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch {
      setError('Unable to load market data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const marketOpen = isMarketHours();
  const isPositive = data ? data.nepseIndex.change >= 0 : true;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0a2141] text-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-6 h-6 text-green-400" />
              <span className="text-[9px] uppercase font-black tracking-widest text-white/50">
                Live Market Overview
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Market Data
            </h1>
            <p className="text-sm text-white/60 leading-relaxed max-w-xl">
              Real-time NEPSE index, top gainers &amp; losers, and sector performance — updated throughout trading hours.
            </p>
          </div>
        </section>

        {/* Market Hours Notice */}
        {!marketOpen && !loading && (
          <section className="bg-amber-50 border-b border-amber-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 leading-relaxed">
                  <span className="font-semibold">Market Closed</span> — NEPSE trades Sunday–Thursday, 11:00 AM – 3:00 PM NST.
                  Data shown is from the last trading session.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-10 sm:py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {loading ? (
              <DataSkeleton />
            ) : error ? (
              <div className="bg-white rounded-3xl p-8 shadow-premium text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-sm text-slate-600 mb-6">{error}</p>
                <button
                  onClick={() => fetchData(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0a2141] text-white text-sm font-semibold rounded-full hover:bg-[#0a2141]/90 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            ) : data ? (
              <div className="space-y-8">
                {/* Data Source + Refresh */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>Data as of {formatDate(data.timestamp)}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        data.source === 'api'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          data.source === 'api' ? 'bg-green-500' : 'bg-amber-500'
                        }`}
                      />
                      {data.source === 'api' ? 'Live API' : 'Sample Data'}
                    </span>
                    <span className="text-xs text-slate-400">{data.dataSource}</span>
                  </div>
                  <button
                    onClick={() => fetchData(true)}
                    disabled={refreshing}
                    className="inline-flex items-center gap-2 px-5 py-2 bg-[#0a2141] text-white text-sm font-semibold rounded-full hover:bg-[#0a2141]/90 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </button>
                </div>

                {/* Manual Data Notice */}
                {data.source === 'manual' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-amber-800">Static Data — Updated Weekly</p>
                        <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                          NEPSE&apos;s official API requires authentication and is not publicly accessible for free.
                          Market data shown below is updated manually each week. To update the data, edit
                          the <code className="px-1.5 py-0.5 bg-amber-100 rounded text-xs font-mono">src/lib/nepse-api.ts</code> file
                          in the codebase and redeploy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* NEPSE Index Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-premium">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-5 h-5 text-[#0a2141]" />
                    <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                      NEPSE Index
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
                    <div>
                      <div className="flex items-end gap-4">
                        <span className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0a2141] tracking-tight">
                          {formatNumber(data.nepseIndex.value)}
                        </span>
                        {isPositive ? (
                          <TrendingUp className="w-8 h-8 text-green-500 mb-1" />
                        ) : (
                          <TrendingDown className="w-8 h-8 text-red-500 mb-1" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-semibold ${
                            isPositive ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {isPositive ? '+' : ''}
                          {formatNumber(data.nepseIndex.change)} pts
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                            isPositive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {formatNumber(data.nepseIndex.changePercent)}%
                        </span>
                      </div>
                    </div>
                    <div className="sm:ml-auto">
                      <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 block mb-1">
                        Daily Turnover
                      </span>
                      <span className="font-heading text-xl sm:text-2xl font-bold text-[#0a2141]">
                        Rs. {formatNumber(data.turnover)}B
                      </span>
                      {data.turnoverChange !== 0 && (
                        <span
                          className={`text-xs font-semibold ${
                            data.turnoverChange >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {' '}
                          {data.turnoverChange >= 0 ? '+' : ''}
                          {formatNumber(data.turnoverChange)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Gainers & Losers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Top Gainers */}
                  <div className="bg-white rounded-3xl p-6 shadow-premium">
                    <div className="flex items-center gap-2 mb-5">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                        Top Gainers
                      </span>
                    </div>
                    <div className="overflow-x-auto -mx-6 px-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-100">
                            <th className="text-left py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Symbol
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              LTP
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Chg
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Chg %
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400 hidden sm:table-cell">
                              Vol
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.topGainers.map((stock) => (
                            <tr
                              key={stock.symbol}
                              className="border-b border-slate-50 last:border-0 hover:bg-green-50/30 transition-colors"
                            >
                              <td className="py-3">
                                <span className="font-bold text-slate-800">{stock.symbol}</span>
                              </td>
                              <td className="text-right py-3 font-semibold text-slate-700">
                                Rs. {formatNumber(stock.ltp, 0)}
                              </td>
                              <td className="text-right py-3 text-green-600 font-semibold">
                                +{formatNumber(stock.change)}
                              </td>
                              <td className="text-right py-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                  +{formatNumber(stock.changePercent)}%
                                </span>
                              </td>
                              <td className="text-right py-3 text-slate-500 hidden sm:table-cell">
                                {formatVolume(stock.volume)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Top Losers */}
                  <div className="bg-white rounded-3xl p-6 shadow-premium">
                    <div className="flex items-center gap-2 mb-5">
                      <TrendingDown className="w-5 h-5 text-red-500" />
                      <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                        Top Losers
                      </span>
                    </div>
                    <div className="overflow-x-auto -mx-6 px-6">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-100">
                            <th className="text-left py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Symbol
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              LTP
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Chg
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Chg %
                            </th>
                            <th className="text-right py-2 text-[10px] uppercase font-black tracking-wider text-slate-400 hidden sm:table-cell">
                              Vol
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.topLosers.map((stock) => (
                            <tr
                              key={stock.symbol}
                              className="border-b border-slate-50 last:border-0 hover:bg-red-50/30 transition-colors"
                            >
                              <td className="py-3">
                                <span className="font-bold text-slate-800">{stock.symbol}</span>
                              </td>
                              <td className="text-right py-3 font-semibold text-slate-700">
                                Rs. {formatNumber(stock.ltp, 0)}
                              </td>
                              <td className="text-right py-3 text-red-600 font-semibold">
                                {formatNumber(stock.change)}
                              </td>
                              <td className="text-right py-3">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                                  {formatNumber(stock.changePercent)}%
                                </span>
                              </td>
                              <td className="text-right py-3 text-slate-500 hidden sm:table-cell">
                                {formatVolume(stock.volume)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Sector Performance */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-premium">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-5 h-5 text-[#0a2141]" />
                    <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">
                      Sector Performance
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.sectorIndices.map((sector) => {
                      const positive = sector.change >= 0;
                      return (
                        <div
                          key={sector.name}
                          className={`rounded-2xl p-4 border transition-all hover:shadow-md ${
                            positive
                              ? 'border-green-100 bg-green-50/30 hover:border-green-200'
                              : 'border-red-100 bg-red-50/30 hover:border-red-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-slate-800 leading-tight">
                              {sector.name}
                            </span>
                            {positive ? (
                              <ArrowUpRight className="w-4 h-4 text-green-600 shrink-0" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-500 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-lg font-bold text-[#0a2141]">
                              {formatNumber(sector.index)}
                            </span>
                            <div className="text-right">
                              <span
                                className={`text-sm font-semibold ${
                                  positive ? 'text-green-600' : 'text-red-600'
                                }`}
                              >
                                {positive ? '+' : ''}
                                {formatNumber(sector.change)}
                              </span>
                              <span
                                className={`ml-1 text-xs font-bold ${
                                  positive ? 'text-green-500' : 'text-red-500'
                                }`}
                              >
                                ({positive ? '+' : ''}
                                {formatNumber(sector.changePercent)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ad Placeholder */}
                <AdPlaceholder />

                {/* Subscribe Section */}
                <SubscribeForm />
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
