/**
 * @module Campus360Viewer
 * @author Pravesh (Reg. No. 12419500) — Team Lead & Core Engine Architect
 * @subsystem Core Routing, VR & Auth Subsystem
 * @description Multi-mode 360° virtual reality inspection engine (LPU2 Walkthrough, VR Equirectangular, Audits, Satellite).
 */

"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Satellite,
  Eye,
  Camera,
  Navigation,
  ShieldCheck,
  RotateCw,
  Info,
  Globe,
  X
} from "lucide-react"

const tourFacilities = [
  {
    id: "block-34",
    name: "Block 34 (School of CSE) Tower",
    shortLabel: "Block 34 CSE",
    type: "Academic High-Rise",
    coordinates: "31.2554° N, 75.7051° E",
    description: "The primary 8-story computing faculty tower housing computer science lecture auditoriums, coding incubators, AI labs, and high-traffic tech plaza.",
    score: 91,
    panoramaImage: "/lpu_photos/lpu-campus-16.jpg",
    heroImage: "/lpu_photos/lpu-campus-16.jpg",
    hotspots: [
      {
        id: "b34-ramp",
        title: "North Entrance Barrier-Free Ramp",
        tag: "Grade 1:12 Certified",
        yaw: 15,
        pitch: -12,
        desc: "Smooth concrete ramp equipped with dual stainless-steel handrails (900mm height) and anti-slip ribbed grooves.",
        specs: "Slope: 1:12 (4.8°) • Width: 1800mm • Dual Handrails"
      },
      {
        id: "b34-lift",
        title: "Dual Otis High-Speed Lifts",
        tag: "16-Passenger Capacity",
        yaw: 165,
        pitch: -2,
        desc: "Wide door clearance (38-inch), audible floor arrival chimes, and low-mounted braille buttons.",
        specs: "Clearance: 965mm • Low-Reach Braille Panel • Audio Chime"
      },
      {
        id: "b34-tactile",
        title: "Ground Floor Tactile Strip",
        tag: "Continuous Pavers",
        yaw: 280,
        pitch: -22,
        desc: "High-contrast yellow tactile guiding pavers connecting North Ramp directly to the elevator bank.",
        specs: "Directional & Hazard Warning Tiles • WCAG 2.1 AA"
      }
    ],
    photos: [
      {
        title: "Block 34 CSE Computing Tower Facade",
        tag: "LPU Punjab Campus",
        verified: true,
        desc: "Iconic multi-story computing block equipped with covered ground-floor colonnade and ramps.",
        url: "/lpu_photos/lpu-campus-16.jpg"
      },
      {
        title: "North Entrance Barrier-Free Ramp",
        tag: "Grade 1:12 Certified",
        verified: true,
        desc: "Dedicated wheelchair entrance ramp connecting the central pedestrian corridor to the lobby.",
        url: "/lpu_photos/lpu-campus-15.jpg"
      },
      {
        title: "Central Tech Plaza & Walkways",
        tag: "Step-Free Corridor",
        verified: true,
        desc: "Paved boulevard connecting Block 34 to UniMall and Block 32 with zero kerb drops.",
        url: "/lpu_photos/lpu-campus-14.jpg"
      }
    ]
  },
  {
    id: "block-37",
    name: "Block 37 (Central Library Knowledge Hub)",
    shortLabel: "Block 37 Library",
    type: "Central Library & Archives",
    coordinates: "31.2548° N, 75.7060° E",
    description: "Iconic multi-story central university library housing over 1.5 million digital and physical volumes, quiet study floors, and accessible reading carrels.",
    score: 95,
    panoramaImage: "/lpu_photos/lpu-campus-19.jpg",
    heroImage: "/lpu_photos/lpu-campus-19.jpg",
    hotspots: [
      {
        id: "b37-entrance",
        title: "Step-Free Automatic Glass Doors",
        tag: "Zero-Threshold Access",
        yaw: 0,
        pitch: -8,
        desc: "Motion-activated 42-inch wide sliding doors with zero threshold step for effortless wheelchair entry.",
        specs: "Clearance: 1060mm • Auto-Motion Sensor • Flush Sill"
      },
      {
        id: "b37-lift",
        title: "Central Atrium Glass Elevator",
        tag: "Serves All 5 Floors",
        yaw: 130,
        pitch: 6,
        desc: "Full glass panoramic elevator with low-level call buttons and wheelchair turning radius inside cab.",
        specs: "Turning Radius: 1550mm • Braille Labels • Audio Floor Index"
      },
      {
        id: "b37-carrel",
        title: "Motorized Accessible Study Desks",
        tag: "Height-Adjustable",
        yaw: 240,
        pitch: -15,
        desc: "Electronic push-button adjustable reading tables with integrated screen-reader audio headphone jacks.",
        specs: "Height Range: 680mm - 1200mm • Power Outlets"
      }
    ],
    photos: [
      {
        title: "Central Library Multi-Storey Facade",
        tag: "Iconic Landmark",
        verified: true,
        desc: "LPU's massive Central Library building featuring extensive glass atriums and accessible walkways.",
        url: "/lpu_photos/lpu-campus-19.jpg"
      },
      {
        title: "Library Reading Atrium & Stack Floors",
        tag: "Digital Knowledge Hub",
        verified: true,
        desc: "Spacious aisles between book stacks designed for comfortable wheelchair passage.",
        url: "/lpu_photos/lpu-campus-12.jpg"
      },
      {
        title: "Approach Plaza & Ramp Transition",
        tag: "Paved Approach",
        verified: true,
        desc: "Broad stone-paved plaza providing direct step-free roll-in access to the turnstile bypass.",
        url: "/lpu_photos/lpu-campus-7.jpg"
      }
    ]
  },
  {
    id: "block-32",
    name: "Block 32 (Division of Student Welfare & Business)",
    shortLabel: "Block 32 DSW",
    type: "Student Affairs & Business",
    coordinates: "31.2550° N, 75.7042° E",
    description: "Core administrative hub for student welfare, student council, cultural clubs, scholarship disbursement, and Mittal School of Business.",
    score: 88,
    panoramaImage: "/lpu_photos/lpu-campus-14.jpg",
    heroImage: "/lpu_photos/lpu-campus-14.jpg",
    hotspots: [
      {
        id: "b32-ramp",
        title: "West Quad Step-Free Ramp",
        tag: "Grade 1:14 Gentle Slope",
        yaw: 35,
        pitch: -14,
        desc: "Gentle paved access ramp connecting Block 32 to Central Plaza and Student Food Court.",
        specs: "Slope: 1:14 (4.1°) • Anti-Slip Finish • Dual Handrails"
      },
      {
        id: "b32-dsw",
        title: "DSW Accessibility Assistance Window",
        tag: "Priority Service",
        yaw: 180,
        pitch: -6,
        desc: "Accessible service counter designed specifically for students with special needs and mobility accommodations.",
        specs: "Counter Height: 750mm • Knee Clearance: 700mm"
      },
      {
        id: "b32-lift",
        title: "East Wing Elevator Bank",
        tag: "Working & Audited",
        yaw: 295,
        pitch: 2,
        desc: "Dual high-capacity lifts servicing corporate boardrooms, finance labs, and lecture auditoriums.",
        specs: "Load: 1000kg • Automatic Re-opening Doors"
      }
    ],
    photos: [
      {
        title: "Block 32 Student Welfare & Business Complex",
        tag: "LPU Punjab Campus",
        verified: true,
        desc: "Central student hub building housing DSW, student council desks, and conference arenas.",
        url: "/lpu_photos/lpu-campus-14.jpg"
      },
      {
        title: "Corporate Seminar & Placement Lobby",
        tag: "Barrier-Free Access",
        verified: true,
        desc: "Ground-floor seminar halls equipped with wide doorways and wheelchair seating spots.",
        url: "/lpu_photos/lpu-campus-13.jpg"
      },
      {
        title: "Central Academic Spine Walkway",
        tag: "Step-Free Route",
        verified: true,
        desc: "Paved shaded avenue connecting Block 32 to Central Library and UniMall.",
        url: "/lpu_photos/lpu-campus-11.jpg"
      }
    ]
  },
  {
    id: "unimall",
    name: "UniMall Central Commercial Complex",
    shortLabel: "UniMall",
    type: "Commercial & Dining Atrium",
    coordinates: "31.2530° N, 75.7040° E",
    description: "4-story indoor shopping, stationery, banking, grocery, and multi-cuisine food court serving over 30,000 university students daily.",
    score: 95,
    panoramaImage: "/lpu_photos/lpu-campus-3.jpg",
    heroImage: "/lpu_photos/lpu-campus-3.jpg",
    hotspots: [
      {
        id: "mall-gate",
        title: "Main Automatic Sliding Entry",
        tag: "Zero-Threshold Access",
        yaw: 30,
        pitch: -10,
        desc: "Flush floor entrance with zero step-up transition, accommodating power wheelchairs and emergency carts.",
        specs: "Opening Width: 2100mm • Auto-Sensing"
      },
      {
        id: "mall-elevators",
        title: "Dual Glass Capsule Elevators",
        tag: "All-Floor Service",
        yaw: 190,
        pitch: 8,
        desc: "High-visibility panoramic elevators reaching all retail levels, bowling alley, and top-floor dining court.",
        specs: "Braille Buttons • Voice Annunciation • 1200kg Load"
      },
      {
        id: "mall-aisle",
        title: "Wide Central Promenade",
        tag: "3.5m Clear Width",
        yaw: 290,
        pitch: -18,
        desc: "Spacious central pedestrian atrium allowing easy parallel transit for multiple wheelchairs.",
        specs: "No Obstructions • Fire-Exit Compliant"
      }
    ],
    photos: [
      {
        title: "UniMall Retail & Dining Complex Exterior",
        tag: "Campus Commercial Center",
        verified: true,
        desc: "Multi-level red brick and glass commercial complex at the heart of LPU campus life.",
        url: "/lpu_photos/lpu-campus-3.jpg"
      },
      {
        title: "UniMall Central Atrium & Elevators",
        tag: "Full Elevator Access",
        verified: true,
        desc: "Atrium featuring glass passenger elevators connecting all shopping and food floors.",
        url: "/lpu_photos/lpu-campus-2.jpg"
      },
      {
        title: "Ground Floor Step-Free Entrance Plaza",
        tag: "Flush Threshold",
        verified: true,
        desc: "Paved entrance plaza seamlessly merging with the main campus pedestrian avenue.",
        url: "/lpu_photos/lpu-campus-4.jpg"
      }
    ]
  },
  {
    id: "unipolis",
    name: "Baldev Raj Mittal Unipolis",
    shortLabel: "Unipolis",
    type: "Mega Amphitheatre & Event Stage",
    coordinates: "31.2520° N, 75.7035° E",
    description: "The iconic multi-acre covered open-air amphitheatre with grand tensile fabric canopy, hosting university convocations, music concerts, and youth festivals.",
    score: 87,
    panoramaImage: "/lpu_photos/lpu-campus-5.jpg",
    heroImage: "/lpu_photos/lpu-campus-5.jpg",
    hotspots: [
      {
        id: "unipolis-deck",
        title: "Barrier-Free Viewing Platform",
        tag: "Reserved Seating",
        yaw: 350,
        pitch: -12,
        desc: "Dedicated unobstructed seating platform overlooking the main stage with companion seats.",
        specs: "Capacity: 24 Wheelchairs • Power Outlets for Electric Chairs"
      },
      {
        id: "unipolis-walkway",
        title: "Gradual Approach Ramp",
        tag: "Grade 1:16",
        yaw: 140,
        pitch: -8,
        desc: "Gentle asphalt path leading from UniMall concourse into the main Unipolis amphitheatre bowl.",
        specs: "Slope: 1:16 (3.6°) • Paved & Lighted"
      }
    ],
    photos: [
      {
        title: "Unipolis Grand Tensile Canopy & Stage",
        tag: "Iconic Mega Venue",
        verified: true,
        desc: "Massive architectural fabric canopy providing all-weather shade across the 10,000-capacity arena.",
        url: "/lpu_photos/lpu-campus-5.jpg"
      },
      {
        title: "Level Amphitheatre Concourse",
        tag: "Step-Free Deck",
        verified: true,
        desc: "Wide perimeter ring allowing wheelchair users to access front and middle tier viewing areas.",
        url: "/lpu_photos/lpu-campus-8.jpg"
      },
      {
        title: "Unipolis Plaza Lighting & Pavement",
        tag: "Illuminated Path",
        verified: true,
        desc: "Well-lit paved transit corridor connecting Unipolis to Shanti Devi Auditorium.",
        url: "/lpu_photos/lpu-campus-9.jpg"
      }
    ]
  },
  {
    id: "shanti-devi-auditorium",
    name: "Shanti Devi Mittal Auditorium",
    shortLabel: "Shanti Devi Aud",
    type: "Grand Convention Auditorium",
    coordinates: "31.2525° N, 75.7025° E",
    description: "Air-conditioned premium multi-tier auditorium for national academic symposia, convocation ceremonies, and cultural mega-events.",
    score: 93,
    panoramaImage: "/lpu_photos/lpu-campus-8.jpg",
    heroImage: "/lpu_photos/lpu-campus-8.jpg",
    hotspots: [
      {
        id: "aud-ramp",
        title: "VIP & Accessible Entrance Ramp",
        tag: "Covered Ramp",
        yaw: 20,
        pitch: -10,
        desc: "Weather-sheltered ramp providing direct roll-in access to the auditorium main hall.",
        specs: "Slope: 1:14 • Tactile Landing Studs"
      },
      {
        id: "aud-seating",
        title: "Dedicated Front Wheelchair Bays",
        tag: "Wheelchair Seating",
        yaw: 160,
        pitch: -4,
        desc: "Removable front-row auditorium seats accommodating wheelchairs with flush sightlines.",
        specs: "Audio Induction Loop Connected"
      }
    ],
    photos: [
      {
        title: "Shanti Devi Mittal Auditorium Facade",
        tag: "Convention Centre",
        verified: true,
        desc: "Grand auditorium entrance plaza with broad accessible flight and parallel side ramps.",
        url: "/lpu_photos/lpu-campus-8.jpg"
      },
      {
        title: "Auditorium Main Hall & Stage",
        tag: "Acoustic Hall",
        verified: true,
        desc: "Tiered auditorium featuring dedicated ground-level wheelchair bays and hearing assistance systems.",
        url: "/lpu_photos/lpu-campus-9.jpg"
      },
      {
        title: "Exterior Foyer & Portico",
        tag: "Covered Drop-off",
        verified: true,
        desc: "Sheltered vehicle drop-off portico allowing direct wheelchair transfer during rains.",
        url: "/lpu_photos/lpu-campus-6.jpg"
      }
    ]
  },
  {
    id: "indoor-stadium",
    name: "Shanti Devi Mittal Indoor Sports Stadium",
    shortLabel: "Indoor Stadium",
    type: "Olympic Sports Complex",
    coordinates: "31.2505° N, 75.7005° E",
    description: "Olympic-sized swimming arena, indoor badminton, squash, table tennis, and gymnasium complex equipped with adaptive athletic equipment.",
    score: 86,
    panoramaImage: "/lpu_photos/lpu-campus-10.jpg",
    heroImage: "/lpu_photos/lpu-campus-10.jpg",
    hotspots: [
      {
        id: "stad-pool",
        title: "Olympic Pool Accessible Hoist",
        tag: "Hydraulic Chair Lift",
        yaw: 45,
        pitch: -16,
        desc: "Hydraulic submersible chair hoist allowing swimmers with paraplegia safe entry into the water.",
        specs: "Weight Limit: 180kg • Lifeguard Operated"
      },
      {
        id: "stad-ramp",
        title: "Spectator Gallery Ramp",
        tag: "Access to Bleachers",
        yaw: 170,
        pitch: -6,
        desc: "Ramped walkway allowing wheelchair users to access the elevated badminton spectator gallery.",
        specs: "Grade: 1:12 • Protective Kick-Plates"
      }
    ],
    photos: [
      {
        title: "Indoor Sports Complex & Stadium Arena",
        tag: "Sports Infrastructure",
        verified: true,
        desc: "LPU's state-of-the-art multi-sport indoor stadium complex in Punjab.",
        url: "/lpu_photos/lpu-campus-10.jpg"
      },
      {
        title: "Athletics Stadium Running Track",
        tag: "Outdoor Grounds",
        verified: true,
        desc: "Synthetic all-weather athletics track and sports fields adjacent to indoor stadium.",
        url: "/lpu_photos/lpu-campus-11.jpg"
      },
      {
        title: "Stadium Ramped Concourse",
        tag: "Level Approach",
        verified: true,
        desc: "Step-free concourse linking sports facilities to Boys Hostels and student cafes.",
        url: "/lpu_photos/lpu-campus-7.jpg"
      }
    ]
  },
  {
    id: "gate-1",
    name: "Main Gate 1 (GT Road National Highway Entrance)",
    shortLabel: "Main Gate 1",
    type: "Campus Portal & Security",
    coordinates: "31.2590° N, 75.7060° E",
    description: "The grand ceremonial entrance gateway to Lovely Professional University along National Highway 1 (GT Road), featuring the central bus and shuttle interchange.",
    score: 90,
    panoramaImage: "/lpu_photos/lpu-campus-1.jpg",
    heroImage: "/lpu_photos/lpu-campus-1.jpg",
    hotspots: [
      {
        id: "gate-kerb",
        title: "Highway Kerb-Cut Ramp",
        tag: "Flush Sidewalk",
        yaw: 10,
        pitch: -20,
        desc: "Flush concrete drop kerb connecting external bus stops directly into the main campus pedestrian avenue.",
        specs: "Zero Lip (< 5mm) • Tactile Warning Studs"
      },
      {
        id: "gate-shuttle",
        title: "E-Rickshaw & Shuttle Terminal",
        tag: "Campus Transit",
        yaw: 290,
        pitch: -14,
        desc: "Designated boarding dock for electric shuttle carts offering free transit across 600 acres.",
        specs: "Low Floor Step • Fold-Out Wheelchair Ramp"
      }
    ],
    photos: [
      {
        title: "LPU Main Gate 1 Highway Arch",
        tag: "Iconic Entrance",
        verified: true,
        desc: "The monumental entrance gate on Jalandhar-Delhi GT Road with dedicated pedestrian lanes.",
        url: "/lpu_photos/lpu-campus-1.jpg"
      },
      {
        title: "Administrative Boulevard from Gate 1",
        tag: "Tree-Lined Avenue",
        verified: true,
        desc: "Wide concrete sidewalk with tactile ground pavers leading towards Admission Block 1.",
        url: "/lpu_photos/lpu-campus-2.jpg"
      },
      {
        title: "Central Bus & E-Shuttle Interchange",
        tag: "Transit Hub",
        verified: true,
        desc: "Covered passenger waiting bays and battery-powered e-rickshaw dispatch area.",
        url: "/lpu_photos/lpu-campus-4.jpg"
      }
    ]
  },
  {
    id: "hostels",
    name: "Residential Halls (BH & GH Hostel Complexes)",
    shortLabel: "Hostels Hub",
    type: "Student Residential Hub",
    coordinates: "31.2490° N, 75.7020° E",
    description: "Multistory boys residential complexes (BH-1 to BH-8) and girls residential complexes (GH-1 to GH-6) accommodating over 25,000 resident students.",
    score: 84,
    panoramaImage: "/lpu_photos/lpu-campus-17.jpg",
    heroImage: "/lpu_photos/lpu-campus-17.jpg",
    hotspots: [
      {
        id: "hostel-ramp",
        title: "Hostel Ground Floor Accessible Wing",
        tag: "Accessible Rooms",
        yaw: 25,
        pitch: -12,
        desc: "Designated ground floor rooms with wider 950mm doorways and accessible ensuite bathrooms.",
        specs: "Zero Interior Threshold • Roll-In Bathroom"
      },
      {
        id: "hostel-mess",
        title: "Hostel Mess Dining Ramp",
        tag: "Barrier-Free Dining",
        yaw: 160,
        pitch: -15,
        desc: "Direct ramp entrance with handrails leading into the central student dining hall.",
        specs: "Slope: 1:12 • Non-Slip Tile Finish"
      }
    ],
    photos: [
      {
        title: "Residential Hostel Multi-Storey Towers",
        tag: "Hostel Complex",
        verified: true,
        desc: "Iconic multi-story student accommodation towers with landscaped internal quad and sports nets.",
        url: "/lpu_photos/lpu-campus-17.jpg"
      },
      {
        title: "Girls Hostel Residential Wing",
        tag: "Secure Residential Area",
        verified: true,
        desc: "Secured hostel blocks with paved approach paths and 24/7 security reception.",
        url: "/lpu_photos/lpu-campus-18.jpg"
      },
      {
        title: "Hostel Dining & Student Mess Hall",
        tag: "Ramped Entrance",
        verified: true,
        desc: "Barrier-free access into the large student mess dining facilities with wide table aisles.",
        url: "/lpu_photos/lpu-campus-15.jpg"
      }
    ]
  }
]

