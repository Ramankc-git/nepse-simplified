// Newsletter data types and sample content for NEPSE SIMPLIFIED
// In production, this would be replaced by Decap CMS content from /content/

export interface PestleItem {
  title: string;
  takeaway: string;
}

export interface WatchlistStock {
  symbol: string;
  badge: string;
  badgeColor: "green" | "blue" | "orange";
  reasoning: string;
  tip: string;
}

export interface NewsletterData {
  slug: string;
  volume: string;
  dateRange: string;
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
  opportunities: PestleItem[];
  risks: PestleItem[];
  strategicFocus: PestleItem[];
  stocks: WatchlistStock[];
  iposAndAuctions: string[];
  policyNotices: string[];
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
  insights: {
    category: string;
    title: string;
    description: string;
  }[];
  summaryText: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "highlight"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metric"; label: string; value: string }
  | { type: "tip"; title: string; text: string };

export interface AnalysisArticle {
  slug: string;
  title: string;
  category: "company" | "sector";
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
  content: ContentBlock[];
}

export interface LearningArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
  content: ContentBlock[];
}

export interface MarketEvent {
  id: string;
  type: "ipo" | "right-share" | "auction" | "dividend" | "agm" | "policy";
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "open" | "closed";
  details: string;
}

// ==================== SAMPLE DATA ====================

export const newsletters: NewsletterData[] = [
  {
    slug: "vol-001",
    volume: "Vol. 001",
    dateRange: "May 01 — May 08, 2026",
    asOfDate: "May 08, 2026",
    indexClosing: "2,745.65",
    indexPrevious: "2,738.72",
    indexChange: "+0.25%",
    indexChangePoints: "(+6.93 pts)",
    indexPositive: true,
    turnoverThisWeek: "17.12B",
    turnoverPrevWeek: "21.18B",
    turnoverChange: "-19.1%",
    turnoverPositive: false,
    topSectorName: "Finance Sector",
    topSectorChange: "+3.42%",
    secondSectorName: "Hydropower",
    secondSectorChange: "+2.15%",
    laggardSector: "Microfinance (-4.12%)",
    marketContext:
      "Positive intraday rally on Friday signals buying interest near support levels. Broad-based strength at week-end with 235 stocks closing in green suggests a shift from heavy selling to cautious accumulation as liquidity remains stable.",
    opportunities: [
      {
        title: "Finance sector rotation led by Jhapa Energy (+17.65% weekly).",
        takeaway:
          "Capital is flowing into specific stories. Look for \"sympathy rallies\" in similar companies.",
      },
      {
        title: "Broad-based strength at week-end (235 stocks in green).",
        takeaway:
          "\"Market Breadth\" is healthy. This means the whole market is participating, reducing risk.",
      },
      {
        title: "Positive intraday rally on Friday signals buying interest.",
        takeaway:
          "Buyers are defending key levels. This gives confidence that the \"floor\" is solid for now.",
      },
    ],
    risks: [
      {
        title: "Decline in Microfinance sector (SWBBL -6.54%).",
        takeaway:
          "Regulatory pressure is hurting sentiments here. Avoid \"catching a falling knife.\"",
      },
      {
        title: "Weekly turnover decreased by nearly 19%.",
        takeaway:
          "A rally on low volume is \"weak.\" It suggests lack of institutional conviction.",
      },
      {
        title: "Heavy profit-booking observed in Blue Chip Banks.",
        takeaway:
          "Large players are locking gains. This creates overhead resistance for the index.",
      },
    ],
    strategicFocus: [
      {
        title: "NEPSE Support at 2,650 and Resistance at 2,870 levels.",
        takeaway:
          "Trade within the range. Buy near 2,650 and sell partials near 2,870.",
      },
      {
        title: "Wait-and-see stance ahead of Monetary Policy Review.",
        takeaway:
          "Macro news will override charts. Keep cash ready for potential volatility.",
      },
      {
        title: "Institutional accumulation in Manufacturing sector.",
        takeaway:
          "Watch RSML. Big player buying indicates long-term sectoral confidence.",
      },
    ],
    stocks: [
      {
        symbol: "SOHL",
        badge: "Volume Breakout",
        badgeColor: "green",
        reasoning:
          "We've put this in Smart Money because high delivery volume was seen near 52-week highs, suggesting big players are comfortable holding at these prices.",
        tip: "Don't chase a 5% daily jump; wait for a retest of the breakout line.",
      },
      {
        symbol: "NICA",
        badge: "Institutional Hold",
        badgeColor: "blue",
        reasoning:
          "Despite sectoral weakness, large mutual funds have increased their stake here, absorbing heavy selling pressure.",
        tip: "This is a \"slow and steady\" play. Suitable for SIP-style entries.",
      },
    ],
    iposAndAuctions: [
      "Reliable Samriddhi Yojana 2 (MF IPO): May 12 – May 15, 2026",
      "Snow River Limited (IPO): May 12 – May 15, 2026",
      "BJHL: Unclaimed Rights Auction active until May 12.",
    ],
    policyNotices: [
      "NRB expected to release First Quarter Monetary Review. Market anticipates relaxation on stock loan caps.",
    ],
    companyName: "RSML: Reliance Spinning Mills",
    ltp: "3,800.00",
    weeklyHigh: "3,850.00",
    trend: "Accumulating",
    description:
      "RSML is currently seeing a consolidation phase. Analysis of order book depth suggests institutional interest at current valuations. Sectoral stability in Manufacturing acts as a tailwind.",
    strategicOpinion:
      "Ideal entry between 3,700-3,750. Watch for volume spikes on the daily chart as confirmation of the next leg up.",
    supportZone: "3,700",
    resistance: "3,950",
    institutionalDemand: "High",
    marketFloat: "Limited",
    insights: [
      {
        category: "Mental Model",
        title: "Skin in the Game",
        description:
          "Be careful with advice from those who don't lose money when you do. High-quality analysis always highlights both risks and rewards.",
      },
      {
        category: "Heuristics & Biases",
        title: "Anchoring Bias",
        description:
          "Thinking a stock is \"cheap\" because it used to be higher. A stock's past price doesn't dictate its future value.",
      },
      {
        category: "Important Terms",
        title: "Stop Loss",
        description:
          "A pre-determined price point where you sell to prevent further loss. Essential for preserving capital in volatile markets.",
      },
    ],
    summaryText:
      "The weekly close was slightly positive but lacked the volume support needed for a major breakout. Investors should look for quality 'Growth at Reasonable Price' stocks while monitoring the NRB's next move.",
  },
  {
    slug: "vol-002",
    volume: "Vol. 002",
    dateRange: "May 08 — May 15, 2026",
    asOfDate: "May 15, 2026",
    indexClosing: "2,768.41",
    indexPrevious: "2,745.65",
    indexChange: "+0.83%",
    indexChangePoints: "(+22.76 pts)",
    indexPositive: true,
    turnoverThisWeek: "19.45B",
    turnoverPrevWeek: "17.12B",
    turnoverChange: "+13.6%",
    turnoverPositive: true,
    topSectorName: "Banking",
    topSectorChange: "+4.21%",
    secondSectorName: "Insurance",
    secondSectorChange: "+3.18%",
    laggardSector: "Development Bank (-2.34%)",
    marketContext:
      "Strong weekly close above 2,760 resistance level with increasing participation from institutional investors. Banking sector led the rally on the back of improved NPL indicators. Market sentiment shifted positively after NRB signaled accommodative monetary stance.",
    opportunities: [
      {
        title: "Banking sector breakout above 6-week consolidation range.",
        takeaway:
          "When a sector breaks out of a tight range with volume, it often signals the start of a new trend. Look for continuation in top-tier banks.",
      },
      {
        title: "NRB signals accommodative monetary policy stance.",
        takeaway:
          "An accommodative central bank means easier liquidity and potentially lower interest rates — both tailwinds for equities.",
      },
      {
        title: "Foreign investor interest returning to Nepali markets.",
        takeaway:
          "FIPI inflows provide a demand floor for large-cap stocks. Monitor daily NEPSE FIPI data for confirmation.",
      },
    ],
    risks: [
      {
        title: "Global equity sell-off could spill over to NEPSE.",
        takeaway:
          "Nepal's market is not fully insulated from global trends. Keep position sizes manageable during high-VIX periods.",
      },
      {
        title: "Inflation remains above NRB's target range.",
        takeaway:
          "Persistent inflation may force the central bank to reverse its accommodative stance, creating headwinds for rate-sensitive sectors.",
      },
      {
        title: "Corporate earnings season may disappoint in Q4.",
        takeaway:
          "Several manufacturing companies have guided for lower margins. Focus on companies with pricing power and low debt.",
      },
    ],
    strategicFocus: [
      {
        title: "Watch the 2,800 psychological resistance level.",
        takeaway:
          "If NEPSE closes above 2,800 on weekly basis, expect a rapid move toward 2,850-2,870. This is a classic breakout level.",
      },
      {
        title: "Monitor margin lending data from NEPSE.",
        takeaway:
          "Rising margin debt fuels rallies but also amplifies corrections. Currently at healthy levels but watch for extremes.",
      },
      {
        title: "Track deposit growth in commercial banks.",
        takeaway:
          "Deposit growth is the primary driver of lending and investment capacity. Q1 trends look positive for banking sector.",
      },
    ],
    stocks: [
      {
        symbol: "NABIL",
        badge: "Sector Leader",
        badgeColor: "blue",
        reasoning:
          "Nabil Bank broke above its 50-day moving average with the highest weekly volume in 3 months. Institutional holding increased by 2.3% this quarter.",
        tip: "Best entry on pullback to 1,200-1,210 range. Target 1,300 for a 8% gain.",
      },
      {
        symbol: "EBL",
        badge: "Breakout",
        badgeColor: "green",
        reasoning:
          "Everest Bank showed a bullish cup-and-handle pattern completion. Strong fundamental support from improved CASA ratio and NPL reduction.",
        tip: "Wait for daily close above 450 for confirmation. Stop loss below 420.",
      },
    ],
    iposAndAuctions: [
      "Agricultural Development Bank Debenture: May 18 – May 22, 2026",
      "Chilime Hydropower Right Share: May 20 – June 3, 2026",
      "Neco Insurance Auction: May 16, 2026",
    ],
    policyNotices: [
      "NRB Monetary Policy Review scheduled for May 20 — expected to maintain policy rate.",
      "SEBON proposes new IPO allocation framework for retail investors.",
    ],
    companyName: "NABIL: Nabil Bank Limited",
    ltp: "1,225.00",
    weeklyHigh: "1,248.00",
    trend: "Breakout",
    description:
      "Nabil Bank has been consolidating for 6 weeks and has now broken above key resistance with strong volume. Improved Q4 results showed NPL reduction to 2.1% and CASA improvement to 58%. The bank's digital transformation initiatives are expected to reduce operational costs significantly.",
    strategicOpinion:
      "NABIL is primed for a re-rating. With the highest market cap in the banking sector, any positive momentum here will drag the entire index higher. Ideal accumulation zone: 1,200-1,215.",
    supportZone: "1,200",
    resistance: "1,300",
    institutionalDemand: "Very High",
    marketFloat: "Moderate",
    insights: [
      {
        category: "Mental Model",
        title: "Second-Order Thinking",
        description:
          "Don't just ask 'What happens if X occurs?' Ask 'What happens after that?' For example, lower interest rates lead to more lending, which leads to higher corporate profits, which leads to stock price increases.",
      },
      {
        category: "Technical Concept",
        title: "Cup and Handle Pattern",
        description:
          "A U-shaped consolidation followed by a small downward drift (the 'handle'). When price breaks above the handle's high, it signals the start of a new uptrend. One of the most reliable continuation patterns.",
      },
      {
        category: "Important Terms",
        title: "CASA Ratio",
        description:
          "Current Account Savings Account ratio — the percentage of deposits in low-cost current and savings accounts vs. fixed deposits. Higher CASA = lower cost of funds = better net interest margin for banks.",
      },
    ],
    summaryText:
      "NEPSE delivered a strong breakout week, led by the banking sector. With NRB signaling an accommodative stance and institutional buying accelerating, the path of least resistance appears to be up. However, global headwinds warrant cautious optimism — scale into positions rather than going all-in.",
  },
];

