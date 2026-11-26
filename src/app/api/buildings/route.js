import { getCampusBuildingsResponse } from "@/lib/campusMapApi"

export async function GET() {
  return getCampusBuildingsResponse()
}
