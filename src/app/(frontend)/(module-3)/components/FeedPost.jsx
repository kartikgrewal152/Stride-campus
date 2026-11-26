"use client"

import { useState } from "react"
import { Heart, MapPin, CheckCircle2, ShieldAlert, Lightbulb, AlertTriangle, Eye, X, ZoomIn } from "lucide-react"
import { timeAgo } from "@/lib/utils"

export default function FeedPost({ post }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const initial = post.author ? post.author.charAt(0).toUpperCase() : "U"

  let typeBadge = (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-800">
      <Lightbulb className="w-3 h-3 text-violet-600" /> Tip
    </span>
  )

  if (post.type === "report" || post.barrierType) {
    typeBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
        <ShieldAlert className="w-3 h-3 text-red-600" /> Barrier Report
      </span>
    )
  } else if (post.type === "update" || post.status === "resolved") {
    typeBadge = (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Resolution
      </span>
    )
  }

  const postImage = post.photo || post.image

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 hover:border-slate-300 transition-all">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
            {initial}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{post.author}</span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-slate-400">{timeAgo(post.timestamp)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {post.severity && (
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                    post.severity === "high" || post.severity === "critical"
                      ? "bg-rose-100 text-rose-700"
                      : post.severity === "medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {post.severity}
                  </span>
                )}
                {typeBadge}
              </div>
            </div>

            {post.barrierLabel && (
              <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{post.barrierLabel}</span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
              {post.content || post.description}
            </p>

            {post.locationDetails && (
              <div className="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1">
                <span className="font-bold text-slate-600">Location:</span> {post.locationDetails}
              </div>
            )}

            {/* Photo Attachment with Click to Zoom */}
            {postImage && (
              <div className="mt-3.5 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group cursor-pointer max-w-lg aspect-[16/9]">
                <img
                  src={postImage}
                  alt={post.barrierLabel || "Reported campus barrier obstacle"}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  onClick={() => setLightboxOpen(true)}
                />
                <div 
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-xs"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to view full photo</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1.5 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Verified Photo Proof</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100">
              {(post.building || post.buildingName) ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  <MapPin className="w-3 h-3 text-violet-600" />
                  {post.building || post.buildingName}
                </span>
              ) : <span />}

              <button
                onClick={toggleLike}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  liked
                    ? "bg-rose-50 text-rose-600"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-white">
              <div>
                <div className="font-bold text-sm text-slate-100">
                  {post.barrierLabel || "Field Photographic Evidence"}
                </div>
                <div className="text-xs text-slate-400">
                  {post.building || post.buildingName} • Reported by {post.author}
                </div>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center bg-black p-2">
              <img
                src={postImage}
                alt="Obstacle full preview"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
            <div className="p-3 bg-slate-950 text-slate-300 text-xs flex items-center justify-between">
              <span>{post.content || post.description}</span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
