"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Accessibility, AlertTriangle, UserCircle, LogIn, CheckCircle2 } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"
import GoogleSignInModal from "@/components/GoogleSignInModal"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Campus Map" },
  { href: "/tour", label: "360° Tour" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/feed", label: "Community" },
  { href: "/profile", label: "My Profile" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setUser(getCurrentUser())

    const handleAuthChange = (e) => {
      setUser(e.detail || getCurrentUser())
    }

    window.addEventListener("stride:auth_state_changed", handleAuthChange)
    return () => window.removeEventListener("stride:auth_state_changed", handleAuthChange)
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 bg-white/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900">Stride</span>
                <span className="text-[10px] font-semibold text-teal-600 -mt-1 tracking-wider uppercase">Accessible Campus</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
              {navLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-white text-violet-700 shadow-sm border border-slate-200/60"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Google Auth Status / Login Button */}
              {user && user.isLoggedIn ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-violet-300 bg-slate-50 hover:bg-white transition-all group"
                >
                  <span
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 border border-violet-200 flex items-center justify-center text-xs font-black"
                  >
                    {user.name?.trim()?.charAt(0)?.toUpperCase() || "S"}
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-black text-slate-800 leading-tight group-hover:text-violet-700 transition-colors">
                      {user.name}
                    </span>
                    <span className="text-[9px] font-semibold text-emerald-600 flex items-center gap-0.5 -mt-0.5">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      Google
                    </span>
                  </div>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Sign in</span>
                </button>
              )}

              <Link
                href="/report"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-sm shadow-red-500/20 active:scale-95 transition-all"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Report Barrier</span>
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {open && (
            <div className="md:hidden py-4 border-t border-slate-200 space-y-2">
              {navLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-violet-50 text-violet-700 border border-violet-100"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => { setShowGoogleModal(true); setOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{user?.isLoggedIn ? `Signed in as ${user.name}` : "Sign in with Google"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Google OAuth Modal */}
      <GoogleSignInModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onLoginSuccess={(u) => setUser(u)}
      />
    </>
  )
}
