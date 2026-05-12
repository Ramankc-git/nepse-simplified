"use client";

import { useState, useCallback } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Send,
  Link2,
  Check,
  Share2,
} from "lucide-react";

interface ShareLinksProps {
  title: string;
  url?: string;
  description?: string;
}

interface SharePlatform {
  name: string;
  icon: React.ElementType;
  getShareUrl: (url: string, title: string) => string;
  bgClass: string;
  hoverBgClass: string;
  textClass: string;
}

const platforms: SharePlatform[] = [
  {
    name: "Facebook",
    icon: Facebook,
    getShareUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    bgClass: "bg-blue-600",
    hoverBgClass: "hover:bg-blue-700",
    textClass: "text-white",
  },
  {
    name: "Twitter",
    icon: Twitter,
    getShareUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    bgClass: "bg-slate-900",
    hoverBgClass: "hover:bg-slate-800",
    textClass: "text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    getShareUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    bgClass: "bg-blue-700",
    hoverBgClass: "hover:bg-blue-800",
    textClass: "text-white",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    getShareUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    bgClass: "bg-green-600",
    hoverBgClass: "hover:bg-green-700",
    textClass: "text-white",
  },
  {
    name: "Telegram",
    icon: Send,
    getShareUrl: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    bgClass: "bg-sky-500",
    hoverBgClass: "hover:bg-sky-600",
    textClass: "text-white",
  },
];

export default function ShareLinks({ title, url, description }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = useCallback(
    (platform: SharePlatform) => {
      const shareUrlStr = platform.getShareUrl(shareUrl, title);
      window.open(shareUrlStr, "_blank", "noopener,noreferrer,width=600,height=400");
    },
    [shareUrl, title]
  );

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-premium p-6">
      {/* Label */}
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-3.5 h-3.5 text-slate-400" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Share this article
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.name}
              onClick={() => handleShare(platform)}
              aria-label={`Share on ${platform.name}`}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                ${platform.bgClass} ${platform.hoverBgClass} ${platform.textClass}
                hover:scale-[1.03] active:scale-[0.97]`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{platform.name}</span>
            </button>
          );
        })}

        {/* Separator */}
        <div className="hidden sm:block w-px h-8 bg-slate-200 mx-1" />

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          aria-label="Copy link"
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
            ${
              copied
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }
            hover:scale-[1.03] active:scale-[0.97]`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile-only description */}
      {description && (
        <p className="mt-4 text-xs text-slate-400 leading-relaxed sm:hidden">
          {description}
        </p>
      )}
    </div>
  );
}
