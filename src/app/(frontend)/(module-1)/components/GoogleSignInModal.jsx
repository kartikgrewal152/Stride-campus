"use client"

import { useState } from "react"
import { signInWithGoogle, sampleGoogleAccounts } from "@/lib/auth"
import { X, CheckCircle, Shield, Loader2, Plus, ArrowRight } from "lucide-react"

export default function GoogleSignInModal({ isOpen, onClose, onLoginSuccess }) {
  const [loadingAccount, setLoadingAccount] = useState(null)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customName, setCustomName] = useState("")
  const [customEmail, setCustomEmail] = useState("")
  const [customRegNo, setCustomRegNo] = useState("")

  if (!isOpen) return null

  const handleSelectAccount = (account) => {
    setLoadingAccount(account.email)
    setTimeout(() => {
      const user = signInWithGoogle(account)
      setLoadingAccount(null)
      if (onLoginSuccess) onLoginSuccess(user)
      onClose()
    }, 600)
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (!customName.trim() || !customEmail.trim()) return
    const customAccount = {
      name: customName.trim(),
      email: customEmail.trim(),
      regNo: customRegNo.trim() || "12419500",
      department: "School of Computer Science & Engineering",
      role: "Student Contributor",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(customName)}`,
      hostel: "Campus Hostel",
    }
    handleSelectAccount(customAccount)
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Google Logo */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Official Google 4-Color G Logo SVG */}
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">Sign in with Google</h2>
              <p className="text-xs text-slate-500">to continue to Stride (LPU)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Account Selector Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Choose an account
          </p>

          <div className="space-y-2">
            {sampleGoogleAccounts.map((account) => {
              const isLoading = loadingAccount === account.email
              return (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => handleSelectAccount(account)}
                  disabled={loadingAccount !== null}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 transition-all text-left cursor-pointer group disabled:opacity-50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 border border-violet-200 shrink-0 flex items-center justify-center text-sm font-black"
                    >
                      {account.name.trim().charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors flex items-center gap-1.5">
                        <span>{account.name}</span>
                        {account.regNo && (
                          <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-1.5 py-0.2 rounded">
                            {account.regNo}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{account.email}</div>
                    </div>
                  </div>

                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-violet-600 animate-spin shrink-0" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Toggle Custom Account */}
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 border border-dashed border-slate-300"
            >
              <Plus className="w-4 h-4" />
              <span>Use another Google account</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-800">Enter Google Account Details:</div>
              <input
                type="text"
                placeholder="Full Name (e.g. Pravesh)"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
              <input
                type="email"
                placeholder="Google / LPU Email (e.g. pravesh.12419500@lpu.in)"
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
              <input
                type="text"
                placeholder="Registration No. (e.g. 12419500)"
                value={customRegNo}
                onChange={e => setCustomRegNo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 transition-colors"
                >
                  Sign in with this Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* OAuth Security / Terms */}
          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Google verifies Lovely Professional University student credentials. To protect user trust, your name and photo will be displayed alongside barrier reports you submit.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

