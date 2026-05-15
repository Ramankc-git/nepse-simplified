# NEPSE SIMPLIFIED

A comprehensive Nepal Stock Exchange (NEPSE) newsletter and educational platform built with Next.js. We simplify complex market data so you can invest smarter.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Database**: Prisma ORM + SQLite
- **Charts**: Recharts
- **PDF Generation**: html2pdf.js
- **CMS**: Decap CMS (Netlify CMS)
- **Dark Mode**: next-themes
- **Testing**: Vitest + @testing-library/react

## Setup Instructions

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd nepse-simplified

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env

# Set up database
bun run db:push

# Start development server
bun run dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
DATABASE_URL=file:../db/custom.db
# BUTTONDOWN_API_KEY=your_api_key_here  # Optional: for email subscriptions
```

### Database Setup

```bash
# Push schema to database
bun run db:push

# Generate Prisma client
bun run db:generate

# (Optional) Run migrations
bun run db:migrate
```

## Project Structure

```
nepse-simplified/
├── content/               # CMS-managed markdown content
│   ├── newsletters/       # Weekly newsletter editions
│   ├── analysis/          # Company/sector analysis articles
│   ├── learning/          # Educational guides
│   └── events/            # Market events (IPOs, auctions, etc.)
├── prisma/
│   └── schema.prisma      # Database schema (Subscriber, PageView, NewsletterView)
├── public/
│   ├── admin/             # Decap CMS admin panel
│   │   ├── index.html
│   │   └── config.yml     # CMS collections configuration
│   ├── logo.jpg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout with ThemeProvider
│   │   ├── page.tsx       # Homepage
│   │   ├── globals.css    # Tailwind v4 CSS config + custom design system
│   │   ├── newsletters/   # Newsletter archive + detail pages + PDF
│   │   ├── market/        # Market data page with live charts
│   │   ├── analysis/      # Analysis hub + article pages
│   │   ├── learning/      # Learning hub + guide pages
│   │   ├── events/        # Market events page
│   │   ├── about/         # About page
│   │   ├── feed/          # RSS feed route
│   │   └── api/           # API routes (subscribe, market-data)
│   ├── components/
│   │   ├── common/        # Shared components (SubscribeForm, ShareLinks, ThemeToggle, etc.)
│   │   ├── layout/        # Header, Footer, SectionHeader
│   │   ├── newsletter/    # Newsletter section components
│   │   ├── pdf/           # PDF generation components
│   │   └── ui/            # shadcn/ui component library
│   └── lib/
│       ├── analytics.ts   # Page view & subscriber tracking helpers
│       ├── cms.ts         # CMS content reader (markdown → data types)
│       ├── data.ts        # Static newsletter/article/event data
│       ├── db.ts          # Prisma client singleton
│       ├── nepse-api.ts   # NEPSE market data integration
│       └── utils.ts       # Utility functions
├── db/                    # SQLite database file (gitignored)
├── vitest.config.ts       # Test configuration
├── next.config.ts         # Next.js configuration
└── package.json
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server (port 3000) |
| `bun run build` | Production build with static asset copy |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run test` | Run tests in watch mode |
| `bun run test:run` | Run tests once |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run database migrations |

## Key Features

- **Weekly Newsletter System**: 7-section newsletter template (Market Snapshot, PESTLE Analysis, Smart Money Watchlist, Company Analysis, Learner's Insight, Upcoming Events, Summary)
- **Live Market Data**: NEPSE index, top gainers/losers, sector performance with Recharts visualizations
- **PDF Generation**: Download newsletters as professionally styled PDFs
- **Educational Content**: Learning articles with structured content blocks (paragraphs, highlights, lists, metrics, tips)
- **Dark Mode**: System-aware dark mode with manual toggle
- **CMS Integration**: Decap CMS for content management with markdown editing
- **Analytics**: Page view tracking and subscriber management via Prisma/SQLite
- **SEO**: RSS feed, sitemap, JSON-LD structured data, Open Graph tags

## Deployment

### Netlify (Recommended)

1. Push to Git repository
2. Configure Netlify with:
   - Build command: `bun run build`
   - Publish directory: `.next/standalone`
3. Set `DATABASE_URL` environment variable
4. Enable Git Gateway for Decap CMS authentication
5. (Optional) Set `BUTTONDOWN_API_KEY` for email subscriptions

### Other Platforms

The project outputs a standalone build (`next.config.ts: output: "standalone"`) suitable for Docker, Vercel, or any Node.js hosting platform.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes with descriptive messages
4. Push to the branch (`git push origin feature/name`)
5. Open a Pull Request

### Code Style

- TypeScript throughout with strict typing
- shadcn/ui components for UI elements
- Tailwind CSS 4 for styling
- ES6+ import/export syntax
- `'use client'` for client components, `'use server'` for server actions

### Content Guidelines

- Newsletter data goes in `src/lib/data.ts` (static) or `content/` (CMS-managed)
- All financial data must be factual and verifiable
- Include proper disclaimers on analysis content
- Do not fabricate stock prices, financial metrics, or company data

## License

Private project. All rights reserved.
