"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  MapPin,
  ShieldAlert,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Compass,
  Footprints,
  ChevronRight,
  ShieldCheck,
  Building,
  Route as RouteIcon,
  Eye
} from "lucide-react"

const stats = [
  { label: "Buildings Mapped", value: "52", sub: "Complete LPU campus blocks" },
  { label: "Accessible Corridors", value: "70+", sub: "Verified step-free paths" },
  { label: "Campus Access Score", value: "72%", sub: "Audited across 600+ acres" },
  { label: "Live Barrier Alerts", value: "24/7", sub: "Crowdsourced by students" },
]

const features = [
  {
    icon: RouteIcon,
    title: "Barrier-Free Route Finder",
    desc: "Calculates the smoothest paths across 600+ acres using Dijkstra's algorithm, automatically avoiding steep steps, broken elevators, and locked gates.",
    gradient: "from-violet-600 to-indigo-600",
    badge: "Dijkstra Engine"
  },
  {
    icon: ShieldAlert,
    title: "Instant Barrier Reporting",
    desc: "Encountered a sudden construction ditch, broken elevator in Block 34, or unramped kerb? Report it in seconds so fellow students get rerouted.",
    gradient: "from-red-500 to-rose-600",
    badge: "Student Network"
  },
  {
    icon: BarChart3,
    title: "Building Accessibility Index",
    desc: "Comprehensive scorecards for every block detailing working elevators, tactile ground indicators, ramp angles, and accessible washrooms.",
    gradient: "from-teal-500 to-emerald-600",
    badge: "52 Blocks Audited"
  },
]

const steps = [
  {
    step: "01",
    title: "Choose Origin & Destination",
    desc: "Select your current location and target lecture hall or lab from the 52 mapped campus blocks."
  },
  {
    step: "02",
    title: "Review Verified Route",
    desc: "View step-by-step navigation with gradient slope warnings, distance meters, and elevator status."
  },
  {
    step: "03",
    title: "Contribute Live Updates",
    desc: "Flag temporary obstacles to protect fellow students with mobility, vision, or sensory constraints."
  }
]

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("accessible")

  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-50">
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-violet-100/50 via-teal-50/30 to-transparent pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100/80 border border-violet-200 text-violet-800 text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot shrink-0" />
                  <span>Lovely Professional University • Campus Accessibility Network</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]"
              >
                The Ramp Shouldn't End at a <span className="gradient-text">Step.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-600 leading-relaxed max-w-2xl"
              >
                On a sprawling 600-acre university campus, accessible routes often fail due to sudden kerbs, locked elevators, and unramped bridges.
                <strong className="text-slate-800 font-semibold"> Stride</strong> maps 50+ academic blocks, hostels, and amenities at Lovely Professional University to guarantee barrier-free mobility for everyone.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3.5 pt-2"
              >
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/25 active:scale-95 transition-all"
                >
                  <Compass className="w-4 h-4" />
                  Explore 52 Campus Blocks
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </Link>
                <Link
                  href="/tour"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/90 shadow-xs transition-all"
                >
                  <Eye className="w-4 h-4 text-teal-600" />
                  360° VR Tour
                </Link>
                <Link
                  href="/report"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Report a Barrier
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl font-semibold text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                  Building Audit Scores
                </Link>
              </motion.div>

              <div className="pt-4 flex items-center gap-6 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>52 Blocks Mapped</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dijkstra Shortest Path</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>BH & GH Hostels Connected</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/80 border border-slate-200/80 float-animation"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 pulse-dot" />
                    <div>
                      <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live Route Simulation</h2>
                      <p className="text-[11px] text-slate-400">Step-free corridor active</p>
                    </div>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab("accessible")}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        activeTab === "accessible" ? "bg-white text-emerald-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Accessible
                    </button>
                    <button
                      onClick={() => setActiveTab("shortest")}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        activeTab === "shortest" ? "bg-white text-red-600 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Shortcut
                    </button>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
                        B34
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Block 34 (School of CSE)</div>
                        <div className="text-[11px] text-slate-500">North Ramp Entrance • Automatic sliding doors</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Grade 1:12 OK
                    </span>
                  </div>

                  <div className="pl-6 border-l-2 border-dashed border-emerald-400 ml-4 py-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Footprints className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{activeTab === "accessible" ? "Central Plaza Pathway past Block 55 (180m)" : "Sunken Garden Terrace Steps (110m)"}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {activeTab === "accessible"
                        ? "100% wide concrete sidewalk, zero kerbs, tactile indicators installed"
                        : "⚠ Contains 14 stepped amphitheater tiers and no wheelchair ramp"}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                        MALL
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">UniMall (Student Hub)</div>
                        <div className="text-[11px] text-slate-500">Ground floor atrium • Central elevator working</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-bold">
                      Lift Working ✓
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-400">Distance</div>
                    <div className="text-sm font-black text-slate-900">{activeTab === "accessible" ? "180m" : "110m"}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-400">Est. Time</div>
                    <div className="text-sm font-black text-slate-900">{activeTab === "accessible" ? "3 mins" : "2 mins"}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-400">Barriers</div>
                    <div className={`text-sm font-black ${activeTab === "accessible" ? "text-emerald-600" : "text-red-500"}`}>
                      {activeTab === "accessible" ? "0 Blocks" : "14 Steps"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-900 leading-snug">
                    <strong>LPU Campus Alert:</strong> Block 4 mechanical lab elevator is undergoing scheduled maintenance. Wheelchair users redirected to Block 32 connector.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-sm font-bold text-slate-800">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-violet-600 mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Designed for LPU's 600-Acre Campus <span className="gradient-text">Movement</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              From Gate 1 (GT Road) all the way to BH-8, GH-6, and UniMall, Stride calculates step-free routes that respect real-world campus constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${f.gradient} flex items-center justify-center text-white shadow-md`}>
                      <f.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900 transition-colors"
                  >
                    View in interactive map <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-2 block">
              User Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Students Navigate with Stride
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, idx) => (
              <div key={idx} className="relative p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col">
                <div className="text-4xl font-black text-violet-600/20 mb-4">{st.step}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{st.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 text-white bg-gradient-to-tr from-slate-900 via-violet-950 to-slate-900 shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold mb-4">
                LPU Campus Accessibility Initiative
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
                Help Us Build a Campus Where Every Student Can Move Freely.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
                Stride is fully open and powered by real student audits. Explore current building scores, calculate safe routes between classes, or report a barrier you encountered today.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/explore"
                  className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 transition-all shadow-md"
                >
                  Start Navigating Campus
                </Link>
                <Link
                  href="/report"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
                >
                  Report a Barrier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
