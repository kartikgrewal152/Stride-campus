import { postCampusRoutesResponse } from "@/lib/campusMapApi"

export async function POST(request) {
  return postCampusRoutesResponse(request)
}
