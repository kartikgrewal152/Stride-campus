# Stride — Accessible Campus Movement & Navigation System
> **Lovely Professional University (LPU Punjab) • Capstone Project (Problem P12: "The Ramp That Ends at a Step")**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Accessibility Score](https://img.shields.io/badge/Campus%20Audited-52%20Blocks-success)](#)

---

## 📌 Project Overview

**Stride** is an institutional campus navigation and accessibility audit platform engineered specifically for the 600-acre campus of **Lovely Professional University (LPU Punjab, Phagwara)**. 

Standard map providers (such as Google Maps or Apple Maps) calculate walking directions assuming able-bodied pedestrians—frequently directing wheelchair users, students on crutches, and mobility-impaired individuals into 6-inch kerbs, unramped plinths, broken lifts, or steep staircases. 

Stride solves this through:
1. **Barrier-Aware Dijkstra Routing Engine**: Computes verified step-free corridors across 52 university facilities and 70+ interconnected paths.
2. **Official LPU2 360° Virtual Reality Pre-Trip Inspection**: Direct integration with the official LPU virtual tour (`iviewd.com/lpu2/`), native 360 equirectangular panorama viewer with interactive accessibility hotspots, and real photographic audits.
3. **Crowdsourced Live Barrier Wire**: Real-time reporting engine allowing students and security marshals to flag sudden construction ditches, lift outages, or blocked ramps in seconds.
4. **Institutional Accessibility Dashboard**: Quantitative scorecard rating each campus facility (0–100) based on ramp gradients, automatic door clearances, tactile ground surface indicators (TGSI), and accessible washroom availability.

---

## 🧩 Project Modules

The source is grouped into `(frontend)/(module-1..3)` route groups and `backend/module-1..3` inside `src/app/`. Module 1 owns the tour, profile and routing; Module 2 owns the map and facility directory; Module 3 owns reports, community and the audit dashboard. Existing page URLs stay unchanged. API entry files stay in `src/app/api/` and call their module backend helpers.

| Module | Frontend work | Backend work | Presentation level |
|---|---|---|---|
| **Module 1 – Tour, Profile & Routing** | Home, 360 tour, profile, sign-in modal and shared navigation | Authentication, weighted pathfinding and `/api/routes` | Tour, session and route flow |
| **Module 2 – Campus Map & Facilities** | Explore map, route comparison, facility cards and building detail | Campus graph, spatial utilities and `/api/buildings` | Map and facility directory |
| **Module 3 – Reports, Community & Audit** | Report form, feed, checklists, dashboard score/alert UI | Report service, validation, storage helper, score summary and `/api/reports` | Report-to-dashboard workflow |

Module 3 currently summarizes existing facility scores; the source does not contain a standalone four-factor score formula yet. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the module file tree.

---

## 🚀 Key Features

### 1. Step-Free Campus Routing (Weighted Dijkstra)
- Evaluates the campus network graph $G = (V, E)$ where vertices represent 52 campus facilities and edges represent verified walkways.
- Edge weights factor physical distance, ramp gradient slope penalty, surface texture resistance, and real-time obstacle flags:
  $$W_{eff} = D \times \left(1 + \frac{\text{slopePenalty}}{100} + \frac{\text{surfacePenalty}}{100}\right) + B_{\text{penalty}}$$
- Guarantees true zero-step navigation between academic blocks (e.g., Block 34 to Block 37 Central Library, UniMall, and residential hostels).

### 2. 360° Immersive Inspection & Photographic Audits
- **Official LPU2 Walkthrough**: Powered by `https://iviewd.com/lpu2/` for an official, high-definition 360° tour of university corridors.
- **Native 360° Panorama Viewer**: High-performance canvas engine with touch-drag, mouse-look, compass orientation HUD, FOV zooming (50°–105°), and auto-rotation.
- **Interactive Accessibility Hotspots**: Clickable floating markers in 3D space detailing ramp slopes (e.g., 1:12 slope compliance), automatic sensor door widths (950mm), and lift elevator statuses.
- **Real Photo Audits**: Authentic ground-truth photography of Lovely Professional University facilities.
- **Live Google 3D Satellite Layer**: High-resolution overhead satellite inspection.

### 3. Institutional Accessibility Matrix
- Audits 52 facilities across 4 major accessibility dimensions:
  - **Ramp Compliance (35%)**: 1:12 slope standard, handrail provision, non-skid surface.
  - **Elevator Reliability (25%)**: Operating state, braille buttons, voice floor annunciators.
  - **Entrance Usability (20%)**: Automatic sensor sliding doors or low-effort push doors, zero threshold lip.
  - **Sanitary Accessibility (20%)**: Grab rails, wheel-in turning radius $\ge 1500\text{mm}$.
- Generates transparent institutional grades (e.g., *Certified Accessible*, *Moderate Barriers*, *Action Required*).

### 4. Real-Time Student Barrier Reporting
- Instant community dispatch system allowing students to report temporary hazards:
  - 🚧 Construction ditch or trenching
  - 🛑 Broken lift / elevator maintenance
  - ⚠️ Steep unramped kerb / temporary stage blocking pathway
  - 💧 Waterlogged pathway or slick tiles

---

## 🗺️ Campus Network Coverage

Stride maps **52 major landmarks and facilities** across Lovely Professional University:

- **Central Administrative & Gateway**: Gate 1, Gate 2, Gate 3, Gate 4, Block 1 (Admission & Central Admin), Block 2 (Examination Dept).
- **Academic Complexes**: 
  - Block 30 (Mathematics & Basic Sciences)
  - Block 32 (Division of Student Welfare - DSW & Mittal School of Business)
  - Block 34 (School of Computer Science & Engineering - CSE)
  - Block 35 (School of Architecture & Design)
  - Block 36 (School of Electronics & Communication)
  - Block 37 (Iconic 5-Story Central Library)
  - Block 38 (School of Computer Applications & Ph.D. Research Wing)
  - Blocks 3, 4, 13, 14, 25, 26, 27, 28, 29, 31, 33, 55, 56
- **Student Life & Amenities**: UniMall, Student Activity Center (Robopark), Uni-Hospital (24/7 Medical Wing), Shanti Devi Mittal Auditorium, Baldev Raj Mittal Unipolis, Open Air Theatre (OAT), Food Courts.
- **Sports & Recreation**: Main Sports Stadium, Multi-Purpose Turf, Indoor Sports Arena.
- **Residential Zones**: Boys Hostels (BH-1 through BH-8), Girls Hostels (GH-1 through GH-6), Faculty Apartments.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Frontend Library**: React 19
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Mapping & VR**: HTML5 Canvas 2D Vector Graph, Krpano / iViewD 360 Engine (`iviewd.com/lpu2/`), Google Earth / Satellite API
- **State Management**: React `useState`, `useCallback`, `useMemo`, `useRef` with client-side local caching
- **Build Pipeline**: Static site prerendering (SSG) with dynamic client interaction

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- `npm` or `yarn`

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Pravesh0005/stride-campus-accessibility.git
   cd stride-campus-accessibility
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 📄 Deliverables & Academic Documentation

The complete project report and presentation deck are available in the repository documentation directory:
- 📄 **Academic Project Report (PDF)**: Comprehensive 16-page technical report adhering to academic formatting standards.
- 📝 **Project Report (DOCX)**: Editable Word document with complete mathematical formulations, system diagrams, and test logs.
- 📊 **Presentation Deck (PPTX)**: High-impact 10-slide capstone presentation for committee evaluation.

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.


---

## Source code organization

Inside `src/app/`, pages are grouped under `(frontend)/(module-1..3)` and backend helpers under `backend/module-1..3`, aligned with the presentation ownership split. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the structure.
