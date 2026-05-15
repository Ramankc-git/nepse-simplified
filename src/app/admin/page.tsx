import Script from "next/script";

export const metadata = {
  title: "NEPSE SIMPLIFIED — Content Manager",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <div id="cms-root">
      {/* Load Netlify Identity widget via inline script to ensure it runs in standalone mode */}
      <Script
        id="load-identity"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var s = document.createElement('script');
              s.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
              s.async = false;
              s.defer = false;
              document.head.appendChild(s);
            })();
          `,
        }}
      />
      {/* Load Decap CMS after page is ready */}
      <Script
        id="load-cms"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function loadCMS() {
                if (window.netlify && window.netlify.Identity) {
                  var s = document.createElement('script');
                  s.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js';
                  document.head.appendChild(s);
                } else {
                  setTimeout(loadCMS, 200);
                }
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', loadCMS);
              } else {
                loadCMS();
              }
            })();
          `,
        }}
      />
    </div>
  );
}
