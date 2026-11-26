"use client"

import { useState, useEffect } from "react"
import { getReportsForBuilding } from "@/lib/reportsStorage"
import { ShieldAlert, Camera, MapPin, AlertTriangle, ZoomIn, X, Clock } from "lucide-react"
import { timeAgo } from "@/lib/utils"

export default function BuildingCommunityReports({ buildingId, buildingName }) {
  const [reports, setReports] = useState([])
  const [lightboxPhoto, setLightboxPhoto] = useState(null)

  useEffect(() => {
    const load = () => {
      const list = getReportsForBuilding(buildingId)
      setReports(list)
    }

    load()
    window.addEventListener("stride:report_added", load)
    return () => window.removeEventListener("stride:report_added", load)
  }, [buildingId])

  if (reports.length === 0) return null

  return (
    <div className="bg-rose-50/80 rounded-3xl p-6 sm:p-8 border border-rose-200/90 shadow-sm space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-rose-200/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-black text-rose-950">
              Student Crowdsourced Field Alerts ({reports.length})
            </h2>
            <p className="text-xs text-rose-800">
              Real-time obstacle reports with photo proof submitted by campus students:
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
          Active Live Alert
        </span>
      </div>

      <div className="space-y-3.5">
        {reports.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl border border-rose-200 p-4 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{r.author || "Student Contributor"}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {timeAgo(r.timestamp)}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                r.severity === "high" || r.severity === "critical"
                  ? "bg-red-100 text-red-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {r.severityLabel || r.severity}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 items-start">
              {r.photo && (
                <div
                  onClick={() => setLightboxPhoto(r.photo)}
                  className="w-full sm:w-36 aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative group cursor-pointer"
                >
                  <img
                    src={r.photo}
                    alt={r.barrierLabel || "Obstacle photo"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold gap-1">
                    <ZoomIn className="w-3.5 h-3.5" /> Enlarge
                  </div>
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[8px] font-bold flex items-center gap-0.5">
                    <Camera className="w-2.5 h-2.5" /> Photo
                  </div>
                </div>
              )}

              <div className="flex-1 space-y-1.5">
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{r.barrierLabel || "Campus Obstacle"}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {r.description || r.content}
                </p>
                {r.locationDetails && (
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span className="font-bold text-slate-700">Specific spot:</span> {r.locationDetails}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="text-xs font-bold">Field Photographic Proof • {buildingName}</span>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={lightboxPhoto}
                alt="Obstacle full preview"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

