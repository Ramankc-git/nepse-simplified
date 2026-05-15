import Script from "next/script";
import { redirect } from "next/navigation";

export const metadata = {
  title: "NEPSE SIMPLIFIED — Content Manager",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <>
      {/* Netlify Identity Widget — required for git-gateway authentication */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="beforeInteractive"
      />
      {/* Decap CMS */}
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
      {/* Identity confirmation handler — processes invite tokens in the URL */}
      <Script id="netlify-identity-handler" strategy="afterInteractive">
        {`
          (function() {
            if (typeof netlify !== 'undefined' && netlify.Identity) {
              // If there's a token in the URL (invite, confirmation, recovery)
              if (window.location.hash.includes('confirmation_token') ||
                  window.location.hash.includes('invite_token') ||
                  window.location.hash.includes('recovery_token')) {
                netlify.Identity.on('login', () => {
                  // Reload after login to refresh the CMS state
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
