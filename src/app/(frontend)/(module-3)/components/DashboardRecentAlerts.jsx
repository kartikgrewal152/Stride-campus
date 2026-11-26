"use client"

import { useState, useEffect } from "react"
import { getStoredReports } from "@/lib/reportsStorage"
import { ShieldAlert, Camera, MapPin, ZoomIn, X, ArrowRight } from "lucide-react"
import { timeAgo } from "@/lib/utils"
import Link from "next/link"

export default function DashboardRecentAlerts() {
  const [reports, setReports] = useState([])
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const load = () => {
      setReports(getStoredReports().slice(0, 3))
    }
    load()
    window.addEventListener("stride:report_added", load)
    return () => window.removeEventListener("stride:report_added", load)
  }, [])

  if (reports.length === 0) return null

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Live Field Reports & Photographic Evidence
            </h2>
            <p className="text-xs text-slate-500">
              Recent student-flagged campus hazards requiring administrative remediation
            </p>
          </div>
        </div>
        <Link
          href="/feed"
          className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1"
        >
          View all in Community Wire <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reports.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-1 text-[11px]">
                <span className="font-bold text-slate-800 flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                  <span className="truncate">{r.buildingName}</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase shrink-0 ${
                  r.severity === "high" || r.severity === "critical"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {r.severity}
                </span>
              </div>

              {r.photo && (
                <div
                  onClick={() => setLightbox(r.photo)}
                  className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative group cursor-pointer"
                >
                  <img
                    src={r.photo}
                    alt={r.barrierLabel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold gap-1">
                    <ZoomIn className="w-3.5 h-3.5" /> Inspect Proof
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold flex items-center gap-1">
                    <Camera className="w-2.5 h-2.5" /> Verified
                  </div>
                </div>
              )}

              <div className="text-xs font-bold text-slate-900">{r.barrierLabel}</div>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                "{r.description}"
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400">
              <span>{r.author}</span>
              <span>{timeAgo(r.timestamp)}</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
              <span className="text-xs font-bold">Field Photographic Proof</span>
              <button
                onClick={() => setLightbox(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={lightbox}
                alt="Enlarged photo"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