export const analysisArticles: AnalysisArticle[] = [
  {
    slug: "nabil-bank-q4-analysis",
    title: "Nabil Bank Q4 FY2082/83 — A Deep Dive into Nepal's Largest Bank",
    category: "company",
    date: "2026-05-10",
    summary:
      "Comprehensive analysis of Nabil Bank's Q4 performance including NPL trends, CASA improvement, digital transformation, and future outlook. Is the stock worth holding at current valuations?",
    tags: ["NABIL", "Banking", "Q4 Analysis", "Fundamental"],
    readTime: "12 min read",
    content: [
      { type: "heading", text: "Executive Summary" },
      { type: "paragraph", text: "Nabil Bank (NABIL) delivered a resilient Q4 FY2082/83 performance that exceeded market expectations on multiple fronts. As Nepal's largest commercial bank by market capitalization and total assets, Nabil serves as a bellwether for the entire banking sector. The quarter was marked by meaningful improvement in asset quality, stable net interest margins, and accelerating digital adoption that is beginning to translate into tangible cost savings. For long-term investors tracking the Nepali banking sector, Nabil's Q4 results provide important signals about the broader recovery trajectory." },
      { type: "highlight", text: "Nabil Bank posted a net profit of NPR 6.82 billion in Q4 FY2082/83, up 14.3% year-over-year, driven by strong net interest income growth and lower provisioning requirements. This marks the second consecutive quarter of accelerating profit growth after nearly two years of subdued performance." },
      { type: "heading", text: "Q4 Financial Performance" },
      { type: "paragraph", text: "The bank's top-line performance showed meaningful improvement during the quarter. Net interest income grew by 11.8% year-over-year to NPR 12.4 billion, benefiting from a more favorable lending-to-deposit spread as the Nepal Rastra Bank (NRB) maintained its accommodative monetary policy stance. The net interest margin (NIM) expanded to 4.12% from 3.87% in the previous quarter, reflecting the bank's ability to reprice its loan book faster than its deposit base." },
      { type: "paragraph", text: "Non-interest income contributed NPR 2.1 billion, representing a 7.6% increase from the same quarter last year. Commission from trade finance, remittance fees, and digital banking transaction charges formed the bulk of this segment. Notably, digital banking fee income grew by 23% year-over-year, underscoring the success of Nabil's digital-first strategy. Operating expenses increased modestly by 4.2%, well below revenue growth, resulting in a cost-to-income ratio improvement to 38.5% from 41.2% a year ago." },
      { type: "metric", label: "Net Profit (Q4)", value: "NPR 6.82B (+14.3% YoY)" },
      { type: "metric", label: "Net Interest Margin", value: "4.12% (QoQ +25bps)" },
      { type: "metric", label: "Cost-to-Income Ratio", value: "38.5% (Improved)" },
      { type: "metric", label: "Earnings Per Share (EPS)", value: "NPR 52.18" },
      { type: "heading", text: "NPL Analysis" },
      { type: "paragraph", text: "Non-performing loans (NPLs) have been the single biggest concern for Nepali banks over the past two years, and Nabil was no exception. However, the Q4 numbers paint a cautiously optimistic picture. The NPL ratio declined to 2.14% from 2.78% in the previous quarter and 3.45% in the same quarter last year. This improvement was driven by a combination of active recovery efforts, write-offs of legacy stressed assets, and stricter underwriting standards on new disbursements." },
      { type: "paragraph", text: "The bank's provision coverage ratio (PCR) strengthened to 187%, meaning Nabil has set aside NPR 1.87 in provisions for every NPR 1 of non-performing loans. This buffer provides significant protection against potential shocks. NPL provisioning charges declined by 22% year-over-year, directly contributing to the bottom-line improvement. Management guided for the NPL ratio to stabilize around the 2% level by mid-FY2083/84, though this assumes no major macroeconomic disruption." },
      { type: "subheading", text: "NPL Recovery Breakdown" },
      { type: "list", items: [
        "Cash recoveries from previously classified accounts contributed NPR 1.2 billion during the quarter.",
        "Restructured loans accounted for 1.8% of total loan book, down from 2.4% in Q3.",
        "New NPL formation rate slowed to 0.8% of total loans, the lowest in six quarters.",
        "Sectoral NPL concentration: Real estate and construction remain the highest at 3.8%, while trade and manufacturing showed improvement."
      ]},
      { type: "heading", text: "CASA Ratio and Funding Costs" },
      { type: "paragraph", text: "One of the most encouraging metrics in Nabil's Q4 report was the improvement in its Current Account Savings Account (CASA) ratio. CASA moved up to 57.8% from 55.2% in Q3 and 51.6% in the same period last year. This improvement is significant because CASA deposits carry an effective cost of near zero for savings accounts and literally zero for current accounts, making them the cheapest source of funding for any bank." },
      { type: "paragraph", text: "The higher CASA ratio directly improved Nabil's cost of deposits, which declined to 5.2% from 5.8% a year ago. In a competitive banking landscape where deposit mobilization remains challenging, Nabil's ability to grow its low-cost deposit base gives it a structural advantage over smaller peers. The bank's mobile banking application, Nabil Smart Banking, now processes over 3.2 million monthly transactions, and the average number of active users grew by 31% year-over-year. This digital ecosystem is proving to be a powerful tool for CASA accretion." },
      { type: "highlight", text: "A 1 percentage point improvement in CASA ratio typically translates to a 15-20 basis point improvement in net interest margin for large Nepali banks. Nabil's 6.2 percentage point CASA improvement over the past year alone could be worth NPR 800 million to NPR 1 billion in annualized net interest income." },
      { type: "heading", text: "Digital Banking Initiatives" },
      { type: "paragraph", text: "Nabil Bank has been the most aggressive among Nepali commercial banks in pursuing digital transformation. During Q4, the bank launched several new digital products including instant personal loan disbursement through the mobile app, a unified payments interface for merchant payments, and an AI-powered credit scoring system for small business loans. The bank reported that 68% of all customer-initiated transactions now occur through digital channels, up from 54% a year ago." },
      { type: "paragraph", text: "The digital push is not just about customer convenience; it has real financial implications. Nabil reported that it closed 4 physical branches during Q4 and plans to reduce its total branch count by 12% over the next 18 months. Each branch closure saves approximately NPR 15-20 million annually in operating costs. Furthermore, digital onboarding of new customers reduced the per-customer acquisition cost by 40% compared to traditional branch-based onboarding." },
      { type: "tip", title: "Investor Tip: Track Digital Metrics", text: "When analyzing Nepali banks, don't just look at traditional financial ratios. Track the percentage of transactions happening on digital channels and month-on-month growth in mobile app active users. Banks that are winning on digital are building a durable competitive moat in CASA acquisition, which directly translates to better margins." },
      { type: "heading", text: "Valuation Analysis" },
      { type: "paragraph", text: "At the current market price of approximately NPR 1,225 per share, Nabil Bank trades at a price-to-earnings (P/E) ratio of 23.5x based on trailing twelve-month earnings. This is a premium to the sector median P/E of 18.2x, but the premium is justified by Nabil's superior asset quality metrics, higher CASA ratio, and stronger earnings growth trajectory. The price-to-book (P/B) ratio stands at 2.8x, which is reasonable for a bank with a return on equity (ROE) of 16.4%." },
      { type: "paragraph", text: "The bank has proposed a 15% cash dividend for FY2082/83, translating to a dividend yield of approximately 1.22% at current prices. While the yield may appear modest, it is important to note that NRB regulations restrict banks from paying dividends exceeding 40% of net profit, so the payout ratio remains conservative. Looking at the forward P/E based on consensus FY2083/84 earnings estimates of NPR 58-60 EPS, the stock trades at approximately 20-21x forward earnings, suggesting limited near-term upside from a purely valuation perspective." },
      { type: "metric", label: "Trailing P/E", value: "23.5x" },
      { type: "metric", label: "Price-to-Book", value: "2.8x" },
      { type: "metric", label: "Return on Equity", value: "16.4%" },
      { type: "metric", label: "Dividend Yield", value: "1.22%" },
      { type: "heading", text: "Investment Thesis" },
      { type: "paragraph", text: "The investment case for Nabil Bank rests on three pillars. First, the improving NPL trajectory suggests the worst of the credit cycle is behind us. If Nabil can maintain NPL ratios below 2.5% over the next four quarters, provisioning costs will decline further and provide a meaningful tailwind to net profit. Second, the digital transformation story is real and quantifiable. The bank's ability to grow CASA through digital channels gives it a structural cost advantage that compounds over time. Third, as Nepal's largest bank, Nabil is a primary beneficiary of any economic recovery, increased remittance flows, and credit growth normalization." },
      { type: "paragraph", text: "The stock is best suited for investors with a medium-to-long-term horizon of 2-3 years. The current valuation already prices in a fair amount of the recovery, so significant near-term re-rating may require an upside surprise in earnings or a broader NEPSE rally. For investors looking for quality exposure to the Nepali banking sector with lower risk relative to smaller peers, Nabil remains the safest bet." },
      { type: "heading", text: "Key Risks" },
      { type: "list", items: [
        "Macroeconomic slowdown: A deeper-than-expected economic contraction could lead to renewed NPL formation, particularly in the real estate and construction sectors that account for approximately 28% of Nabil's loan book.",
        "Regulatory risk: NRB has historically been aggressive with banking sector regulations, including caps on dividend payouts, interest rate ceilings, and mandatory lending targets. Any adverse regulatory change could compress margins.",
        "Liquidity tightness: Despite improvement, the overall banking sector in Nepal still faces periodic liquidity crunches. If interbank rates spike sharply, Nabil's funding costs could increase despite its CASA advantage.",
        "Competition from fintech: While Nabil is a digital leader among banks, the emergence of digital wallets and fintech platforms in Nepal (like Khalti, eSewa, and IME Pay) could gradually erode the payments business.",
        "Geopolitical risk: Nepal's economy is sensitive to remittance flows from Gulf countries and India. Any disruption to these flows due to geopolitical events would have a cascading impact on bank deposits and credit demand."
      ]},
      { type: "tip", title: "Risk Management Tip", text: "For Nabil Bank specifically, watch the quarterly NPL formation rate more than the headline NPL number. A rising formation rate even as the headline ratio declines (due to write-offs) is a warning signal. Also, track the credit-deposit ratio — if it exceeds 85%, the bank may face pressure on margins due to higher-cost wholesale funding." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "Nabil Bank's Q4 FY2082/83 results confirm that the bank is on a steady recovery path. The combination of improving asset quality, expanding CASA, accelerating digital adoption, and disciplined cost management makes it the strongest franchise in Nepali banking. While the stock is not cheap at current levels, the quality premium is warranted for investors who prioritize stability and compounding over speculative upside. We maintain a positive outlook with a 12-month target price range of NPR 1,350-1,400, representing a potential upside of 10-14% excluding dividends." },
    ],
  },
  {
    slug: "banking-sector-outlook-2026",
    title: "Nepal Banking Sector Outlook 2026 — Recovery, Risks, and Opportunities",
    category: "sector",
    date: "2026-05-05",
    summary:
      "The banking sector is showing signs of recovery after two challenging years. We analyze NPL trends, credit growth projections, interest rate outlook, and identify the best-positioned banks for investors.",
    tags: ["Banking", "Sector Analysis", "2026 Outlook"],
    readTime: "15 min read",
    content: [
      { type: "heading", text: "Sector Overview" },
      { type: "paragraph", text: "The Nepali banking sector enters 2026 at a critical inflection point. After nearly two years of headwinds driven by elevated non-performing loans, tightening liquidity, and macroeconomic uncertainty, the sector is showing tangible signs of stabilization. The Nepal Rastra Bank (NRB) has maintained an accommodative monetary policy stance, credit growth is beginning to normalize, and the worst of the NPL cycle appears to be behind us. However, the recovery is neither uniform nor guaranteed, and investors need to differentiate carefully between banks that are genuinely turning the corner and those merely benefiting from temporary tailwinds." },
      { type: "paragraph", text: "The NEPSE Banking sub-index gained 12.4% in the first four months of 2026, outperforming the broader NEPSE index by approximately 4 percentage points. This outperformance reflects a broader market recognition that banking sector fundamentals are improving, even if valuations remain below historical averages. The total market capitalization of the banking sector now stands at approximately NPR 850 billion, making it the single largest sector on the NEPSE by a significant margin." },
      { type: "metric", label: "Banking Sub-index YTD", value: "+12.4%" },
      { type: "metric", label: "Sector Market Cap", value: "~NPR 850B" },
      { type: "metric", label: "Avg. Sector P/E", value: "18.2x" },
      { type: "metric", label: "Avg. Sector P/B", value: "1.9x" },
      { type: "heading", text: "Credit Growth Trends" },
      { type: "paragraph", text: "After contracting for five consecutive quarters through mid-2025, total credit from commercial banks has returned to positive growth territory. Year-on-year credit growth stood at 6.8% as of the most recent NRB quarterly report, a significant improvement from the negative 3.2% recorded a year earlier. This recovery has been driven by a pick-up in retail lending (personal loans, auto loans, credit cards), a gradual resumption of working capital financing for businesses, and increased lending to the hydropower and infrastructure sectors." },
      { type: "paragraph", text: "Looking ahead, we project total credit growth to accelerate to 10-12% by the end of FY2083/84. This projection is based on several factors: the NRB's accommodative policy rate, expected improvement in private sector confidence, government spending on infrastructure projects that will create downstream credit demand, and the seasonal pattern of higher loan disbursements in the second half of the fiscal year. However, it is important to note that credit growth is likely to remain below the 15-20% levels seen during the pre-crisis years of FY2078/79 and FY2079/80, as banks remain cautious in their lending standards." },
      { type: "subheading", text: "Sector-wise Credit Allocation" },
      { type: "list", items: [
        "Real estate and construction: 24.2% of total credit (declining from 28.5% peak as banks de-risk).",
        "Trade and commerce: 18.7% of total credit (stable, driven by import-export financing).",
        "Manufacturing: 12.4% of total credit (gradually recovering).",
        "Hydropower and energy: 11.8% of total credit (fastest growing segment).",
        "Personal/consumer loans: 15.6% of total credit (strong growth in auto and education loans).",
        "Agriculture: 8.3% of total credit (mandated priority sector lending)."
      ]},
      { type: "heading", text: "NPL Crisis and Resolution" },
      { type: "paragraph", text: "The NPL crisis that began in early 2024 was the most severe the Nepali banking sector has faced since the 2015 earthquake aftermath. The sector-wide NPL ratio peaked at 4.8% in Q3 FY2081/82 before beginning its gradual decline. As of Q4 FY2082/83, the weighted average NPL ratio across all commercial banks stands at 3.2%, down from 4.1% in the previous quarter. While this improvement is encouraging, the absolute level remains above the 2-2.5% range that NRB considers healthy." },
      { type: "paragraph", text: "The resolution of NPLs has occurred through three main channels. First, banks have been aggressive in recovering cash from delinquent borrowers, aided by improved foreclosure processes and NRB directives for faster resolution of classified assets. Second, many banks have written off older, harder-to-recover NPLs to clean up their balance sheets. Third, the economic stabilization has allowed some previously stressed borrowers to resume regular repayments. However, the pace of NPL improvement is expected to slow in the coming quarters as the easiest recoveries have already been completed." },
      { type: "highlight", text: "The difference between banks in NPL management has widened significantly. Tier-1 banks like Nabil, NICA, and EBL have NPL ratios below 2.5%, while several development banks and smaller commercial banks still have NPL ratios exceeding 5%. This divergence creates a clear investment thesis for favoring larger, better-capitalized banks over smaller peers." },
      { type: "heading", text: "Interest Rate Outlook" },
      { type: "paragraph", text: "Interest rates in Nepal have been on a downward trend since mid-2025, and we expect this trend to continue through most of 2026. The NRB's policy rate currently stands at 8.5%, down from the peak of 10.0% in early 2025. Market deposit rates have followed suit, with the average term deposit rate for one-year deposits declining to approximately 8.2% from a high of 10.5%. Lending rates have also adjusted, though the transmission has been slower due to existing fixed-rate loan contracts that will only reprice as they come up for renewal." },
      { type: "paragraph", text: "For 2026, we expect the policy rate to remain stable or see one more 25 basis point cut if inflation remains within the NRB's target range of 5-7%. This environment is broadly positive for banks because it reduces their cost of funds faster than it compresses their lending rates, leading to a temporary expansion in net interest margins. However, the benefit is not evenly distributed. Banks with higher CASA ratios benefit disproportionately because their funding costs decline faster than peers that rely more heavily on fixed deposits." },
      { type: "heading", text: "Best-Positioned Banks" },
      { type: "paragraph", text: "Within the banking sector, we identify three banks that stand out as the best investment candidates for 2026 based on a combination of asset quality, valuation, growth trajectory, and management quality." },
      { type: "subheading", text: "Nabil Bank (NABIL)" },
      { type: "paragraph", text: "Nabil remains the gold standard in Nepali banking. With the lowest NPL ratio among large banks at 2.14%, a CASA ratio of 57.8%, and the most advanced digital banking platform, Nabil is positioned to deliver consistent earnings growth. The stock trades at 23.5x trailing P/E, which is a premium, but the quality is worth paying for. Target price: NPR 1,350-1,400." },
      { type: "subheading", text: "NIC Asia Bank (NICA)" },
      { type: "paragraph", text: "NIC Asia presents the most interesting risk-reward in the sector. The bank has undergone significant management changes and operational restructuring over the past year. NPL ratio has declined from 4.2% to 2.9%, CASA has improved, and the bank is now trading at a significant discount to book value at 1.4x P/B. If the turnaround continues, the stock has substantial re-rating potential. Target price: NPR 1,050-1,150." },
      { type: "subheading", text: "Everest Bank (EBL)" },
      { type: "paragraph", text: "Everest Bank offers a unique proposition as a bank with strong institutional backing. Its NPL ratio of 2.3% is among the best in the sector, and the bank has been consistently growing its loan book at a rate above the industry average. The stock trades at a reasonable 16.8x P/E with a healthy dividend yield of 2.1%. Target price: NPR 470-500." },
      { type: "heading", text: "Regulatory Environment" },
      { type: "paragraph", text: "The regulatory environment for Nepali banks in 2026 is characterized by a delicate balancing act by the NRB. On one hand, the central bank wants to support credit growth and economic recovery by maintaining an accommodative policy. On the other hand, it remains vigilant about financial stability risks, particularly the potential for a new wave of NPLs if economic conditions deteriorate. Key regulatory developments to watch include potential revisions to the capital adequacy framework, new guidelines on digital lending, and changes to the dividend payout rules." },
      { type: "paragraph", text: "SEBON (Securities Board of Nepal) has also been active, with proposals for tighter disclosure requirements for listed banks, stricter corporate governance norms, and reforms to the IPO process. While these measures increase compliance costs in the short term, they are positive for long-term investors as they improve transparency and reduce the risk of corporate governance surprises." },
      { type: "heading", text: "Investment Strategy" },
      { type: "paragraph", text: "Our recommended investment strategy for the banking sector in 2026 is to focus on quality and scale. Within the commercial bank universe, we recommend a barbell approach: hold a core position in Nabil Bank for stability and steady compounding, supplemented by a tactical position in NIC Asia Bank for turnaround upside. Everest Bank serves as a solid middle-ground option for investors seeking a balance between quality and value." },
      { type: "list", items: [
        "Overweight: Nabil Bank (quality leader with digital moat), NIC Asia Bank (high-risk, high-reward turnaround).",
        "Neutral: Everest Bank, Nepal Investment Bank (NIBL), Global IME Bank.",
        "Underweight: Smaller commercial banks and development banks with NPL ratios above 4%.",
        "Avoid: Microfinance institutions facing regulatory headwinds unless trading at deep discounts to book value.",
        "Position sizing: Allocate 40-50% of the banking sector portion of your portfolio to Nabil, 20-25% to NIC Asia, and the remainder to other quality names."
      ]},
      { type: "tip", title: "Portfolio Management Tip", text: "In the Nepali banking sector, never chase momentum. Banking stocks tend to move in cycles driven by liquidity conditions and NRB policy. The best time to accumulate is during periods of market pessimism when valuations compress, even if the near-term news flow is negative. Quality banks like NABIL and NICA rarely trade at significant discounts for extended periods." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "The Nepali banking sector in 2026 presents a compelling investment opportunity for patient, fundamentals-focused investors. The NPL cycle is turning, interest rates are favorable, and the best-managed banks are executing strategies that will compound value over time. However, the recovery is still in its early stages, and risks remain elevated. We recommend a selective approach that favors large, well-capitalized banks with demonstrated ability to manage credit risk and grow their digital franchise. The sector trades at below-average historical valuations, providing a margin of safety for new entrants." },
    ],
  },
  {
    slug: "hydropower-sector-analysis",
    title: "Hydropower Sector — Riding the Infrastructure Wave or Overvalued?",
    category: "sector",
    date: "2026-04-28",
    summary:
      "With the government pushing for accelerated hydropower development, we analyze whether the current stock valuations in the hydro sector are justified by future earnings potential.",
    tags: ["Hydropower", "Sector Analysis", "Infrastructure"],
    readTime: "10 min read",
    content: [
      { type: "heading", text: "Sector Overview and Government Push" },
      { type: "paragraph", text: "Hydropower has been one of the most talked-about sectors on NEPSE over the past two years, and for good reason. Nepal's estimated hydropower potential of 83,000 MW (of which approximately 42,000 MW is considered technically and economically feasible) represents one of the largest untapped energy resources in South Asia. The government of Nepal has set an ambitious target of developing 15,000 MW of hydropower capacity by 2030, up from approximately 2,800 MW currently operational. This target, if even partially achieved, would represent a multi-year infrastructure build-out cycle with significant investment opportunities." },
      { type: "paragraph", text: "The policy environment is broadly supportive. The government offers tax holidays for hydropower projects in their initial years of operation, concessional financing through state-owned development banks, and favorable Power Purchase Agreement (PPA) terms for projects that secure licenses before certain deadlines. The Nepal Electricity Authority (NEA) has been actively signing PPAs with new projects, and several existing projects are receiving tariff revisions that improve their economics. Additionally, there is growing discussion about cross-border electricity trade with India, which could open a massive export market for Nepali hydro projects." },
      { type: "highlight", text: "Nepal currently generates approximately 2,800 MW from hydropower but consumes only about 1,600 MW during the dry season. The surplus during the monsoon season (June-September) presents both an opportunity (export to India) and a challenge (revenue concentration). Investors must understand this seasonal dynamic when evaluating hydro stocks." },
      { type: "heading", text: "Key Hydropower Stocks" },
      { type: "paragraph", text: "The NEPSE Hydropower sub-index includes approximately 18 listed companies. We focus on the three most liquid and widely-held stocks that offer the best combination of fundamentals, growth potential, and investor accessibility." },
      { type: "subheading", text: "Chilime Hydropower Company (CHCL)" },
      { type: "paragraph", text: "Chilime is the flagship hydropower stock on NEPSE and operates a 22.1 MW run-of-river project in Rasuwa district. The company has been profitable for over a decade and consistently pays dividends. What makes Chilime particularly attractive is its expansion pipeline. Through its subsidiaries and associate companies (including Sanima Mai Hydropower and Mid Bhotekoshi), Chilime has an effective stake in an additional 150+ MW of capacity that is in various stages of development. The parent company is also developing the 31 MW Rahughat project directly." },
      { type: "paragraph", text: "Chilime trades at approximately 28x trailing P/E, which appears expensive but can be justified by the growth pipeline. The stock has a strong institutional following and is one of the most liquid hydro stocks on NEPSE. Its P/B ratio of 3.2x reflects the market's confidence in management's execution ability. The company has announced a 1:1 right share, which has been well-received by the market." },
      { type: "subheading", text: "Butwal Power Company (BPC)" },
      { type: "paragraph", text: "Butwal Power Company operates two projects totaling 17.2 MW and is developing additional capacity. BPC is unique among listed hydro companies because it also operates a transmission line business, providing diversification beyond pure power generation. The company has a long operational history and a proven track record of dividend payments. However, growth has been slower than peers, and the stock trades at a more modest 14x P/E and 2.1x P/B." },
      { type: "paragraph", text: "BPC is a defensive hydro play. It offers lower growth but also lower risk compared to the more aggressively valued peers. The stock is suitable for investors who want hydropower sector exposure without paying a significant growth premium. The recent right share issuance was oversubscribed, indicating strong investor confidence at current levels." },
      { type: "subheading", text: "Sanima Hydropower (SHPC)" },
      { type: "paragraph", text: "Sanima Hydropower operates the 15.6 MW Sunkoshi project and the 10 MW Mai Khola project. The company reported strong earnings growth in FY2082/83, driven by favorable monsoon conditions and higher generation. Sanima is also developing the 24.8 MW Middle Mai Khola project, which is expected to come online within the next 18-24 months. The stock trades at approximately 22x trailing P/E with a P/B of 2.5x." },
      { type: "heading", text: "Valuation Multiples Comparison" },
      { type: "metric", label: "Chilime (CHCL) P/E", value: "28x" },
      { type: "metric", label: "Butwal Power (BPC) P/E", value: "14x" },
      { type: "metric", label: "Sanima Hydro (SHPC) P/E", value: "22x" },
      { type: "metric", label: "Sector Avg. P/E", value: "21x" },
      { type: "paragraph", text: "The valuation dispersion within the sector is notable. Chilime commands the highest premium due to its growth pipeline and management reputation, while BPC trades at a discount reflecting its slower growth profile. Sanima sits in the middle, offering a balance of growth and reasonable valuation. For new investors, the sector average P/E of 21x suggests that valuations are not cheap but are not in bubble territory either, assuming earnings growth materializes as projected." },
      { type: "heading", text: "PPA Agreements and Revenue Visibility" },
      { type: "paragraph", text: "One of the most attractive features of investing in Nepali hydropower companies is the revenue predictability provided by Power Purchase Agreements (PPAs). Most listed hydro companies have signed long-term PPAs with NEA that guarantee a fixed tariff for a period of 25-30 years for run-of-river projects. This effectively means that once a project is commissioned, its revenue stream is contractually locked in for decades, providing a level of predictability that is rare in any other sector on NEPSE." },
      { type: "paragraph", text: "The typical PPA structure for a run-of-river project includes a base tariff (for dry season generation) and a lower secondary tariff (for wet season surplus). The base tariff for recent projects ranges from NPR 6-8 per unit, while the energy tariff (wet season) is typically NPR 3-4 per unit. For storage-type projects, the tariff can be significantly higher. Investors should always check the specific PPA terms for any hydro company they are considering, as the terms vary significantly across projects and commissioning dates." },
      { type: "subheading", text: "Revenue Concentration Risk" },
      { type: "list", items: [
        "Dry season (October-May) accounts for approximately 60-65% of annual revenue for run-of-river projects.",
        "Wet season (June-September) generation is higher but commands lower tariffs, leading to lower per-unit revenue.",
        "Projects without storage capacity cannot control their output, making them fully dependent on river flow.",
        "Cross-border electricity trade with India could help monetize wet season surplus at better rates, but regulatory frameworks are still being developed."
      ]},
      { type: "heading", text: "Risks: Project Delays and Regulatory Challenges" },
      { type: "paragraph", text: "Despite the positive narrative, the hydropower sector carries significant risks that investors must carefully evaluate. The single biggest risk is project execution delay. Hydropower projects in Nepal have a notorious track record of running years behind schedule and significantly over budget. Geopolitical complications with India during the construction phase (such as blockades or delays in equipment imports), geological surprises during tunnel construction, and local community opposition have all caused major delays in past projects." },
      { type: "paragraph", text: "Regulatory risk is another factor. While the current government is pro-hydropower, a change in government or policy could alter the tax holiday structure, PPA terms, or licensing requirements. The PPA pricing framework itself has been a subject of controversy, with some developers arguing that the tariffs set by the Electricity Tariff Fixation Commission are insufficient to ensure adequate returns. Additionally, environmental concerns and international pressure on river ecosystem conservation could lead to stricter environmental clearance requirements for future projects." },
      { type: "highlight", text: "The average hydropower project in Nepal takes 5-7 years from license acquisition to commercial operation. During this construction phase, the company generates zero revenue but incurs significant interest costs on project loans. Investors buying into companies with substantial under-construction capacity must be prepared for extended periods of earnings dilution before the payoff arrives." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "The Nepali hydropower sector offers a genuine long-term growth opportunity backed by structural demand, supportive government policy, and contractually visible revenue streams. However, current valuations are not without risk. The sector trades at 21x average P/E, which already prices in a fair amount of the growth narrative. For investors considering entry, we recommend a differentiated approach: Chilime for those willing to pay for quality and growth, Butwal Power for value-conscious investors seeking downside protection, and Sanima for a balanced risk-reward profile." },
      { type: "paragraph", text: "The key to successful hydropower investing in Nepal is understanding the project development cycle and having the patience to wait for under-construction capacity to come online. Short-term traders should be cautious, as hydro stocks can be volatile and are heavily influenced by monsoon forecasts and PPA-related news. For patient investors with a 3-5 year horizon, the sector offers one of the most compelling structural growth stories on NEPSE." },
      { type: "tip", title: "Due Diligence Checklist for Hydro Stocks", text: "Before investing in any hydropower company, check: (1) Total operational MW and under-construction MW, (2) PPA terms including tariff rates and contract duration, (3) Project completion timeline and any history of delays, (4) Debt-to-equity ratio and interest burden during construction, (5) Promoter background and management track record in the sector." },
    ],
  },
  {
    slug: "nic-asia-q3-analysis",
    title: "NIC Asia Bank — Turnaround Story or Value Trap?",
    category: "company",
    date: "2026-04-20",
    summary:
      "NIC Asia Bank has seen significant selling pressure despite improved fundamentals. We examine whether the current price decline represents a buying opportunity or a warning sign for investors.",
    tags: ["NICA", "Banking", "Turnaround", "Value Investing"],
    readTime: "8 min read",
    content: [
      { type: "heading", text: "Background" },
      { type: "paragraph", text: "NIC Asia Bank (NICA) was once one of the fastest-growing commercial banks in Nepal, known for its aggressive lending strategy and rapid branch expansion. Between FY2077/78 and FY2079/80, the bank grew its loan book at a compound annual rate of 28%, far outpacing the sector average of 15%. This growth strategy, while impressive on paper, came with significant risks. When the economic environment deteriorated in FY2080/81, NIC Asia was disproportionately exposed because of its aggressive loan origination during the boom years, leading to a spike in non-performing loans and a sharp decline in profitability." },
      { type: "paragraph", text: "The stock price tells the story of this fall from grace. From a peak of approximately NPR 1,800 in early 2023, NICA declined to a low of around NPR 680 in late 2025, representing a loss of over 60% of its value. Even after a partial recovery to the current level of approximately NPR 850, the stock remains well below its historical highs. The question for investors today is whether this decline represents an overreaction that creates a buying opportunity, or whether the fundamental problems at the bank are deeper and more structural than the market currently appreciates." },
      { type: "metric", label: "52-Week High", value: "NPR 1,120" },
      { type: "metric", label: "52-Week Low", value: "NPR 680" },
      { type: "metric", label: "Current Price", value: "~NPR 850" },
      { type: "metric", label: "Decline from Peak", value: "-53%" },
      { type: "heading", text: "Recent Performance" },
      { type: "paragraph", text: "The most recent quarterly results from NIC Asia show genuine signs of improvement. Net profit for Q3 FY2082/83 came in at NPR 1.42 billion, up 18.5% year-over-year. This was the third consecutive quarter of year-over-year profit growth, suggesting that the turnaround is gaining momentum. Net interest income grew by 12.3% to NPR 4.8 billion, driven by a combination of loan book growth and margin expansion. The net interest margin improved to 3.65% from 3.41% in the previous quarter, though it remains below the sector average of 3.9%." },
      { type: "paragraph", text: "On the asset quality front, the NPL ratio declined to 2.88% from 3.45% in Q2 and 4.21% in the same quarter last year. This improvement, while meaningful, was driven partially by write-offs rather than pure cash recoveries. The bank wrote off approximately NPR 1.8 billion in Q3 alone, which flatters the headline NPL number. The provision coverage ratio improved to 165% from 152%, still below the sector average of 178%, suggesting that the bank has more provisioning work to do before its balance sheet is fully cleaned up." },
      { type: "highlight", text: "The market has not given NIC Asia credit for its improving fundamentals. The stock trades at 1.4x P/B, a significant discount to the sector average of 1.9x and well below Nabil Bank's 2.8x. If the bank can demonstrate two more quarters of NPL improvement and profit growth, there is a strong case for a valuation re-rating toward 1.8-2.0x P/B, implying 28-43% upside from current levels." },
      { type: "heading", text: "What Went Wrong" },
      { type: "paragraph", text: "Understanding the roots of NIC Asia's problems is essential for assessing whether the turnaround is sustainable. The bank's troubles can be traced to three main factors. First, aggressive lending to the real estate and construction sectors during the FY2078-80 boom. When the property market corrected, a significant portion of these loans turned non-performing. At the peak, NIC Asia's exposure to real estate exceeded 30% of its total loan book, well above NRB's informal guidance of 25%." },
      { type: "paragraph", text: "Second, the bank expanded its branch network too rapidly, opening 45 new branches between FY2078/79 and FY2080/81. Each new branch takes 3-4 years to become profitable, and the fixed costs of maintaining this enlarged network weighed heavily on the bank's cost-to-income ratio, which peaked at 52% in FY2080/81 (versus a sector average of around 40%). Third, corporate governance concerns emerged when NRB found irregularities in lending to companies connected to bank promoters. This led to a regulatory censure and a forced change in senior management." },
      { type: "heading", text: "Signs of Recovery" },
      { type: "paragraph", text: "Despite the troubled history, several indicators suggest that NIC Asia's turnaround under the new management team is gathering steam. The new CEO, appointed in early 2025, has implemented a comprehensive restructuring program that includes tightening credit underwriting standards, reducing exposure to high-risk sectors, rationalizing the branch network, and investing in digital infrastructure. Early results are encouraging." },
      { type: "list", items: [
        "NPL ratio declined for three consecutive quarters, from 4.21% to 2.88%.",
        "CASA ratio improved to 48.2% from 43.5% a year ago, reducing funding costs.",
        "Cost-to-income ratio improved to 44.2% from 52% at the peak, though still above sector average.",
        "Digital banking users grew 45% year-over-year, with mobile transactions now accounting for 52% of total transactions.",
        "The bank reduced its branch count by 8 in the past year, with plans for further consolidation.",
        "Deposit growth of 9.5% year-over-year outpaced the sector average of 7.2%."
      ]},
      { type: "paragraph", text: "Perhaps most importantly, the composition of NPL formation is changing. New NPLs are increasingly coming from legacy loan book segments (older loans originated during the boom), while the newer loan book shows much cleaner credit metrics. This suggests that the new management's stricter underwriting standards are working. If this trend continues, the bank's NPL ratio should naturally decline as legacy stressed assets are worked out and replaced by newly originated, better-quality loans." },
      { type: "heading", text: "Valuation vs. Peers" },
      { type: "paragraph", text: "NIC Asia's valuation stands in stark contrast to its larger peers, and this is where the opportunity (or trap) lies. Let us compare key valuation metrics across three major banks." },
      { type: "metric", label: "NICA P/E", value: "14.2x" },
      { type: "metric", label: "NABIL P/E", value: "23.5x" },
      { type: "metric", label: "NICA P/B", value: "1.4x" },
      { type: "metric", label: "NABIL P/B", value: "2.8x" },
      { type: "metric", label: "NICA NPL Ratio", value: "2.88%" },
      { type: "metric", label: "NABIL NPL Ratio", value: "2.14%" },
      { type: "metric", label: "NICA CASA", value: "48.2%" },
      { type: "metric", label: "NABIL CASA", value: "57.8%" },
      { type: "paragraph", text: "On almost every metric, NICA trades at a significant discount to Nabil. The P/E discount of 40% and P/B discount of 50% reflect the market's lower confidence in NICA's ability to sustain its recovery. The question is whether this discount is justified or excessive. Our view is that the discount is somewhat excessive given the pace of improvement. If NICA can close even half the gap in NPL ratio and CASA over the next 4-6 quarters, the stock deserves to trade at a minimum of 1.7-1.8x P/B." },
      { type: "heading", text: "Verdict: Turnaround Story (with Caveats)" },
      { type: "paragraph", text: "Based on our analysis, NIC Asia Bank leans more toward being a genuine turnaround story than a value trap, but the distinction is a narrow one. The new management team has demonstrated commitment to fixing the bank's structural issues, early financial results are trending in the right direction, and the valuation provides a meaningful margin of safety. However, the risks are real and the margin for error is thin." },
      { type: "paragraph", text: "We recommend investors approach NICA as a position sized appropriately for its risk profile. The stock is suitable for investors with a 2-3 year horizon and a tolerance for volatility. A staged accumulation strategy (buying in thirds over several months) is advisable rather than a full-position entry at current levels. The critical catalysts to watch are: Q4 FY2082/83 results showing continued NPL improvement, any signs of dividend restoration, and positive commentary from the new management at the annual general meeting." },
      { type: "tip", title: "How to Monitor a Turnaround", text: "When following a bank turnaround story like NIC Asia, focus on three leading indicators: (1) Provision coverage ratio trend (rising is good), (2) New NPL formation rate (falling is good), and (3) CASA growth (accelerating is good). If all three are moving in the right direction, the turnaround is likely for real. If even one starts deteriorating, reassess your thesis immediately." },
    ],
  },
];

