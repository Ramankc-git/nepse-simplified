'use client';

import dynamic from 'next/dynamic';
import type { NewsletterData } from '@/lib/data';

const NewsletterPDF = dynamic(
  () => import('@/components/pdf/NewsletterPDF'),
  { ssr: false, loading: () => (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', padding: '32px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #0a2141',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px auto',
        }} />
        <p style={{ fontSize: '14px', color: '#94a3b8' }}>Loading PDF preview...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )},
);

export default function PDFWrapper({ data }: { data: NewsletterData }) {
  return <NewsletterPDF data={data} />;
}
