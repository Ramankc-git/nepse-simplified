"use client";

import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  hasLine?: boolean;
  className?: string;
}

export function SectionHeader({
  number,
  title,
  hasLine = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="section-number">{number}</span>
      <h2 className="nepse-heading">{title}</h2>
      {hasLine && (
        <div className="flex-1 h-px bg-slate-200 min-w-[2rem]" />
      )}
    </div>
  );
}
