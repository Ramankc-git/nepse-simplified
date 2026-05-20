import { NextResponse } from "next/server";
import { getAllScorecardStocks } from "@/lib/merged-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stocks = getAllScorecardStocks();
    return NextResponse.json(stocks);
  } catch (error) {
    console.error("Error fetching scorecard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch scorecard data" },
      { status: 500 }
    );
  }
}
