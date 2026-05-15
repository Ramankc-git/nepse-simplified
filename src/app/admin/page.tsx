import Script from "next/script";

export const metadata = {
  title: "NEPSE SIMPLIFIED — Content Manager",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <>
      {/* Netlify Identity Widget is loaded in layout.tsx for all pages — no duplicate here */}

      {/* Decap CMS — load after identity widget is ready */}
      <Script
        id="load-decap-cms"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function loadCMS() {
              if (typeof window !== 'undefined' && typeof netlify !== 'undefined' && netlify.Identity) {
                var s = document.createElement('script');
                s.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
                s.async = true;
                document.head.appendChild(s);
              } else {
                setTimeout(loadCMS, 100);
              }
            }
            loadCMS();
          `,
        }}
      />

      {/* Identity confirmation handler — processes invite/confirmation tokens in the URL */}
      <Script id="netlify-identity-handler" strategy="afterInteractive">
        {`
          (function() {
            if (typeof netlify !== 'undefined' && netlify.Identity) {
              if (window.location.hash.includes('confirmation_token') ||
                  window.location.hash.includes('invite_token') ||
                  window.location.hash.includes('recovery_token')) {
                netlify.Identity.on('login', function() {
                  window.location.href = '/admin/';
                });
              }
            }
          })();
        `}
      </Script>
    </>
  );
}
