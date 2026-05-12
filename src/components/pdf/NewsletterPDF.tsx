'use client';

import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import type { NewsletterData } from '@/lib/data';

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                      */
/* ------------------------------------------------------------------ */
const T = {
  navy: '#0a2141',
  navyDark: '#0d2d56',
  bg: '#f8fafc',
  green600: '#16a34a',
  green500: '#22c55e',
  green400: '#4ade80',
  green50: '#f0fdf4',
  green100: '#dcfce7',
  green200: '#bbf7d0',
  red500: '#ef4444',
  red50: '#fef2f2',
  red100: '#fee2e2',
  blue100: '#dbeafe',
  blue700: '#1d4ed8',
  blue900: '#1e3a5f',
  orange100: '#ffedd5',
  orange700: '#c2410c',
  indigo50: '#eef2ff',
  indigo100: '#e0e7ff',
  indigo400: '#818cf8',
  slate50: '#f8fafc',
  slate100: '#f1f5f9',
  slate200: '#e2e8f0',
  slate300: '#cbd5e1',
  slate400: '#94a3b8',
  slate500: '#64748b',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1e293b',
  slate900: '#0f172a',
  white: '#ffffff',
  cardShadow: '0 10px 30px -5px rgba(0,0,0,0.04)',
  darkCardShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
} as const;

/* ------------------------------------------------------------------ */
/*  BADGE COLOR MAP                                                    */
/* ------------------------------------------------------------------ */
const badgeColorMap: Record<string, { bg: string; text: string; border: string }> = {
  green: { bg: T.green100, text: T.green600, border: T.green200 },
  blue: { bg: T.blue100, text: T.blue700, border: '#bfdbfe' },
  orange: { bg: T.orange100, text: T.orange700, border: '#fed7aa' },
};

/* ------------------------------------------------------------------ */
/*  REUSABLE INLINE-STYLE HELPERS                                      */
/* ------------------------------------------------------------------ */
const labelStyle: React.CSSProperties = {
  fontSize: '9px',
  textTransform: 'uppercase',
  fontWeight: 900,
  letterSpacing: '0.1em',
  color: T.slate400,
};

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px',
};

const sectionNumberStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: T.navy,
  color: T.white,
  fontSize: '14px',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 900,
  letterSpacing: '0.05em',
  color: T.navy,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

