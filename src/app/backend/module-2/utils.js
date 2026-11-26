export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}
export function getScoreColor(score) {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-danger"
}
export function getScoreBg(score) {
  if (score >= 80) return "bg-emerald-50 border-emerald-200"
  if (score >= 60) return "bg-amber-50 border-amber-200"
  return "bg-red-50 border-red-200"
}
export function getScoreLabel(score) {
  if (score >= 80) return "Good"
  if (score >= 60) return "Moderate"
  if (score >= 40) return "Poor"
  return "Critical"
}
export function formatDistance(meters) {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`
  return `${meters}m`
}
export function formatTime(minutes) {
  if (minutes < 1) return "< 1 min"
  if (minutes === 1) return "1 min"
  return `${minutes} mins`
}
export function getBuildingTypeIcon(type) {
  const icons = {
    academic: "🎓",
    library: "📚",
    recreation: "🎯",
    residential: "🏠",
    administrative: "🏛️",
    dining: "🍽️",
    medical: "🏥"
  }
  return icons[type] || "🏢"
}
export function getBuildingTypeLabel(type) {
  const labels = {
    academic: "Academic",
    library: "Library",
    recreation: "Recreation",
    residential: "Residential",
    administrative: "Administrative",
    dining: "Dining",
    medical: "Medical"
  }
  return labels[type] || "Other"
}
export function timeAgo(date) {
  if (typeof window === "undefined") return ""
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)

  if (seconds < 60) return "just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(date).toLocaleDateString()
}
export function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}
export function getBuildingImage(building) {
  if (building?.image) return building.image

  const realLpuMap = {
    "block-1": "/lpu_photos/lpu-campus-1.jpg",
    "block-2": "/lpu_photos/lpu-campus-2.jpg",
    "block-3": "/lpu_photos/lpu-campus-3.jpg",
    "block-4": "/lpu_photos/lpu-campus-4.jpg",
    "block-13": "/lpu_photos/lpu-campus-5.jpg",
    "block-14": "/lpu_photos/lpu-campus-6.jpg",
    "block-25": "/lpu_photos/lpu-campus-7.jpg",
    "block-26": "/lpu_photos/lpu-campus-8.jpg",
    "block-27": "/lpu_photos/lpu-campus-9.jpg",
    "block-28": "/lpu_photos/lpu-campus-10.jpg",
    "block-29": "/lpu_photos/lpu-campus-11.jpg",
    "block-30": "/lpu_photos/lpu-campus-12.jpg",
    "block-31": "/lpu_photos/lpu-campus-13.jpg",
    "block-32": "/lpu_photos/lpu-campus-14.jpg",
    "block-33": "/lpu_photos/lpu-campus-15.jpg",
    "block-34": "/lpu_photos/lpu-campus-16.jpg",
    "block-35": "/lpu_photos/lpu-campus-17.jpg",
    "block-36": "/lpu_photos/lpu-campus-18.jpg",
    "block-37": "/lpu_photos/lpu-campus-19.jpg",
    "block-38": "/lpu_photos/lpu-campus-16.jpg",
    "block-55": "/lpu_photos/lpu-campus-15.jpg",
    "block-56": "/lpu_photos/lpu-campus-12.jpg",
    "unimall": "/lpu_photos/lpu-campus-3.jpg",
    "unipolis": "/lpu_photos/lpu-campus-5.jpg",
    "shanti-devi-auditorium": "/lpu_photos/lpu-campus-8.jpg",
    "indoor-stadium": "/lpu_photos/lpu-campus-10.jpg",
    "outdoor-stadium": "/lpu_photos/lpu-campus-11.jpg",
    "sunken-garden": "/lpu_photos/lpu-campus-7.jpg",
    "open-air-theatre": "/lpu_photos/lpu-campus-9.jpg",
    "student-food-court": "/lpu_photos/lpu-campus-14.jpg",
    "robopark": "/lpu_photos/lpu-campus-13.jpg",
    "gate-1": "/lpu_photos/lpu-campus-1.jpg",
    "gate-2": "/lpu_photos/lpu-campus-4.jpg",
    "gate-3": "/lpu_photos/lpu-campus-6.jpg",
    "gate-4": "/lpu_photos/lpu-campus-9.jpg",
    "shuttle-terminal": "/lpu_photos/lpu-campus-2.jpg",
    "bh-1": "/lpu_photos/lpu-campus-17.jpg",
    "bh-2": "/lpu_photos/lpu-campus-17.jpg",
    "bh-3": "/lpu_photos/lpu-campus-17.jpg",
    "bh-4": "/lpu_photos/lpu-campus-17.jpg",
    "bh-5": "/lpu_photos/lpu-campus-17.jpg",
    "bh-6": "/lpu_photos/lpu-campus-17.jpg",
    "bh-7": "/lpu_photos/lpu-campus-17.jpg",
    "bh-8": "/lpu_photos/lpu-campus-17.jpg",
    "gh-1": "/lpu_photos/lpu-campus-18.jpg",
    "gh-2": "/lpu_photos/lpu-campus-18.jpg",
    "gh-3": "/lpu_photos/lpu-campus-18.jpg",
    "gh-4": "/lpu_photos/lpu-campus-18.jpg",
    "gh-5": "/lpu_photos/lpu-campus-18.jpg",
    "gh-6": "/lpu_photos/lpu-campus-18.jpg",
    "faculty-apt-a": "/lpu_photos/lpu-campus-19.jpg"
  }

  if (building?.id && realLpuMap[building.id]) {
    return realLpuMap[building.id]
  }

  const categoryFallbacks = {
    academic: "/lpu_photos/lpu-campus-16.jpg",
    library: "/lpu_photos/lpu-campus-19.jpg",
    administrative: "/lpu_photos/lpu-campus-1.jpg",
    medical: "/lpu_photos/lpu-campus-3.jpg",
    residential: "/lpu_photos/lpu-campus-17.jpg",
    dining: "/lpu_photos/lpu-campus-14.jpg",
    recreation: "/lpu_photos/lpu-campus-10.jpg"
  }
  return categoryFallbacks[building?.type] || "/lpu_photos/lpu-campus-1.jpg"
}