import { describe, it, expect } from "vitest";
import {
  newsletters,
  learningArticles,
  analysisArticles,
  getNewsletter,
  getEventEffectiveStatus,
  type NewsletterData,
  type LearningArticle,
} from "@/lib/data";

describe("Newsletter Data", () => {
  it("should have at least 2 newsletter volumes", () => {
    expect(newsletters.length).toBeGreaterThanOrEqual(2);
  });

  it("should have a Vol. 001 and Vol. 002", () => {
    const slugs = newsletters.map((n) => n.slug);
    expect(slugs).toContain("vol-001");
    expect(slugs).toContain("vol-002");
  });

  it("every newsletter should have a valid structure", () => {
    for (const nl of newsletters) {
      expect(nl.slug).toBeTruthy();
      expect(nl.volume).toMatch(/^Vol\./);
      expect(nl.dateRange).toBeTruthy();
      expect(nl.asOfDate).toBeTruthy();
      expect(nl.indexClosing).toBeTruthy();
      expect(typeof nl.indexPositive).toBe("boolean");
      expect(nl.turnoverThisWeek).toBeTruthy();
      expect(nl.turnoverPrevWeek).toBeTruthy();
      expect(nl.topSectorName).toBeTruthy();
      expect(nl.laggardSector).toBeTruthy();
      expect(Array.isArray(nl.opportunities)).toBe(true);
      expect(Array.isArray(nl.risks)).toBe(true);
      expect(Array.isArray(nl.strategicFocus)).toBe(true);
      expect(Array.isArray(nl.stocks)).toBe(true);
      expect(Array.isArray(nl.iposAndAuctions)).toBe(true);
      expect(Array.isArray(nl.policyNotices)).toBe(true);
      expect(Array.isArray(nl.insights)).toBe(true);
      expect(nl.summaryText).toBeTruthy();
      expect(nl.companyName).toBeTruthy();
      expect(nl.ltp).toBeTruthy();
      expect(nl.trend).toBeTruthy();
      expect(nl.description).toBeTruthy();
      expect(nl.strategicOpinion).toBeTruthy();
      expect(nl.supportZone).toBeTruthy();
      expect(nl.resistance).toBeTruthy();
      expect(nl.institutionalDemand).toBeTruthy();
      expect(nl.marketFloat).toBeTruthy();
    }
  });

  it("Vol. 002 should have correct index values", () => {
    const vol002 = getNewsletter("vol-002");
    expect(vol002).toBeDefined();
    expect(vol002!.indexClosing).toBe("2,731.94");
    expect(vol002!.indexPositive).toBe(false);
    expect(vol002!.turnoverThisWeek).toBe("18.45B");
    expect(vol002!.turnoverPositive).toBe(true);
  });
});

describe("getNewsletter", () => {
  it("should return the correct newsletter by slug", () => {
    const nl = getNewsletter("vol-001");
    expect(nl).toBeDefined();
    expect(nl!.volume).toBe("Vol. 001");
  });

  it("should return undefined for non-existent slug", () => {
    const nl = getNewsletter("vol-999");
    expect(nl).toBeUndefined();
  });

  it("should return the latest newsletter (last in array)", () => {
    const latest = getNewsletter("vol-002");
    expect(latest).toBeDefined();
    expect(latest!.volume).toBe("Vol. 002");
  });
});

describe("Learning Articles", () => {
  it("should have at least one learning article", () => {
    expect(learningArticles.length).toBeGreaterThanOrEqual(1);
  });

  it("every article should have a valid structure", () => {
    for (const article of learningArticles) {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.category).toBeTruthy();
      expect(article.date).toBeTruthy();
      expect(article.summary).toBeTruthy();
      expect(article.readTime).toBeTruthy();
      expect(Array.isArray(article.tags)).toBe(true);
      expect(Array.isArray(article.content)).toBe(true);
      expect(article.content.length).toBeGreaterThan(0);
    }
  });

  it("should have balance-sheet article", () => {
    const slugs = learningArticles.map((a) => a.slug);
    expect(slugs).toContain("how-to-read-balance-sheet");
  });

  it("article content blocks should have correct types", () => {
    const validTypes = ["paragraph", "heading", "subheading", "highlight", "list", "metric", "tip"];
    for (const article of learningArticles) {
      for (const block of article.content) {
        expect(validTypes).toContain(block.type);
      }
    }
  });
});

describe("Analysis Articles", () => {
  it("should be an array", () => {
    expect(Array.isArray(analysisArticles)).toBe(true);
  });
});

describe("getEventEffectiveStatus", () => {
  it("should identify past events as closed", () => {
    const pastEvent = {
      id: "1",
      type: "ipo" as const,
      title: "Test IPO",
      company: "Test Co",
      startDate: "2020-01-01",
      endDate: "2020-01-10",
      status: "upcoming" as const,
      details: "test",
    };
    const status = getEventEffectiveStatus(pastEvent);
    expect(status).toBe("closed");
  });

  it("should identify future events as open/upcoming", () => {
    const futureEvent = {
      id: "2",
      type: "ipo" as const,
      title: "Future IPO",
      company: "Test Co",
      startDate: "2030-01-01",
      endDate: "2030-01-10",
      status: "upcoming" as const,
      details: "test",
    };
    const status = getEventEffectiveStatus(futureEvent);
    expect(["upcoming", "open"]).toContain(status);
  });
});
