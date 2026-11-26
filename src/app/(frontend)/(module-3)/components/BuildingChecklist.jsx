/**
 * @module BuildingChecklist
 * @author Konatala Naveen (Reg. No. 12417251) — Full-Stack Audit & Community Lead
 * @coauthor Pravesh (Reg. No. 12419500) — Team Lead & Core Engine Architect
 * @subsystem Institutional Audit & Community Subsystem
 * @description Dynamic 2-lift per block status indicator and crowdsourced obstacle verification with photo proof.
 */

"use client"

import { useState, useEffect } from "react"
import { getReportsForBuilding } from "@/lib/reportsStorage"
import { ShieldCheck, Camera, AlertTriangle, Check, X, ZoomIn } from "lucide-react"

export default function BuildingChecklist({ building, accessibilityFeatures }) {
  const [reports, setReports] = useState([])
  const [lightbox, setLightbox] = useState(null) // { url, title }

  const a = building.accessibility || {}

  useEffect(() => {
    const load = () => {
      setReports(getReportsForBuilding(building.id))
    }
    load()
    window.addEventListener("stride:report_added", load)
    return () => window.removeEventListener("stride:report_added", load)
  }, [building.id])

  // Helper to open lightbox
  const openPhoto = (url, title) => {
    if (!url) return
    setLightbox({ url, title })
  }

  // Find reports matching specific feature types strictly by barrierType
  const liftReport = reports.find(r => r.barrierType === "lift")

  const rampReport = reports.find(r => 
    r.barrierType === "ramp" || 
    r.barrierType === "step" || 
    r.barrierType === "kerb"
  )

  const entranceReport = reports.find(r => 
    r.barrierType === "entrance" || 
    r.barrierType === "automatic_door"
  )

  const washroomReport = reports.find(r => 
    r.barrierType === "washroom"
  )

  return (
    <>
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none">
                Accessibility Infrastructure Checklist
              </h2>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Synchronized with live student crowdsourced audit reports
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400">Field Audited</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {accessibilityFeatures.map(feature => {
            let label = ""
            let sublabel = ""
            let badgeStyle = ""
            let photoUrl = null
            let iconState = null

            // 1. ELEVATOR LOGIC (LPU blocks have 2 lifts per block)
            if (feature.id === "elevator") {
              if (liftReport) {
                // Check if user specifically stated "both lifts" or "all lifts"
                const isBoth = /\b(both|all|neither|2\s*lifts?|two\s*lifts?|both\s*elevators?)\b/i.test(liftReport.description || "")
                
                if (isBoth) {
                  label = "Both Lifts Out of Service"
                  sublabel = "Full vertical outage in block"
                  badgeStyle = "bg-red-50 text-red-700 border-red-200"
                  iconState = <AlertTriangle className="w-3 h-3 text-red-600" />
                } else {
                  // LPU standard: 2 lifts in block, 1 not working unless specified both
                  label = "1 Lift Not Working"
                  sublabel = "1 Lift Operational (2 total in block)"
                  badgeStyle = "bg-amber-50 text-amber-700 border-amber-200"
                  iconState = <AlertTriangle className="w-3 h-3 text-amber-600" />
                }
                photoUrl = liftReport.photo
              } else if (a.elevator) {
                label = "2 Lifts Working ✓"
                sublabel = "Dual elevators operational"
                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200"
                iconState = <Check className="w-3 h-3 text-emerald-600" />
              } else {
                label = "Not Equipped"
                sublabel = "No elevator in this block"
                badgeStyle = "bg-slate-100 text-slate-600 border-slate-200"
                iconState = <X className="w-3 h-3 text-slate-400" />
              }
            } 
            // 2. RAMP LOGIC
            else if (feature.id === "ramp") {
              if (rampReport) {
                label = "Ramp Issue Reported"
                sublabel = rampReport.barrierLabel || "Obstacle flagged"
                badgeStyle = "bg-amber-50 text-amber-700 border-amber-200"
                iconState = <AlertTriangle className="w-3 h-3 text-amber-600" />
                photoUrl = rampReport.photo
              } else if (a.ramp) {
                label = "Available"
                sublabel = "Verified 1:12 slope"
                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200"
                iconState = <Check className="w-3 h-3 text-emerald-600" />
              } else {
                label = "Missing"
                sublabel = "Stepped entrance"
                badgeStyle = "bg-slate-100 text-slate-600 border-slate-200"
                iconState = <X className="w-3 h-3 text-slate-400" />
              }
            }
            // 3. ENTRANCE LOGIC
            else if (feature.id === "accessibleEntrance") {
              if (entranceReport) {
                label = "Entrance Issue"
                sublabel = entranceReport.barrierLabel || "Threshold issue"
                badgeStyle = "bg-amber-50 text-amber-700 border-amber-200"
                iconState = <AlertTriangle className="w-3 h-3 text-amber-600" />
                photoUrl = entranceReport.photo
              } else if (a.accessibleEntrance) {
                label = "Available"
                sublabel = "Zero threshold lip"
                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200"
                iconState = <Check className="w-3 h-3 text-emerald-600" />
              } else {
                label = "Missing"
                sublabel = "Raised threshold"
                badgeStyle = "bg-slate-100 text-slate-600 border-slate-200"
                iconState = <X className="w-3 h-3 text-slate-400" />
              }
            }
            // 4. WASHROOM LOGIC
            else if (feature.id === "accessibleWashroom") {
              if (washroomReport) {
                label = "Washroom Issue"
                sublabel = washroomReport.barrierLabel || "Unavailable"
                badgeStyle = "bg-amber-50 text-amber-700 border-amber-200"
                iconState = <AlertTriangle className="w-3 h-3 text-amber-600" />
                photoUrl = washroomReport.photo
              } else if (a.accessibleWashroom) {
                label = "Available"
                sublabel = "Wheelchair cubicle"
                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200"
                iconState = <Check className="w-3 h-3 text-emerald-600" />
              } else {
                label = "Missing"
                sublabel = "No accessible toilet"
                badgeStyle = "bg-slate-100 text-slate-600 border-slate-200"
                iconState = <X className="w-3 h-3 text-slate-400" />
              }
            }
            // 5. OTHER FEATURES (Tactile, Braille, etc.)
            else {
              const val = a[feature.id]
              if (val) {
                label = "Available"
                sublabel = "Verified on premises"
                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-200"
                iconState = <Check className="w-3 h-3 text-emerald-600" />
              } else {
                label = "Missing"
                sublabel = "Not equipped"
                badgeStyle = "bg-slate-100 text-slate-600 border-slate-200"
                iconState = <X className="w-3 h-3 text-slate-400" />
              }
            }

            return (
              <div
                key={feature.id}
                className="flex flex-col justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 transition-colors gap-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{feature.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{feature.label}</div>
                      <div className="text-[10px] text-slate-400">{sublabel}</div>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}>
                    {iconState}
                    <span>{label}</span>
                  </span>
                </div>

                {/* PHOTO PROOF BUTTON IF REPORT PERSON UPLOADED A PHOTO */}
                {photoUrl && (
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-rose-700 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      Reported by student
                    </span>
                    <button
                      type="button"
                      onClick={() => openPhoto(photoUrl, `${building.name} — ${label}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-xs transition-colors cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      <span>View Photo Proof</span>
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
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
              <div>
                <span className="text-xs font-bold text-slate-100 block">{lightbox.title}</span>
                <span className="text-[10px] text-slate-400">Photo Proof uploaded by reporting student</span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black">
              <img
                src={lightbox.url}
                alt="Obstacle photographic proof"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

