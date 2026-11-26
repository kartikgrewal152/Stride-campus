"use client"

import Link from "next/link"
import { Accessibility, Compass, BarChart3, AlertTriangle, Users, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white">Stride</span>
                <span className="text-[10px] font-semibold text-teal-400 -mt-1 tracking-wider uppercase">Accessible Campus</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-4">
              Accessible campus movement for students with mobility constraints. Eliminating physical barriers, broken lifts, and sudden steps through crowdsourced audits and Dijkstra route optimization.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Lovely Professional University
              </span>
              <span>•</span>
              <span>Campus Accessibility Network</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">Navigation</h3>
            <div className="space-y-2.5 text-sm">
              <Link href="/explore" className="block text-slate-400 hover:text-teal-300 transition-colors">
                Interactive Campus Map
              </Link>
              <Link href="/tour" className="block text-slate-400 hover:text-teal-300 transition-colors">
                360° Virtual Campus Tour
              </Link>
              <Link href="/dashboard" className="block text-slate-400 hover:text-teal-300 transition-colors">
                Building Access Scores
              </Link>
              <Link href="/report" className="block text-slate-400 hover:text-teal-300 transition-colors">
                Report Campus Barrier
              </Link>
              <Link href="/feed" className="block text-slate-400 hover:text-teal-300 transition-colors">
                Community Updates
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4">Account & Standards</h3>
            <div className="space-y-2.5 text-sm">
              <Link href="/profile" className="block text-slate-400 hover:text-teal-300 transition-colors">
                Accessibility Preferences
              </Link>
              <span className="block text-slate-500 cursor-default">ADA & RPwD Compliance Standards</span>
              <span className="block text-slate-500 cursor-default">Dijkstra Shortest Path Engine</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Stride. Designed and engineered for an equitable, barrier-free campus.</p>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-semibold">Lovely Professional University</span>
            <span>•</span>
            <span>52 Campus Blocks Mapped</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
