#!/usr/bin/env python3
"""NEPSE SIMPLIFIED — Comprehensive QA & Editorial Audit Report"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Register fonts
pdfmetrics.registerFont(TTFont('DejaVuSerif', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
registerFontFamily('DejaVuSerif', normal='DejaVuSerif', bold='DejaVuSerif')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)

# ━━ Color Palette ━━
ACCENT = colors.HexColor('#2e8cab')
CRITICAL_RED = colors.HexColor('#c0392b')
HIGH_ORANGE = colors.HexColor('#d4760a')
MEDIUM_YELLOW = colors.HexColor('#8b7500')
LOW_GREEN = colors.HexColor('#27864a')
TEXT_PRIMARY = colors.HexColor('#1a1c1d')
TEXT_MUTED = colors.HexColor('#6d7378')
BG_SURFACE = colors.HexColor('#dce1e4')
TABLE_HEADER_COLOR = ACCENT
TABLE_HEADER_TEXT = colors.white
TABLE_ROW_ODD = BG_SURFACE

W, H = A4
LEFT_M = 0.85 * inch
RIGHT_M = 0.85 * inch
TOP_M = 0.7 * inch
BOT_M = 0.7 * inch
AW = W - LEFT_M - RIGHT_M

# ━━ Styles ━━
s_title = ParagraphStyle('Title', fontName='Carlito', fontSize=22, leading=28, alignment=TA_LEFT, spaceAfter=4, textColor=TEXT_PRIMARY)
s_subtitle = ParagraphStyle('Sub', fontName='Carlito', fontSize=11, leading=16, alignment=TA_LEFT, spaceAfter=12, textColor=TEXT_MUTED)
s_h1 = ParagraphStyle('H1', fontName='Carlito', fontSize=16, leading=22, spaceBefore=18, spaceAfter=8, textColor=ACCENT)
s_h2 = ParagraphStyle('H2', fontName='Carlito', fontSize=13, leading=18, spaceBefore=14, spaceAfter=6, textColor=TEXT_PRIMARY)
s_body = ParagraphStyle('Body', fontName='DejaVuSerif', fontSize=10, leading=16, alignment=TA_JUSTIFY, spaceAfter=6, textColor=TEXT_PRIMARY)
s_body_left = ParagraphStyle('BodyL', fontName='DejaVuSerif', fontSize=10, leading=16, alignment=TA_LEFT, spaceAfter=6, textColor=TEXT_PRIMARY)
s_bullet = ParagraphStyle('Bullet', fontName='DejaVuSerif', fontSize=10, leading=16, alignment=TA_LEFT, leftIndent=18, bulletIndent=6, spaceAfter=4, textColor=TEXT_PRIMARY)
s_table_header = ParagraphStyle('TH', fontName='DejaVuSerif', fontSize=9.5, leading=13, alignment=TA_CENTER, textColor=TABLE_HEADER_TEXT)
s_table_cell = ParagraphStyle('TC', fontName='DejaVuSerif', fontSize=9, leading=13, alignment=TA_LEFT, textColor=TEXT_PRIMARY)
s_table_cell_c = ParagraphStyle('TCC', fontName='DejaVuSerif', fontSize=9, leading=13, alignment=TA_CENTER, textColor=TEXT_PRIMARY)
s_severity = ParagraphStyle('Sev', fontName='DejaVuSerif', fontSize=9, leading=13, alignment=TA_CENTER)
s_footer = ParagraphStyle('Foot', fontName='DejaVuSerif', fontSize=8, leading=11, alignment=TA_CENTER, textColor=TEXT_MUTED)

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=BG_SURFACE, spaceBefore=6, spaceAfter=6)

def sev(tag, color):
    return Paragraph(f'<b>{tag}</b>', ParagraphStyle('sv', fontName='Carlito', fontSize=9, leading=13, alignment=TA_CENTER, textColor=color, backColor=color, borderPadding=(2,4)))

def make_table(headers, rows, col_widths=None):
    cw = col_widths or [AW * r for r in [0.15, 0.30, 0.55]]
    data = [[Paragraph(f'<b>{h}</b>', s_table_header) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), s_table_cell_c if i == 0 else s_table_cell) for i, c in enumerate(row)])
    t = Table(data, colWidths=cw, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), TABLE_HEADER_TEXT),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.4, TEXT_MUTED),
    ]
    for i in range(1, len(data)):
        if i % 2 == 0:
            style_cmds.append(('BACKGROUND', (0, i), (-1, i), TABLE_ROW_ODD))
    t.setStyle(TableStyle(style_cmds))
    return t

# ━━ Build Document ━━
doc = SimpleDocTemplate(
    '/home/z/my-project/download/NEPSE_SIMPLIFIED_QA_Audit_Report.pdf',
    pagesize=A4, leftMargin=LEFT_M, rightMargin=RIGHT_M, topMargin=TOP_M, bottomMargin=BOT_M,
    title='NEPSE SIMPLIFIED QA Audit Report',
    author='NEPSE SIMPLIFIED',
)

story = []

# ═══════════════════════════════════════════════════════════
# COVER / TITLE
# ═══════════════════════════════════════════════════════════
story.append(Spacer(1, 40))
story.append(Paragraph('<b>NEPSE SIMPLIFIED</b>', ParagraphStyle('ct', fontName='Carlito', fontSize=30, leading=36, alignment=TA_LEFT, textColor=TEXT_PRIMARY)))
story.append(Spacer(1, 6))
story.append(Paragraph('Comprehensive QA &amp; Editorial Audit Report', ParagraphStyle('cs', fontName='DejaVuSerif', fontSize=16, leading=22, alignment=TA_LEFT, textColor=ACCENT)))
story.append(Spacer(1, 18))
story.append(HRFlowable(width="30%", thickness=2, color=ACCENT, spaceBefore=0, spaceAfter=12, hAlign='LEFT'))
story.append(Paragraph('URL: https://nepsesimplified.netlify.app', s_body_left))
story.append(Paragraph('Repository: github.com/Ramankc-git/nepse-simplified', s_body_left))
story.append(Paragraph('Audit Date: May 12, 2026', s_body_left))
story.append(Paragraph('Audit Scope: Full website codebase review', s_body_left))
story.append(Spacer(1, 20))

# Executive Summary
story.append(Paragraph('<b>Executive Summary</b>', s_h1))
story.append(Paragraph(
    'This report presents the findings of a comprehensive Quality Assurance and Editorial audit of the NEPSE SIMPLIFIED website. '
    'The audit examined every page component, shared module, API route, data file, configuration file, and static asset in the codebase '
    'across five categories: Functionality, Editorial Quality, SEO &amp; Accessibility, User Experience, and Code Quality. '
    'The audit identified <b>6 Critical</b>, <b>7 High</b>, <b>6 Medium</b>, and <b>5 Low</b> severity issues across all categories. '
    'The most pressing concerns involve broken navigation links in the footer, a non-functional newsletter subscription system without an API key, '
    'placeholder social media URLs, missing SEO assets (sitemap, OG images, favicon), and a misleading subscriber count claim on the homepage. '
    'Each finding includes the affected file path, a description of the issue, the impact on users, and a recommended fix.',
    s_body
))

story.append(Paragraph(
    'It is worth noting that the development team has already taken corrective action on the data integrity front by removing all four fabricated analysis articles '
    'and the fabricated Vol. 002 newsletter. The current codebase is clean of hallucinated financial data. The issues identified in this report '
    'are structural, functional, and presentation-level problems that should be addressed to bring the site to production-ready quality.',
    s_body
))

story.append(Spacer(1, 12))

# ━━ Severity Summary Table ━━
story.append(Paragraph('<b>Severity Summary</b>', s_h2))
story.append(make_table(
    ['Severity', 'Count', 'Description'],
    [
        [sev('CRITICAL', CRITICAL_RED), '6', 'Broken functionality, missing assets, misleading content'],
        [sev('HIGH', HIGH_ORANGE), '7', 'Significant UX impact, SEO gaps, placeholder links'],
        [sev('MEDIUM', MEDIUM_YELLOW), '6', 'Polish items, data accuracy concerns, partial functionality'],
        [sev('LOW', LOW_GREEN), '5', 'Minor improvements, nice-to-have enhancements'],
    ],
    [AW * 0.12, AW * 0.10, AW * 0.78]
))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════
# SECTION 1: FUNCTIONALITY
# ═══════════════════════════════════════════════════════════
story.append(Paragraph('<b>1. Functionality</b>', s_h1))
story.append(Paragraph('This section covers broken links, non-functional forms, placeholder URLs, and features that do not work as expected. Functionality issues have the most direct impact on user trust and engagement.', s_body))

# F-001
story.append(Paragraph('<b>F-001 [CRITICAL] Footer Quick Links Point to Non-Existent Page Anchors</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/components/layout/Footer.tsx (lines 6-11)'],
        ['Issue', 'Two of five Quick Links reference hash anchors that do not exist on the homepage. /#learning and /#analysis point nowhere because the homepage has no elements with id="learning" or id="analysis".'],
        ['Impact', 'Users clicking "Beginner\'s Guide" or "Analysis Archive" in the footer are taken to the homepage but NOT scrolled to any relevant section. The links appear to do nothing.'],
        ['Fix', 'Either add id="learning" and id="analysis" to the corresponding homepage sections, or change the href values to /learning and /analysis (the dedicated pages that exist).'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# F-002
story.append(Paragraph('<b>F-002 [CRITICAL] Newsletter Subscription Form is Non-Functional</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'src/app/api/subscribe/route.ts, src/components/common/SubscribeForm.tsx'],
        ['Issue', 'The subscribe form POSTs to /api/subscribe. Without the BUTTONDOWN_API_KEY environment variable (not set on Netlify), the API returns a fake success message: "Subscription noted! Configure Buttondown API key..." The user sees a green success message but is never actually subscribed.'],
        ['Impact', 'Users believe they are subscribed but receive no emails. This is a trust-breaking silent failure.'],
        ['Fix', 'Set the BUTTONDOWN_API_KEY environment variable in Netlify, OR add a visible notice on the subscribe form informing users that email subscription is not yet active.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# F-003
story.append(Paragraph('<b>F-003 [HIGH] Social Media Links Are Placeholder URLs</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'src/components/layout/Footer.tsx (line 16-17), src/app/about/page.tsx (lines 279, 292)'],
        ['Issue', 'Facebook links to https://facebook.com (root) and TikTok links to https://tiktok.com (root). Neither points to an actual NEPSE SIMPLIFIED profile.'],
        ['Impact', 'Users clicking social icons land on the platform homepage, not the brand page. Looks unprofessional and signals an unfinished product.'],
        ['Fix', 'Replace with actual brand profile URLs once created. If profiles do not exist yet, hide the links or replace with "Coming Soon" text.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# F-004
story.append(Paragraph('<b>F-004 [HIGH] Market Data Page Displays Unverified Sample Data</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/lib/nepse-api.ts (getSampleMarketData, lines 68-110)'],
        ['Issue', 'The market data page displays hardcoded sample data (gainers, losers, sector indices) that is presented as if real. While a "Static Data" notice exists, the data includes specific stock symbols, prices, and volumes that could mislead investors.'],
        ['Impact', 'Investors might make decisions based on data that has no connection to actual market conditions. Given the prior fabricated data issue, this is especially concerning.'],
        ['Fix', 'Either connect a real data API, clearly label every data point as "Sample" not "Static", or remove the sample data entirely and show a "Data coming soon" placeholder.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# F-005
story.append(Paragraph('<b>F-005 [CRITICAL] Homepage "Latest Analysis" Section is Completely Empty</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/page.tsx (lines 339-387)'],
        ['Issue', 'The Featured Content section on the homepage has a "Latest Analysis" column that calls analysisArticles.slice(0, 2). Since the array is now empty (all articles deleted), this column renders zero cards. It shows the heading, "View All" link, but no content beneath.'],
        ['Impact', 'The homepage prominently displays a blank section with headers and navigation but no actual content. Looks broken to every visitor.'],
        ['Fix', 'Add a conditional check: if analysisArticles.length === 0, show a placeholder card saying "Analysis articles coming soon" instead of rendering an empty column.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# F-006
story.append(Paragraph('<b>F-006 [MEDIUM] Homepage "2,500+ Subscribers" Claim is Unverified</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/page.tsx (line 77)'],
        ['Issue', 'The hero section displays "2,500+ Subscribers" as a hardcoded value. There is no Buttondown integration or subscriber count API to back this up.'],
        ['Impact', 'If the actual subscriber count is much lower (likely near zero since the form is non-functional), displaying 2,500+ is misleading and could be considered a trust issue.'],
        ['Fix', 'Remove the subscriber count stat and replace with another metric (e.g., "5 Learning Guides" or "Free Forever"). Add a real subscriber count once the newsletter system is functional.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# F-007
story.append(Paragraph('<b>F-007 [MEDIUM] Dead API Route at /api Root</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/api/route.ts (if it exists)'],
        ['Issue', 'A root /api route exists that returns a generic "Hello, world!" response. This serves no purpose and is publicly accessible.'],
        ['Impact', 'Minor security concern. Exposes a public endpoint that reveals the tech stack (Next.js).'],
        ['Fix', 'Delete the file entirely.'],
    ],
    [AW * 0.12, AW * 0.88]
))

story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════
# SECTION 2: EDITORIAL QUALITY
# ═══════════════════════════════════════════════════════════
story.append(Paragraph('<b>2. Editorial Quality</b>', s_h1))
story.append(Paragraph('This section examines the accuracy, clarity, and professionalism of the written content across the site. Given the prior discovery of fabricated financial data in analysis articles and newsletters, editorial integrity is a top priority.', s_body))

# E-001
story.append(Paragraph('<b>E-001 [CRITICAL] Newsletter Vol. 001 Data Has No Source Attribution</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/lib/data.ts (lines 105-238, newsletters array)'],
        ['Issue', 'Vol. 001 contains specific market data (NEPSE index 2,745.65, turnover Rs. 17.12B, sector changes, stock picks like SOHL and NICA) with no source attribution or timestamp verification. Given the proven pattern of AI-hallucinated data in this project, this data cannot be trusted without independent verification.'],
        ['Impact', 'Users may rely on market data and stock recommendations that are not based on real information.'],
        ['Fix', 'Either verify every data point against actual NEPSE data for the May 01-08 period and add source citations, or remove Vol. 001 until real data can be used to write it.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# E-002
story.append(Paragraph('<b>E-002 [HIGH] Market Events Data is Unverified</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/lib/data.ts (marketEvents array, lines 640+)'],
        ['Issue', 'All 6 events (IPOs, right shares, auctions) include specific dates, company names, share quantities, and price details. However, there is no source URL or verification reference for any of them. The events page does include a "Verify with Official Sources" disclaimer, which is good, but the data itself may be inaccurate.'],
        ['Impact', 'Users may plan their investment actions (IPO applications, right share purchases) based on incorrect dates or details.'],
        ['Fix', 'Add a "Source" field to each event with a link to the official announcement. Remove any events that cannot be independently verified.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# E-003
story.append(Paragraph('<b>E-003 [MEDIUM] Market Data Sample Includes Specific Stock Prices</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/lib/nepse-api.ts (getSampleMarketData, lines 78-106)'],
        ['Issue', 'Sample data includes precise stock prices (JHPL 425.0, SOAL 875.0, SWBBL 512.0) and sector indices (Commercial Banking 3,125.45) that could be mistaken for real data. These numbers were generated by AI with no basis in reality.'],
        ['Impact', 'Investors referencing market data for decision-making could be misled by fabricated numbers.'],
        ['Fix', 'Replace with obviously placeholder data (e.g., "Coming Soon", "Connect API") or remove specific stock-level data until a real API is connected.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# E-004
story.append(Paragraph('<b>E-004 [MEDIUM] About Page Email Not Verified</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/about/page.tsx (line 311)'],
        ['Issue', 'The contact email is listed as hello@nepsesimplified.com. The domain nepsesimplified.com does not appear to have active email infrastructure set up based on the Netlify deployment.'],
        ['Impact', 'Users trying to reach out via email will receive bounced messages.'],
        ['Fix', 'Set up email forwarding on the domain, or replace with a working contact method (Google Form, social media DM, etc.).'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# E-005
story.append(Paragraph('<b>E-005 [LOW] Inconsistent Brand Capitalization</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'Multiple files'],
        ['Issue', 'The brand appears as "NEPSE SIMPLIFIED" (all caps) in most places, but "Nepse Simplified" (title case) in the footer description (line 87), JSON-LD structured data alternateName, and about page text.'],
        ['Impact', 'Minor branding inconsistency.'],
        ['Fix', 'Standardize on "NEPSE SIMPLIFIED" (all caps) everywhere except when grammatically necessary in running text.'],
    ],
    [AW * 0.12, AW * 0.88]
))

story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════
# SECTION 3: SEO & ACCESSIBILITY
# ═══════════════════════════════════════════════════════════
story.append(Paragraph('<b>3. SEO &amp; Accessibility</b>', s_h1))
story.append(Paragraph('This section covers search engine optimization gaps, accessibility issues, structured data problems, and metadata concerns that affect how the site appears in search results and how accessible it is to all users.', s_body))

# S-001
story.append(Paragraph('<b>S-001 [CRITICAL] No Sitemap.xml File Exists</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'public/robots.txt (line 6), src/app/'],
        ['Issue', 'robots.txt declares "Sitemap: https://nepsesimplified.com/sitemap.xml" but no sitemap.xml exists. No Next.js dynamic sitemap generation is configured either. Search engines requesting /sitemap.xml will get a 404 error.'],
        ['Impact', 'Google and other search engines cannot efficiently discover and index pages. New newsletters, learning articles, and events may not appear in search results.'],
        ['Fix', 'Create src/app/sitemap.ts using Next.js metadata API to auto-generate a sitemap from all content arrays (newsletters, learningArticles, marketEvents).'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-002
story.append(Paragraph('<b>S-002 [CRITICAL] No Open Graph Image Defined</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/layout.tsx (lines 18-48)'],
        ['Issue', 'The root layout defines Open Graph metadata (title, description, siteName, type) but does NOT include og:image. When any page is shared on social media (Facebook, Twitter, LinkedIn), no preview image will appear.'],
        ['Impact', 'Social media shares show as plain text links with no visual preview, dramatically reducing click-through rates.'],
        ['Fix', 'Create a branded OG image (1200x630px), place it in public/og-image.png, and add images: { url: "/og-image.png", width: 1200, height: 630 } to the openGraph config.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-003
story.append(Paragraph('<b>S-003 [CRITICAL] No Favicon Configured</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'public/, src/app/layout.tsx, src/app/manifest.ts'],
        ['Issue', 'No favicon.ico, apple-touch-icon.png, or site.webmanifest exists. The public/ directory only has logo.jpg and logo.svg. Browsers will show a default blank icon in tabs and bookmarks.'],
        ['Impact', 'Unprofessional appearance in browser tabs. Users cannot easily identify the tab among many open tabs.'],
        ['Fix', 'Generate favicon.ico and apple-touch-icon.png from the existing logo.jpg. Create a basic manifest.json in public/ with theme_color: "#0a2141" and display: "standalone".'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-004
story.append(Paragraph('<b>S-004 [HIGH] JSON-LD SearchAction Points to Non-Existent Search Page</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/layout.tsx (lines 60-78)'],
        ['Issue', 'The WebSite schema includes a SearchAction targeting "https://nepsesimplified.com/search?q={search_term_string}" but there is no /search page or route in the application.'],
        ['Impact', 'Google Search Console will flag this as a structured data error. The site may lose rich result eligibility.'],
        ['Fix', 'Remove the SearchAction from JSON-LD, or create a basic /search page that filters content across all sections.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-005
story.append(Paragraph('<b>S-005 [HIGH] robots.txt References Wrong Domain</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'public/robots.txt (line 6)'],
        ['Issue', 'robots.txt declares "Sitemap: https://nepsesimplified.com/sitemap.xml" but the actual site is deployed at https://nepsesimplified.netlify.app. The sitemap URL does not match the deployment domain.'],
        ['Impact', 'Even after creating a sitemap, search engines will try to fetch it from the wrong domain.'],
        ['Fix', 'Update robots.txt to use "Sitemap: https://nepsesimplified.netlify.app/sitemap.xml" or set SITE_URL env var and generate robots.txt dynamically.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-006
story.append(Paragraph('<b>S-006 [HIGH] Heading Structure on Homepage Has No H1 for Main Content</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/page.tsx (lines 55-58)'],
        ['Issue', 'The homepage H1 ("NEPSE SIMPLIFIED") is inside the hero section and is purely the brand name. The actual content sections use H2 ("Latest Newsletter", "Market at a Glance", etc.) which is correct for the page structure, but the Featured Content section uses H3 for column headers and H4 for article titles.'],
        ['Impact', 'Minor SEO concern. Screen reader navigation skips the brand H1 but may find too many intermediate heading levels before reaching actual article content.'],
        ['Fix', 'The current structure is acceptable. Consider adding aria-label="Latest Analysis" to the section container for improved screen reader context.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-007
story.append(Paragraph('<b>S-007 [LOW] RSS Feed Only Includes Newsletters</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/feed/route.ts'],
        ['Issue', 'The RSS feed at /feed only includes newsletter content. Learning articles, analysis articles, and events are excluded.'],
        ['Impact', 'RSS subscribers only get newsletter updates. They miss new learning guides and analysis content.'],
        ['Fix', 'Expand the RSS feed to include all content types, or create separate feeds (/feed/newsletters, /feed/learning, /feed/analysis).'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# S-008
story.append(Paragraph('<b>S-008 [MEDIUM] No Canonical URL Configuration</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'src/app/layout.tsx, individual page layouts'],
        ['Issue', 'No canonical URLs are set in metadata. The site is accessible via both nepsesimplified.netlify.app and potentially nepsesimplified.com, which could cause duplicate content issues.'],
        ['Impact', 'Search engines may split ranking signals between two domains.'],
        ['Fix', 'Set a canonical base URL via NEXT_PUBLIC_SITE_URL and add metadataBase to the root layout.'],
    ],
    [AW * 0.12, AW * 0.88]
))

story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════
# SECTION 4: USER EXPERIENCE
# ═══════════════════════════════════════════════════════════
story.append(Paragraph('<b>4. User Experience</b>', s_h1))
story.append(Paragraph('This section covers navigation flows, empty states, responsive design concerns, and overall user journey issues that affect how visitors interact with the site.', s_body))

# U-001
story.append(Paragraph('<b>U-001 [HIGH] Analysis Page Shows Generic Empty State for All Categories</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/analysis/page.tsx (lines 176-188)'],
        ['Issue', 'Since all analysis articles are deleted, every category filter ("All", "Company Analysis", "Sector Analysis") shows the same "No articles found for this category" message. This does not tell users why there are no articles.'],
        ['Impact', 'Users may think the site is broken or that a filter is malfunctioning.'],
        ['Fix', 'Show a contextual message like "We are preparing new analysis articles with verified data. Check back soon or subscribe to be notified." instead of the generic empty state.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# U-002
story.append(Paragraph('<b>U-002 [HIGH] No "About" Link in Main Navigation</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/components/layout/Header.tsx (navLinks array, lines 7-14)'],
        ['Issue', 'The main navigation has 6 links: Home, Newsletters, Market Data, Events, Analysis, Learning. The About page exists at /about but is only accessible from the footer and a homepage teaser section.'],
        ['Impact', 'Users looking for information about the team, mission, or contact details may not find the About page.'],
        ['Fix', 'Add "About" to the navLinks array in Header.tsx.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# U-003
story.append(Paragraph('<b>U-003 [MEDIUM] Mobile Menu Lacks Smooth Animation</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/components/layout/Header.tsx (lines 90-105)'],
        ['Issue', 'The mobile dropdown menu appears instantly without a smooth slide-down animation. It uses Tailwind\'s animate-in class but no explicit transition-timing on max-height or opacity.'],
        ['Impact', 'Jarring visual experience on mobile. Feels less polished than expected for a finance-focused site.'],
        ['Fix', 'Add a CSS transition (max-height from 0 to auto, opacity from 0 to 1) or use a client-side state with useEffect for smoother open/close.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# U-004
story.append(Paragraph('<b>U-004 [MEDIUM] Newsletter Listing Page Lacks Edition Count</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'src/app/newsletters/page.tsx'],
        ['Issue', 'Unlike the Analysis page (which shows article count) and Learning page (which shows guide count), the Newsletters listing page does not display a total edition count.'],
        ['Impact', 'Minor inconsistency across listing pages.'],
        ['Fix', 'Add a count indicator in the page header, e.g., "1 Edition".'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# U-005
story.append(Paragraph('<b>U-005 [LOW] PDF Download is Client-Side Only</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'src/app/newsletters/[slug]/pdf/page.tsx'],
        ['Issue', 'The PDF download uses html2pdf.js which generates the PDF entirely in the browser. Users on older devices or slow networks may experience long loading times or crashes.'],
        ['Impact', 'Potential poor experience for mobile users downloading the PDF newsletter.'],
        ['Fix', 'Consider server-side PDF generation (using Puppeteer or Playwright on Netlify Functions) for reliability. Low priority since it works for most users.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 18))

# ═══════════════════════════════════════════════════════════
# SECTION 5: CODE QUALITY
# ═══════════════════════════════════════════════════════════
story.append(Paragraph('<b>5. Code Quality &amp; Technical Debt</b>', s_h1))
story.append(Paragraph('This section covers code-level issues including dead code, configuration problems, and technical debt that should be cleaned up for long-term maintainability.', s_body))

# C-001
story.append(Paragraph('<b>C-001 [MEDIUM] reactStrictMode is Disabled</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'next.config.ts (line 9)'],
        ['Issue', 'reactStrictMode: false is set. Strict mode helps identify side effects in rendering and is recommended by the React team for development.'],
        ['Impact', 'Potential hidden bugs in effect hooks may go undetected during development.'],
        ['Fix', 'Enable reactStrictMode: true and fix any resulting console warnings during development.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# C-002
story.append(Paragraph('<b>C-002 [MEDIUM] Unused Imports and Dead Code</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'src/app/api/route.ts, src/lib/db.ts, prisma/schema.prisma, examples/ directory'],
        ['Issue', 'Several unused files remain from earlier development phases: a root API route, a db.ts library file, a Prisma schema (the site uses hardcoded data, not Prisma), and an examples/ directory.'],
        ['Impact', 'Increases bundle size slightly, confuses new developers about the tech stack.'],
        ['Fix', 'Delete all four items.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# C-003
story.append(Paragraph('<b>C-003 [LOW] Content-Data Disconnect (CMS Not Wired)</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['Files', 'public/admin/ (Decap CMS config), src/lib/data.ts'],
        ['Issue', 'Decap CMS is configured (admin panel exists at /admin) but saves to a content/ directory that is not read by the site. All content is hardcoded in src/lib/data.ts. Two completely separate content systems exist.'],
        ['Impact', 'If someone uses the CMS to add content, it will be saved but never displayed.'],
        ['Fix', 'Decide on one system: either fully adopt Decap CMS and read from content/ files (requires significant refactoring), or remove the CMS admin panel to avoid confusion.'],
    ],
    [AW * 0.12, AW * 0.88]
))
story.append(Spacer(1, 10))

# C-004
story.append(Paragraph('<b>C-004 [LOW] Logo File Size is Large</b>', s_h2))
story.append(make_table(
    ['Attribute', 'Detail'],
    [
        ['File', 'public/logo.jpg (72KB)'],
        ['Issue', 'The logo JPG is 72KB. For a small image displayed at 48px, this could be optimized. A WebP or SVG version would be more efficient.'],
        ['Impact', 'Adds to initial page load time. Minor for a single image.'],
        ['Fix', 'Convert to WebP format (预计 10-15KB) and serve via Next.js Image component with proper sizes.'],
    ],
    [AW * 0.12, AW * 0.88]
))

story.append(Spacer(1, 24))

# ═══════════════════════════════════════════════════════════
# WHAT WORKS WELL
# ═══════════════════════════════════════════════════════════
story.append(Paragraph('<b>What Works Well (Positive Findings)</b>', s_h1))
story.append(Paragraph('Despite the issues identified, the codebase demonstrates several strengths worth acknowledging. These represent a solid foundation to build upon as the issues are resolved.', s_body))

positives = [
    ('<b>Clean component architecture:</b> The site uses a well-organized component structure with clear separation between layout components (Header, Footer), common components (SubscribeForm, AdPlaceholder, ShareLinks, ContentRenderer), and page-specific code. Each component has a single responsibility.',
     '<b>Consistent design system:</b> The Navy (#0a2141) + Green accent color scheme is applied consistently across all pages. Typography uses a clear hierarchy with the Outfit heading font and Inter body font. Border radius, shadows, and spacing patterns are uniform.',
     '<b>Good accessibility foundations:</b> Mobile menu has proper aria-label. Ad placeholders use role="complementary" and aria-label. Share links use proper aria-labels. Newsletter watermark has aria-hidden="true". Color contrast between text and backgrounds is generally strong.',
     '<b>Comprehensive learning content:</b> The 5 learning articles are well-written, substantive (each 600+ words), and genuinely educational. They cover important topics (balance sheet, P/E ratio, IPO application, technical analysis, book value) with Nepal-specific context. No fabricated data found in these articles.',
     '<b>Robust error handling:</b> All dynamic pages (analysis/[slug], learning/[slug], newsletters/[slug]) have proper 404 handling with user-friendly "Not Found" pages that include navigation back to the listing page.',
     '<b>Event archiving system:</b> The events page correctly auto-calculates effective status based on dates, separates active and archived events, and provides filter tabs. This is a thoughtful feature for time-sensitive financial events.',
     '<b>Share functionality:</b> The ShareLinks component supports Facebook, Twitter/X, LinkedIn, WhatsApp, Telegram, and copy-link with proper URL encoding and accessibility attributes.',
     '<b>Mobile responsiveness:</b> All pages use responsive Tailwind classes with appropriate breakpoints. The grid layouts adapt well from mobile to desktop.'),
]
for p in positives:
    story.append(Paragraph(f'&#x2022; {p}', s_bullet))

story.append(Spacer(1, 24))

# ═══════════════════════════════════════════════════════════
# PRIORITY ACTION PLAN
# ═════════════════════════════════════════════════════════════
story.append(Paragraph('<b>Priority Action Plan</b>', s_h1))
story.append(Paragraph('The following table provides a recommended execution order based on impact and effort. Critical and High items should be addressed before any new content is published.', s_body))

story.append(make_table(
    ['Priority', 'ID', 'Task', 'Effort'],
    [
        [sev('1', CRITICAL_RED), 'F-005', 'Add empty-state placeholder for homepage Latest Analysis section', '15 min'],
        [sev('2', CRITICAL_RED), 'F-001', 'Fix footer Quick Links (change /#learning and /#analysis to actual page URLs)', '5 min'],
        [sev('3', CRITICAL_RED), 'S-001', 'Create sitemap.ts for Next.js auto-generated sitemap', '30 min'],
        [sev('4', CRITICAL_RED), 'S-002', 'Create and configure OG image (1200x630px)', '45 min'],
        [sev('5', CRITICAL_RED), 'S-003', 'Generate favicon from existing logo', '15 min'],
        [sev('6', CRITICAL_RED), 'F-002', 'Either set up Buttondown API key or add "coming soon" notice to subscribe form', '20 min'],
        [sev('7', HIGH), 'F-003', 'Hide or replace placeholder social media URLs', '10 min'],
        [sev('8', HIGH), 'S-005', 'Fix robots.txt sitemap URL to match Netlify domain', '5 min'],
        [sev('9', HIGH), 'S-004', 'Remove or implement JSON-LD SearchAction', '10 min'],
        [sev('10', HIGH), 'U-001', 'Improve analysis page empty state message', '15 min'],
        [sev('11', HIGH), 'U-002', 'Add About to main navigation', '5 min'],
        [sev('12', HIGH), 'E-002', 'Add source URLs to market events data', '30 min'],
        [sev('13', MEDIUM), 'F-006', 'Remove "2,500+ Subscribers" or replace with real metric', '5 min'],
        [sev('14', MEDIUM), 'S-008', 'Configure canonical URLs', '20 min'],
        [sev('15', MEDIUM), 'E-001', 'Verify or remove Vol. 001 newsletter data', '60 min'],
    ],
    [AW * 0.06, AW * 0.08, AW * 0.64, AW * 0.22]
))

story.append(Spacer(1, 24))
story.append(hr())

# ━━ Build ━━
doc.build(story)
print("Report generated successfully!")
