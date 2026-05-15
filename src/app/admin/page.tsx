"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Load Netlify Identity widget
    const identityScript = document.createElement("script");
    identityScript.src =
      "https://identity.netlify.com/v1/netlify-identity-widget.js";
    document.head.appendChild(identityScript);

    // Wait for identity widget, then load Decap CMS
    const loadCMS = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).netlify) {
        const cmsScript = document.createElement("script");
        cmsScript.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
        document.head.appendChild(cmsScript);
      } else {
        setTimeout(loadCMS, 200);
      }
    };

    identityScript.onload = () => {
      setTimeout(loadCMS, 300);
    };

    return () => {
      // Cleanup on unmount
    };
  }, []);

  return (
    <div>
      <p
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#64748b",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Loading Content Manager...
      </p>
    </div>
  );
}
