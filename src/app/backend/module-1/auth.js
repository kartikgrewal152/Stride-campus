// Client-side authentication and Google OAuth provider for Stride LPU

const AUTH_STORAGE_KEY = "stride_user_session_v1"

export const defaultUser = {
  isLoggedIn: true,
  name: "Pravesh",
  regNo: "12419500",
  email: "pravesh.12419500@lpu.in",
  department: "School of Computer Science & Engineering (B.Tech CSE)",
  role: "Team Lead & Core Engine Architect",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  phone: "+91 98765 43210",
  hostel: "Boys Hostel 6 (BH-6, Room 312)",
  provider: "google",
  verifiedStudent: true,
  joinedDate: "August 2024",
}

export const sampleGoogleAccounts = [
  {
    name: "Pravesh",
    regNo: "12419500",
    email: "pravesh.12419500@lpu.in",
    department: "School of Computer Science & Engineering",
    role: "Team Lead & Core Engine Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    hostel: "BH-6 (Boys Hostel 6)",
  },
  {
    name: "Kartik Grewal",
    regNo: "12406604",
    email: "kartik.12406604@lpu.in",
    department: "School of Computer Science & Engineering",
    role: "Geodata & Network Mapping Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    hostel: "BH-4 (Boys Hostel 4)",
  },
  {
    name: "Konatala Naveen",
    regNo: "12417251",
    email: "naveen.12417251@lpu.in",
    department: "School of Computer Science & Engineering",
    role: "Full-Stack & Audit Lead",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    hostel: "BH-2 (Boys Hostel 2)",
  },
]

export function getCurrentUser() {
  if (typeof window === "undefined") return defaultUser
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultUser))
      return defaultUser
    }
    const parsed = JSON.parse(raw)
    return parsed && parsed.isLoggedIn ? parsed : defaultUser
  } catch (err) {
    return defaultUser
  }
}

export function signInWithGoogle(account) {
  if (typeof window === "undefined") return account
  const user = {
    isLoggedIn: true,
    name: account.name || "Student User",
    regNo: account.regNo || "12419500",
    email: account.email || "student@lpu.in",
    department: account.department || "School of Computer Science & Engineering",
    role: account.role || "Student Contributor",
    avatar: account.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80",
    phone: account.phone || "+91 98765 43210",
    hostel: account.hostel || "Campus Hostel",
    provider: "google",
    verifiedStudent: true,
    joinedDate: "August 2024",
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  window.dispatchEvent(new CustomEvent("stride:auth_state_changed", { detail: user }))
  return user
}

export function signOut() {
  if (typeof window === "undefined") return
  const guestUser = {
    isLoggedIn: false,
    name: "Guest Student",
    regNo: "",
    email: "",
    department: "Guest Visitor",
    role: "Unauthenticated",
    avatar: "",
    provider: "none",
    verifiedStudent: false,
  }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(guestUser))
  window.dispatchEvent(new CustomEvent("stride:auth_state_changed", { detail: guestUser }))
  return guestUser
}

export function updateProfile(updates) {
  if (typeof window === "undefined") return updates
  const current = getCurrentUser()
  const updated = { ...current, ...updates }
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new CustomEvent("stride:auth_state_changed", { detail: updated }))
  return updated
}

