/**
 * @module ReportsStorageBus
 * @author Konatala Naveen (Reg. No. 12417251) — Full-Stack Audit & Community Lead
 * @subsystem Institutional Audit & Community Subsystem
 * @description Client-side persistent storage and reactive event bus for crowdsourced campus barrier reports.
 */

const STORAGE_KEY = "stride_campus_reports_v2"

export const defaultReports = [
  {
    id: "rep-seed-1",
    buildingId: "block-34",
    buildingName: "Block 34 (School of CSE)",
    barrierType: "lift",
    barrierLabel: "Elevator Out of Service",
    severity: "high",
    severityLabel: "High Priority — Impedes Movement",
    description: "North mechanical lab elevator is shut down for scheduled hydraulic maintenance. Wheelchair users should use the external ramp connecting to Block 32.",
    locationDetails: "Ground floor north lobby next to CSE Lab 302",
    photo: "/lpu_photos/lpu-campus-5.jpg",
    author: "Priya Singh (Wheelchair User)",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    likes: 24,
    status: "investigating",
  },
  {
    id: "rep-seed-2",
    buildingId: "block-37",
    buildingName: "Block 37 (Central Library)",
    barrierType: "ramp",
    barrierLabel: "Ramp Resurfacing Verified",
    severity: "low",
    severityLabel: "Low / Resolution Note",
    description: "Campus estate team completed resurfacing the west entrance ramp with smooth brushed concrete and dual handrails. Zero step bump remaining.",
    locationDetails: "Main West Entrance facing Central Courtyard",
    photo: "/lpu_photos/lpu-campus-3.jpg",
    author: "Arjun Mehta (Accessibility Club)",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likes: 42,
    status: "resolved",
  },
  {
    id: "rep-seed-3",
    buildingId: "block-13",
    buildingName: "Block 13 (Engineering Central Workshops)",
    barrierType: "kerb",
    barrierLabel: "Steep 4-Inch Kerb & Gravel",
    severity: "high",
    severityLabel: "High Priority — Blocks Wheelchairs",
    description: "Delivery bay has loose crushed gravel and an unramped 4-inch threshold lip. Students in manual wheelchairs cannot enter lathe lab safely.",
    locationDetails: "East machinery delivery bay gate",
    photo: "/lpu_photos/lpu-campus-13.jpg",
    author: "Rahul Verma (Student Rep)",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes: 19,
    status: "active",
  },
  {
    id: "rep-seed-4",
    buildingId: "block-27",
    buildingName: "Block 27 (Agricultural Polyhouses & Soil Labs)",
    barrierType: "pathway",
    barrierLabel: "Unpaved Mud Track & Waterlogging",
    severity: "high",
    severityLabel: "High Priority — Slippery / Hazard",
    description: "Pathway between Polyhouse 2 and Soil Testing lab is unpaved earth; recent sprinkler irrigation has turned the track into thick mud with 5-inch ruts.",
    locationDetails: "Connecting breezeway between Block 27 and Block 28",
    photo: "/lpu_photos/lpu-campus-7.jpg",
    author: "Neha Sharma (Mobility Support)",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 31,
    status: "active",
  },
  {
    id: "rep-seed-5",
    buildingId: "unimall",
    buildingName: "UniMall (Central Student Hub)",
    barrierType: "automatic_door",
    barrierLabel: "Sensor Sliding Door Calibration",
    severity: "medium",
    severityLabel: "Medium Priority",
    description: "East revolving door is locked and automatic sliding handicap door is opening only half-width (approx 650mm). Large powerchairs cannot enter without holding door manual.",
    locationDetails: "East ground floor entrance facing Food Street",
    photo: "/lpu_photos/lpu-campus-2.jpg",
    author: "Tanvi Patel (Occupational Therapy)",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    likes: 15,
    status: "investigating",
  },
]

export function getStoredReports() {
  if (typeof window === "undefined") return defaultReports
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReports))
      return defaultReports
    }
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultReports
  } catch (err) {
    console.error("Failed to read stored reports:", err)
    return defaultReports
  }
}

export function saveReport(reportData) {
  if (typeof window === "undefined") return reportData
  try {
    const current = getStoredReports()
    const updated = [reportData, ...current]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    // Broadcast event for active tabs/components
    window.dispatchEvent(new CustomEvent("stride:report_added", { detail: reportData }))
    return reportData
  } catch (err) {
    console.error("Failed to save report to storage:", err)
    return reportData
  }
}

export function getReportsForBuilding(buildingId) {
  const all = getStoredReports()
  if (!buildingId) return all
  return all.filter(r => r.buildingId === buildingId)
}

