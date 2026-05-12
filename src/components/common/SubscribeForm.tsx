"use client";

import React, { useState, type FormEvent } from "react";

interface SubscribeFormProps {
  variant?: "inline" | "hero" | "footer";
}

export function SubscribeForm({ variant = "inline" }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for a welcome email.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  // Hero variant: large centered card
  if (variant === "hero") {
    return (
      <div className="bg-white rounded-[3rem] shadow-premium p-8 sm:p-12 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <span className="nepse-label text-green-600">
            Free Newsletter
          </span>
          <h3 className="brand-font text-2xl sm:text-3xl font-extrabold text-[#0a2141] mt-2 tracking-tight">
            Stay Ahead of the Market
          </h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Get weekly NEPSE insights, analysis, and tips delivered straight to
            your inbox. No spam, ever.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
            <p className="text-sm font-semibold text-green-700">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  "Subscribe Free"
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="text-xs text-red-500 text-center">{message}</p>
            )}
          </form>
        )}
      </div>
    );
  }

  // Footer variant: minimal for dark footer
  if (variant === "footer") {
    return (
      <div className="max-w-sm w-full">
        {status === "success" ? (
          <p className="text-xs text-green-400 font-semibold">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Your email"
              required
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 shrink-0"
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400 mt-1">{message}</p>
        )}
      </div>
    );
  }

  // Inline variant: compact horizontal
  return (
    <div className="takeaway-box rounded-[2.5rem] p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <span className="nepse-label text-green-600">Newsletter</span>
          <p className="text-sm text-slate-600 mt-0.5">
            Weekly NEPSE insights delivered to your inbox.
          </p>
        </div>

        {status === "success" ? (
          <p className="text-sm font-semibold text-green-600">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="your@email.com"
              required
              className="flex-1 sm:w-48 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 shrink-0"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-2">{message}</p>
      )}
    </div>
  );
}
