"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Campus360Viewer from "@/components/Campus360Viewer"
import { Compass, Sparkles, Navigation, Layers, ShieldCheck, Eye, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TourPage() {
  const [selectedLocation, setSelectedLocation] = useState("block-34")

  const tourHighlights = [
    { id: "block-34", name: "Block 34 (School of CSE)", type: "Academic Tower", status: "Grade 1:12 Verified" },
    { id: "unimall", name: "UniMall Central Atrium", type: "Utility & Food Hub", status: "Elevators Active" },
    { id: "block-30", name: "Block 30 (Central Library)", type: "Reference Resource", status: "Tactile Pathways" },
    { id: "unipolis", name: "Baldev Raj Mittal Unipolis", type: "Convocation Ground", status: "Wheelchair Deck" },
    { id: "uni-hospital", name: "Uni-Hospital Health Centre", type: "Emergency Wing", status: "100% Step-Free" },
    { id: "gate-1", name: "Main Gate 1 (GT Road)", type: "Highway Entrance", status: "E-Bus Terminal" },
    { id: "indoor-sports", name: "Indoor Sports Complex", type: "Recreation & Pool", status: "Spectator Ramps" },
    { id: "bh-1", name: "Boys Hostel 1 (BH-1)", type: "Residential Quad", status: "Ground Floor Accessible" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>360° Virtual Reality & 3D Satellite Tour</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              LPU Campus 360° Accessibility Tour
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Experience an immersive virtual inspection of Lovely Professional University facilities. Verify entrance ramps, automatic door widths, and elevator access in 360° panoramic 3D before you walk.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Campus Route Finder</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <Campus360Viewer initialScene={selectedLocation} />

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-slate-900">Virtual Inspection Locations</h2>
              <p className="text-xs text-slate-500 mt-0.5">Click any location below to load into the 360° viewer</p>
            </div>
            <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
              8 Hotspot Arenas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tourHighlights.map(item => {
              const isSelected = selectedLocation === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedLocation(item.id)
                    window.scrollTo({ top: 120, behavior: "smooth" })
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? "border-violet-600 bg-violet-50/60 ring-2 ring-violet-500/20 shadow-sm"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">{item.type}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-violet-700 font-bold">
                    <span>Inspect 360°</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Ramp Angle Audits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every ramp hotspot shows verified slope ratios (1:12 standard). Green pins indicate safe slopes; amber pins warn of steep gradients.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Doorway Clearances</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect main entrance automatic double-doors and bathroom turnstiles to ensure standard 32-inch wheelchair clearances.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Google Satellite Sync</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Switch seamlessly to Google 3D Earth satellite view for real-time spatial context across the entire 600-acre campus.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

