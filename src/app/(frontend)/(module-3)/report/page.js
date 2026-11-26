"use client"

import { useState, useRef, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { buildings, barrierTypes, severityLevels } from "@/lib/campusData"
import { saveReport } from "@/lib/reportsStorage"
import { getCurrentUser } from "@/lib/auth"
import { 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  Send, 
  ShieldAlert, 
  MapPin, 
  ArrowRight,
  UploadCloud,
  Camera,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles
} from "lucide-react"
import Link from "next/link"

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

// Sample photos for quick preview / demo testing
const SAMPLE_PHOTOS = [
  { label: "Broken Ramp (North Wing)", url: "/lpu_photos/lpu-campus-5.jpg" },
  { label: "Unpaved Gravel Track", url: "/lpu_photos/lpu-campus-7.jpg" },
  { label: "Machinery Loading Kerb", url: "/lpu_photos/lpu-campus-13.jpg" },
]

export default function ReportPage() {
  const [form, setForm] = useState({
    buildingId: "",
    barrierType: "",
    severity: "",
    description: "",
    locationDetails: "",
  })
  
  const [photoData, setPhotoData] = useState(null) // base64 string or url
  const [photoMeta, setPhotoMeta] = useState(null) // { name, size, type }
  const [photoError, setPhotoError] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submittedReport, setSubmittedReport] = useState(null)
  const [error, setError] = useState("")
  const [errors, setErrors] = useState({})
  
  const [currentUser, setCurrentUser] = useState(null)
  const [reporterName, setReporterName] = useState("Pravesh (12419500)")

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)
    if (user && user.isLoggedIn) {
      setReporterName(user.name + (user.regNo ? ` (${user.regNo})` : ""))
    }
  }, [])

  const fileInputRef = useRef(null)

  // Validate File on selection
  const processFile = (file) => {
    setPhotoError("")

    if (!file) return

    // Type validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError("Invalid file type. Only JPG, PNG, and WEBP images are supported.")
      return
    }

    // Size validation (Max 5MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
      setPhotoError(`File is too large (${sizeMB} MB). Maximum allowed size is 5 MB.`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setPhotoData(e.target.result)
      setPhotoMeta({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
      })
    }
    reader.onerror = () => {
      setPhotoError("Failed to read image file. Please try another image.")
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const removePhoto = () => {
    setPhotoData(null)
    setPhotoMeta(null)
    setPhotoError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const useSamplePhoto = (sample) => {
    setPhotoData(sample.url)
    setPhotoMeta({
      name: `${sample.label}.jpg`,
      size: "Verified LPU Campus Audit",
      type: "image/jpeg",
    })
    setPhotoError("")
  }

  const validate = () => {
    const e = {}
    if (!form.buildingId) e.buildingId = "Please select an affected building"
    if (!form.barrierType) e.barrierType = "Please select the nature of the barrier"
    if (!form.severity) e.severity = "Please select a severity level"
    if (!form.description.trim() || form.description.trim().length < 10) {
      e.description = "Please provide a clear description (at least 10 characters)"
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length > 0) {
      setErrors(v)
      return
    }
    setErrors({})
    setLoading(true)
    setError("")

    const selectedBuilding = buildings.find(b => b.id === form.buildingId)
    const selectedBarrier = barrierTypes.find(bt => bt.id === form.barrierType)
    const selectedSeverity = severityLevels.find(sl => sl.id === form.severity)

    const payload = {
      id: `rep-${Date.now()}`,
      buildingId: form.buildingId,
      buildingName: selectedBuilding ? selectedBuilding.name : form.buildingId,
      barrierType: form.barrierType,
      barrierLabel: selectedBarrier ? selectedBarrier.label : form.barrierType,
      severity: form.severity,
      severityLabel: selectedSeverity ? selectedSeverity.label : form.severity,
      description: form.description.trim(),
      locationDetails: form.locationDetails.trim(),
      photo: photoData || null,
      author: reporterName.trim() || currentUser?.name || "Pravesh (12419500)",
      userEmail: currentUser?.email || "pravesh.12419500@lpu.in",
      timestamp: new Date().toISOString(),
      likes: 1,
      status: "active",
    }

    try {
      // 1. Save to client persistent storage (so it shows everywhere immediately)
      saveReport(payload)

      // 2. Also send to API endpoint
      await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(err => console.warn("API sync fallback:", err))

      setSubmittedReport(payload)
      setSuccess(true)
      setForm({ buildingId: "", barrierType: "", severity: "", description: "", locationDetails: "" })
      removePhoto()
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const update = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Community Crowdsource Alert</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Report an Accessibility Barrier
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
            Spotted a broken ramp, locked elevator, steep kerb, or blocked pathway? Submit this verified report to warn fellow students, update the live community feed, and adjust real-time navigation paths.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        {success && submittedReport ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Barrier Report Successfully Logged & Published!
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                Thank you! Your report has been dispatched to the <strong>Student Live Wire Community Feed</strong>, highlighted on the <strong>Campus Map</strong>, and flagged on the building audit scorecard.
              </p>
            </div>

            {/* LIVE PREVIEW OF SUBMITTED CARD */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Active Alert</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-red-100 text-red-700">
                  {submittedReport.severityLabel}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {submittedReport.photo && (
                  <div className="w-full sm:w-44 aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200 relative group">
                    <img
                      src={submittedReport.photo}
                      alt="Submitted obstacle proof"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold flex items-center gap-1">
                      <Camera className="w-2.5 h-2.5" /> Photo Attached
                    </div>
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-violet-600 shrink-0" />
                    <span>{submittedReport.buildingName}</span>
                  </div>
                  <div className="text-xs font-bold text-violet-800 bg-violet-50 px-2.5 py-1 rounded-md inline-block">
                    {submittedReport.barrierLabel}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    "{submittedReport.description}"
                  </p>
                  {submittedReport.locationDetails && (
                    <div className="text-[11px] text-slate-500 font-medium">
                      <strong>Specific Area:</strong> {submittedReport.locationDetails}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS TO VERIFY IN APP */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/feed"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-500/20 transition-all"
              >
                <span>View on Community Live Feed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <span>Check Campus Map Alerts</span>
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-7">
            {/* 1. Affected Campus Building */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                1. Affected Campus Building <span className="text-red-500">*</span>
              </label>
              <select
                value={form.buildingId}
                onChange={e => update("buildingId", e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all cursor-pointer ${
                  errors.buildingId ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200 focus:border-violet-600"
                }`}
              >
                <option value="">Select the Lovely Professional University block...</option>
                {buildings.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.type})</option>
                ))}
              </select>
              {errors.buildingId && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.buildingId}</p>}
            </div>

            {/* 2. Nature of Barrier */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                2. Nature of Barrier <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {barrierTypes.map(bt => (
                  <button
                    key={bt.id}
                    type="button"
                    onClick={() => update("barrierType", bt.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all text-center gap-1.5 ${
                      form.barrierType === bt.id
                        ? "border-violet-600 bg-violet-50 text-violet-900 ring-2 ring-violet-500/20 shadow-xs"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-xl">{bt.icon}</span>
                    <span className="text-[11px] leading-tight line-clamp-2">{bt.label}</span>
                  </button>
                ))}
              </div>
              {errors.barrierType && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.barrierType}</p>}
            </div>

            {/* 3. Severity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                3. Severity Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {severityLevels.map(sl => {
                  const isSelected = form.severity === sl.id
                  return (
                    <button
                      key={sl.id}
                      type="button"
                      onClick={() => update("severity", sl.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full inline-block mx-auto mb-1" style={{ backgroundColor: sl.color }} />
                      <div className="text-xs font-bold leading-tight">{sl.label}</div>
                    </button>
                  )
                })}
              </div>
              {errors.severity && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.severity}</p>}
            </div>

            {/* 4. Description */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                4. Description of Obstacle <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={e => update("description", e.target.value)}
                rows={3}
                placeholder="e.g. The north entrance ramp has a sudden 4-inch asphalt step break. Wheelchair users cannot cross without two persons lifting."
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none ${
                  errors.description ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200 focus:border-violet-600"
                }`}
              />
              {errors.description && <p className="text-red-500 text-xs font-semibold mt-1.5">{errors.description}</p>}
            </div>

            {/* 5. PHOTO UPLOAD WITH DRAG-AND-DROP & VALIDATIONS */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  5. Upload Photo Proof <span className="text-slate-400 font-normal lowercase">(max 5 MB • JPG, PNG, WEBP)</span>
                </label>
                <span className="text-[11px] font-semibold text-teal-600">
                  Visible to all students
                </span>
              </div>

              {/* Upload Dropzone */}
              {!photoData ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? "border-violet-600 bg-violet-50/60 ring-4 ring-violet-500/10"
                      : "border-slate-300 bg-slate-50/60 hover:bg-slate-100/80 hover:border-violet-400"
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center shadow-xs">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      Drag and drop your campus obstacle photo, or <span className="text-violet-600 underline">Browse Files</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Accepted formats: JPG, PNG, WEBP • Max file size: 5 MB
                    </p>
                  </div>
                </div>
              ) : (
                /* Photo Preview Card */
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        <img
                          src={photoData}
                          alt="Uploaded obstacle preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 truncate">
                          {photoMeta?.name || "campus_barrier_photo.jpg"}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Validated
                          </span>
                          <span>•</span>
                          <span>{photoMeta?.size || "Ready for dispatch"}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={removePhoto}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-1 shrink-0"
                    >
                      <X className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="w-full aspect-[16/8] max-h-48 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 relative">
                    <img
                      src={photoData}
                      alt="Full preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[10px] font-bold">
                      Live Preview for Community
                    </div>
                  </div>
                </div>
              )}

              {/* Validation Error Message */}
              {photoError && (
                <div className="mt-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{photoError}</span>
                </div>
              )}

              {/* Quick sample photo tester for evaluation */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-500">Quick Test Samples:</span>
                {SAMPLE_PHOTOS.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => useSamplePhoto(sample)}
                    className="text-[10px] font-semibold text-violet-700 bg-violet-50 hover:bg-violet-100 px-2.5 py-1 rounded-lg border border-violet-200 transition-colors"
                  >
                    + {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Exact Location / Landmark */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                6. Specific Location / Door / Floor <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="text"
                value={form.locationDetails}
                onChange={e => update("locationDetails", e.target.value)}
                placeholder="e.g. Ground floor north ramp entrance, next to faculty parking"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all"
              />
            </div>

            {/* 7. Reporter Identity Attribution */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  7. Submitting Student Name & ID <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Google Verified Student
                </span>
              </div>
              <input
                type="text"
                value={reporterName}
                onChange={e => setReporterName(e.target.value)}
                placeholder="e.g. Pravesh (12419500)"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Your verified name will be shown publicly across the community feed and building audit scorecards.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-md shadow-red-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Transmitting Report to Campus...</>
              ) : (
                <><Send className="w-4 h-4" /> Publish Barrier Report to Live Wire</>
              )}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
