import { getBuildingBySlug, getBuildingById, accessibilityFeatures, buildings as allBuildings } from "@/lib/campusData"
import { getConnectedBuildings } from "@/lib/pathfinding"
import { getBuildingTypeIcon, getBuildingTypeLabel, getScoreLabel, getBuildingImage } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AccessibilityScore from "@/components/AccessibilityScore"
import StatusBadge from "@/components/StatusBadge"
import BuildingCommunityReports from "@/components/BuildingCommunityReports"
import BuildingChecklist from "@/components/BuildingChecklist"
import Link from "next/link"
import {
  ArrowLeft,
  AlertTriangle,
  Check,
  Building2,
  Route,
  Layers,
  ShieldCheck,
  ArrowRight,
  Info,
  Calendar,
  Sparkles,
  Eye,
  Camera
} from "lucide-react"

export function generateStaticParams() {
  return allBuildings.map(b => ({ slug: b.slug }))
}

export default async function BuildingPage({ params }) {
  const { slug } = await params
  const building = getBuildingBySlug(slug)

  if (!building) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
          <Building2 className="w-16 h-16 text-slate-300" />
          <h1 className="text-2xl font-black text-slate-800">Building Not Found</h1>
          <p className="text-slate-500 text-sm">We couldn't locate a building with identifier "{slug}".</p>
          <Link
            href="/explore"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-violet-600 hover:bg-violet-700 shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Campus Map
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const connected = getConnectedBuildings(building.id)
  const { accessibility: a } = building

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Campus Map
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-3xl shrink-0">
                {getBuildingTypeIcon(building.type)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
                    {getBuildingTypeLabel(building.type)}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                    <Layers className="w-3.5 h-3.5" />
                    {building.floors} Floors
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400">Audited Building</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {building.name}
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                  {building.description}
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center gap-5 shrink-0 self-start md:self-auto">
              <AccessibilityScore score={a.score} size="lg" dark={true} />
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Accessibility Score</div>
                <div className={`text-lg font-black ${
                  a.score >= 80 ? "text-emerald-400" : a.score >= 60 ? "text-amber-400" : "text-red-400"
                }`}>
                  {getScoreLabel(a.score)} Rating
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {a.score >= 80 ? "Step-free guaranteed" : a.score >= 60 ? "Minor obstacles present" : "Severe physical barriers"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm aspect-[21/9] min-h-[200px] max-h-[300px] bg-slate-900">
              <img
                src={getBuildingImage(building)}
                alt={building.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <div className="flex items-center justify-between w-full text-white flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-slate-200">Verified Campus Facility Photo</span>
                  </div>
                  <Link
                    href="/tour"
                    className="px-3 py-1.5 rounded-xl bg-violet-600/90 hover:bg-violet-600 text-white text-xs font-bold backdrop-blur-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in 360° VR Tour</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Interactive Dynamic Infrastructure Checklist (Synchronized with 2-Lift Standard & Live Student Reports) */}
            <BuildingChecklist building={building} accessibilityFeatures={accessibilityFeatures} />

            {/* Live Student Community Reports with Uploaded Photos */}
            <BuildingCommunityReports buildingId={building.id} buildingName={building.name} />

            {building.barriers && building.barriers.length > 0 ? (
              <div className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-amber-950">Active Barriers & Hazards Reported</h2>
                    <p className="text-xs text-amber-800">Students with wheelchairs, crutches or sensory aids should note:</p>
                  </div>
                </div>

                <ul className="space-y-2.5 my-4">
                  {building.barriers.map((barrier, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-amber-900 bg-white/70 p-3 rounded-xl border border-amber-200/60">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{barrier}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-amber-200 flex items-center justify-between flex-wrap gap-3">
                  <span className="text-xs text-amber-800 font-medium">Found another barrier here? Help fellow students.</span>
                  <Link
                    href="/report"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm transition-all"
                  >
                    Report New Obstacle <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-emerald-950">100% Barrier-Free Certification</h2>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                    This building currently has zero open barrier reports. Automatic doors, step-free ramps, and certified washrooms are all active and accessible.
                  </p>
                </div>
              </div>
            )}

          </div>

          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
                <Route className="w-4 h-4 text-violet-600" />
                <h2 className="text-sm font-black text-slate-900">Direct Campus Connections</h2>
              </div>

              {connected.length > 0 ? (
                <div className="space-y-2.5">
                  {connected.map((conn, i) => {
                    const b = getBuildingById(conn.building)
                    if (!b) return null
                    return (
                      <Link
                        key={i}
                        href={`/buildings/${b.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-violet-50 hover:border-violet-200 border border-slate-200/70 transition-all group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-800 group-hover:text-violet-700">
                            {b.shortName || b.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{conn.distance}m pathway</div>
                        </div>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          conn.accessible
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {conn.accessible ? "✓ Safe" : "⚠ Barriers"}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400">No direct connection mapped.</p>
              )}
            </div>

            <div className="rounded-3xl p-6 text-white bg-gradient-to-br from-violet-600 to-indigo-800 shadow-xl">
              <h3 className="text-base font-black mb-1.5 text-white">Navigate to this building</h3>
              <p className="text-xs text-violet-100 leading-relaxed mb-4">
                Calculate step-free directions with automatic rerouting around reported maintenance.
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-violet-800 font-bold text-xs hover:bg-slate-50 transition-colors shadow-md"
              >
                Open in Route Navigator <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl p-6 bg-slate-900 border border-slate-800 text-white shadow-xl">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold mb-2">
                <Eye className="w-4 h-4" />
                <span>360° Virtual Inspection</span>
              </div>
              <h3 className="text-base font-black mb-1.5 text-white">Experience in 3D / 360°</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Check entrance ramps, elevator clearance, and hallway widths in immersive 360° panoramic virtual tour.
              </p>
              <Link
                href="/tour"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
              >
                Launch 360° Campus Tour <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
