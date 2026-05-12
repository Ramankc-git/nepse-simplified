---
Task ID: 2a, 2b
Agent: full-stack-developer
Task: Create full blog content for all analysis and learning articles

Work Log:
- Added `ContentBlock` union type to `src/lib/data.ts` with 7 block types: paragraph, heading, subheading, highlight, list, metric, tip
- Added `content: ContentBlock[]` field to both `AnalysisArticle` and `LearningArticle` interfaces
- Wrote full detailed content for 4 analysis articles (~800-1200 words each):
  1. Nabil Bank Q4 FY2082/83 deep dive (financial performance, NPL, CASA, digital, valuation, thesis)
  2. Nepal Banking Sector Outlook 2026 (credit growth, NPL crisis, rates, best-positioned banks, strategy)
  3. Hydropower Sector analysis (government push, key stocks, PPA, project delays, risks)
  4. NIC Asia Bank turnaround analysis (background, performance, what went wrong, recovery signs, verdict)
- Wrote full detailed content for 5 learning articles (~600-1000 words each):
  1. How to Read a Balance Sheet (assets, liabilities, equity, ratios, NEPSE example)
  2. P/E Ratio Explained (calculation, interpretation, sector P/E, common mistakes)
  3. Step-by-Step Guide to Applying for IPOs in Nepal (DEMAT, Mero Share, application, allotment)
  4. Technical Analysis 101 (support/resistance, trend lines, MAs, chart patterns, volume)
  5. Book Value vs. Market Price (P/B ratio, when cheap is a bargain vs value trap, NEPSE examples)
- Created `src/components/common/ContentRenderer.tsx` — shared component that renders ContentBlock arrays with styled UI for each block type
- Updated `src/app/analysis/[slug]/page.tsx` to render actual article content instead of skeleton placeholders
- Updated `src/app/learning/[slug]/page.tsx` to render actual guide content instead of skeleton placeholders
- Both detail pages extract metrics from content and display them in a dedicated grid after the first section
- Ran lint: 0 errors
- Verified all 9 article pages return 200

Stage Summary:
- 4 files modified/created: data.ts, ContentRenderer.tsx, analysis/[slug]/page.tsx, learning/[slug]/page.tsx
- All 9 articles now have substantive, educational content with NEPSE-specific context
- Content includes financial metrics, highlights, bullet lists, pro tips, and real company data
- Skeleton placeholders completely replaced with rendered ContentBlock content
- Lint: 0 errors, all routes verified 200
