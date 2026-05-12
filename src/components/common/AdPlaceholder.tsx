import React from "react";

interface AdPlaceholderProps {
  size?: "banner" | "sidebar" | "in-content";
  className?: string;
}

const sizeConfig = {
  banner: {
    container: "w-full h-24 sm:h-28",
    text: "Banner Ad Space — 728×90",
  },
  sidebar: {
    container: "w-full h-64 sm:h-72",
    text: "Sidebar Ad Space — 300×250",
  },
  "in-content": {
    container: "w-full h-48 sm:h-56",
    text: "In-Content Ad Space — 468×60",
  },
};

export function AdPlaceholder({
  size = "banner",
  className = "",
}: AdPlaceholderProps) {
  const config = sizeConfig[size];

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 ${config.container} ${className}`}
      role="complementary"
      aria-label="Advertisement placeholder"
    >
      <div className="text-center">
        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-300">
          {config.text}
        </p>
        <p className="text-[9px] text-slate-300 mt-1">Ad Space</p>
      </div>
    </div>
  );
}
