import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock fetch for testing
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Need to import after mock is set up
const { fetchMarketData, getWeeklyTurnoverTrend } = await import("@/lib/nepse-api");

describe("nepse-api", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("fetchMarketData", () => {
    it("should return sample data when API is unreachable", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const result = await fetchMarketData();

      expect(result).toBeDefined();
      expect(result.source).toBe("manual");
      expect(result.nepseIndex.value).toBe(2731.94);
      expect(result.nepseIndex.change).toBe(-13.71);
      expect(result.turnover).toBe(18.45);
      expect(result.turnoverChange).toBe(7.7);
      expect(result.topGainers.length).toBe(5);
      expect(result.topLosers.length).toBe(5);
      expect(result.sectorIndices.length).toBe(13);
    });

    it("should return API data when API responds successfully", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          index: 2800,
          change: 10,
          changePercent: 0.36,
          totalTurnover: 20,
          turnoverChange: 5,
          topGainers: [
            { symbol: "TEST", name: "Test Stock", ltp: 100, change: 5, changePercent: 5, open: 95, high: 101, low: 94, volume: 10000, turnover: 1000000 },
          ],
          topLosers: [
            { symbol: "FAIL", name: "Fail Stock", ltp: 50, change: -3, changePercent: -5.66, open: 53, high: 54, low: 49, volume: 5000, turnover: 250000 },
          ],
          sectorIndices: [
            { name: "Commercial Banking", index: 3000, change: 20, changePercent: 0.67 },
          ],
        }),
      });

      const result = await fetchMarketData();

      expect(result).toBeDefined();
      expect(result.source).toBe("api");
      expect(result.nepseIndex.value).toBe(2800);
      expect(result.nepseIndex.change).toBe(10);
      expect(result.turnover).toBe(20);
      expect(result.topGainers.length).toBe(1);
      expect(result.topGainers[0].symbol).toBe("TEST");
      expect(result.sectorIndices.length).toBe(1);
    });

    it("should return correct data structure", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      const result = await fetchMarketData();

      // Verify all required fields
      expect(result).toHaveProperty("timestamp");
      expect(result).toHaveProperty("nepseIndex");
      expect(result).toHaveProperty("turnover");
      expect(result).toHaveProperty("turnoverChange");
      expect(result).toHaveProperty("topGainers");
      expect(result).toHaveProperty("topLosers");
      expect(result).toHaveProperty("sectorIndices");
      expect(result).toHaveProperty("source");
      expect(result).toHaveProperty("dataSource");

      // Verify nepseIndex structure
      expect(result.nepseIndex).toHaveProperty("value");
      expect(result.nepseIndex).toHaveProperty("change");
      expect(result.nepseIndex).toHaveProperty("changePercent");

      // Verify stock structure
      if (result.topGainers.length > 0) {
        const stock = result.topGainers[0];
        expect(stock).toHaveProperty("symbol");
        expect(stock).toHaveProperty("name");
        expect(stock).toHaveProperty("ltp");
        expect(stock).toHaveProperty("change");
        expect(stock).toHaveProperty("changePercent");
      }
    });

    it("should fall back to sample data when API returns non-ok response", async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 401 });

      const result = await fetchMarketData();
      expect(result.source).toBe("manual");
    });
  });

  describe("getWeeklyTurnoverTrend", () => {
    it("should return weekly turnover data", () => {
      const trend = getWeeklyTurnoverTrend();

      expect(Array.isArray(trend)).toBe(true);
      expect(trend.length).toBeGreaterThanOrEqual(2);

      for (const entry of trend) {
        expect(entry).toHaveProperty("week");
        expect(entry).toHaveProperty("turnover");
        expect(typeof entry.turnover).toBe("number");
      }
    });

    it("should include Vol. 002 turnover of 18.45B", () => {
      const trend = getWeeklyTurnoverTrend();
      const vol002Entry = trend.find((t) => t.week.includes("Week 3"));
      expect(vol002Entry).toBeDefined();
      expect(vol002Entry!.turnover).toBe(18.45);
    });
  });
});