export default function Campus360Viewer({ initialScene = "block-34" }) {
  const [activeTab, setActiveTab] = useState("tour360")
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    tourFacilities.some(f => f.id === initialScene) ? initialScene : "block-34"
  )
  const [lightboxPhoto, setLightboxPhoto] = useState(null)
  const [selectedHotspot, setSelectedHotspot] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [yaw, setYaw] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [fov, setFov] = useState(80)
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const dragStartRef = useRef({ x: 0, y: 0, startYaw: 0, startPitch: 0 })
  const containerRef = useRef(null)

  const facility = tourFacilities.find(f => f.id === selectedFacilityId) || tourFacilities[0]

  useEffect(() => {
    let animId
    if (autoRotate && !isDragging) {
      animId = requestAnimationFrame(() => {
        setYaw(prev => (prev + 0.08) % 360)
      })
    }
    return () => cancelAnimationFrame(animId)
  }, [autoRotate, isDragging, yaw])

  const handleMouseDown = e => {
    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startYaw: yaw,
      startPitch: pitch
    }
  }

  const handleMouseMove = useCallback(e => {
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    const sensitivity = 0.25

    setYaw((dragStartRef.current.startYaw - dx * sensitivity + 360) % 360)
    setPitch(Math.max(-40, Math.min(40, dragStartRef.current.startPitch + dy * sensitivity)))
  }, [isDragging])

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = e => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        startYaw: yaw,
        startPitch: pitch
      }
    }
  }

  const handleTouchMove = useCallback(e => {
    if (!isDragging || e.touches.length !== 1) return
    const dx = e.touches[0].clientX - dragStartRef.current.x
    const dy = e.touches[0].clientY - dragStartRef.current.y
    const sensitivity = 0.35

    setYaw((dragStartRef.current.startYaw - dx * sensitivity + 360) % 360)
    setPitch(Math.max(-40, Math.min(40, dragStartRef.current.startPitch + dy * sensitivity)))
  }, [isDragging])

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const zoomIn = () => setFov(prev => Math.max(50, prev - 10))
  const zoomOut = () => setFov(prev => Math.min(105, prev + 10))
  const resetView = () => {
    setYaw(0)
    setPitch(0)
    setFov(80)
  }

  const getCompassHeading = deg => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
    const idx = Math.round(deg / 45) % 8
    return directions[idx]
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col ${
        isFullscreen ? "h-screen rounded-none" : ""
      }`}
    >
      {/* Top Header Bar */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-violet-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">LPU 360° Real Campus Visual Tour</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-extrabold border border-teal-500/30">
                LPU Punjab Edition
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 360° panoramic walkthrough, real facility photographs, and official 3D tour
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 text-xs font-bold flex-wrap">
            <button
              onClick={() => setActiveTab("tour360")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "tour360"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>360° Official Walkthrough</span>
            </button>
            <button
              onClick={() => setActiveTab("nativeVR")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "nativeVR"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive VR Panorama</span>
            </button>
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "photos"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Real Photo Audits</span>
            </button>
            <button
              onClick={() => setActiveTab("satellite")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeTab === "satellite"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Google 3D Satellite</span>
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full flex-1 min-h-[500px] sm:min-h-[620px] bg-black select-none overflow-hidden">
        
        {/* TAB 1: OFFICIAL 360 WALKTHROUGH (https://iviewd.com/lpu2/) */}
        {activeTab === "tour360" && (
          <div className="w-full h-full min-h-[500px] sm:min-h-[620px] relative flex flex-col">
            <iframe
              src="https://iviewd.com/lpu2/"
              className="w-full h-full min-h-[500px] sm:min-h-[620px] border-0"
              title="Official Lovely Professional University 360 Virtual Tour (LPU2)"
              allow="accelerometer; gyroscope; magnetometer; vr; fullscreen; camera; microphone"
              loading="lazy"
            />
            {/* Top Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs shadow-xl flex items-center gap-2.5 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="font-bold text-slate-100">Live LPU Campus 360° Walkthrough</span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">
                  Powered by Official LPU2 3D VR Tour • iviewd.com/lpu2/
                </span>
              </div>
            </div>

            {/* Bottom Direct Launch Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <a
                href="https://iviewd.com/lpu2/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Open Direct in Full 360° VR</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: NATIVE INTERACTIVE VR PANORAMA ENGINE */}
        {activeTab === "nativeVR" && (
          <div
            className="w-full h-full min-h-[500px] sm:min-h-[620px] relative flex flex-col cursor-grab active:cursor-grabbing overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Equirectangular Panorama Canvas Background */}
            <div
              className="absolute inset-0 transition-transform duration-75 ease-out"
              style={{
                backgroundImage: `url(${facility.panoramaImage})`,
                backgroundSize: `${100 * (120 / fov)}% auto`,
                backgroundPosition: `${(yaw / 360) * 100}% ${50 - (pitch / 40) * 25}%`,
                backgroundRepeat: "repeat-x",
                transform: `scale(${1 + (80 - fov) * 0.005})`,
                filter: "brightness(0.96) contrast(1.05)"
              }}
            />

            {/* Gradient Overlays for Vignette Depth */}
            <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-50" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />

            {/* Top-Left Status HUD */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
              <div className="px-3.5 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs shadow-xl flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{facility.name}</span>
                    <span className="px-1.5 py-0.2 rounded bg-violet-500/30 text-violet-300 text-[10px] font-bold">
                      Score: {facility.score}/100
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block -mt-0.5">
                    Drag in 360° to look around • Click glowing hotspots to inspect accessibility
                  </span>
                </div>
              </div>

              {/* Dynamic Rotating Compass HUD */}
              <div className="self-start px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300 flex items-center gap-2 shadow-lg">
                <div
                  className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center transition-transform duration-100"
                  style={{ transform: `rotate(${-yaw}deg)` }}
                >
                  <Navigation className="w-3 h-3 text-red-500 fill-red-500" />
                </div>
                <span className="font-mono font-bold text-teal-400">
                  {getCompassHeading(yaw)} ({Math.round(yaw)}°)
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-[11px]">FOV: {fov}°</span>
              </div>
            </div>

            {/* Interactive Hotspots floating in 360 space */}
            {facility.hotspots?.map(hs => {
              const deltaYaw = ((hs.yaw - yaw + 540) % 360) - 180
              const isVisible = Math.abs(deltaYaw) < fov * 0.65

              if (!isVisible) return null

              const screenX = 50 + (deltaYaw / (fov * 0.65)) * 45
              const screenY = 50 - ((hs.pitch - pitch) / 35) * 35

              return (
                <div
                  key={hs.id}
                  style={{ left: `${screenX}%`, top: `${screenY}%` }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={e => {
                    e.stopPropagation()
                    setSelectedHotspot(hs)
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-violet-600/30 animate-ping absolute" />
                    <div className="w-8 h-8 rounded-full bg-violet-600 hover:bg-violet-500 border-2 border-white text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-slate-900/95 border border-slate-700 text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-90 group-hover:opacity-100 transition-opacity">
                      {hs.title}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Selected Hotspot Inspection Modal Card */}
            {selectedHotspot && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-md p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-violet-500/50 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500 text-violet-300 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{selectedHotspot.title}</h4>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        {selectedHotspot.tag}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  {selectedHotspot.desc}
                </p>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-teal-300">
                  <span className="font-bold text-slate-400 block mb-0.5">Physical Audit Verification:</span>
                  {selectedHotspot.specs}
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between gap-3 pointer-events-auto">
              <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-700 shadow-xl">
                <button
                  onClick={zoomIn}
                  title="Zoom In"
                  className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={zoomOut}
                  title="Zoom Out"
                  className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-slate-700" />
                <button
                  onClick={resetView}
                  title="Reset View"
                  className="px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors"
                >
                  Reset
                </button>
                <div className="h-4 w-px bg-slate-700" />
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  title={autoRotate ? "Pause Auto-Rotation" : "Enable Auto-Rotation"}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    autoRotate
                      ? "bg-violet-600 text-white shadow-xs"
                      : "hover:bg-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
                  <span>Auto 360°</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <a
                  href="https://earth.google.com/web/search/Lovely+Professional+University"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-2xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-xl flex items-center gap-2 transition-colors"
                >
                  <Satellite className="w-3.5 h-3.5 text-teal-400" />
                  <span>Open in Google Earth 3D</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REAL PHOTO AUDITS (LPU PUNJAB CAMPUS) */}
        {activeTab === "photos" && (
          <div className="w-full h-full p-4 sm:p-6 overflow-y-auto bg-slate-950 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-[21/9] min-h-[220px] max-h-[340px]">
              <img
                src={facility.heroImage}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-violet-500/80 text-white text-xs font-bold">
                    {facility.type}
                  </span>
                  <span className="text-xs text-slate-300 font-mono">
                    {facility.coordinates}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{facility.name}</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
                  {facility.description}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Verified LPU Punjab Architectural Audits
                  </h4>
                  <p className="text-xs text-slate-400">
                    High-resolution ground truth photographs confirming physical ramp angles, lift door widths, and step-free doors across LPU.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
                  {facility.photos.length} Verified Photos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {facility.photos.map((photo, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxPhoto(photo)}
                    className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-violet-500 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-violet-500/10"
                  >
                    <div className="aspect-video w-full overflow-hidden relative bg-slate-950">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                          <ShieldCheck className="w-3 h-3" />
                          {photo.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5">
                      <h5 className="font-bold text-white text-sm group-hover:text-violet-400 transition-colors">
                        {photo.title}
                      </h5>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {photo.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GOOGLE 3D SATELLITE MAP */}
        {activeTab === "satellite" && (
          <div className="w-full h-full min-h-[500px] sm:min-h-[620px] relative flex flex-col">
            <iframe
              src="https://maps.google.com/maps?q=Lovely%20Professional%20University%2C%20Phagwara&t=k&z=17&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[500px] sm:min-h-[620px] border-0"
              title="Lovely Professional University 3D Satellite Map"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 z-10 px-3.5 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white text-xs shadow-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <div>
                <span className="font-bold text-slate-100">Live Google 3D Satellite Map</span>
                <span className="text-[11px] text-slate-400 block -mt-0.5">Lovely Professional University • 600+ Acres Campus Overhead View</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
              <a
                href="https://earth.google.com/web/search/Lovely+Professional+University"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-xl flex items-center gap-1.5 transition-colors"
              >
                <span>Open in Google Earth / Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Photo Inspection */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video max-h-[70vh] bg-black">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-5 bg-slate-900">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {lightboxPhoto.tag}
                </span>
                <span className="text-xs text-slate-400">• Verified LPU Campus Facility</span>
              </div>
              <h4 className="text-lg font-bold text-white">{lightboxPhoto.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{lightboxPhoto.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
