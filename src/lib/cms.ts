import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  NewsletterData,
  AnalysisArticle,
  LearningArticle,
  MarketEvent,
  ContentBlock,
  PestleItem,
  WatchlistStock,
} from "./data";

const contentDir = path.join(process.cwd(), "content");

// ==================== BASE READERS ====================

interface CmsContent {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
}

/**
 * Read all markdown files from a CMS content folder.
 * Returns only published content, sorted newest first.
 */
function readContentFolder(folder: string): CmsContent[] {
  const dir = path.join(contentDir, folder);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const items = files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug: filename.replace(/\.(md|mdx)$/, ""),
        frontmatter: data as Record<string, any>,
        content,
      };
    })
    .filter((item) => item.frontmatter.status !== "draft");

  // Sort newest first by date field (if available)
  items.sort((a, b) => {
    const dateA = a.frontmatter.date || a.frontmatter.startDate || a.frontmatter.asOfDate || "";
    const dateB = b.frontmatter.date || b.frontmatter.startDate || b.frontmatter.asOfDate || "";
    return dateB.localeCompare(dateA);
  });

  return items;
}

// ==================== NEWSLETTER PARSER ====================

/**
 * Parse newsletter markdown body into structured NewsletterData.
 * The newsletter markdown follows a consistent 7-section format.
 */
