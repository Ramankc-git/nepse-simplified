import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import PDFWrapper from '@/components/pdf/PDFWrapper';
import { getNewsletter, getAllNewsletters } from '@/lib/merged-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = getNewsletter(slug);

  if (!newsletter) {
    return {
      title: 'Newsletter Not Found — NEPSE SIMPLIFIED',
    };
  }

  return {
    title: `${newsletter.volume} — PDF — NEPSE SIMPLIFIED`,
    description: `Download the ${newsletter.volume} newsletter as a PDF document.`,
  };
}

// Revalidate every hour so new CMS content appears automatically
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllNewsletters().map((n) => ({
    slug: n.slug,
  }));
}

export default async function NewsletterPDFPage({ params }: PageProps) {
  const { slug } = await params;
  const newsletter = getNewsletter(slug);

  if (!newsletter) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '24px', backgroundColor: '#fef2f2', marginBottom: '24px', fontSize: '40px' }}>
            {'\uD83D\uDCC4'}
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#0a2141', marginBottom: '16px', fontFamily: 'Outfit, Inter, sans-serif' }}>
            Newsletter Not Found
          </h1>
          <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '448px', margin: '0 auto 24px auto', lineHeight: 1.625 }}>
            The newsletter edition you&apos;re looking for doesn&apos;t exist or may have been moved. Browse our available editions below.
          </p>
          <Link
            href="/newsletters"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#0a2141',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '16px',
              textDecoration: 'none',
            }}
          >
            {'\u2190'} Browse All Newsletters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      {/* Minimal top bar linking back */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Link
          href={`/newsletters/${slug}`}
          style={{
            fontSize: '13px',
            color: '#64748b',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {'\u2190'} Back to Newsletter
        </Link>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#94a3b8',
          }}
        >
          PDF Preview
        </span>
      </div>

      {/* The newsletter PDF component renders its own header/footer */}
      <PDFWrapper data={newsletter} />
    </div>
  );
}
