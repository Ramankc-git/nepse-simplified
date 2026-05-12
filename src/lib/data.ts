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

export interface AnalysisArticle {
  slug: string;
  title: string;
  category: "company" | "sector";
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
}

export interface LearningArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
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
];

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
