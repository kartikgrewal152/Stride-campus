/**
 * @module CampusMap
 * @author Kartik Grewal (Reg. No. 12406604) — Geospatial & Campus Mapping Lead
 * @subsystem Geospatial Graph & Network Map Subsystem
 * @description Interactive 2D vector SVG campus map canvas with coordinate scaling, pan/zoom, and route highlighting.
 */

"use client"

import { useEffect, useState } from "react"
import { buildings, routes } from "@/lib/campusData"
import { getStoredReports } from "@/lib/reportsStorage"
import { ShieldCheck, AlertTriangle, Layers, Navigation, ZoomIn, ZoomOut, RotateCcw, Satellite, MapPin } from "lucide-react"

// Hide only project nodes that are clearly absent from the user's campus sketch.
const undrawnNodeIds = new Set([
  "block-35", "unipolis", "sunken-garden", "open-air-theatre", "gate-4",
  "faculty-apt-a", "outdoor-stadium", "indoor-stadium", "gate-3", "bh-7", "bh-8",
])

export default function CampusMap({ selectedBuilding, onBuildingSelect, highlightedPath }) {
  const [hoveredBuilding, setHoveredBuilding] = useState(null)
  const [reports, setReports] = useState([])
  const [filterType, setFilterType] = useState("all")
  const [mapMode, setMapMode] = useState("network")

  useEffect(() => {
    const loadReports = () => setReports(getStoredReports())
    loadReports()
    window.addEventListener("stride:report_added", loadReports)
    window.addEventListener("storage", loadReports)
    return () => {
      window.removeEventListener("stride:report_added", loadReports)
      window.removeEventListener("storage", loadReports)
    }
  }, [])

  const isOnPath = (buildingId) => {
    if (!highlightedPath || !highlightedPath.path) return false
    return highlightedPath.path.includes(buildingId)
  }

  const isRouteOnPath = (fromId, toId) => {
    if (!highlightedPath || !highlightedPath.path) return false
    const path = highlightedPath.path
    for (let i = 0; i < path.length - 1; i++) {
      if ((path[i] === fromId && path[i + 1] === toId) ||
          (path[i] === toId && path[i + 1] === fromId)) {
        return true
      }
    }
    return false
  }

  const hovered = hoveredBuilding
    ? buildings.find(b => b.id === hoveredBuilding)
    : null
  const hasBrokenRampReport = hovered && reports.some(report =>
    report.buildingId === hovered.id &&
    (report.barrierType === "broken-ramp" || report.barrierType === "ramp") &&
    report.status !== "resolved"
  )

  const getBuildingLabel = (b) => {
    if (b.id.startsWith("block-")) return `B${b.id.replace("block-", "")}`
    if (b.id.startsWith("bh-")) return b.id.toUpperCase()
    if (b.id.startsWith("gh-")) return b.id.toUpperCase()
    if (b.id === "unimall") return "MALL"
    if (b.id === "unipolis") return "UNIP"
    if (b.id === "shanti-devi-auditorium") return "AUD"
    if (b.id === "block-3") return "HOSP"
    if (b.id === "indoor-stadium") return "STAD"
    if (b.id === "outdoor-stadium") return "TURF"
    if (b.id === "sunken-garden") return "GARD"
    if (b.id === "open-air-theatre") return "OAT"
    if (b.id === "student-food-court") return "FOOD"
    if (b.id === "robopark") return "ROBO"
    if (b.id === "gate-1") return "G-1"
    if (b.id === "gate-2") return "G-2"
    if (b.id === "gate-3") return "G-3"
    if (b.id === "gate-4") return "G-4"
    if (b.id === "shuttle-terminal") return "E-BUS"
    if (b.id === "faculty-apt-a") return "FAC"
    return b.shortName.substring(0, 4).toUpperCase()
  }

  const filteredBuildings = filterType === "all"
    ? buildings.filter(b => !undrawnNodeIds.has(b.id))
    : buildings.filter(b => !undrawnNodeIds.has(b.id) && b.type === filterType)
  const visibleNodeIds = new Set(filteredBuildings.map(building => building.id))
  const mapRoutes = routes.filter(route => visibleNodeIds.has(route.from) && visibleNodeIds.has(route.to))
  const getMapCoordinates = (building) => ({
    x: Math.min(99, Math.max(3, building.coordinates.x)),
    y: Math.min(79, Math.max(3, building.coordinates.y)),
  })

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl select-none flex flex-col">
      <div className="p-4 bg-slate-950/80 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-xs font-bold tracking-wide">
              Lovely Professional University (LPU)
            </span>
          </div>

          <div className="flex bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/80 text-[11px] font-bold">
            <button
              onClick={() => setMapMode("network")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapMode === "network"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              52 Blocks
            </button>
            <button
              onClick={() => setMapMode("satellite")}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all ${
                mapMode === "satellite"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Satellite className="w-3 h-3" />
              <span>Google Satellite</span>
            </button>
          </div>
        </div>

        {mapMode === "network" && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {[
              { id: "all", label: "All Facilities" },
              { id: "academic", label: "Academic Blocks" },
              { id: "residential", label: "Hostels (BH/GH)" },
              { id: "dining", label: "Food & Mall" },
              { id: "medical", label: "Hospital" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap ${
                  filterType === f.id
                    ? "bg-violet-600 text-white shadow-xs"
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative bg-[#070D1F]">
        {mapMode === "satellite" ? (
          <div className="w-full h-full relative">
            <iframe
              src="https://maps.google.com/maps?q=Lovely%20Professional%20University%2C%20Phagwara&t=k&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              title="LPU Google Satellite Map"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-[11px] shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Real Google Satellite View • LPU Phagwara Campus</span>
            </div>
          </div>
        ) : (
          <>
            <svg viewBox="0 0 102 82" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="campusGrid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.15" />
            </pattern>
            <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>

          <rect width="102" height="82" fill="#070D1F" />
          <rect width="102" height="82" fill="url(#campusGrid)" />

          <rect x="49" y="1" width="2" height="80" fill="rgba(255, 255, 255, 0.02)" rx="1" />
          <rect x="1" y="39" width="100" height="2" fill="rgba(255, 255, 255, 0.02)" rx="1" />

          {mapRoutes.map((route, idx) => {
            const fromB = buildings.find(b => b.id === route.from)
            const toB = buildings.find(b => b.id === route.to)
            if (!fromB || !toB) return null
            const from = getMapCoordinates(fromB)
            const to = getMapCoordinates(toB)

            const onPath = isRouteOnPath(route.from, route.to)

            return (
              <g key={idx}>
                {onPath && (
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="url(#activeGrad)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    filter="url(#routeGlow)"
                  />
                )}
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={
                    onPath
                      ? "#FFFFFF"
                      : route.accessible
                      ? "#10B981"
                      : "#EF4444"
                  }
                  strokeWidth={onPath ? "1.0" : "0.35"}
                  strokeDasharray={route.accessible ? "none" : "0.8, 0.6"}
                  strokeOpacity={onPath ? "0.95" : "0.3"}
                  className="transition-all duration-300"
                />
              </g>
            )
          })}

          {filteredBuildings.map(building => {
            const isSelected = selectedBuilding === building.id
            const isHovered = hoveredBuilding === building.id
            const onPath = isOnPath(building.id)
            const active = isSelected || isHovered || onPath
            const coordinates = getMapCoordinates(building)

            const matchesFilter = filterType === "all" || building.type === filterType
            const opacity = matchesFilter ? (active ? 1 : 0.85) : 0.25

            const score = building.accessibility.score
            let scoreColor = "#10B981"
            if (score < 60) scoreColor = "#EF4444"
            else if (score < 80) scoreColor = "#F59E0B"

            const label = getBuildingLabel(building)

            return (
              <g
                key={building.id}
                transform={`translate(${coordinates.x}, ${coordinates.y})`}
                className="cursor-pointer transition-all duration-200"
                opacity={opacity}
                onClick={() => onBuildingSelect && onBuildingSelect(building.id)}
                onMouseEnter={() => setHoveredBuilding(building.id)}
                onMouseLeave={() => setHoveredBuilding(null)}
              >
                {active && (
                  <circle
                    cx="0"
                    cy="0"
                    r="4.2"
                    fill="none"
                    stroke={isSelected ? "#A78BFA" : onPath ? "#34D399" : "#FFFFFF"}
                    strokeWidth="0.4"
                    filter="url(#routeGlow)"
                  />
                )}

                <rect
                  x="-3"
                  y="-2.2"
                  width="6"
                  height="4.4"
                  rx="1"
                  fill={isSelected ? "#5B21B6" : onPath ? "#064E3B" : "#1E293B"}
                  stroke={isSelected ? "#C4B5FD" : onPath ? "#34D399" : scoreColor}
                  strokeWidth={active ? "0.6" : "0.25"}
                  filter={active ? "url(#routeGlow)" : "none"}
                />

                <text
                  x="0"
                  y="0.7"
                  textAnchor="middle"
                  fontSize="1.6"
                  fontWeight="bold"
                  fill="#FFFFFF"
                  className="pointer-events-none select-none tracking-tight"
                >
                  {label}
                </text>
              </g>
            )
          })}
        </svg>

        {hovered && (
          <div
            className="absolute z-30 pointer-events-none transition-all duration-150"
            style={{
              left: `${getMapCoordinates(hovered).x}%`,
              top: `${getMapCoordinates(hovered).y - 3}%`,
              transform: "translate(-50%, -100%)"
            }}
          >
            <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 border border-slate-700 shadow-2xl text-left min-w-[210px]">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-white truncate max-w-[140px]">{hovered.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                  hovered.accessibility.score >= 80
                    ? "bg-emerald-500/20 text-emerald-300"
                    : hovered.accessibility.score >= 60
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-red-500/20 text-red-300"
                }`}>
                  {hovered.accessibility.score}/100
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2">
                <span>{hovered.floors} Floors</span>
                <span>•</span>
                <span className="capitalize">{hovered.type}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 text-[10px]">
                {hovered.accessibility.elevator && (
                  <span className={`px-1.5 py-0.5 rounded ${hovered.accessibility.elevatorWorking ? "bg-emerald-950 text-emerald-400" : "bg-red-950 text-red-400"}`}>
                    {hovered.accessibility.elevatorWorking ? "Lift OK" : "Lift Broken"}
                  </span>
                )}
                {(hovered.accessibility.ramp || hasBrokenRampReport) && (
                  <span className={`px-1.5 py-0.5 rounded ${
                    hasBrokenRampReport
                      ? "bg-red-950 text-red-300"
                      : "bg-violet-950 text-violet-300"
                  }`}>
                    {hasBrokenRampReport ? "Ramp Reported Broken" : "Ramp ✓"}
                  </span>
                )}
                {hovered.accessibility.accessibleWashroom && (
                  <span className="px-1.5 py-0.5 rounded bg-teal-950 text-teal-300">
                    Accessible Washroom ✓
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>

      <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 px-5">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 bg-emerald-400 rounded-full inline-block" />
            <span className="text-slate-300 font-medium">Step-Free Accessible Path</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-1 border-t-2 border-dashed border-red-500 inline-block" />
            <span className="text-slate-300 font-medium">Obstacle / Step / Kerb Present</span>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 italic">Click any facility node to inspect barrier audit</span>
      </div>
    </div>
  )
}
