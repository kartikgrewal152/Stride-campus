"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GoogleSignInModal from "@/components/GoogleSignInModal"
import { getCurrentUser, signOut, updateProfile } from "@/lib/auth"
import { getStoredReports } from "@/lib/reportsStorage"
import { 
  UserCircle, 
  Save, 
  CheckCircle2, 
  Shield, 
  Settings, 
  SlidersHorizontal,
  LogOut,
  Repeat,
  Camera,
  MapPin,
  Clock,
  Sparkles,
  QrCode,
  CreditCard,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Check,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { timeAgo } from "@/lib/utils"

const needsOptions = [
  { id: "wheelchair", label: "Wheelchair User (Manual/Electric)", desc: "Avoid all curbs, stairs, narrow doors, steep slopes >1:12", icon: "♿" },
  { id: "visualAid", label: "Visual Impairment / Low Vision", desc: "Require tactile pavers, audio cues, high-contrast signage", icon: "👁️" },
  { id: "hearingAid", label: "Hearing Impaired / Deaf", desc: "Prioritize visual alarm flashers and digital signage", icon: "👂" },
  { id: "reducedMobility", label: "Crutches / Cane / Reduced Mobility", desc: "Minimize walking distances, require handrails and resting benches", icon: "🦽" },
  { id: "sensoryNeeds", label: "Sensory & Neurodiversity Needs", desc: "Flag loud machinery areas, high-echo corridors, heavy crowds", icon: "🧠" },
  { id: "temporary", label: "Temporary Injury / Sprain", desc: "Temporary step-free routing during recovery period", icon: "🩹" },
]

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [myReports, setMyReports] = useState([])
  
  // Form states
  const [name, setName] = useState("")
  const [regNo, setRegNo] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [hostel, setHostel] = useState("")
  const [phone, setPhone] = useState("")
  const [needs, setNeeds] = useState([])
  const [saved, setSaved] = useState(false)

  const loadUserData = () => {
    const u = getCurrentUser()
    setUser(u)
    setName(u.name || "")
    setRegNo(u.regNo || "")
    setEmail(u.email || "")
    setDepartment(u.department || "")
    setHostel(u.hostel || "")
    setPhone(u.phone || "")

    // Filter reports matching user's name
    const allReports = getStoredReports()
    const mine = allReports.filter(r => 
      (r.author && (r.author.includes(u.name) || r.author.includes(u.regNo))) ||
      r.author === "You (Student Contributor)"
    )
    setMyReports(mine)

    // Load stored needs preferences
    const storedNeeds = localStorage.getItem("stride_profile_needs")
    if (storedNeeds) {
      try { setNeeds(JSON.parse(storedNeeds)) } catch (e) {}
    } else {
      setNeeds(["wheelchair"])
    }
  }

  useEffect(() => {
    loadUserData()

    const handleAuthChange = (e) => {
      loadUserData()
    }

    window.addEventListener("stride:auth_state_changed", handleAuthChange)
    window.addEventListener("stride:report_added", loadUserData)
    return () => {
      window.removeEventListener("stride:auth_state_changed", handleAuthChange)
      window.removeEventListener("stride:report_added", loadUserData)
    }
  }, [])

  const toggleNeed = (id) => {
    setNeeds(prev => {
      const updated = prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
      localStorage.setItem("stride_profile_needs", JSON.stringify(updated))
      return updated
    })
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    const updated = updateProfile({
      name: name.trim(),
      regNo: regNo.trim(),
      department: department.trim(),
      hostel: hostel.trim(),
      phone: phone.trim(),
    })
    setUser(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSignOut = () => {
    signOut()
    loadUserData()
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold mb-3">
              <UserCircle className="w-3.5 h-3.5 text-teal-400" />
              <span>Student Profile & Google Account</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Campus Identity & Preferences
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
              Manage your Lovely Professional University verified student identity, Google connected account, and custom accessibility pathfinding preferences.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => setShowGoogleModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-800 hover:bg-slate-100 shadow-md transition-all cursor-pointer"
            >
              <Repeat className="w-4 h-4 text-violet-600" />
              <span>Switch Google Account</span>
            </button>
            {user?.isLoggedIn && (
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* ROW 1: DIGITAL STUDENT ID CARD & GOOGLE AUTH STATUS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LPU STUDENT IDENTITY SMART CARD (5 COLS) */}
          <div className="lg:col-span-5">
            <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span>LPU Student Smart Card</span>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active & Verified
              </span>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-violet-950 to-slate-950 text-white p-6 shadow-2xl border border-slate-700/80 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                    LPU
                  </div>
                  <div>
                    <div className="text-[11px] font-black tracking-wider uppercase text-amber-400">Lovely Professional University</div>
                    <div className="text-[9px] text-slate-400 tracking-widest uppercase">Student Identity Card</div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>

              {/* Photo & Key Information */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-slate-800 border-2 border-white/20 shrink-0 shadow-lg">
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
                    alt={user?.name || "Student"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-emerald-500 text-slate-950 text-[8px] font-black uppercase text-center py-0.5">
                    VERIFIED
                  </div>
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="text-lg font-black text-white leading-tight truncate">
                    {user?.name || "Pravesh"}
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                    REG: {user?.regNo || "12419500"}
                  </div>
                  <div className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                    {user?.department || "School of Computer Science & Engineering"}
                  </div>
                  <div className="text-[10px] text-teal-300 font-bold flex items-center gap-1 pt-1">
                    <Building2 className="w-3 h-3" />
                    <span>{user?.hostel || "BH-6 (Boys Hostel 6)"}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer with Security Chip & Barcode */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                <div>
                  <div>VALID: 2024 — 2028</div>
                  <div className="text-slate-500">AUTH: GOOGLE OAUTH 2.0</div>
                </div>
                <div className="flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-slate-400" />
                  <div className="w-12 h-6 flex flex-col justify-between">
                    <span className="w-full h-0.5 bg-slate-600 rounded-full" />
                    <span className="w-3/4 h-0.5 bg-slate-600 rounded-full" />
                    <span className="w-full h-0.5 bg-slate-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GOOGLE OAUTH CONNECTION & PROFILE DETAILS (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google OAuth Banner */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-slate-900">Connected with Google</span>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">Active</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate font-mono mt-0.5">
                    {user?.email || "pravesh.12419500@lpu.in"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 transition-colors"
              >
                Switch Account
              </button>
            </div>

            {/* Editable Profile Information Form */}
            <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900">Student Profile Information</h3>
                <span className="text-xs text-slate-400">Used for report attribution</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={regNo}
                    onChange={e => setRegNo(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Department / School
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Hostel / Residence
                  </label>
                  <input
                    type="text"
                    value={hostel}
                    onChange={e => setHostel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </div>
              </div>

              {saved && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Profile updated successfully! Next barrier reports will carry this identity.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-violet-600 hover:bg-violet-700 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>

          </div>
        </div>

        {/* ROW 2: ACCESSIBILITY PREFERENCES */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none">
                Navigation Impedance & Needs Profile
              </h2>
              <span className="text-xs text-slate-500 mt-1 block">
                Select constraints to automatically adjust Dijkstra cost coefficients for your account
              </span>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
              {needs.length} Active Filters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {needsOptions.map(opt => {
              const active = needs.includes(opt.id)
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleNeed(opt.id)}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? "border-violet-600 bg-violet-50/60 ring-2 ring-violet-500/10"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/60"
                  }`}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{opt.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{opt.label}</span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                        active ? "bg-violet-600 text-white" : "border border-slate-300"
                      }`}>
                        {active && "✓"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{opt.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ROW 3: MY SUBMITTED BARRIER REPORTS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none">
                My Submitted Barrier Reports ({myReports.length})
              </h2>
              <span className="text-xs text-slate-500 mt-1 block">
                Field reports contributed to Lovely Professional University navigation network
              </span>
            </div>
            <Link
              href="/report"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              + Submit New Barrier
            </Link>
          </div>

          <div className="space-y-3.5">
            {myReports.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-4 items-start justify-between"
              >
                <div className="flex gap-3.5 items-start">
                  {r.photo && (
                    <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative">
                      <img src={r.photo} alt={r.barrierLabel} className="w-full h-full object-cover" />
                      <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[8px] font-bold">
                        Photo Proof
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-slate-900">{r.buildingName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-bold text-violet-700">{r.barrierLabel}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "{r.description}"
                    </p>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-0.5">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {timeAgo(r.timestamp)}</span>
                      <span>•</span>
                      <span className="font-semibold text-emerald-600">Dispatched & Active</span>
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase shrink-0 self-start ${
                  r.severity === "high" || r.severity === "critical"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {r.severityLabel || r.severity}
                </span>
              </div>
            ))}

            {myReports.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                You haven't submitted any barrier reports yet. Spot an unramped step or broken lift to contribute!
              </div>
            )}
          </div>
        </div>

        {/* ROW 4: ENGINEERING TEAM & SUBSYSTEM FULL-STACK OWNERSHIP */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                <span>Capstone Engineering Division</span>
              </div>
              <h2 className="text-lg font-black text-slate-900 leading-none">
                Engineering Team & Full-Stack Contribution Architecture
              </h2>
              <span className="text-xs text-slate-500 mt-1 block">
                Balanced division of responsibility across frontend and backend modules for Lovely Professional University
              </span>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              3 Teammates • Full-Stack Ownership
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. PRAVESH (LEAD) */}
            <div className="rounded-2xl border-2 border-violet-500/40 bg-gradient-to-b from-violet-50/50 to-white p-5 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-violet-600 text-white">
                    Team Lead
                  </span>
                  <span className="text-xs font-mono font-bold text-violet-700">12419500</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Pravesh</h3>
                  <p className="text-xs font-bold text-violet-600">Core Engine Architect</p>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-violet-100">
                  <div>
                    <div className="font-extrabold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-teal-700 mb-1">
                      <span>🎨 Frontend Modules:</span>
                    </div>
                    <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                      <li>360° VR Tour & Panorama Engine (`Campus360Viewer.jsx`, `/tour`)</li>
                      <li>Google OAuth 2.0 Modal & Profile System (`GoogleSignInModal.jsx`, `/profile`)</li>
                      <li>Hero Route Simulation & Global Navigation (`HeroSection.jsx`)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-violet-700 mb-1">
                      <span>⚙️ Backend & Algorithms:</span>
                    </div>
                    <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                      <li>Core Dijkstra Shortest-Path Algorithm (`src/app/backend/module-1/pathfinding.js`)</li>
                      <li>Dynamic Routing REST API (`/api/routes`)</li>
                      <li>Google OAuth Session Management & Event Bus (`src/app/backend/module-1/auth.js`)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. KARTIK GREWAL */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-800 text-white">
                    Geospatial Lead
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600">12406604</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Kartik Grewal</h3>
                  <p className="text-xs font-bold text-slate-600">Mapping & Network Lead</p>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <div className="font-extrabold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-teal-700 mb-1">
                      <span>🎨 Frontend Modules:</span>
                    </div>
                    <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                      <li>2D Interactive SVG Vector Campus Map (`CampusMap.jsx`, `/explore`)</li>
                      <li>Step-by-Step Route Comparison HUD (`RouteCard.jsx`)</li>
                      <li>Facility Directory Cards & Category Filters (`BuildingCard.jsx`)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-700 mb-1">
                      <span>⚙️ Backend & Algorithms:</span>
                    </div>
                    <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                      <li>52-Block Graph Network & Corridor Modeling (`campusData.js`)</li>
                      <li>Spatial Distance & Surface Friction Calculator (`src/app/backend/module-2/utils.js`)</li>
                      <li>Facility Registry REST API (`/api/buildings`)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. KONATALA NAVEEN */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-800 text-white">
                    Audit Lead
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-600">12417251</span>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Konatala Naveen</h3>
                  <p className="text-xs font-bold text-slate-600">Full-Stack & Community Lead</p>
                </div>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <div className="font-extrabold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-teal-700 mb-1">
                      <span>🎨 Frontend Modules:</span>
                    </div>
                    <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                      <li>Barrier Reporting Form with 5MB Photo Upload (`/report`)</li>
                      <li>Student Live Wire Community Feed (`FeedPost.jsx`, `/feed`)</li>
                      <li>Dynamic 2-Lift Checklist & Photo Proofs (`BuildingChecklist.jsx`)</li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <div className="font-extrabold text-slate-900 flex items-center gap-1 text-[11px] uppercase tracking-wider text-slate-700 mb-1">
                      <span>⚙️ Backend & Algorithms:</span>
                    </div>
                    <ul className="text-slate-600 space-y-1 text-[11px] list-disc list-inside">
                      <li>Persistent Storage Event Bus (`src/app/backend/module-3/reportsStorage.js`)</li>
                      <li>Barrier Ingestion & Queue REST API (`/api/reports`)</li>
                      <li>Institutional Accessibility Score Summary (average, score bands, priority order)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      {/* Google Sign-in Modal */}
      <GoogleSignInModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onLoginSuccess={(u) => loadUserData()}
      />
    </div>
  )
}
