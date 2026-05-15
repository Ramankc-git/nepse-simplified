# CMS Content Directory

This directory stores markdown content managed by **Decap CMS** (formerly Netlify CMS).

## Directory Structure

```
content/
├── newsletters/    # Weekly newsletter editions
├── analysis/       # Company and sector analysis articles
├── learning/       # Educational guides and tutorials
└── events/         # Market events (IPOs, auctions, dividends, etc.)
```

## How It Works

1. Content is authored through the CMS admin panel at `/admin/`
2. Each collection has a defined schema in `public/admin/config.yml`
3. Content is stored as markdown files with frontmatter metadata
4. The `src/lib/cms.ts` utility reads and parses these files
5. CMS content is merged with static data from `src/lib/data.ts` (CMS takes priority)

## Frontmatter Format

### Newsletters
```yaml
---
title: "Vol. 003"
volume: "Vol. 003"
dateRange: "May 15 — May 22, 2026"
asOfDate: "May 22, 2026"
status: published
---
```

### Articles (Analysis & Learning)
```yaml
---
title: "Article Title"
category: "company"
date: "2026-05-22"
summary: "Brief summary of the article"
readTime: "8 min read"
tags: ["tag1", "tag2"]
status: published
---
```

### Events
```yaml
---
title: "Company IPO"
type: ipo
company: "Company Name"
startDate: "2026-05-22"
endDate: "2026-05-26"
status: upcoming
details: "IPO details here"
---
```

## Note

In the current setup, all content is served from `src/lib/data.ts` (static data).
CMS content from this directory is merged at build time when available.
To start using the CMS, deploy to Netlify and configure Git Gateway authentication.
