// Server-only module: merges CMS markdown content with hardcoded data.
// This file uses Node.js fs APIs and must only be imported by server components.

import {
  getCmsNewsletters,
  getCmsAnalysisArticles,
  getCmsLearningArticles,
  getCmsMarketEvents,
} from "./cms";
import {
  newsletters,
  analysisArticles,
  learningArticles,
  marketEvents,
  getEventEffectiveStatus,
  type NewsletterData,
  type AnalysisArticle,
  type LearningArticle,
  type MarketEvent,
} from "./data";

// ==================== MERGE HELPERS ====================

/**
 * Generic merge: deduplicates by a given key field.
 * CMS items come first (newest), hardcoded items appended if no overlap.
 */
function mergeByKey<T extends Record<string, any>>(
  hardcoded: T[],
  cms: T[],
  key: keyof T
): T[] {
  const cmsKeys = new Set(cms.map((c) => String(c[key])));
  const merged = [...cms];
  for (const item of hardcoded) {
    if (!cmsKeys.has(String(item[key]))) {
      merged.push(item);
    }
  }
  return merged;
}

// ==================== PUBLIC API ====================

/** All newsletters — newest first (CMS + hardcoded merged, CMS wins on slug). */
export function getAllNewsletters(): NewsletterData[] {
  return mergeByKey(newsletters, getCmsNewsletters(), "slug");
}

/** All analysis articles — newest first. */
export function getAllAnalysisArticles(): AnalysisArticle[] {
  return mergeByKey(analysisArticles, getCmsAnalysisArticles(), "slug");
}

/** All learning articles — newest first. */
export function getAllLearningArticles(): LearningArticle[] {
  return mergeByKey(learningArticles, getCmsLearningArticles(), "slug");
}

/** All market events — newest first. */
export function getAllMarketEvents(): MarketEvent[] {
  return mergeByKey(marketEvents, getCmsMarketEvents(), "id");
}

/** Find a newsletter by slug (merged data). */
export function getNewsletter(slug: string): NewsletterData | undefined {
  return getAllNewsletters().find((n) => n.slug === slug);
}

/** Get the latest newsletter (newest first, so index 0). */
export function getLatestNewsletter(): NewsletterData | undefined {
  return getAllNewsletters()[0];
}

/** Find a learning article by slug. */
export function getLearningArticle(slug: string): LearningArticle | undefined {
  return getAllLearningArticles().find((a) => a.slug === slug);
}

/** Find an analysis article by slug. */
export function getAnalysisArticle(slug: string): AnalysisArticle | undefined {
  return getAllAnalysisArticles().find((a) => a.slug === slug);
}

/** Get active (non-closed) events. */
export function getActiveEvents(): MarketEvent[] {
  return getAllMarketEvents().filter((e) => getEventEffectiveStatus(e) !== "closed");
}

/** Get archived (closed) events. */
export function getArchivedEvents(): MarketEvent[] {
  return getAllMarketEvents().filter((e) => getEventEffectiveStatus(e) === "closed");
}

/** Re-export event status helper. */
export { getEventEffectiveStatus } from "./data";