const sectionLineStyle: React.CSSProperties = {
  flex: 1,
  height: '1px',
  backgroundColor: T.slate200,
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */
export default function NewsletterPDF({ data }: { data: NewsletterData }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const downloadPDF = async () => {
    if (!contentRef.current || generating) return;
    setGenerating(true);
    try {
      const opt = {
        margin: 0,
        filename: `NEPSE-SIMPLIFIED-${data.volume.replace(/\s/g, '-')}.pdf`,
        image: { type: 'jpeg' as const, quality: 1.0 },
        html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 794 },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as string[] },
      };
      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (err) {
      console.error('PDF generation failed:', err);
    } finally {
      setGenerating(false);
    }
  };

  /* ---- badge colors ---- */
  const getBadge = (color: string) => badgeColorMap[color] ?? badgeColorMap.blue;

  /* ================================================================ */
  return (
    <div style={{ position: 'relative' }}>
      {/* ----------------------------------------------------------- */}
      {/*  FLOATING DOWNLOAD BUTTON (not captured by PDF)              */}
      {/* ----------------------------------------------------------- */}
      <button
        onClick={downloadPDF}
        disabled={generating}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 10000,
          backgroundColor: generating ? T.slate400 : T.green600,
          color: T.white,
          border: 'none',
          borderRadius: '9999px',
          padding: '16px 28px',
          fontSize: '14px',
          fontWeight: 700,
          cursor: generating ? 'wait' : 'pointer',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Inter, sans-serif',
          transition: 'background-color 0.2s',
          letterSpacing: '0.02em',
        }}
      >
        {generating ? 'Generating...' : '\u2B07\uFE0F Download PDF'}
      </button>

      {/* ----------------------------------------------------------- */}
      {/*  PDF CONTENT                                                 */}
      {/* ----------------------------------------------------------- */}
      <div
        ref={contentRef}
        style={{
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: T.bg,
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          margin: '0 auto',
          overflow: 'hidden',
        }}
      >
        {/* ========== WATERMARK ========== */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: '80px',
            color: 'rgba(10,33,65,0.03)',
            fontWeight: 900,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 9999,
            fontFamily: 'sans-serif',
            letterSpacing: '20px',
          }}
        >
          NEPSE SIMPLIFIED
        </div>

        {/* ========== HEADER ========== */}
        <div
          style={{
            backgroundColor: T.white,
            borderBottom: `4px solid ${T.navy}`,
          }}
        >
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '24px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Left: Logo + Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: T.navy,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/logo.jpg"
                  alt="NEPSE SIMPLIFIED"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    color: T.navy,
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  NEPSE SIMPLIFIED
                </h1>
                <p style={{ ...labelStyle, marginTop: '2px', marginBottom: 0 }}>
                  Weekly Market Intelligence
                </p>
              </div>
              {/* Weekly Edition Badge */}
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: T.green50,
                  color: T.green600,
                  fontSize: '10px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  border: `1px solid ${T.green200}`,
                  marginLeft: '8px',
                }}
              >
                Weekly Edition
              </span>
            </div>

            {/* Right: Volume + Date */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', justifyContent: 'flex-end' }}>
                <span style={{ ...labelStyle }}>Volume</span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    color: T.navy,
                    fontFamily: 'Outfit, Inter, sans-serif',
                  }}
                >
                  {data.volume}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: T.slate500, marginTop: '2px', marginBottom: 0 }}>
                {data.dateRange}
              </p>
            </div>
          </div>
        </div>

        {/* ========== MAIN CONTENT ========== */}
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            padding: '64px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
          }}
        >
          {/* ------------------------------------------------------- */}
          {/*  SECTION 1: MARKET SNAPSHOT                              */}
          {/* ------------------------------------------------------- */}
          <section>
            <div style={sectionHeaderStyle}>
              <div style={sectionNumberStyle}>1</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={sectionTitleStyle}>Market Snapshot as of {data.asOfDate}</span>
                <div style={sectionLineStyle} />
              </div>
            </div>

            {/* White Card with 3-column grid */}
            <div
              style={{
                backgroundColor: T.white,
                borderRadius: '40px',
                border: `1px solid ${T.slate100}`,
                boxShadow: T.cardShadow,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                }}
              >
                {/* Col 1: NEPSE Index */}
                <div style={{ padding: '32px' }}>
                  <p style={{ ...labelStyle, marginBottom: '16px' }}>NEPSE Index</p>
                  <p
                    style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: T.slate500,
                      marginBottom: '12px',
                    }}
                  >
                    Weekly Closing
                  </p>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '30px',
                          fontWeight: 900,
                          color: T.navy,
                          lineHeight: 1,
                          fontFamily: 'Outfit, Inter, sans-serif',
                        }}
                      >
                        {data.indexClosing}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: data.indexPositive ? T.green600 : T.red500,
                        }}
                      >
                        <span>{data.indexPositive ? '\u25B2' : '\u25BC'}</span>
                        <span>{data.indexChange}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: T.slate500,
                        marginTop: '8px',
                      }}
                    >
                      <span>Prev: {data.indexPrevious}</span>
                      <span style={{ color: data.indexPositive ? T.green600 : T.red500 }}>
                        {data.indexChangePoints}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', backgroundColor: T.slate100 }} />

                {/* Col 2: Total Weekly Turnover */}
                <div style={{ padding: '32px' }}>
                  <p style={{ ...labelStyle, marginBottom: '16px' }}>Total Weekly Turnover</p>
                  <p
                    style={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      color: T.slate500,
                      marginBottom: '12px',
                    }}
                  >
                    Weekly Volume
                  </p>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '30px',
                          fontWeight: 900,
                          color: T.navy,
                          lineHeight: 1,
                          fontFamily: 'Outfit, Inter, sans-serif',
                        }}
                      >
                        Rs. {data.turnoverThisWeek}
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: data.turnoverPositive ? T.green600 : T.red500,
                        }}
                      >
                        <span>{data.turnoverPositive ? '\u25B2' : '\u25BC'}</span>
                        <span>{data.turnoverChange}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        color: T.slate500,
                        marginTop: '8px',
                      }}
                    >
                      <span>Prev Week: Rs. {data.turnoverPrevWeek}</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', backgroundColor: T.slate100 }} />

                {/* Col 3: Weekly Sector Performance */}
                <div style={{ padding: '32px', backgroundColor: 'rgba(248,250,252,0.5)' }}>
                  <p style={{ ...labelStyle, marginBottom: '16px' }}>Weekly Sector Performance</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Top Sector */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: T.slate700 }}>
                        {data.topSectorName}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: T.green600 }}>
                        {data.topSectorChange}
                      </span>
                    </div>
                    {/* Second Sector */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: T.slate700 }}>
                        {data.secondSectorName}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: T.green600 }}>
                        {data.secondSectorChange}
                      </span>
                    </div>
                    {/* Laggard */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        paddingTop: '8px',
                        borderTop: `1px solid ${T.slate200}`,
                      }}
                    >
                      <span style={{ fontSize: '14px', color: '#f87171' }}>{'\u26A0'}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: T.red500 }}>
                        {data.laggardSector}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Context Box */}
              <div style={{ padding: '0 32px 32px 32px' }}>
                <div
                  style={{
                    backgroundColor: T.indigo50,
                    border: `1px solid ${T.indigo100}`,
                    opacity: 0.8,
                    padding: '16px',
                    borderRadius: '12px',
                  }}
                >
                  <p style={{ ...labelStyle, marginBottom: '8px', color: T.indigo400 }}>
                    Market Context
                  </p>
                  <p style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625, margin: 0 }}>
                    {data.marketContext}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/*  SECTION 2: MARKET SENTIMENT (PESTLE ANALYSIS)           */}
          {/* ------------------------------------------------------- */}
          <section>
            <div style={sectionHeaderStyle}>
              <div style={sectionNumberStyle}>2</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={sectionTitleStyle}>Market Sentiment (PESTLE Analysis)</span>
                <div style={sectionLineStyle} />
              </div>
            </div>

            {/* 3-column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '24px',
              }}
            >
              {/* Opportunities Column */}
              <div
                style={{
                  backgroundColor: 'rgba(240,253,244,0.5)',
                  border: `1px solid ${T.green100}`,
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(22,163,74,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: T.green600,
                      fontSize: '16px',
                    }}
                  >
                    {'\u2713'}
                  </div>
                  <h3 style={{ ...sectionTitleStyle, fontSize: '14px' }}>Opportunities</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  {data.opportunities.map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: T.slate800, marginBottom: '8px', margin: '0 0 8px 0' }}>
                        {item.title}
                      </p>
                      <div
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          padding: '12px',
                          borderRadius: '12px',
                        }}
                      >
                        <p style={{ ...labelStyle, marginBottom: '4px' }}>The Takeaway:</p>
                        <p style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625, margin: 0 }}>
                          {item.takeaway}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threats Column */}
              <div
                style={{
                  backgroundColor: 'rgba(254,242,242,0.5)',
                  border: `1px solid ${T.red100}`,
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(239,68,68,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: T.red500,
                      fontSize: '16px',
                    }}
                  >
                    {'\u2717'}
                  </div>
                  <h3 style={{ ...sectionTitleStyle, fontSize: '14px' }}>Threats</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  {data.risks.map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: T.slate800, margin: '0 0 8px 0' }}>
                        {item.title}
                      </p>
                      <div
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          padding: '12px',
                          borderRadius: '12px',
                        }}
                      >
                        <p style={{ ...labelStyle, marginBottom: '4px' }}>The Takeaway:</p>
                        <p style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625, margin: 0 }}>
                          {item.takeaway}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategies Column */}
              <div
                style={{
                  backgroundColor: T.slate50,
                  border: `1px solid ${T.slate200}`,
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(30,58,95,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: T.blue900,
                      fontSize: '16px',
                    }}
                  >
                    {'\u25B6'}
                  </div>
                  <h3 style={{ ...sectionTitleStyle, fontSize: '14px' }}>Strategies for Investors</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                  {data.strategicFocus.map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: '14px', fontWeight: 700, color: T.slate800, margin: '0 0 8px 0' }}>
                        {item.title}
                      </p>
                      <div
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.6)',
                          border: '1px solid rgba(0,0,0,0.05)',
                          padding: '12px',
                          borderRadius: '12px',
                        }}
                      >
                        <p style={{ ...labelStyle, marginBottom: '4px' }}>The Takeaway:</p>
                        <p style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625, margin: 0 }}>
                          {item.takeaway}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/*  SECTION 3: SMART MONEY WATCHLIST                        */}
          {/* ------------------------------------------------------- */}
          <section>
            <div style={sectionHeaderStyle}>
              <div style={sectionNumberStyle}>3</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={sectionTitleStyle}>Smart Money Watchlist</span>
                <div style={sectionLineStyle} />
              </div>
            </div>

            {/* Two-column: Watchlist + Events */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
              }}
            >
              {/* Left: Watchlist */}
              <div
                style={{
                  backgroundColor: T.white,
                  borderRadius: '24px',
                  border: `1px solid ${T.slate100}`,
                  boxShadow: T.cardShadow,
                  padding: '32px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {data.stocks.map((stock, i) => {
                    const badge = getBadge(stock.badgeColor);
                    return (
                      <div
                        key={stock.symbol}
                        style={{
                          paddingBottom: i < data.stocks.length - 1 ? '24px' : 0,
                          borderBottom: i < data.stocks.length - 1 ? `1px solid ${T.slate100}` : 'none',
                          marginBottom: i < data.stocks.length - 1 ? '24px' : 0,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <span
                            style={{
                              fontSize: '22px',
                              fontWeight: 900,
                              color: T.navy,
                              fontFamily: 'Outfit, Inter, sans-serif',
                            }}
                          >
                            {stock.symbol}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              textTransform: 'uppercase',
                              fontWeight: 700,
                              letterSpacing: '0.05em',
                              padding: '4px 12px',
                              borderRadius: '9999px',
                              border: `1px solid ${badge.border}`,
                              backgroundColor: badge.bg,
                              color: badge.text,
                            }}
                          >
                            {stock.badge}
                          </span>
                        </div>
                        <p style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625, margin: '0 0 8px 0' }}>
                          {stock.reasoning}
                        </p>
                        <p style={{ fontSize: '12px', fontStyle: 'italic', color: T.slate400, margin: 0 }}>
                          {stock.tip}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Upcoming Events */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Card 1: IPOs, Rights & Auctions */}
                <div
                  style={{
                    backgroundColor: T.white,
                    borderRadius: '16px',
                    border: `1px solid ${T.slate100}`,
                    boxShadow: T.cardShadow,
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: T.orange100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '18px',
                    }}
                  >
                    {'\uD83D\uDCC5'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        ...sectionTitleStyle,
                        fontSize: '13px',
                        marginBottom: '12px',
                      }}
                    >
                      IPOs, Rights &amp; Auctions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {data.iposAndAuctions.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ fontSize: '14px', color: T.slate400, flexShrink: 0, marginTop: '2px' }}>{'\uD83D\uDCC5'}</span>
                          <span style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Policy Notices */}
                <div
                  style={{
                    backgroundColor: T.white,
                    borderRadius: '16px',
                    border: `1px solid ${T.slate100}`,
                    boxShadow: T.cardShadow,
                    padding: '24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: T.indigo50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '18px',
                    }}
                  >
                    {'\uD83C\uDFDB\uFE0F'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        ...sectionTitleStyle,
                        fontSize: '13px',
                        marginBottom: '12px',
                      }}
                    >
                      Policy Notices
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {data.policyNotices.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <span style={{ fontSize: '14px', color: T.slate400, flexShrink: 0, marginTop: '2px' }}>{'\u203A'}</span>
                          <span style={{ fontSize: '14px', color: T.slate600, lineHeight: 1.625 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/*  SECTION 4: STRATEGIC COMPANY ANALYSIS                   */}
          {/* ------------------------------------------------------- */}
          <section>
            <div style={sectionHeaderStyle}>
              <div style={sectionNumberStyle}>4</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={sectionTitleStyle}>Strategic Company Analysis</span>
                <div style={sectionLineStyle} />
              </div>
            </div>

            {/* Dark Card */}
            <div
              style={{
                backgroundColor: '#0f172a',
                color: T.white,
                borderRadius: '48px',
                boxShadow: T.darkCardShadow,
                padding: '40px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '48px',
                }}
              >
                {/* Left Column */}
                <div>
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: T.green400,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      marginBottom: '24px',
                      fontFamily: 'Outfit, Inter, sans-serif',
                    }}
                  >
                    {data.companyName}
                  </h3>

                  {/* Metrics Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '16px',
                      marginBottom: '24px',
                    }}
                  >
                    <div>
                      <p style={{ ...labelStyle, marginBottom: '4px', color: '#64748b' }}>LTP</p>
                      <p style={{ fontSize: '20px', fontWeight: 900, color: T.white, fontFamily: 'Outfit, Inter, sans-serif' }}>
                        {data.ltp}
                      </p>
                    </div>
                    <div>
                      <p style={{ ...labelStyle, marginBottom: '4px', color: '#64748b' }}>Weekly High</p>
                      <p style={{ fontSize: '20px', fontWeight: 900, color: T.white, fontFamily: 'Outfit, Inter, sans-serif' }}>
                        {data.weeklyHigh}
                      </p>
                    </div>
                    <div>
                      <p style={{ ...labelStyle, marginBottom: '4px', color: '#64748b' }}>Trend</p>
                      <p style={{ fontSize: '20px', fontWeight: 900, color: T.green400, fontFamily: 'Outfit, Inter, sans-serif' }}>
                        {data.trend}
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.625 }}>
                    {data.description}
                  </p>
                </div>

                {/* Right Column */}
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    padding: '32px',
                  }}
                >
                  <p style={{ ...labelStyle, marginBottom: '16px', color: '#94a3b8' }}>
                    Strategic Opinion
                  </p>
                  <blockquote
                    style={{
                      fontSize: '14px',
                      color: '#e2e8f0',
                      lineHeight: 1.625,
                      fontStyle: 'italic',
                      marginBottom: '32px',
                      borderLeft: `2px solid rgba(34,197,94,0.5)`,
                      paddingLeft: '16px',
                      margin: '0 0 32px 0',
                    }}
                  >
                    {data.strategicOpinion}
                  </blockquote>

                  {/* Checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { label: 'Support Zone', value: data.supportZone },
                      { label: 'Resistance', value: data.resistance },
                      { label: 'Institutional Demand', value: data.institutionalDemand },
                      { label: 'Market Float', value: data.marketFloat },
                    ].map((item) => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: T.green500, fontSize: '16px' }}>{'\u2713'}</span>
                        <span style={{ ...labelStyle, color: '#64748b', flexShrink: 0 }}>
                          {item.label}:
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: T.white }}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/*  SECTION 5: LEARNER'S INSIGHT                            */}
          {/* ------------------------------------------------------- */}
          <section>
            <div style={sectionHeaderStyle}>
              <div style={sectionNumberStyle}>5</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={sectionTitleStyle}>Learner&apos;s Insight</span>
                <div style={sectionLineStyle} />
              </div>
            </div>

            {/* 3-column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '24px',
              }}
            >
              {data.insights.map((insight, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: T.slate50,
                    padding: '32px',
                    borderRadius: '24px',
                    border: `1px solid ${T.slate100}`,
                  }}
                >
                  <p style={{ ...labelStyle, marginBottom: '12px', color: T.navy }}>
                    {insight.category}
                  </p>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: T.slate800, marginBottom: '8px' }}>
                    {insight.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: T.slate600, lineHeight: 1.625, margin: 0 }}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ------------------------------------------------------- */}
          {/*  SECTION 6: SUMMARY & AUTHOR'S OUTLOOK                   */}
          {/* ------------------------------------------------------- */}
          <section>
            <div style={sectionHeaderStyle}>
              <div style={sectionNumberStyle}>6</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={sectionTitleStyle}>Summary &amp; Author&apos;s Outlook</span>
                <div style={sectionLineStyle} />
              </div>
            </div>

            {/* Summary Card */}
            <div
              style={{
                backgroundColor: T.white,
                borderRadius: '48px',
                border: `1px solid ${T.slate100}`,
                boxShadow: T.cardShadow,
                padding: '40px',
              }}
            >
              <blockquote
                style={{
                  fontSize: '20px',
                  color: T.slate600,
                  textAlign: 'center',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  margin: '0 0 32px 0',
                }}
              >
                &ldquo;{data.summaryText}&rdquo;
              </blockquote>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <p style={{ ...labelStyle, color: T.navy, fontWeight: 900 }}>
                  &mdash; NEPSE SIMPLIFIED TEAM
                </p>

                {/* Disclaimer Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: T.red50,
                    border: `1px solid ${T.red100}`,
                    borderRadius: '9999px',
                    padding: '8px 16px',
                  }}
                >
                  <span style={{ fontSize: '14px', color: '#f87171' }}>{'\u26A0'}</span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      color: T.red500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    For Educational Purposes Only &mdash; Not Financial Advice
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ========== FOOTER ========== */}
        <div style={{ backgroundColor: T.navy, color: T.white }}>
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              padding: '48px 32px 24px 32px',
            }}
          >
            {/* Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '48px',
              }}
            >
              {/* Platforms */}
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '16px',
                  }}
                >
                  Platforms
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Blog', 'Facebook', 'TikTok'].map((p) => (
                    <span key={p} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* About */}
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '16px',
                  }}
                >
                  About Us
                </h4>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.625 }}>
                  NEPSE Simplified breaks down Nepal Stock Exchange data into clear, actionable insights.
                </p>
              </div>

              {/* Mission */}
              <div>
                <h4
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '16px',
                  }}
                >
                  Our Mission
                </h4>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.625 }}>
                  Making Nepal&apos;s stock market accessible to every investor through simplified analysis.
                </p>
              </div>

              {/* Logo + Brand */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src="/logo.jpg"
                      alt="NEPSE SIMPLIFIED"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: 800,
                        color: T.white,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        display: 'block',
                      }}
                    >
                      NEPSE SIMPLIFIED
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      Understand &bull; Interpret &bull; Invest Smart
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                  Weekly market intelligence for informed investors.
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div
              style={{
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                &copy; {new Date().getFullYear()} NEPSE SIMPLIFIED. All rights reserved.
              </p>
              <p
                style={{
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.3)',
                  margin: 0,
                }}
              >
                FOR EDUCATIONAL PURPOSES ONLY &bull; NOT FINANCIAL ADVICE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
