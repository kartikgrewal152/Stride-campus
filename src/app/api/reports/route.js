import { NextResponse } from "next/server"
import { addReport, getReports } from "@/lib/reportService"
import { getMissingReportFields } from "@/lib/reportValidation"

export async function GET() {
  return NextResponse.json(getReports())
}

export async function POST(request) {
  try {
    const body = await request.json()
    const missingFields = getMissingReportFields(body)

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: "Missing required fields (buildingId, barrierType, severity, description)" },
        { status: 400 }
      )
    }

    return NextResponse.json(addReport(body), { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
  }
}