export const learningArticles: LearningArticle[] = [
  {
    slug: "how-to-read-balance-sheet",
    title: "How to Read a Balance Sheet — A Complete Guide for Nepali Investors",
    category: "Fundamentals",
    date: "2026-05-08",
    summary:
      "Learn to decode balance sheets of Nepali listed companies. We break down assets, liabilities, equity, and key ratios with real examples from NEPSE-listed companies.",
    tags: ["Balance Sheet", "Fundamental Analysis", "Beginner"],
    readTime: "10 min read",
    content: [
      { type: "heading", text: "What is a Balance Sheet?" },
      { type: "paragraph", text: "A balance sheet is one of the three core financial statements that every publicly listed company on NEPSE is required to publish quarterly. It provides a snapshot of a company's financial position at a specific point in time, showing what the company owns (assets), what it owes (liabilities), and what belongs to its shareholders (equity). The balance sheet follows a fundamental accounting equation: Total Assets = Total Liabilities + Shareholders' Equity. Every transaction a company makes affects at least two items on the balance sheet, ensuring that this equation always holds true." },
      { type: "paragraph", text: "For Nepali investors, the balance sheet is arguably the most important financial document to understand because it reveals the true financial health of a company beyond what the income statement shows. A company can report growing profits while simultaneously accumulating dangerous levels of debt, something that only becomes visible when you examine the balance sheet carefully. Companies listed on NEPSE are required to file their quarterly and annual financial reports through the SEBON portal, and the balance sheet is always the first statement presented." },
      { type: "highlight", text: "Think of a balance sheet like a personal net worth statement. If you own a house worth NPR 50 lakh and have a mortgage of NPR 30 lakh, your net worth (equity) is NPR 20 lakh. A company's balance sheet works exactly the same way, just on a much larger scale." },
      { type: "heading", text: "Assets: What the Company Owns" },
      { type: "paragraph", text: "Assets are resources controlled by the company that are expected to provide future economic benefit. On the balance sheet, assets are listed in order of liquidity, meaning the most easily convertible to cash appears first. Understanding the composition of a company's assets tells you a lot about its business model and operational efficiency." },
      { type: "subheading", text: "Current Assets" },
      { type: "paragraph", text: "Current assets are those that can be converted to cash within one year. For Nepali companies, the most common current assets include cash and bank balances, loans and advances to customers (particularly important for banks and financial institutions), accounts receivable from trade, inventory of raw materials and finished goods (for manufacturing companies), and prepaid expenses. When analyzing a manufacturing company on NEPSE like Reliance Spinning Mills (RSML), a large portion of current assets will typically be tied up in inventory and trade receivables." },
      { type: "list", items: [
        "Cash and Bank Balances: The most liquid asset. Companies with strong cash positions have more flexibility during economic downturns.",
        "Loans and Advances: For Nepali banks, this is the largest asset category. The quality of these loans (NPL ratio) is a critical metric.",
        "Accounts Receivable: Money owed by customers. Growing receivables without revenue growth can signal collection problems.",
        "Inventory: Raw materials, work-in-progress, and finished goods. Excessive inventory relative to sales may indicate slowing demand.",
        "Investments: Short-term investments in government bonds, treasury bills, or shares of other companies."
      ]},
      { type: "subheading", text: "Fixed Assets (Non-Current Assets)" },
      { type: "paragraph", text: "Fixed assets are long-term assets that the company uses to generate revenue and which are not intended for sale in the ordinary course of business. These include land and buildings, plant and machinery, vehicles, furniture and fixtures, and intangible assets like software licenses and brand value. Fixed assets are reported at their historical cost minus accumulated depreciation, which is the total wear and tear written off over the asset's useful life." },
      { type: "paragraph", text: "For Nepali hydropower companies, fixed assets are by far the largest category on the balance sheet because the cost of building a dam, power house, and transmission infrastructure runs into billions of rupees. Chilime Hydropower, for example, has fixed assets that represent over 80% of its total asset base. For banks, the largest fixed asset is typically premises and equipment, which is a much smaller portion of total assets compared to the loan portfolio." },
      { type: "heading", text: "Liabilities: What the Company Owes" },
      { type: "paragraph", text: "Liabilities represent the company's financial obligations to external parties. Like assets, liabilities are divided into current liabilities (due within one year) and long-term liabilities (due after one year). The composition and level of a company's liabilities determine its financial risk and solvency." },
      { type: "subheading", text: "Current Liabilities" },
      { type: "paragraph", text: "Current liabilities include accounts payable to suppliers, short-term borrowings, accrued expenses, tax liabilities, and customer deposits (for banks). For investors, a useful metric is the current ratio, which compares current assets to current liabilities. A ratio above 1.0 means the company has enough short-term assets to cover its short-term obligations. Most healthy Nepali companies maintain a current ratio between 1.2 and 2.0." },
      { type: "subheading", text: "Long-Term Liabilities" },
      { type: "paragraph", text: "Long-term liabilities include term loans from banks and financial institutions, bonds and debentures, long-term lease obligations, and provisions for employee benefits. For Nepali companies, term loans from commercial banks are the most common form of long-term financing. Hydropower companies often carry very high levels of long-term debt because the capital cost of building a hydro project is funded primarily through bank loans with 10-15 year tenures." },
      { type: "heading", text: "Shareholders' Equity" },
      { type: "paragraph", text: "Shareholders' equity (also called net worth or book value) is what remains after subtracting total liabilities from total assets. It represents the residual claim of shareholders on the company's assets. Equity includes share capital (the face value of all issued shares), share premium (the amount received above face value when shares were issued), retained earnings (accumulated profits not distributed as dividends), and reserves created from revaluation of assets." },
      { type: "paragraph", text: "For Nepali companies, it is important to distinguish between the face value of shares (typically NPR 100 per share for most NEPSE-listed companies) and the market price. Shareholders' equity divided by the number of outstanding shares gives you the book value per share. Comparing this book value per share to the market price gives you the Price-to-Book (P/B) ratio, a key valuation metric that we will discuss in detail in a separate article." },
      { type: "heading", text: "Key Ratios to Calculate" },
      { type: "paragraph", text: "Once you understand the components of the balance sheet, you can derive several powerful ratios that provide insight into a company's financial strength. Here are the most important ones for Nepali investors to track." },
      { type: "metric", label: "Debt-to-Equity Ratio", value: "Total Liabilities / Shareholders' Equity" },
      { type: "paragraph", text: "The debt-to-equity ratio tells you how much debt a company has relative to its equity. A ratio above 3.0 is generally considered high-risk for Nepali companies, though acceptable levels vary by sector. Banks naturally have high debt-to-equity ratios because deposits are classified as liabilities. For manufacturing companies, a ratio between 0.5 and 2.0 is typical. For hydropower companies, ratios of 3.0-5.0 are common due to the capital-intensive nature of the business." },
      { type: "metric", label: "Current Ratio", value: "Current Assets / Current Liabilities" },
      { type: "paragraph", text: "The current ratio measures short-term liquidity. A ratio below 1.0 is a red flag, suggesting the company may struggle to meet its near-term obligations. For most NEPSE-listed companies, a current ratio between 1.2 and 2.5 is considered healthy. If a company's current ratio has been declining over several quarters, it could indicate tightening liquidity, which is a concern in Nepal's banking environment." },
      { type: "heading", text: "Real Example from NEPSE" },
      { type: "paragraph", text: "Let us walk through a simplified example using a hypothetical NEPSE-listed commercial bank. Total Assets: NPR 350 billion. This includes NPR 250 billion in loans and advances (the core asset for a bank), NPR 40 billion in investments (government bonds and treasury bills), NPR 25 billion in cash balances, and NPR 35 billion in fixed assets (property, equipment, and technology infrastructure)." },
      { type: "paragraph", text: "Total Liabilities: NPR 310 billion. This is dominated by NPR 220 billion in customer deposits (the primary funding source for any bank), NPR 50 billion in borrowings from NRB and interbank markets, NPR 25 billion in accrued expenses and tax provisions, and NPR 15 billion in other liabilities. Shareholders' Equity: NPR 40 billion (350 minus 310). With approximately 130 million shares outstanding, the book value per share is NPR 308. If the market price is NPR 900, the P/B ratio is 2.9x." },
      { type: "tip", title: "Where to Find Balance Sheet Data", text: "For NEPSE-listed companies, you can find quarterly and annual balance sheets on: (1) The SEBON website (sebon.gov.np) under the company filings section, (2) The company's own website in the investor relations section, (3) Financial portals like sharesansar.com and merolagani.com which provide parsed data. Always check the most recent quarterly report, as annual data can be up to 12 months old." },
      { type: "heading", text: "Reading Tips for Nepali Investors" },
      { type: "list", items: [
        "Always compare the current balance sheet with the previous quarter and the same quarter last year to identify trends.",
        "Focus on the NPL ratio for banks and financial institutions (found in the notes to the balance sheet, not on the face of the statement).",
        "Watch for sudden spikes in inventory or receivables without corresponding revenue growth, which may indicate accounting issues.",
        "Check if retained earnings are growing, which confirms that the company is actually generating and keeping profits.",
        "For hydropower companies, look at the interest-bearing debt relative to cash flow from operations to assess debt servicing ability.",
        "Pay attention to contingent liabilities and off-balance-sheet items disclosed in the notes to accounts."
      ]},
    ],
  },
  {
    slug: "understanding-pe-ratio",
    title: "P/E Ratio Explained — Is a Stock Cheap or Expensive?",
    category: "Valuation",
    date: "2026-05-01",
    summary:
      "The Price-to-Earnings ratio is the most commonly used valuation metric. Learn how to calculate it, what it means, and common pitfalls when comparing P/E ratios across sectors.",
    tags: ["P/E Ratio", "Valuation", "Beginner"],
    readTime: "7 min read",
    content: [
      { type: "heading", text: "What is the P/E Ratio?" },
      { type: "paragraph", text: "The Price-to-Earnings ratio, commonly referred to as the P/E ratio, is the most widely used valuation metric in equity investing worldwide, and it is equally relevant for investors on the Nepal Stock Exchange (NEPSE). At its core, the P/E ratio tells you how much you are paying for one unit of a company's earnings. If a company has a P/E ratio of 20x, it means you are paying NPR 20 for every NPR 1 of annual earnings generated by the company. The ratio provides a simple, standardized way to compare the relative value of different stocks, regardless of their share price." },
      { type: "paragraph", text: "The P/E ratio is particularly useful because it bridges the gap between a company's stock price and its underlying business performance. A stock price by itself tells you very little about whether a company is expensive or cheap. NPR 1,000 per share could be cheap for one company and expensive for another. The P/E ratio normalizes this comparison by relating the price to the actual earnings power of the business." },
      { type: "highlight", text: "A P/E ratio of 15x means that if the company's earnings remain constant, it would take approximately 15 years for your share of the company's earnings to equal your purchase price. Think of it as the payback period for your investment, ignoring growth." },
      { type: "heading", text: "How to Calculate the P/E Ratio" },
      { type: "paragraph", text: "The calculation is straightforward. The P/E ratio equals the current market price per share divided by the earnings per share (EPS). For example, if Nabil Bank is trading at NPR 1,225 per share and its trailing twelve-month EPS is NPR 52.18, the P/E ratio is 1,225 divided by 52.18, which equals approximately 23.5x. You can find the EPS in the company's quarterly financial report or on financial portals like sharesansar.com." },
      { type: "metric", label: "P/E Formula", value: "Market Price / Earnings Per Share" },
      { type: "metric", label: "Example (NABIL)", value: "NPR 1,225 / NPR 52.18 = 23.5x" },
      { type: "paragraph", text: "It is important to note that there are two versions of the P/E ratio. The Trailing P/E uses the actual earnings from the past twelve months, while the Forward P/E uses projected earnings for the next twelve months. On NEPSE, most quoted P/E ratios are trailing P/E because forward earnings estimates are not as widely available or reliable as in developed markets. The trailing P/E is backward-looking, while the forward P/E incorporates market expectations about future earnings growth." },
      { type: "heading", text: "What Does the P/E Ratio Tell You?" },
      { type: "paragraph", text: "The P/E ratio provides a framework for assessing whether a stock is cheap, fairly valued, or expensive relative to its own history, its peers, or the broader market. A low P/E ratio could mean the stock is undervalued, but it could also mean the market expects declining earnings. Conversely, a high P/E ratio could indicate an overvalued stock, or it could reflect the market's expectation of strong future earnings growth. Context is everything when interpreting P/E ratios." },
      { type: "list", items: [
        "A low P/E (below sector average) may indicate undervaluation if the company's fundamentals are sound and earnings are stable or growing.",
        "A low P/E may also be a value trap if earnings are declining and the market is correctly pricing in future deterioration.",
        "A high P/E (above sector average) may indicate a growth stock where the market expects significant future earnings growth.",
        "A high P/E may also indicate an overhyped stock that has risen on speculation rather than fundamentals.",
        "The P/E ratio is most useful when comparing similar companies within the same sector, not across different sectors."
      ]},
      { type: "heading", text: "P/E Ratio Across Sectors on NEPSE" },
      { type: "paragraph", text: "Different sectors on NEPSE have very different average P/E ratios, and comparing a bank's P/E to a hydropower company's P/E is like comparing apples to oranges. The banking sector typically trades at P/E ratios of 15-25x, reflecting steady but moderate growth. The hydropower sector trades at higher P/E ratios of 18-30x because of the visibility of long-term PPA revenue. Insurance companies often trade at 15-20x P/E, while manufacturing companies can range from 10-25x depending on the specific business." },
      { type: "paragraph", text: "Microfinance companies in Nepal have historically traded at the highest P/E ratios on NEPSE, sometimes exceeding 40-50x at their peak, driven by expectations of rapid growth in rural lending. However, when growth expectations were not met, many of these stocks experienced dramatic corrections, highlighting the risk of paying extreme P/E multiples. The key lesson is that you should always compare a stock's P/E to its sector average and its own historical range, not to the overall market P/E." },
      { type: "metric", label: "Banking Sector Avg P/E", value: "15-25x" },
      { type: "metric", label: "Hydropower Sector Avg P/E", value: "18-30x" },
      { type: "metric", label: "Microfinance Sector Avg P/E", value: "25-50x" },
      { type: "metric", label: "Manufacturing Sector Avg P/E", value: "10-25x" },
      { type: "heading", text: "Common Mistakes When Using P/E Ratio" },
      { type: "paragraph", text: "While the P/E ratio is a powerful tool, it has several limitations that investors must be aware of. The most common mistake is using P/E as the sole basis for investment decisions without considering the broader context. A P/E of 12x for a company with declining earnings and a P/E of 25x for a company growing earnings at 30% per year cannot be compared directly. The lower P/E stock might actually be more expensive when you account for the earnings trajectory." },
      { type: "list", items: [
        "Ignoring earnings quality: A company with stable, recurring earnings deserves a higher P/E than one with volatile, one-off earnings.",
        "Not adjusting for one-time items: Extraordinary gains or losses can distort EPS. Always look at operating earnings.",
        "Comparing across sectors: P/E ratios are not comparable across fundamentally different businesses.",
        "Using negative P/E: When a company reports losses, the P/E ratio becomes negative and meaningless. Avoid comparing negative P/E ratios.",
        "Ignoring growth: A company growing at 5% annually should not have the same P/E as one growing at 25% annually."
      ]},
      { type: "heading", text: "Practical Example" },
      { type: "paragraph", text: "Let us compare two hypothetical NEPSE-listed companies. Company A trades at NPR 500 with an EPS of NPR 25 (P/E of 20x). Company B trades at NPR 200 with an EPS of NPR 20 (P/E of 10x). At first glance, Company B appears cheaper with half the P/E ratio. However, if Company A is growing earnings at 25% per year while Company B's earnings are declining by 10% per year, Company A is actually the better value despite the higher P/E. This is why P/E must always be combined with an assessment of earnings growth trends." },
      { type: "tip", title: "P/E and the PEG Ratio", text: "The PEG ratio (Price/Earnings to Growth) is a refinement of the P/E ratio that accounts for earnings growth. PEG = P/E / Earnings Growth Rate. A PEG below 1.0 suggests the stock may be undervalued relative to its growth, while a PEG above 2.0 suggests it may be overvalued. For example, a stock with a P/E of 20x and 25% earnings growth has a PEG of 0.8, indicating attractive value." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "The P/E ratio is an essential tool in every Nepali investor's analytical toolkit, but it is not a standalone indicator of value. Use it as a starting point for comparison, then dig deeper into the company's earnings quality, growth trajectory, competitive position, and balance sheet strength. The best investors on NEPSE are those who use P/E ratios in conjunction with other metrics like P/B ratio, ROE, and debt levels to build a comprehensive picture of a stock's true worth." },
    ],
  },
  {
    slug: "how-to-apply-ipo-nepal",
    title: "Step-by-Step Guide to Applying for IPOs in Nepal",
    category: "IPO",
    date: "2026-04-25",
    summary:
      "Complete walkthrough of the IPO application process in Nepal including Mero Share account setup, DEMAT requirements, application through banks, and allotment process.",
    tags: ["IPO", "Mero Share", "DEMAT", "Beginner"],
    readTime: "8 min read",
    content: [
      { type: "heading", text: "What is an IPO?" },
      { type: "paragraph", text: "An Initial Public Offering (IPO) is the process through which a privately held company offers its shares to the general public for the first time on a stock exchange. In Nepal, IPOs are regulated by the Securities Board of Nepal (SEBON) and listed on the Nepal Stock Exchange (NEPSE). For retail investors, IPOs represent an attractive opportunity to buy shares at the face value (typically NPR 100 per share) before the stock begins trading on the open market, where it often lists at a significant premium." },
      { type: "paragraph", text: "In the Nepali market, IPOs have historically been one of the most popular investment routes for first-time investors because of the perceived low risk and high return potential. When a well-regarded company issues an IPO at NPR 100 per share, and the stock typically lists at NPR 200-400 on the first trading day, investors who receive an allotment can realize significant gains within weeks. However, oversubscription has become increasingly common, meaning the allotment rate has declined substantially, and not every applicant receives shares." },
      { type: "highlight", text: "Important: IPOs in Nepal are oversubscribed on average by 10-30 times, meaning if you apply for 100 units, you may only receive 5-10 units through the lottery system. The actual allotment depends on the total number of applicants and the number of shares available for the general public." },
      { type: "heading", text: "Prerequisites Before Applying" },
      { type: "paragraph", text: "Before you can apply for any IPO in Nepal, you must have three essential accounts set up. First, you need a DEMAT account with a depository participant (like CDSC) to hold your shares in electronic form. Second, you need a Mero Share account (managed by CDSC) which serves as your online interface for applying to IPOs, viewing your shareholdings, and participating in further offerings. Third, you need a bank account linked to your Mero Share account for the payment of application funds." },
      { type: "list", items: [
        "DEMAT Account: Open through any licensed depository participant (most commercial banks and stockbrokers offer this service). You will receive a 16-digit BO ID (Beneficiary Owner ID) which is your unique shareholding identifier.",
        "Mero Share Account: Register online at meroshare.cdsc.com.np using your BO ID. This is your primary platform for all IPO applications and share management activities.",
        "Bank Account: Must be linked to your Mero Share account. Ensure your bank supports online IPO applications. Most commercial banks in Nepal now offer this facility through their mobile banking apps or internet banking portals."
      ]},
      { type: "heading", text: "Step 1: Open a Mero Share Account" },
      { type: "paragraph", text: "If you already have a DEMAT account, opening a Mero Share account is a straightforward online process. Visit meroshare.cdsc.com.np and click on the registration link. You will need your 16-digit BO ID (printed on your DEMAT account opening document), your personal details as registered with the depository participant, and access to the mobile number and email linked to your DEMAT account for OTP verification." },
      { type: "paragraph", text: "During registration, you will create a username and password for your Mero Share account. It is highly recommended to enable two-factor authentication for added security. Once your account is activated, take some time to familiarize yourself with the dashboard, which shows your current shareholdings, pending transactions, and available IPO issues. You should also complete your Demat KYC if prompted, as some IPOs require an updated KYC status." },
      { type: "tip", title: "Common Registration Issue", text: "Many new investors face problems during Mero Share registration because the name and details on their DEMAT account do not match their citizenship certificate. Ensure that your depository participant has entered your name exactly as it appears on your citizenship. Even a minor spelling difference can cause issues with IPO applications and allotments." },
      { type: "heading", text: "Step 2: Apply Through Bank or App" },
      { type: "paragraph", text: "Once an IPO opens for application, you can apply through multiple channels. The most common methods are: (1) Mero Share web portal directly, (2) Your bank's mobile banking app (if supported), or (3) Your stockbroker's trading platform. The most reliable method is applying through Mero Share directly, as it provides real-time confirmation and avoids any dependency on third-party systems." },
      { type: "paragraph", text: "To apply through Mero Share, log in to your account, click on the 'IPO/FPO' section, select the currently open issue, enter the number of units you wish to apply for (minimum 10 units), select your linked bank account for payment deduction, and submit the application. The application amount will be blocked in your bank account immediately. For an IPO with a face value of NPR 100 per share and minimum 10 units, you need at least NPR 1,000 in your bank account. Most investors apply for the maximum allowed units to maximize their chances of receiving a meaningful allotment." },
      { type: "subheading", text: "Application Checklist" },
      { type: "list", items: [
        "Ensure you have sufficient balance in your linked bank account (including a small buffer for potential premium pricing).",
        "Apply on the first day of the IPO period if possible, though the allotment is random and not based on application timing.",
        "Double-check the company name and issue details before submitting to avoid applying for the wrong issue.",
        "Apply for the maximum units allowed to increase your allotment probability under the lottery system.",
        "Keep your application confirmation number safe for tracking purposes."
      ]},
      { type: "heading", text: "Step 3: Check Allotment Results" },
      { type: "paragraph", text: "After the IPO application period closes, the company's issue manager conducts a computerized lottery to determine which applicants receive shares and how many. The allotment process typically takes 7-10 business days from the closing date. You can check allotment results through the Mero Share portal (under the 'My ASBA' section), the issue manager's website, or on financial news portals like sharesansar.com." },
      { type: "paragraph", text: "If you receive an allotment, the shares will be credited to your DEMAT account within a few days of the allotment result announcement. If you do not receive an allotment, the blocked amount in your bank account will be released automatically. For heavily oversubscribed IPOs, the refund process can take 2-3 additional business days. Do not panic if the refund is delayed by a day or two, as banking processing times can vary." },
      { type: "heading", text: "Step 4: Shares in Your DEMAT Account" },
      { type: "paragraph", text: "Once allotted, the shares appear in your DEMAT account under your Mero Share portfolio. You can log in to Mero Share at any time to view your complete shareholding across all companies. After the IPO shares are listed on NEPSE (usually within 10-15 business days of allotment), you can sell them through your stockbroker. The listing price is determined by market demand and supply on the first trading day." },
      { type: "paragraph", text: "Before selling, it is worth checking the listing day premium history for similar IPOs in the same sector. In the Nepali market, well-regarded IPOs of commercial banks and insurance companies have typically listed at 100-200% premiums, while manufacturing and hydropower IPOs have shown more varied performance. Setting a target selling price before the listing day helps you avoid the emotional trap of holding too long in expectation of further gains, or selling too early out of fear." },
      { type: "tip", title: "Maximize Your IPO Success Rate", text: "Apply for every legitimate IPO that opens, regardless of your opinion on the company's prospects. Because allotment is based on a lottery system, applying to more issues increases your cumulative probability of receiving allotments. Even if you receive only 10 units from an IPO, a listing premium of NPR 100-200 per share can result in meaningful returns. Also, apply from multiple family members' accounts if they have DEMAT and Mero Share accounts." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "Applying for IPOs in Nepal is a relatively simple process once you have your DEMAT and Mero Share accounts set up. The key is to be organized, apply consistently for every available issue, and understand the lottery-based allotment system. While IPOs in Nepal have historically provided attractive listing-day returns, always remember that the post-listing performance depends on the company's fundamentals. Treat IPO allotments as a bonus to your core investment strategy, not as your primary wealth-building approach." },
    ],
  },
  {
    slug: "technical-analysis-basics",
    title: "Technical Analysis 101 — Chart Patterns Every Investor Should Know",
    category: "Technical Analysis",
    date: "2026-04-18",
    summary:
      "Introduction to technical analysis covering support/resistance, trend lines, moving averages, and common chart patterns like head & shoulders, double top/bottom, and triangles.",
    tags: ["Technical Analysis", "Charts", "Beginner"],
    readTime: "12 min read",
    content: [
      { type: "heading", text: "What is Technical Analysis?" },
      { type: "paragraph", text: "Technical analysis is the study of historical price and volume data to identify patterns and trends that can help predict future price movements. Unlike fundamental analysis, which focuses on a company's financial statements and business prospects, technical analysis focuses purely on the price action as displayed on charts. The underlying philosophy is that all known information about a company is already reflected in its stock price, and that prices tend to move in trends that repeat over time due to the collective psychology of market participants." },
      { type: "paragraph", text: "For Nepali stock market investors, technical analysis is particularly relevant because the NEPSE market exhibits strong trending behavior. When a stock starts moving in a direction (up or down), it tends to continue in that direction for an extended period before reversing. This momentum characteristic makes technical analysis tools like trend lines, moving averages, and chart patterns especially useful for timing entry and exit decisions." },
      { type: "highlight", text: "Technical analysis does not predict the future with certainty. It provides probabilities, not guarantees. The goal is to identify setups where the odds of success are in your favor and manage risk appropriately when the analysis proves wrong." },
      { type: "heading", text: "Support and Resistance" },
      { type: "paragraph", text: "Support and resistance are the most fundamental concepts in technical analysis. Support is a price level where buying interest becomes strong enough to prevent the price from declining further. It acts as a floor beneath the price. Resistance is a price level where selling pressure becomes strong enough to prevent the price from rising further. It acts as a ceiling above the price." },
      { type: "paragraph", text: "On NEPSE, support and resistance levels often form at round numbers (like NPR 1,000, 1,200, 1,500) because many investors place buy and sell orders at these psychological price points. Support and resistance levels can also form at previous swing highs and lows, at levels where a stock previously reversed direction, or at the upper and lower boundaries of a trading range. The more times a price level is tested and holds, the stronger that support or resistance becomes." },
      { type: "list", items: [
        "Support levels indicate areas where buyers have historically stepped in. Look for increased volume and bullish candlestick patterns near support.",
        "Resistance levels indicate areas where sellers have historically taken profits or shorted. Look for selling pressure and bearish candlestick patterns near resistance.",
        "When a support level breaks (price closes below it), it often becomes new resistance. When resistance breaks (price closes above it), it often becomes new support.",
        "The strength of a support or resistance level increases with each test. A level tested 4 times is stronger than one tested only once.",
        "Volume is critical. A breakout on high volume is more likely to be genuine than one on low volume."
      ]},
      { type: "heading", text: "Trend Lines" },
      { type: "paragraph", text: "A trend line is a straight line drawn on a chart that connects a series of price points to visually represent the direction and speed of a price trend. An uptrend line is drawn by connecting two or more consecutive higher lows, while a downtrend line connects two or more consecutive lower highs. The angle of the trend line indicates the momentum of the trend. A steep trend line suggests rapid price movement, while a shallow trend line indicates a more gradual, sustainable trend." },
      { type: "paragraph", text: "To draw a valid trend line, you need at least two points of contact, but three or more points make the trend line significantly more reliable. When a well-established trend line is broken, it signals a potential trend reversal or a transition to a consolidation phase. On NEPSE daily charts, the 20-day, 50-day, and 200-day moving average lines often serve as dynamic trend lines that many institutional traders watch closely." },
      { type: "heading", text: "Moving Averages" },
      { type: "paragraph", text: "Moving averages smooth out daily price fluctuations to reveal the underlying trend direction. The two most commonly used moving averages in the Nepali market are the Simple Moving Average (SMA) and the Exponential Moving Average (EMA). The SMA calculates the average closing price over a specified period, giving equal weight to each day. The EMA gives more weight to recent prices, making it more responsive to new information." },
      { type: "metric", label: "50-day MA", value: "Medium-term trend indicator" },
      { type: "metric", label: "200-day MA", value: "Long-term trend indicator" },
      { type: "metric", label: "20-day EMA", value: "Short-term momentum signal" },
      { type: "paragraph", text: "A common trading signal is generated when a shorter-term moving average crosses above or below a longer-term moving average. When the 50-day MA crosses above the 200-day MA, it is called a Golden Cross and is considered a bullish signal. When the 50-day MA crosses below the 200-day MA, it is called a Death Cross and is considered bearish. On NEPSE, these crossover signals have historically provided reasonable timing indicators, though they tend to lag actual price reversals by a few days." },
      { type: "heading", text: "Key Chart Patterns" },
      { type: "subheading", text: "Head and Shoulders" },
      { type: "paragraph", text: "The Head and Shoulders pattern is one of the most reliable reversal patterns in technical analysis. It consists of three peaks: a higher middle peak (the head) flanked by two lower peaks (the shoulders). The pattern forms after an uptrend and signals a potential reversal to a downtrend. The neckline is drawn by connecting the lows between the peaks. When the price breaks below the neckline with volume confirmation, the pattern is considered complete, and the projected decline is approximately equal to the distance from the head to the neckline." },
      { type: "subheading", text: "Double Top and Double Bottom" },
      { type: "paragraph", text: "A Double Top pattern forms when a stock tests the same resistance level twice and fails to break through, creating two peaks at approximately the same price. The pattern signals exhaustion of buying momentum and a potential reversal to the downside. Conversely, a Double Bottom forms when a stock tests the same support level twice and holds, signaling a potential reversal to the upside. Both patterns are confirmed when the price breaks through the middle level (the trough for a double top or the peak for a double bottom)." },
      { type: "subheading", text: "Triangles" },
      { type: "paragraph", text: "Triangle patterns form when the price range narrows over time, with the upper and lower boundaries converging. Ascending triangles have a flat upper boundary and a rising lower boundary, typically resolving with a breakout to the upside. Descending triangles have a flat lower boundary and a falling upper boundary, typically resolving with a breakdown to the downside. Symmetrical triangles have both boundaries converging, and the breakout can go either way. Triangle patterns are common on NEPSE during consolidation phases and often precede significant moves." },
      { type: "heading", text: "Volume Analysis" },
      { type: "paragraph", text: "Volume is the number of shares traded during a given period and is an essential confirmation tool in technical analysis. In a healthy uptrend, volume should increase on up days and decrease on down days, showing that buying pressure is driving the trend. In a downtrend, volume should increase on down days. When price moves occur on unusually low volume, the move is suspect and may not be sustained. When price moves occur on unusually high volume, it indicates strong conviction from market participants." },
      { type: "paragraph", text: "On NEPSE, daily turnover data is published by the exchange and is widely tracked. A stock breaking above resistance on volume that is 2-3 times its 30-day average is a strong bullish signal. Conversely, a stock making new highs on declining volume suggests weakening momentum and a potential correction. Always confirm price patterns with volume before committing capital." },
      { type: "tip", title: "Getting Started with Technical Analysis", text: "Begin with the daily chart of a single NEPSE stock you own. Identify the most recent support and resistance levels, draw a trend line connecting the recent swing points, and overlay the 20-day and 50-day moving averages. Spend two weeks just observing how price interacts with these levels before making any trading decisions. The goal is to develop your ability to read charts intuitively, not to memorize patterns." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "Technical analysis is a skill that develops with practice and observation. Start with the core concepts of support, resistance, and trend identification before moving on to more complex patterns and indicators. The most successful technical analysts on NEPSE combine chart analysis with an understanding of market sentiment, liquidity conditions, and macroeconomic factors. Technical analysis is not about finding a magic formula; it is about stacking probabilities in your favor and managing risk when your analysis is wrong." },
    ],
  },
  {
    slug: "understanding-book-value",
    title: "Book Value vs. Market Price — Why the Gap Matters",
    category: "Valuation",
    date: "2026-04-10",
    summary:
      "Understanding the relationship between a company's book value and its market price. Learn when a stock trading below book value is a bargain and when it's a value trap.",
    tags: ["Book Value", "Valuation", "Fundamental Analysis"],
    readTime: "6 min read",
    content: [
      { type: "heading", text: "What is Book Value?" },
      { type: "paragraph", text: "Book value is the net asset value of a company, calculated as total assets minus total liabilities. In simpler terms, it is what the company would be worth if it were liquidated today, with all assets sold at their book values and all liabilities paid off. Book value represents the shareholders' residual claim on the company's assets after all debts have been settled. For individual shareholders, book value per share is calculated by dividing the total book value by the number of outstanding shares." },
      { type: "paragraph", text: "Book value is an accounting concept and is derived directly from the balance sheet. For Nepali companies, book value includes tangible assets like land, buildings, machinery, cash, investments, and receivables, minus all borrowings, payables, and other obligations. It is important to understand that book value is based on historical cost accounting, meaning assets are recorded at their purchase price minus depreciation, not at their current market value. This is a critical distinction because many Nepali companies own prime real estate that was purchased decades ago at a fraction of its current market value, but this appreciation is not reflected in the book value." },
      { type: "highlight", text: "Book value is like the replacement cost of a company. It tells you what the company's net assets are worth on paper, but it may significantly understate or overstate the true economic value of the business depending on the nature of the assets and liabilities." },
      { type: "heading", text: "What is Market Price?" },
      { type: "paragraph", text: "Market price is simply the price at which a stock is currently trading on NEPSE. It is determined by the forces of supply and demand among buyers and sellers in the market. The market price reflects the collective opinion of all market participants about the future earning potential, growth prospects, risk profile, and competitive position of the company. Unlike book value, which is backward-looking and based on historical costs, the market price is forward-looking and incorporates expectations about the future." },
      { type: "paragraph", text: "The market price can be higher or lower than book value for a variety of reasons. If investors believe a company's earnings will grow significantly, they may be willing to pay well above book value. Conversely, if investors believe a company's assets are overvalued on the balance sheet or its earnings will decline, they may push the market price below book value. The gap between market price and book value is one of the most powerful indicators of market sentiment toward a company." },
      { type: "heading", text: "The Price-to-Book (P/B) Ratio" },
      { type: "paragraph", text: "The Price-to-Book ratio is the primary metric used to compare a stock's market price with its book value. It is calculated by dividing the current market price per share by the book value per share. A P/B ratio of 1.0 means the stock is trading exactly at its book value. A P/B above 1.0 means the market values the company above its net asset value, and a P/B below 1.0 means the stock is trading at a discount to its book value." },
      { type: "metric", label: "P/B Formula", value: "Market Price / Book Value Per Share" },
      { type: "metric", label: "P/B > 1.0", value: "Market expects growth" },
      { type: "metric", label: "P/B = 1.0", value: "Market values assets at book" },
      { type: "metric", label: "P/B < 1.0", value: "Stock at discount to book" },
      { type: "heading", text: "When P/B Below 1.0 is a Bargain" },
      { type: "paragraph", text: "A stock trading below book value (P/B less than 1.0) can represent a genuine buying opportunity under certain conditions. The most common scenario is when a fundamentally sound company has been sold off due to temporary market sentiment, sector-wide pessimism, or macroeconomic concerns that are likely to resolve. In such cases, the market has overreacted, and the stock's intrinsic value exceeds its market price. Value investors like Warren Buffett have built fortunes by identifying such situations and buying quality companies at prices below book value." },
      { type: "list", items: [
        "When the company has strong and growing earnings, a low P/B suggests the stock is significantly undervalued.",
        "When the company's assets include appreciating real estate or investments carried at historical cost, the true book value may be higher than reported.",
        "When a temporary crisis (industry downturn, regulatory change, management transition) has depressed the stock price but the underlying business remains viable.",
        "When the company is a market leader in its sector with a strong competitive position that justifies a higher valuation.",
        "When the company has a consistent history of profitability and dividend payments, suggesting the earnings power is real and sustainable."
      ]},
      { type: "heading", text: "When P/B Below 1.0 is a Value Trap" },
      { type: "paragraph", text: "Not every stock trading below book value is a bargain. Some are value traps, where the low valuation is entirely justified because the company's assets are deteriorating, its earnings are declining, or its business model is structurally impaired. The most dangerous value traps are companies that appear cheap but are destroying shareholder value through persistent losses, accumulating debt, or operating in declining industries with no recovery path." },
      { type: "list", items: [
        "When the company has been reporting losses for several consecutive quarters, the book value is likely to decline further as losses erode retained earnings.",
        "When the company's assets include significant amounts of obsolete inventory, uncollectible receivables, or impaired investments that are overstated on the balance sheet.",
        "When the company operates in a sunset industry with structural headwinds (declining demand, regulatory pressure, technological disruption).",
        "When management has a track record of poor capital allocation, destroying value through unprofitable expansions or related-party transactions.",
        "When the company has high leverage and the debt servicing burden is consuming a growing portion of operating cash flow."
      ]},
      { type: "heading", text: "Using P/B Ratio in Practice" },
      { type: "paragraph", text: "The P/B ratio is most useful when comparing similar companies within the same sector. On NEPSE, the average P/B ratio varies significantly by sector. Commercial banks typically trade at 1.5-3.0x P/B, reflecting their franchise value and the recurring nature of banking earnings. Hydropower companies trade at 2.0-4.0x P/B due to the long-term visibility of their PPA revenue. Manufacturing companies show the widest range, from 0.5x to 5.0x P/B, depending on growth prospects and asset quality." },
      { type: "paragraph", text: "When using the P/B ratio, always look beyond the number to understand why the stock is trading at its current P/B level. A bank trading at 1.4x P/B might be a bargain if its NPL ratio is improving and earnings are accelerating. But it might be expensive if hidden asset quality issues exist that the market has identified but are not yet visible in the quarterly reports. The P/B ratio is a starting point for investigation, not a final answer." },
      { type: "tip", title: "Combine P/B with ROE", text: "The most powerful use of the P/B ratio is in combination with Return on Equity (ROE). A company with high ROE (above 15%) deserves a higher P/B ratio because it generates strong returns on its asset base. A company with low ROE (below 8%) should trade at a lower P/B. If you find a company with high ROE trading at a low P/B, you may have found an undervalued stock. This is the essence of value investing." },
      { type: "heading", text: "NEPSE Examples" },
      { type: "paragraph", text: "Let us look at how P/B ratios play out in the current NEPSE market. Nabil Bank, the largest bank by market cap, trades at approximately 2.8x P/B. This premium is justified by its market-leading position, strong ROE of 16.4%, and above-average growth prospects. In contrast, NIC Asia Bank trades at 1.4x P/B, reflecting the market's lower confidence in its asset quality and turnaround execution. Whether this discount represents a bargain or a value trap is the subject of ongoing debate among Nepali market analysts." },
      { type: "paragraph", text: "Among non-banking stocks, Butwal Power Company trades at 2.1x P/B, which is modest for the hydropower sector and reflects its slower growth profile. Some manufacturing companies on NEPSE trade below 1.0x P/B, often due to concerns about working capital management or cyclical industry exposure. Each case requires individual analysis to determine whether the discount is warranted or represents an opportunity." },
      { type: "heading", text: "Conclusion" },
      { type: "paragraph", text: "The gap between book value and market price is one of the most informative signals in equity analysis. Understanding when a low P/B ratio represents a genuine opportunity versus a value trap is a skill that separates successful investors from those who chase cheap stocks without understanding the underlying fundamentals. Always combine the P/B ratio with other metrics like ROE, earnings growth, and debt levels to form a comprehensive view. In the Nepali market, where information asymmetry is significant, a disciplined approach to value investing using P/B analysis can provide a meaningful edge over time." },
    ],
  },
];

