import { buildings } from "@/lib/campusData"
import { formatDistance, formatTime } from "@/lib/utils"
import { CheckCircle2, AlertTriangle, ChevronRight, Star, Clock, Footprints } from "lucide-react"

export default function RouteCard({ route }) {
  const isAccessible = route.accessible
  const pathBuildings = route.path.map(id => {
    const b = buildings.find(bld => bld.id === id)
    return b ? (b.shortName || b.name) : id
  })

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-200 ${
      route.recommended
        ? "bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border-emerald-300 shadow-sm"
        : "bg-white border-slate-200 hover:border-slate-300"
    }`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {isAccessible ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Step-Free
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              Contains Obstacles
            </span>
          )}
          <span className="text-xs font-bold text-slate-700">{route.label}</span>
        </div>

        {route.recommended && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 text-teal-600 fill-teal-500" />
            Recommended Path
          </span>
        )}
      </div>

      <div className="flex items-center gap-5 text-xs text-slate-600 mb-4 bg-white/70 p-2.5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-1.5">
          <Footprints className="w-4 h-4 text-violet-600" />
          <span className="font-bold text-slate-900">{formatDistance(route.totalDistance)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-violet-600" />
          <span className="font-bold text-slate-900">{formatTime(route.estimatedTime)}</span>
        </div>
        {route.totalBarriers > 0 ? (
          <div className="flex items-center gap-1 text-red-600 font-bold ml-auto">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{route.totalBarriers} {route.totalBarriers === 1 ? "barrier" : "barriers"}</span>
          </div>
        ) : (
          <span className="text-emerald-700 font-bold text-[11px] ml-auto">
            ✓ 0 Barriers
          </span>
        )}
      </div>

      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Waypoint Sequence</div>
        <div className="flex items-center flex-wrap gap-1.5">
          {pathBuildings.map((name, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
                {name}
              </span>
              {idx < pathBuildings.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
