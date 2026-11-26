"use client"

import { useState, useEffect, useRef } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FeedPost from "@/components/FeedPost"
import { buildings } from "@/lib/campusData"
import { generateId } from "@/lib/utils"
import { getStoredReports, saveReport } from "@/lib/reportsStorage"
import { 
  MessageSquare, 
  PlusCircle, 
  Send, 
  Users, 
  Sparkles, 
  Filter, 
  Camera, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const initialTipsAndUpdates = [
  {
    id: "tip-1",
    author: "Arjun Mehta (Accessibility Club)",
    content: "Great update! Campus estate team finally resurfaced the ramp leading to Central Library. The bumpy pavers have been replaced with smooth brushed concrete.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likes: 42,
    building: "Block 37 (Central Library)",
    type: "update",
  },
  {
    id: "tip-2",
    author: "Neha Sharma (Mobility Support)",
    content: "If you are walking from Hostel A to the Main Academic Block, do NOT take the shortcut by the athletic turf. The kerb cuts are missing and there are 2 open water drains. Take the paved path through SAC instead.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    likes: 19,
    building: "Main Academic Block 34",
    type: "tip",
  },
  {
    id: "tip-3",
    author: "Tanvi Patel (Occupational Therapy)",
    content: "Uni-Hospital is the benchmark for how all campus buildings should be retrofitted. Automatic sliding doors, zero-threshold entries, and tactile guidance tracks on all floor levels.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 58,
    building: "Uni-Hospital (24/7 Medical Wing)",
    type: "tip",
  },
]

export default function FeedPage() {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("")
  const [building, setBuilding] = useState("")
  const [type, setType] = useState("tip")
  const [posting, setPosting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [filterType, setFilterType] = useState("all")

  // Photo attachment states for in-feed posting
  const [feedPhoto, setFeedPhoto] = useState(null)
  const [feedPhotoMeta, setFeedPhotoMeta] = useState(null)
  const [feedPhotoError, setFeedPhotoError] = useState("")
  const fileInputRef = useRef(null)

  // Load persistent reports and tips on mount and listen to changes
  const loadAllPosts = () => {
    const storedReports = getStoredReports().map(r => ({
      ...r,
      type: r.type || "report",
      content: r.description,
      building: r.buildingName,
    }))

    // Merge stored reports and tips, deduplicating by ID
    const map = new Map()
    storedReports.forEach(p => map.set(p.id, p))
    initialTipsAndUpdates.forEach(p => {
      if (!map.has(p.id)) map.set(p.id, p)
    })

    const combined = Array.from(map.values()).sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )
    setPosts(combined)
  }

  useEffect(() => {
    loadAllPosts()

    const handleReportAdded = () => {
      loadAllPosts()
    }

    window.addEventListener("stride:report_added", handleReportAdded)
    return () => window.removeEventListener("stride:report_added", handleReportAdded)
  }, [])

  // File handling for in-feed posting
  const handlePhotoSelect = (e) => {
    setFeedPhotoError("")
    const file = e.target.files?.[0]
    if (!file) return

    if (!["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.type)) {
      setFeedPhotoError("Only JPG, PNG, and WEBP images are supported.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setFeedPhotoError("File size exceeds 5MB limit.")
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setFeedPhoto(ev.target.result)
      setFeedPhotoMeta({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      })
    }
    reader.readAsDataURL(file)
  }

  const removeFeedPhoto = () => {
    setFeedPhoto(null)
    setFeedPhotoMeta(null)
    setFeedPhotoError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handlePost = (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setPosting(true)

    setTimeout(() => {
      const bObj = buildings.find(b => b.id === building)
      const newPost = {
        id: `post-${generateId()}`,
        author: "You (Student Contributor)",
        content: content.trim(),
        description: content.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        building: bObj ? bObj.name : null,
        buildingName: bObj ? bObj.name : null,
        buildingId: building || null,
        type,
        photo: feedPhoto || null,
        barrierLabel: type === "report" ? "Community Barrier Dispatch" : null,
        severity: type === "report" ? "medium" : null,
        status: "active",
      }

      // If it's a barrier report, also save to persistent reports store
      if (type === "report") {
        saveReport(newPost)
      } else {
        setPosts(prev => [newPost, ...prev])
      }

      setContent("")
      setBuilding("")
      setType("tip")
      removeFeedPhoto()
      setPosting(false)
      setShowForm(false)
    }, 350)
  }

  const filtered = filterType === "all"
    ? posts
    : posts.filter(p => p.type === filterType)

  const photoCount = posts.filter(p => p.photo || p.image).length

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <header className="bg-slate-900 border-b border-slate-800 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Campus Accessibility Community</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Student Live Wire
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
              Real-time crowdsourced updates, obstacle reports, and navigation shortcuts shared by students, faculty, and mobility advocates across 52 LPU facilities.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto flex-wrap">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-500/20 active:scale-95 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Report a Barrier</span>
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs text-white bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showForm ? "Cancel" : "Share Update"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        
        {/* Banner with Stats */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex items-center justify-between flex-wrap gap-4 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{posts.length} Active Community Dispatches</span>
            <span className="text-slate-300">•</span>
            <span className="text-violet-700 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5" /> {photoCount} Verified Photo Proofs
            </span>
          </div>
          <Link
            href="/report"
            className="text-red-600 hover:text-red-700 flex items-center gap-1 font-extrabold text-[11px]"
          >
            Spotted an unramped step? Report with photo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Share an Update / Report Form */}
        {showForm && (
          <form onSubmit={handlePost} className="bg-white rounded-3xl border-2 border-violet-500/60 shadow-xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-black text-slate-900">Post an Update or Observation</h3>

            <div className="flex gap-2 flex-wrap">
              {[
                { id: "tip", label: "💡 Practical Tip" },
                { id: "report", label: "🚧 Barrier Alert" },
                { id: "update", label: "✅ Repair Resolution" },
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    type === t.id
                      ? "bg-violet-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={3}
              placeholder="What did you observe on campus? (e.g. Broken ramp, locked elevator, unramped kerb, construction ditch...)"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 transition-all resize-none"
            />

            {/* Photo Attachment Row */}
            <div>
              {!feedPhoto ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <Camera className="w-4 h-4 text-violet-600" />
                    <span>Attach Photo Proof (Max 5MB)</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoSelect}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />
                  {feedPhotoError && (
                    <span className="text-xs font-bold text-red-600">{feedPhotoError}</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 max-w-md">
                  <img src={feedPhoto} alt="Upload preview" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{feedPhotoMeta?.name}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Photo Attached ({feedPhotoMeta?.size})
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFeedPhoto}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <select
                value={building}
                onChange={e => setBuilding(e.target.value)}
                className="w-full sm:w-auto flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:bg-white cursor-pointer"
              >
                <option value="">Tag a Campus Building (Optional)...</option>
                {buildings.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>

              <button
                type="submit"
                disabled={!content.trim() || posting}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{posting ? "Publishing..." : "Publish to Live Wire"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Filter Navigation */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: "all", label: "All Updates" },
              { id: "report", label: "🚧 Barrier Reports" },
              { id: "update", label: "✅ Resolutions" },
              { id: "tip", label: "💡 Tips" },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filterType === f.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-400">
            {filtered.length} active dispatches
          </span>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filtered.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-sm">No dispatches in this category</p>
              <p className="text-slate-400 text-xs mt-1">Be the first to share an observation!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
