"use client"

import { useState, useMemo, useEffect } from "react"
import { buildings } from "@/lib/campusData"
import { findAllPaths } from "@/lib/pathfinding"
import { getStoredReports } from "@/lib/reportsStorage"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CampusMap from "@/components/CampusMap"
import Campus360Viewer from "@/components/Campus360Viewer"
import RouteCard from "@/components/RouteCard"
import BuildingCard from "@/components/BuildingCard"
import Link from "next/link"
import {
  Navigation,
  Search,
  MapPin,
  Route as RouteIcon,
  Building2,
  Sparkles,
  ArrowRight,
  Filter,
  Eye,
  Compass,
  ShieldAlert,
  Camera,
  AlertTriangle,
  ZoomIn,
  X
} from "lucide-react"

export default function ExplorePage() {
  const [fromBuilding, setFromBuilding] = useState("")
  const [toBuilding, setToBuilding] = useState("")
  const [accessibleOnly, setAccessibleOnly] = useState(true)
  const [routeResults, setRouteResults] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [highlightedPath, setHighlightedPath] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [filterType, setFilterType] = useState("all")
  const [viewMode, setViewMode] = useState("2d")
  const [communityReports, setCommunityReports] = useState([])
  const [previewPhoto, setPreviewPhoto] = useState(null)

  useEffect(() => {
    const loadReports = () => {
      setCommunityReports(getStoredReports())
    }
    loadReports()
    window.addEventListener("stride:report_added", loadReports)
    return () => window.removeEventListener("stride:report_added", loadReports)
  }, [])

  const handleFindRoute = (e) => {
    if (e) e.preventDefault()
    if (!fromBuilding || !toBuilding || fromBuilding === toBuilding) return

    const results = findAllPaths(fromBuilding, toBuilding)
    const filtered = accessibleOnly
      ? results.filter(r => r.accessible)
      : results

    setRouteResults(filtered.length > 0 ? filtered : results)
    setHighlightedPath(filtered[0] || results[0] || null)
    setShowResults(true)
  }

  const handleBuildingSelect = (id) => {
    setSelectedBuilding(id === selectedBuilding ? null : id)
  }

  const selectedBuildingData = useMemo(() => {
    return buildings.find(b => b.id === selectedBuilding)
  }, [selectedBuilding])

  const filteredBuildings = useMemo(() => {
    if (filterType === "all") return buildings
    return buildings.filter(b => b.type === filterType)
  }, [filterType])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-3">
              <Navigation className="w-3.5 h-3.5 text-teal-400" />
              <span>Campus Route Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Interactive Campus Accessibility Map
            </h1>
            <p className="text-slate-400 text-sm mt-1.5 max-w-2xl leading-relaxed">
              Find verified step-free corridors between 52 authentic LPU academic blocks, facilities & hostels. Select origin and destination to calculate Dijkstra-optimized barrier-free paths.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFromBuilding("block-34")
                setToBuilding("unimall")
                const results = findAllPaths("block-34", "unimall")
                setRouteResults(results)
                setHighlightedPath(results[0])
                setShowResults(true)
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Try Demo Route (Block 34 → UniMall)
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewMode("2d")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === "2d"
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  2D Network Map
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("3d")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    viewMode === "3d"
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  360° / 3D Virtual Tour
                </button>
              </div>
              <span className="text-[11px] font-bold text-slate-400 pr-2 hidden sm:inline">
                {viewMode === "2d" ? "52 Mapped Blocks" : "LPUTouch VR Mode"}
              </span>
            </div>

            {viewMode === "2d" ? (
              <CampusMap
                selectedBuilding={selectedBuilding}
                onBuildingSelect={handleBuildingSelect}
                highlightedPath={highlightedPath}
              />
            ) : (
              <Campus360Viewer initialScene={selectedBuilding || "block-34"} />
            )}

            {selectedBuildingData && (
              <div className="bg-white rounded-3xl p-6 border-2 border-violet-500 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
                    Inspecting Building
                  </span>
                  <button
                    onClick={() => setSelectedBuilding(null)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700"
                  >
                    Close inspection ✕
                  </button>
                </div>

                {/* Show any active barrier report for this selected building */}
                {communityReports.filter(r => r.buildingId === selectedBuilding).map(rep => (
                  <div key={rep.id} className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row gap-3 items-start">
                    {rep.photo && (
                      <div 
                        onClick={() => setPreviewPhoto(rep.photo)}
                        className="w-full sm:w-28 aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-rose-200 relative cursor-pointer group"
                      >
                        <img src={rep.photo} alt={rep.barrierLabel} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold gap-1">
                          <ZoomIn className="w-3 h-3" /> Zoom
                        </div>
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-red-600 text-white">
                          Active Student Alert
                        </span>
                        <span className="text-xs font-bold text-rose-950">{rep.barrierLabel}</span>
                      </div>
                      <p className="text-xs text-rose-900 leading-snug">"{rep.description}"</p>
                      {rep.locationDetails && (
                        <div className="text-[10px] text-rose-700 font-medium">Spot: {rep.locationDetails}</div>
                      )}
                    </div>
                  </div>
                ))}

                <BuildingCard building={selectedBuildingData} />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                    <RouteIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 leading-none">Find Accessible Route</h2>
                    <span className="text-[11px] text-slate-400">Avoid kerbs, construction, broken lifts</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleFindRoute} className="space-y-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-violet-600" />
                    <span>Origin / Starting Point</span>
                  </label>
                  <select
                    value={fromBuilding}
                    onChange={e => setFromBuilding(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all cursor-pointer"
                  >
                    <option value="">Select where you are starting...</option>
                    {buildings.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} (Score: {b.accessibility.score})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>Destination</span>
                  </label>
                  <select
                    value={toBuilding}
                    onChange={e => setToBuilding(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all cursor-pointer"
                  >
                    <option value="">Select where you need to go...</option>
                    {buildings.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} (Score: {b.accessibility.score})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">Only Step-Free Routes</span>
                    <span className="text-[11px] text-slate-500">Filter out stairs, unpaved gravel, broken lifts</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAccessibleOnly(!accessibleOnly)}
                    className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none p-0.5 ${
                      accessibleOnly ? "bg-teal-600" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        accessibleOnly ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!fromBuilding || !toBuilding || fromBuilding === toBuilding}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    fromBuilding && toBuilding && fromBuilding !== toBuilding
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-md shadow-violet-500/20 active:scale-98 cursor-pointer"
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  <Search className="w-4 h-4" />
                  <span>Calculate Accessible Route</span>
                </button>
              </form>
            </div>

            {showResults && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Route Calculations ({routeResults.length})
                  </h3>
                  <span className="text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md">
                    Dijkstra Solved
                  </span>
                </div>

                {routeResults.map((route, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => setHighlightedPath(route)}
                  >
                    <RouteCard route={route} />
                  </div>
                ))}

                {routeResults.length === 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                    <p className="text-slate-600 text-sm font-semibold">
                      No safe path found with current filters. Try turning off "Only Step-Free Routes" to see obstacles.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* LIVE COMMUNITY BARRIER ALERTS & PHOTO PROOFS */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <h2 className="text-sm font-black text-slate-900">Live Campus Barrier Alerts</h2>
                </div>
                <Link
                  href="/report"
                  className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  + Report Barrier
                </Link>
              </div>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {communityReports.map(rep => (
                  <div
                    key={rep.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBuilding(rep.buildingId)
                          const el = document.getElementById("map-canvas-container")
                          if (el) el.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="text-xs font-bold text-slate-900 hover:text-violet-600 text-left flex items-center gap-1 truncate"
                      >
                        <MapPin className="w-3 h-3 text-violet-600 shrink-0" />
                        <span className="truncate">{rep.buildingName}</span>
                      </button>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 ${
                        rep.severity === "high" || rep.severity === "critical"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {rep.severity}
                      </span>
                    </div>

                    <div className="flex gap-3 items-start">
                      {rep.photo && (
                        <div
                          onClick={() => setPreviewPhoto(rep.photo)}
                          className="w-20 h-16 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative cursor-pointer group"
                        >
                          <img src={rep.photo} alt={rep.barrierLabel} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[8px] font-bold">
                            <ZoomIn className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 line-clamp-1">{rep.barrierLabel}</div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{rep.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Crowdsourced by LPU students</span>
                <Link href="/feed" className="font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1">
                  View full live feed <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-violet-600" />
                  <h2 className="text-sm font-black text-slate-900">All Mapped Campus Buildings</h2>
                </div>
                <span className="text-xs font-bold text-slate-500">{filteredBuildings.length} total</span>
              </div>

              <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
                {["all", "academic", "library", "recreation", "residential"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterType(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                      filterType === cat
                        ? "bg-violet-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {filteredBuildings.map(b => (
                  <BuildingCard key={b.id} building={b} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Lightbox Modal for Photo Proofs */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="text-xs font-bold">Field Photographic Proof • Campus Map Alert</span>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={previewPhoto}
                alt="Enlarged campus barrier photo"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
