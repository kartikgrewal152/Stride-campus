import Link from "next/link"
import AccessibilityScore from "@/components/AccessibilityScore"
import { getBuildingTypeIcon, getBuildingTypeLabel, getScoreLabel, getBuildingImage } from "@/lib/utils"
import { Layers, ArrowRight, Check, X, AlertTriangle } from "lucide-react"

export default function BuildingCard({ building }) {
  const { accessibility: a } = building

  return (
    <Link href={`/buildings/${building.slug}`} className="block group">
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-violet-300 hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform bg-slate-100 border border-slate-200/80">
              <img
                src={getBuildingImage(building)}
                alt={building.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-violet-700 transition-colors">
                {building.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="font-semibold text-slate-700">{getBuildingTypeLabel(building.type)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-slate-400" />
                  {building.floors} Floors
                </span>
              </div>
            </div>
          </div>
          <AccessibilityScore score={a.score} size="sm" />
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {building.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {a.ramp && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
              <Check className="w-3 h-3 text-emerald-600" /> Ramp
            </span>
          )}
          {a.elevator && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
              a.elevatorWorking
                ? "bg-teal-50 border-teal-200 text-teal-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {a.elevatorWorking ? <Check className="w-3 h-3 text-teal-600" /> : <AlertTriangle className="w-3 h-3 text-red-500" />}
              {a.elevatorWorking ? "Lift Working" : "Lift Broken"}
            </span>
          )}
          {a.accessibleEntrance && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold">
              <Check className="w-3 h-3 text-slate-600" /> Step-Free Entry
            </span>
          )}
        </div>

        {building.barriers && building.barriers.length > 0 && (
          <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-1.5 truncate">
            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">{building.barriers[0]}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className={`font-bold ${
            a.score >= 80 ? "text-emerald-700" : a.score >= 60 ? "text-amber-700" : "text-red-600"
          }`}>
            {getScoreLabel(a.score)} Access
          </span>
          <span className="text-violet-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View Audit Details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
