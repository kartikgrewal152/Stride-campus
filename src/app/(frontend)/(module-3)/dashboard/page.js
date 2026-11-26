import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AccessibilityScore from "@/components/AccessibilityScore"
import StatusBadge from "@/components/StatusBadge"
import DashboardRecentAlerts from "@/components/DashboardRecentAlerts"
import Link from "next/link"
import { buildings } from "@/lib/campusData"
import { getCampusScoreSummary } from "@/lib/campusScoreSummary"
import { getBuildingTypeIcon, getBuildingTypeLabel } from "@/lib/utils"
import {
  TrendingUp,
  Building2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  ArrowUpRight
} from "lucide-react"

export default function DashboardPage() {
  const { average: avg, fullyAccessible: fully, needsAttention: needsAttn, lowestScoresFirst: sorted } = getCampusScoreSummary(buildings)

  const statCards = [
    {
      label: "Campus Buildings",
      value: buildings.length,
      icon: Building2,
      color: "from-violet-600 to-indigo-600",
      sub: "100% geographically mapped",
    },
    {
      label: "Campus Average Score",
      value: `${avg}%`,
      icon: TrendingUp,
      color: avg >= 70 ? "from-emerald-500 to-teal-600" : "from-amber-500 to-orange-600",
      sub: "Weighted by barrier severity",
    },
    {
      label: "Fully Accessible",
      value: fully,
      icon: CheckCircle2,
      color: "from-emerald-500 to-green-600",
      sub: "Score 80+ • Barrier-free",
    },
    {
      label: "Severe Barriers",
      value: needsAttn,
      icon: AlertCircle,
      color: "from-red-500 to-rose-600",
      sub: "Score <50 • Traps wheelchair users",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              <span>Campus Accessibility Infrastructure Index</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Institutional Accessibility Audit
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Real-time scorecards measuring campus infrastructure against universal design standards. Buildings sorted from highest priority obstacles to fully certified facilities.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            <Compass className="w-4 h-4 text-violet-600" />
            <span>Launch Campus Navigator</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((s, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-slate-900 tracking-tight mb-1">{s.value}</div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">{s.label}</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Live Field Reports & Photo Evidence from Students */}
        <DashboardRecentAlerts />

        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80">
            <div>
              <h2 className="text-xl font-black text-slate-900">Campus Facilities Matrix</h2>
              <p className="text-xs text-slate-500 mt-0.5">Prioritized by vulnerability (most urgent obstacles first)</p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              Lowest Scores First
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map(b => {
              const a = b.accessibility
              return (
                <Link key={b.id} href={`/buildings/${b.slug}`} className="block group">
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:border-violet-300 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                            {getBuildingTypeIcon(b.type)}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-violet-700 transition-colors">
                              {b.name}
                            </h3>
                            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                              <span>{getBuildingTypeLabel(b.type)}</span>
                              <span>•</span>
                              <span>{b.floors} Floors</span>
                            </div>
                          </div>
                        </div>
                        <AccessibilityScore score={a.score} size="sm" />
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        <StatusBadge status={a.ramp} label="Ramp" />
                        <StatusBadge
                          status={a.elevator && a.elevatorWorking}
                          label="Lift"
                          warning={a.elevator && !a.elevatorWorking}
                        />
                        <StatusBadge status={a.accessibleEntrance} label="Entrance" />
                        <StatusBadge status={a.accessibleWashroom} label="Washroom" />
                      </div>

                      {(b.barriers?.length ?? 0) > 0 && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 mb-4">
                          <div className="text-[11px] font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{b.barriers.length} Critical Issue{b.barriers.length > 1 ? "s" : ""}</span>
                          </div>
                          <p className="text-[11px] text-amber-800 line-clamp-2">
                            {b.barriers.join(" • ")}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className={a.score >= 80 ? "text-emerald-700" : a.score >= 60 ? "text-amber-700" : "text-red-600"}>
                        {a.score >= 80 ? "Certified Accessible" : a.score >= 60 ? "Moderate Barriers" : "Action Required"}
                      </span>
                      <span className="text-violet-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Detailed Audit <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="rounded-3xl p-8 sm:p-10 text-white bg-gradient-to-r from-violet-700 via-indigo-700 to-teal-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-200 mb-2 block">
              Continuous Improvement
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Spotted an unlisted obstacle or fixed ramp?
            </h3>
            <p className="text-violet-100 text-xs sm:text-sm mt-1.5 max-w-xl">
              Reports from students directly adjust building scores and alert facility management teams.
            </p>
          </div>
          <Link
            href="/report"
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all shadow-md shrink-0"
          >
            File Instant Report
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  )
}


