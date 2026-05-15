import Script from "next/script";

export const metadata = {
  title: "NEPSE SIMPLIFIED — Content Manager",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <>
      {/* Identity widget MUST load first and synchronously */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="beforeInteractive"
      />
      {/* CMS loads after page is interactive */}
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
      />
    </>
  );
}