export const marketEvents: MarketEvent[] = [
  {
    id: "1",
    type: "ipo",
    title: "Snow River Limited IPO",
    company: "Snow River Limited",
    startDate: "2026-05-12",
    endDate: "2026-05-15",
    status: "open",
    details: "10,00,000 units at Rs. 100 per share. Minimum application: 10 units.",
  },
  {
    id: "2",
    type: "right-share",
    title: "Chilime Hydropower Right Share",
    company: "Chilime Hydropower",
    startDate: "2026-05-20",
    endDate: "2026-06-03",
    status: "upcoming",
    details: "1:1 right share. Issue manager: Nabil Investment.",
  },
  {
    id: "3",
    type: "auction",
    title: "BJHL Unclaimed Rights Auction",
    company: "Butwal Power Company",
    startDate: "2026-05-08",
    endDate: "2026-05-12",
    status: "open",
    details: "Auction of unclaimed right shares from previous issue.",
  },
  {
    id: "4",
    type: "ipo",
    title: "Reliable Samriddhi Yojana 2",
    company: "Reliable Life Insurance",
    startDate: "2026-05-12",
    endDate: "2026-05-15",
    status: "open",
    details: "Mutual fund units at Rs. 10 per unit. Minimum: 100 units.",
  },
  {
    id: "5",
    type: "policy",
    title: "NRB Monetary Policy Review",
    company: "Nepal Rastra Bank",
    startDate: "2026-05-20",
    endDate: "2026-05-20",
    status: "upcoming",
    details: "First quarterly monetary policy review of FY2083/84.",
  },
  {
    id: "6",
    type: "dividend",
    title: "Nabil Bank Cash Dividend",
    company: "Nabil Bank Limited",
    startDate: "2026-05-25",
    endDate: "2026-05-25",
    status: "upcoming",
    details: "15% cash dividend for FY2082/83. Book close: May 25.",
  },
  {
    id: "7",
    type: "ipo",
    title: "Agricultural Development Bank IPO",
    company: "Agricultural Development Bank",
    startDate: "2025-04-01",
    endDate: "2025-04-05",
    status: "closed",
    details: "15,00,000 units at Rs. 100 per share. Minimum application: 10 units.",
  },
  {
    id: "8",
    type: "right-share",
    title: "Nepal Insurance Company Right Share",
    company: "Nepal Insurance Company (NIC)",
    startDate: "2025-03-10",
    endDate: "2025-03-24",
    status: "closed",
    details: "1:0.5 right share. Issue manager: NIC Asia Capital.",
  },
  {
    id: "9",
    type: "auction",
    title: "Neco Insurance Auction",
    company: "Neco Insurance Ltd",
    startDate: "2025-05-01",
    endDate: "2025-05-05",
    status: "closed",
    details: "Auction of unclaimed IPO shares from previous issue.",
  },
];

