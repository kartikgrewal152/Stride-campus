import { NextResponse } from "next/server"
import { buildings } from "./campusData"
import { findAllPaths } from "./pathfinding"

export function getCampusBuildingsResponse() {
  return NextResponse.json(buildings)
}

export async function postCampusRoutesResponse(request) {
  try {
    const body = await request.json()

    if (!body.from || !body.to) {
      return NextResponse.json(
        { error: "Missing 'from' and 'to' fields" },
        { status: 400 }
      )
    }

    return NextResponse.json(findAllPaths(body.from, body.to))
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
  }
}
