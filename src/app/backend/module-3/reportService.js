import { generateId } from "@/lib/utils"

const reports = [
  { id: "rep-seed-1", buildingId: "block-34", buildingName: "Block 34 (School of CSE)", barrierType: "lift", barrierLabel: "Elevator Out of Service", severity: "high", severityLabel: "High Priority — Impedes Movement", description: "North mechanical lab elevator is shut down for scheduled hydraulic maintenance. Wheelchair users should use the external ramp connecting to Block 32.", locationDetails: "Ground floor north lobby next to CSE Lab 302", photo: "/lpu_photos/lpu-campus-5.jpg", author: "Priya Singh (Wheelchair User)", timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), likes: 24, status: "investigating" },
  { id: "rep-seed-2", buildingId: "block-37", buildingName: "Block 37 (Central Library)", barrierType: "ramp", barrierLabel: "Ramp Resurfacing Verified", severity: "low", severityLabel: "Low / Resolution Note", description: "Campus estate team completed resurfacing the west entrance ramp with smooth brushed concrete and dual handrails. Zero step bump remaining.", locationDetails: "Main West Entrance facing Central Courtyard", photo: "/lpu_photos/lpu-campus-3.jpg", author: "Arjun Mehta (Accessibility Club)", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), likes: 42, status: "resolved" },
  { id: "rep-seed-3", buildingId: "block-13", buildingName: "Block 13 (Engineering Central Workshops)", barrierType: "kerb", barrierLabel: "Steep 4-Inch Kerb & Gravel", severity: "high", severityLabel: "High Priority — Blocks Wheelchairs", description: "Delivery bay has loose crushed gravel and an unramped 4-inch threshold lip. Students in manual wheelchairs cannot enter lathe lab safely.", locationDetails: "East machinery delivery bay gate", photo: "/lpu_photos/lpu-campus-13.jpg", author: "Rahul Verma (Student Rep)", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), likes: 19, status: "active" },
]

export function getReports() {
  return reports
}

export function addReport(data) {
  const report = {
    id: data.id || `rep-${generateId()}`,
    buildingId: data.buildingId,
    buildingName: data.buildingName || data.buildingId,
    barrierType: data.barrierType,
    barrierLabel: data.barrierLabel || data.barrierType,
    severity: data.severity,
    severityLabel: data.severityLabel || data.severity,
    description: data.description,
    locationDetails: data.locationDetails || "",
    photo: data.photo || null,
    author: data.author || "You (Student Contributor)",
    timestamp: data.timestamp || new Date().toISOString(),
    likes: 0,
    status: "active",
  }

  reports.unshift(report)
  return report
}
