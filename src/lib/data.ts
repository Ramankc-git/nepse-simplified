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
    indexClosing: "2,731.94",
    indexPrevious: "2,745.65",
    indexChange: "-0.50%",
    indexChangePoints: "(-13.71 pts)",
    indexPositive: false,
    turnoverThisWeek: "18.45B",
    turnoverPrevWeek: "17.12B",
    turnoverChange: "+7.7%",
    turnoverPositive: true,
    topSectorName: "Commercial Banks",
    topSectorChange: "+1.12%",
    secondSectorName: "Hydropower",
    secondSectorChange: "+0.85%",
    laggardSector: "Finance Sector (-1.42%)",
    marketContext:
      "Minor correction led by profit-booking in Finance stocks. Index holding firm above 2,700 psychological support suggests a healthy consolidation rather than a trend reversal.",
    opportunities: [
      {
        title: "Interest Rate Ceiling",
        takeaway:
          "Commercial banks keeping rates steady for Jyestha signals the peak is over. Cheaper margin lending is ahead.",
      },
      {
        title: "Budget Anticipation",
        takeaway:
          'Market expects clarity on capital gains tax. "Pre-budget rallies" are historically common in Nepal.',
      },
      {
        title: "Absorption at 2700",
        takeaway:
          'Institutions are defending the 2,700 mark. This creates a high-conviction "floor" for buyers.',
      },
    ],
    risks: [
      {
        title: "Liquidity Mop-up",
        takeaway:
          "NRB mopping Rs. 45B reduces short-term speculative energy. Expect sideways movement.",
      },
      {
        title: "Small-Cap Fatigue",
        takeaway:
          "Retailers in Finance/Hydro are exhausted. Selling pressure here could drag the index mood.",
      },
      {
        title: "Remittance Plateau",
        takeaway:
          'Any slowdown in inflow impacts bank liquidity. This is the "oxygen" of our market.',
      },
    ],
    strategicFocus: [
      {
        title: "Shift to Quality",
        takeaway:
          "Rotate from \"pump\" stocks into large-cap 'Others' or Blue-chip banks with low P/E ratios.",
      },
      {
        title: "Tiered Entry",
        takeaway:
          "Don't deploy 100% cash. Buy in 20% chunks at support levels (2,680 - 2,710).",
      },
      {
        title: "Monitor Turnover Leaders",
        takeaway:
          "Only hold stocks maintaining Top-10 turnover. Liquidity is your best insurance policy.",
      },
    ],
    stocks: [
      {
        symbol: "NIFRA",
        badge: "Dormant Giant Awakening",
        badgeColor: "blue",
        reasoning:
          "Massive volume spikes seen at the bottom range of 230-240. Large block trades suggest high-net-worth accumulation after a long period of stagnation.",
        tip:
          "When volume precedes price in a fundamental giant, pay attention.",
      },
      {
        symbol: "HDL",
        badge: "Value Recovery",
        badgeColor: "green",
        reasoning:
          "After months of decline, smart money is nibbling at these multi-year lows. Turnover is slowly spiking against the bearish trend, indicating a potential trend reversal.",
        tip:
          "",
      },
    ],
    iposAndAuctions: [
      "Kalanga Hydro (IPO): May 22 — May 25, 2026",
      "Reliable Samriddhi-2: Final Call May 26",
    ],
    policyNotices: [
      "3rd Quarter Monetary Review: NRB maintained 12% Risk Weighting on share loans but signaled flexibility in the upcoming budget cycle. Continued pressure on banks to reduce interest rates further to stimulate the real economy.",
    ],
    companyName: "HRL: Himalayan Reinsurance",
    ltp: "628.40",
    weeklyHigh: "-1.2%",
    trend: "Accumulating",
    description:
      "HRL is currently seeing a consolidation phase. Analysis of order book depth suggests institutional interest at current valuations. Sectoral stability in 'Others' acts as a tailwind despite broad market volatility.",
    strategicOpinion:
      "Ideal entry between 610-620. Watch for volume spikes on the daily chart as confirmation of the next leg up.",
    supportZone: "610",
    resistance: "675",
    institutionalDemand: "Extreme High",
    marketFloat: "High",
    insights: [
      {
        category: "Mental Model",
        title: "Skin in the Game",
        description:
          "Be careful with advice from those who don't lose money when you do. High-quality analysis always highlights both risks and rewards.",
      },
      {
        category: "Cognition & Biases",
        title: "Anchoring Bias",
        description:
          'Thinking a stock is "cheap" because it used to be higher. A stock\'s past price doesn\'t dictate its future value or current health.',
      },
      {
        category: "Important Terms",
        title: "Float and Volatility",
        description:
          "Low float stocks move fast with little volume. High float stocks like HRL or NIFRA need massive capital to move, making them more \"stable\".",
      },
    ],
    summaryText:
      "The weekly close was slightly corrective but maintained the structural integrity of the bull run. Investors should focus on high-liquidity stocks while monitoring the upcoming budget signals.",
  },
];

export const analysisArticles: AnalysisArticle[] = [
  // NOTE: Analysis articles are added here. Previously generated articles were removed
  // because they contained fabricated financial data. Add real, verified analysis
  // articles with proper data sources going forward.
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
      { type: "paragraph", text: "The calculation is straightforward. The P/E ratio equals the current market price per share divided by the earnings per share (EPS). For example, if a hypothetical NEPSE-listed company is trading at NPR 500 per share and its trailing twelve-month EPS is NPR 40, the P/E ratio is 500 divided by 40, which equals 12.5x. You can find the EPS in the company's quarterly financial report or on financial portals like sharesansar.com." },
      { type: "metric", label: "P/E Formula", value: "Market Price / Earnings Per Share" },
      { type: "metric", label: "Example", value: "NPR 500 / NPR 40 EPS = 12.5x" },
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
      { type: "paragraph", text: "When using the P/B ratio, always look beyond the number to understand why the stock is trading at its current P/B level. A bank trading below book value (under 1.0x P/B) might be a bargain if its NPL ratio is improving and earnings are accelerating. But it might be expensive if hidden asset quality issues exist that the market has identified but are not yet visible in the quarterly reports. The P/B ratio is a starting point for investigation, not a final answer." },
      { type: "tip", title: "Combine P/B with ROE", text: "The most powerful use of the P/B ratio is in combination with Return on Equity (ROE). A company with high ROE (above 15%) deserves a higher P/B ratio because it generates strong returns on its asset base. A company with low ROE (below 8%) should trade at a lower P/B. If you find a company with high ROE trading at a low P/B, you may have found an undervalued stock. This is the essence of value investing." },
      { type: "heading", text: "NEPSE Examples" },
      { type: "paragraph", text: "Let us look at how P/B ratios play out in the NEPSE market. Large commercial banks with strong franchises typically command higher P/B multiples due to their market-leading positions, strong return on equity, and above-average growth prospects. In contrast, banks facing asset quality challenges or undergoing management transitions often trade at a discount to book value. Whether a discount represents a bargain or a value trap is something each investor must determine by examining the company's specific fundamentals, NPL trends, and management quality." },
      { type: "paragraph", text: "Among non-banking stocks, hydropower companies with established PPAs tend to trade at a premium due to their visible revenue streams. Manufacturing companies on NEPSE show the widest range, with some trading below 1.0x P/B due to concerns about working capital management or cyclical industry exposure. Each case requires individual analysis to determine whether the discount is warranted or represents an opportunity." },
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
