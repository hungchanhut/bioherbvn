import { NextResponse } from "next/server"
import { mockFarmProfile } from "@/lib/farm-profile"

export const runtime = "edge"

export async function GET() {
  return NextResponse.json(mockFarmProfile)
}
