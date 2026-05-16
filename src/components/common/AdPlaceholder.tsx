"use client";

import React, { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  size?: "banner" | "sidebar" | "in-content";
  className?: string;
}

const sizeConfig = {
  banner: {
    container: "w-full min-h-[90px] sm:min-h-[100px]",
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER || "",
    adFormat: "auto" as const,
    style: { display: "block" } as React.CSSProperties,
    text: "Advertisement",
  },
  sidebar: {
    container: "w-full min-h-[250px] sm:min-h-[280px]",
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || "",
    adFormat: "rectangle" as const,
    style: { display: "block" } as React.CSSProperties,
    text: "Advertisement",
  },
  "in-content": {
    container: "w-full min-h-[60px] sm:min-h-[90px]",
    adSlot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT || "",
    adFormat: "auto" as const,
    style: { display: "block" } as React.CSSProperties,
    text: "Advertisement",
  },
};

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

export function AdPlaceholder({
  size = "banner",
  className = "",
}: AdPlaceholderProps) {
  const adRef = useRef<HTMLModElement>(null);
  const config = sizeConfig[size];
  const isAdEnabled = Boolean(ADSENSE_CLIENT_ID && config.adSlot);

  // Load Google AdSense script once globally
  useEffect(() => {
    if (!isAdEnabled) return;

    // Only inject the AdSense script if it doesn't already exist
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, [isAdEnabled]);

  // Push ad unit to adsbygoogle array after mount
  useEffect(() => {
    if (!isAdEnabled || !adRef.current) return;

    try {
      // @ts-expect-error — adsbygoogle is injected by Google's script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad failed to load — fail silently
    }
  }, [isAdEnabled]);

  if (isAdEnabled) {
    return (
      <div className={`flex items-center justify-center ${config.container} ${className}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={config.style}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={config.adSlot}
          data-ad-format={config.adFormat}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Fallback: placeholder when no AdSense configured
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 ${config.container} ${className}`}
      role="complementary"
      aria-label="Advertisement placeholder"
    >
      <div className="text-center">
        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-300">
          Ad Space
        </p>
        <p className="text-[9px] text-slate-300 mt-1">
          {size === "banner" ? "728x90" : size === "sidebar" ? "300x250" : "468x60"}
        </p>
      </div>
    </div>
  );
}
