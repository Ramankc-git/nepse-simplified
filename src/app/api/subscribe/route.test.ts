import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module before importing the route
const mockUpsert = vi.fn().mockResolvedValue({});

vi.mock("@/lib/db", () => ({
  db: {
    subscriber: {
      upsert: (...args: unknown[]) => mockUpsert(...args),
    },
  },
}));

describe("Subscribe API Route", () => {
  beforeEach(() => {
    mockUpsert.mockClear();
    // Reset the rate limiter module by re-importing
    vi.resetModules();
    mockUpsert.mockResolvedValue({});
  });

  it("should accept a valid email subscription", async () => {
    const { POST } = await import("@/app/api/subscribe/route");
    mockUpsert.mockResolvedValue({});

    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "user@example.com" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("should reject empty email", async () => {
    const { POST } = await import("@/app/api/subscribe/route");

    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("Valid email");
  });

  it("should reject invalid email format", async () => {
    const { POST } = await import("@/app/api/subscribe/route");

    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "not-an-email" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("valid email");
  });

  it("should silently accept honeypot submissions", async () => {
    const { POST } = await import("@/app/api/subscribe/route");

    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "bot@test.com", honeypot: "gotcha" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it("should reject disposable email patterns like test@", async () => {
    const { POST } = await import("@/app/api/subscribe/route");

    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@somedomain.com" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("real email");
  });

  it("should handle server errors gracefully", async () => {
    const { POST } = await import("@/app/api/subscribe/route");

    const request = new Request("http://localhost:3000/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // wrong content type
      body: "not json",
    });

    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("Internal server error");
  });
});