// ==================== EVENT STATUS HELPERS ====================

/**
 * Compute the effective status of an event based on current date.
 * This overrides the static status in the data to provide auto-archiving.
 */
export function getEventEffectiveStatus(event: MarketEvent): MarketEvent['status'] {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  end.setHours(23, 59, 59, 999); // End of day

  if (now > end) return 'closed';
  if (now >= start && now <= end) return 'open';
  return 'upcoming';
}

/** Get events that are still active (upcoming or open). */
export function getActiveEvents(): MarketEvent[] {
  return marketEvents.filter((e) => getEventEffectiveStatus(e) !== 'closed');
}

/** Get events that have passed their end date (archived/closed). */
export function getArchivedEvents(): MarketEvent[] {
  return marketEvents.filter((e) => getEventEffectiveStatus(e) === 'closed');
}

// Helper functions
export function getNewsletter(slug: string): NewsletterData | undefined {
  return newsletters.find((n) => n.slug === slug);
}

export function getLatestNewsletter(): NewsletterData | undefined {
  return newsletters[0];
}

export function getAnalysisArticle(slug: string): AnalysisArticle | undefined {
  return analysisArticles.find((a) => a.slug === slug);
}

export function getLearningArticle(slug: string): LearningArticle | undefined {
  return learningArticles.find((a) => a.slug === slug);
}