function parseNewsletterMarkdown(
  slug: string,
  frontmatter: Record<string, any>,
  markdown: string
): NewsletterData | null {
  try {
    // Extract sections using ## headings
    const sections = markdown.split(/^## /m).map((s) => s.trim());

    // Parse Section 1: Market Snapshot (first section has "# Market Snapshot" with # prefix)
    const marketSection = sections.find((s) =>
      s.startsWith("# Market Snapshot") || s.startsWith("Market Snapshot")
    ) || sections[0] || "";

    const indexMatch = marketSection.match(
      /\*\*NEPSE Index:\*\*\s*([\d,.]+)\s*\(([+-]?[\d.]+%),?\s*([+-]?[\d.]+\s*pts?)\)\s*—\s*Prev:\s*([\d,.]+)/
    );
    const turnoverMatch = marketSection.match(
      /\*\*Weekly Turnover:\*\*\s*Rs\.?\s*([\d.BM]+)\s*\(([+-]?[\d.]+%)\)\s*—\s*Prev\s*(?:Week)?:\s*Rs\.?\s*([\d.BM]+)/
    );

    const sectorMatches = [...marketSection.matchAll(/\*\*(.+?):\*\*\s*([+-]?[\d.]+%)(?:\s*\(Top\))?/g)];
    const laggardMatch = marketSection.match(/\*\*Laggard:\*\*\s*(.+)/);
    const contextMatch = marketSection.match(/\*\*Market Context:\*\*\s*(.+)/);

    const indexClosing = indexMatch ? indexMatch[1] : "";
    const indexChange = indexMatch ? indexMatch[2] : "";
    const indexChangePoints = indexMatch ? `(${indexMatch[3].trim()})` : "";
    const indexPrevious = indexMatch ? indexMatch[4] : "";
    const indexPositive = indexChange.startsWith("+");

    const turnoverThisWeek = turnoverMatch ? turnoverMatch[1] : "";
    const turnoverChange = turnoverMatch ? turnoverMatch[2] : "";
    const turnoverPrevWeek = turnoverMatch ? turnoverMatch[3] : "";
    const turnoverPositive = turnoverChange.startsWith("+");

    const topSectorName = sectorMatches[0] ? sectorMatches[0][1].trim() : "";
    const topSectorChange = sectorMatches[0] ? sectorMatches[0][2] : "";
    const secondSectorName = sectorMatches[1] ? sectorMatches[1][1].trim() : "";
    const secondSectorChange = sectorMatches[1] ? sectorMatches[1][2] : "";
    const laggardSector = laggardMatch ? laggardMatch[1].trim() : "";
    const marketContext = contextMatch ? contextMatch[1].trim() : "";

    // Parse Section 2: PESTLE (Opportunities, Threats, Strategic Focus)
    const opportunities: PestleItem[] = [];
    const risks: PestleItem[] = [];
    const strategicFocus: PestleItem[] = [];

    for (const section of sections) {
      if (section.includes("PESTLE Analysis") && section.includes("Opportunities")) {
        const items = parseSubsectionItems(section.split("\n").slice(1).join("\n"));
        opportunities.push(...items);
      } else if (section.includes("PESTLE Analysis") && section.includes("Threats")) {
        const items = parseSubsectionItems(section.split("\n").slice(1).join("\n"));
        risks.push(...items);
      } else if (section.startsWith("Strategic Focus")) {
        const lines = section.split("\n").filter((l) => /^[\-\*] \*\*/.test(l));
        for (const line of lines) {
          const m = line.match(/^[\-\*] \*\*(.+?):\*\*\s*(.+)/);
          if (m) strategicFocus.push({ title: m[1].trim(), takeaway: m[2].trim() });
        }
      }
    }

    // Parse Section 3: Smart Money Watchlist
    const stocks: WatchlistStock[] = [];
    const watchlistSection = sections.find((s) => s.startsWith("Smart Money Watchlist"));
    if (watchlistSection) {
      const stockBlocks = watchlistSection.split(/^### /m).slice(1);
      const badgeColors: Record<string, "green" | "blue" | "orange"> = {
        "Volume Breakout": "green",
        "Dormant Giant Awakening": "blue",
        "Institutional Hold": "blue",
        "Value Recovery": "green",
        "Momentum Pickup": "green",
      };
      for (const block of stockBlocks) {
        const headerMatch = block.match(/^([A-Z]+)\s*—\s*(.+)/);
        if (!headerMatch) continue;
        const symbol = headerMatch[1].trim();
        const badge = headerMatch[2].trim();
        const badgeColor = badgeColors[badge] || "blue";

        // Extract text (everything except blockquotes and bullet lines)
        const textLines = block
          .split("\n")
          .filter((l) => l.trim() && !l.startsWith(">") && !/^[\-\*]\s/.test(l) && !l.startsWith("###"));
        const reasoning = textLines.slice(0, 2).join(" ").trim();

        // Extract tip from blockquote
        const tipMatch = block.match(/>\s*[""](.+?)[""]/);
        const tip = tipMatch ? tipMatch[1].trim() : "";

        stocks.push({ symbol, badge, badgeColor, reasoning, tip });
      }
    }

    // Parse Section 4: Upcoming Events
    const eventsSection = sections.find((s) => s.startsWith("Upcoming Events"));
    const iposAndAuctions: string[] = [];
    const policyNotices: string[] = [];
    if (eventsSection) {
      const lines = eventsSection.split("\n");
      let currentList = "ipo";
      for (const line of lines) {
        if (line.includes("**IPOs & Auctions:**")) currentList = "ipo";
        else if (line.includes("**Policy:**")) {
          currentList = "policy";
          const policyText = line.replace(/\*\*Policy:\*\*\s*/, "").trim();
          if (policyText) policyNotices.push(policyText);
        } else if (/^[\-\*]\s/.test(line) && currentList === "ipo") {
          iposAndAuctions.push(line.replace(/^[\-\*]\s*/, "").trim());
        }
      }
    }

    // Parse Section 5: Company Analysis
    const companySection = sections.find((s) => s.startsWith("Company Analysis"));
    let companyName = "";
    let ltp = "";
    let weeklyHigh = "";
    let trend = "";
    let description = "";
    let strategicOpinion = "";
    let supportZone = "";
    let resistance = "";
    let institutionalDemand = "";
    let marketFloat = "";

    if (companySection) {
      const headerLine = companySection.split("\n")[0];
      const companyMatch = headerLine.match(/Company Analysis —\s*(.+)/);
      companyName = companyMatch ? companyMatch[1].trim() : "";

      const ltpMatch = companySection.match(/\*\*LTP:\*\*\s*([\d,.]+)\s*\|\s*\*\*Weekly High:\*\*\s*([\d,.]+)\s*\|\s*\*\*Trend:\*\*\s*(.+)/);
      if (ltpMatch) {
        ltp = ltpMatch[1];
        weeklyHigh = ltpMatch[2];
        trend = ltpMatch[3].trim();
      }

      const opinionMatch = companySection.match(/>\s*[""](.+?)[""]/);
      if (opinionMatch) strategicOpinion = opinionMatch[1].trim();

      // Description: paragraph lines after the LTP line
      const descLines = companySection
        .split("\n")
        .filter((l) => l.trim() && !l.startsWith(">") && !/^[\-\*]\s/.test(l) && !l.startsWith("**") && !l.startsWith("###"));
      description = descLines.slice(0, 2).join(" ").trim();

      // Extract detail fields
      const supportMatch = companySection.match(/\*\*Support (?:Zone)?:\*\*\s*(.+)/);
      const resistMatch = companySection.match(/\*\*Resistance:\*\*\s*(.+)/);
      const instMatch = companySection.match(/\*\*Institutional Demand:\*\*\s*(.+)/);
      const floatMatch = companySection.match(/\*\*Market Float:\*\*\s*(.+)/);

      if (supportMatch) supportZone = supportMatch[1].trim();
      if (resistMatch) resistance = resistMatch[1].trim();
      if (instMatch) institutionalDemand = instMatch[1].trim();
      if (floatMatch) marketFloat = floatMatch[1].trim();
    }

    // Parse Section 6: Learner's Insight
    const insightSection = sections.find((s) => s.startsWith("Learner"));
    const insights: { category: string; title: string; description: string }[] = [];
    if (insightSection) {
      const insightBlocks = insightSection.split(/^### /m).slice(1);
      for (const block of insightBlocks) {
        const firstLine = block.split("\n")[0];
        const parts = firstLine.split(" — ");
        const title = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        const category = parts.length > 1 ? parts[0].trim() : "";
        const descLines = block.split("\n").filter((l) => l.trim() && !l.startsWith("###"));
        const description = descLines.join(" ").trim();
        insights.push({ category, title, description });
      }
    }

    // Parse Section 7: Weekly Summary
    const summarySection = sections.find((s) => s.startsWith("Weekly Summary"));
    const summaryText = summarySection
      ? summarySection
          .split("\n")
          .filter((l) => l.trim() && !l.startsWith(">") && !l.startsWith("##"))
          .join(" ")
          .trim()
      : "";

    return {
      slug,
      volume: frontmatter.volume || frontmatter.title || "",
      dateRange: frontmatter.dateRange || "",
      asOfDate: frontmatter.asOfDate || "",
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
      opportunities,
      risks,
      strategicFocus,
      stocks,
      iposAndAuctions,
      policyNotices,
      companyName,
      ltp,
      weeklyHigh,
      trend,
      description,
      strategicOpinion,
      supportZone,
      resistance,
      institutionalDemand,
      marketFloat,
      insights,
      summaryText,
    };
  } catch {
    return null;
  }
}

/**
 * Parse ### subsection items (used in PESTLE sections).
 */
function parseSubsectionItems(text: string): PestleItem[] {
  const items: PestleItem[] = [];
  const blocks = text.split(/^### /m);
  for (const block of blocks) {
    if (!block.trim()) continue;
    const firstLine = block.split("\n")[0].trim();
    const restLines = block
      .split("\n")
      .slice(1)
      .filter((l) => l.trim() && !l.startsWith("###"))
      .join(" ")
      .trim();
    items.push({ title: firstLine, takeaway: restLines || firstLine });
  }
  return items;
}

// ==================== MARKDOWN → CONTENT BLOCKS ====================

/**
 * Convert markdown body to ContentBlock[] for learning/analysis articles.
 * Handles: ## headings, ### subheadings, > blockquotes, - lists,
 * **bold:** value metric patterns, > **Tip — Title:** text patterns.
 */
function parseMarkdownToContentBlocks(markdown: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = markdown.split("\n");
  let i = 0;
  let listBuffer: string[] = [];
  let inList = false;

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
      inList = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line — flush list buffer
    if (!trimmed) {
      flushList();
      i++;
      continue;
    }

    // ## Heading
    if (trimmed.startsWith("## ")) {
      flushList();
      const text = trimmed.replace(/^##\s+/, "").replace(/\*\*/g, "");
      blocks.push({ type: "heading", text });
      i++;
      continue;
    }

    // ### Subheading
    if (trimmed.startsWith("### ")) {
      flushList();
      const text = trimmed.replace(/^###\s+/, "").replace(/\*\*/g, "");
      blocks.push({ type: "subheading", text });
      i++;
      continue;
    }

    // > Blockquote — could be highlight or tip
    if (trimmed.startsWith("> ")) {
      flushList();
      const quoteText = trimmed.replace(/^>\s*/, "");

      // Check for tip pattern: > **Tip — Title:** text
      const tipMatch = quoteText.match(/\*\*Tip\s*[—-]\s*(.+?):\*\*\s*(.+)/);
      if (tipMatch) {
        blocks.push({ type: "tip", title: tipMatch[1].trim(), text: tipMatch[2].trim() });
        i++;
        continue;
      }

      // Check for bold label pattern: > **Label:** text (treated as highlight)
      blocks.push({ type: "highlight", text: quoteText.replace(/\*\*/g, "") });
      i++;
      continue;
    }

    // - List item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      const itemText = trimmed.replace(/^[-*]\s+/, "").replace(/\*\*/g, "");
      listBuffer.push(itemText);
      i++;
      continue;
    }

    // Regular paragraph
    if (!trimmed.startsWith("#") && !trimmed.startsWith(">") && !trimmed.startsWith("- ") && !trimmed.startsWith("* ")) {
      flushList();

      // Check for metric pattern: **Label:** Value
      const metricMatch = trimmed.match(/^\*\*(.+?):\*\*\s*(.+)/);
      if (metricMatch) {
        blocks.push({ type: "metric", label: metricMatch[1].trim(), value: metricMatch[2].trim() });
        i++;
        continue;
      }

      // Regular paragraph (merge consecutive non-special lines)
      const text = trimmed.replace(/\*\*/g, "");
      if (text) {
        blocks.push({ type: "paragraph", text });
      }
      i++;
      continue;
    }

    i++;
  }

  flushList();
  return blocks;
}

// ==================== MARKET DATA PARSER ====================

interface CmsMarketData {
  timestamp: string;
  nepseIndex: { value: number; change: number; changePercent: number };
  turnover: number;
  turnoverChange: number;
  topGainers: { symbol: string; name: string; ltp: number; change: number; changePercent: number; volume: number }[];
  topLosers: { symbol: string; name: string; ltp: number; change: number; changePercent: number; volume: number }[];
  sectorIndices: { name: string; index: number; change: number; changePercent: number }[];
  source: "manual";
  dataSource: string;
}

/**
 * Parse CMS market-data markdown files into market data format.
 * Returns the most recent published week's data, or null if none exist.
 */
export function getCmsMarketData(): CmsMarketData | null {
  const items = readContentFolder("market-data");
  if (items.length === 0) return null;

  // Get the latest (newest first from readContentFolder)
  const latest = items[0];
  const fm = latest.frontmatter;

  const topGainers = (fm.topGainers || []).slice(0, 5).map((s: Record<string, unknown>) => ({
    symbol: String(s.symbol || ""),
    name: String(s.name || ""),
    ltp: Number(s.ltp || 0),
    change: Number(s.change || 0),
    changePercent: Number(s.changePercent || 0),
    open: 0, high: 0, low: 0,
    volume: Number(s.volume || 0),
    turnover: 0,
  }));

  const topLosers = (fm.topLosers || []).slice(0, 5).map((s: Record<string, unknown>) => ({
    symbol: String(s.symbol || ""),
    name: String(s.name || ""),
    ltp: Number(s.ltp || 0),
    change: Number(s.change || 0),
    changePercent: Number(s.changePercent || 0),
    open: 0, high: 0, low: 0,
    volume: Number(s.volume || 0),
    turnover: 0,
  }));

  const sectorIndices = (fm.sectorIndices || []).map((s: Record<string, unknown>) => ({
    name: String(s.name || ""),
    index: Number(s.index || 0),
    change: Number(s.change || 0),
    changePercent: Number(s.changePercent || 0),
  }));

  return {
    timestamp: fm.weekEnding || new Date().toISOString(),
    nepseIndex: {
      value: Number(fm.nepseIndex || 0),
      change: Number(fm.indexChange || 0),
      changePercent: Number(fm.indexChangePercent || 0),
    },
    turnover: Number(fm.weeklyTurnover || 0),
    turnoverChange: Number(fm.turnoverChange || 0),
    topGainers,
    topLosers,
    sectorIndices,
    source: "manual" as const,
    dataSource: `CMS data (week ending ${fm.weekEnding || "unknown"})`,
  } as CmsMarketData;
}

// ==================== PUBLIC API ====================

/**
 * Get all CMS newsletters parsed into NewsletterData[].
 */
export function getCmsNewsletters(): NewsletterData[] {
  const items = readContentFolder("newsletters");
  return items
    .map((item) => parseNewsletterMarkdown(item.slug, item.frontmatter, item.content))
    .filter((n): n is NewsletterData => n !== null);
}

/**
 * Get all CMS analysis articles parsed into AnalysisArticle[].
 */
export function getCmsAnalysisArticles(): AnalysisArticle[] {
  const items = readContentFolder("analysis");
  return items.map((item): AnalysisArticle => ({
    slug: item.slug,
    title: item.frontmatter.title || item.slug,
    category: (item.frontmatter.category || "company") as "company" | "sector",
    date: item.frontmatter.date || "",
    summary: item.frontmatter.summary || "",
    tags: item.frontmatter.tags || [],
    readTime: item.frontmatter.readTime || "5 min read",
    content: parseMarkdownToContentBlocks(item.frontmatter.body || item.content),
  }));
}

/**
 * Get all CMS learning articles parsed into LearningArticle[].
 */
export function getCmsLearningArticles(): LearningArticle[] {
  const items = readContentFolder("learning");
  return items.map((item): LearningArticle => ({
    slug: item.slug,
    title: item.frontmatter.title || item.slug,
    category: item.frontmatter.category || "Fundamentals",
    date: item.frontmatter.date || "",
    summary: item.frontmatter.summary || "",
    tags: item.frontmatter.tags || [],
    readTime: item.frontmatter.readTime || "5 min read",
    content: parseMarkdownToContentBlocks(item.frontmatter.body || item.content),
  }));
}

/**
 * Get all CMS market events parsed into MarketEvent[].
 */
export function getCmsMarketEvents(): MarketEvent[] {
  const items = readContentFolder("events");
  return items.map((item): MarketEvent => ({
    id: item.slug,
    type: (item.frontmatter.type || "policy") as MarketEvent["type"],
    title: item.frontmatter.title || item.slug,
    company: item.frontmatter.company || "",
    startDate: item.frontmatter.startDate || "",
    endDate: item.frontmatter.endDate || item.frontmatter.startDate || "",
    status: (item.frontmatter.status || "upcoming") as MarketEvent["status"],
    details: item.frontmatter.details || "",
  }));
}

/**
 * Check if CMS content is available.
 */
export function hasCmsContent(): boolean {
  if (!fs.existsSync(contentDir)) return false;
  const folders = fs.readdirSync(contentDir);
  return folders.some((folder) => {
    const dir = path.join(contentDir, folder);
    return fs.statSync(dir).isDirectory() && fs.readdirSync(dir).length > 0;
  });
}
