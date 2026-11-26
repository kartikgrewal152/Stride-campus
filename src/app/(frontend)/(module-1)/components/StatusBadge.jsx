"use client"

import { Check, X, AlertTriangle } from "lucide-react"

export default function StatusBadge({ status, label, warning = false }) {
  if (warning) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        <AlertTriangle className="w-3 h-3 text-amber-600" />
        {label}
      </span>
    )
  }

  if (status) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
        <Check className="w-3 h-3 text-emerald-600" />
        {label}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
      <X className="w-3 h-3 text-slate-400" />
      {label}
    </span>
  )
}
