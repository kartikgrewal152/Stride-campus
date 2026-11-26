# Stride — System Architecture & Verification Specification

**System Name:** Stride — Campus Accessibility Navigator  
**Core Lead Architect:** Pravesh (Reg. No. 12419500)  
**Geodata Lead:** Kartik Grewal (Reg. No. 12406604)  
**Full-Stack & Audit Lead:** Konatala Naveen (Reg. No. 12417251)  
**Academic Session:** 2026–2027 Capstone Engineering Project  
**Target Environment:** Lovely Professional University (Punjab)

---

## 1. Architectural Stack

```
+--------------------------------------------------------------------------+
|                            Client Browser Layer                          |
|  - Next.js 16 App Router (Client Components / Server Prerendering)       |
|  - Tailwind CSS v4 Responsive Viewport                                   |
|  - Lucide Vector Iconography                                             |
+--------------------------------------------------------------------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
+-----------------------+                           +----------------------+
| 2D Interactive Canvas |                           | 360° VR & Sat Engine |
| - 52 Building Nodes   |                           | - iViewD LPU2 Tour   |
| - 70+ Weighted Edges  |                           | - Equirectangular VR |
| - Dynamic Dijkstra    |                           | - Sensor Orientation |
+-----------------------+                           +----------------------+
          |                                                   |
          +-------------------------+-------------------------+
                                    |
+--------------------------------------------------------------------------+
|                           Core Business Logic                            |
|  - Weighted Dijkstra Solver (src/app/backend/module-1/pathfinding.js)                      |
|  - Accessibility Scorecard Normalizer (0-100 Rating Matrix)              |
|  - Crowdsourced Hazard Aggregator (Local State / Server Actions)         |
|  - Multi-Tab View Controller (Walkthrough, Panorama, Audits, Satellite)  |
+--------------------------------------------------------------------------+
                                    |
+--------------------------------------------------------------------------+
|                           Asset & Data Storage                           |
|  - Local High-Res LPU Punjab Photography (/public/lpu_photos/)           |
|  - 52 Normalized Facility Nodes & Adjacency Lists                        |
|  - Official iViewD LPU2 krpano WebGL Tour Endpoint                       |
+--------------------------------------------------------------------------+
```

---

## 2. 360° Inspection Engine Architecture

The visual inspection module (`src/app/(frontend)/(module-1)/components/Campus360Viewer.jsx`) provides pre-trip verification through four synchronized viewing modes:

1. **Official LPU2 360° Walkthrough**:
   - Integrates `https://iviewd.com/lpu2/` inside a responsive sandboxed iframe with hardware acceleration flags (`accelerometer`, `gyroscope`, `magnetometer`, `vr`, `fullscreen`).
   - Connects students directly to official Lovely Professional University virtual tour scenes.

2. **Native Equirectangular VR Panorama**:
   - Custom HTML5 2D canvas transformation projecting spherical equirectangular panoramic assets onto a viewport.
   - Computes normalized viewing angles $(\theta, \phi)$ with smooth inertia damping:
     $$\theta_{t+1} = \theta_t + v_\theta \cdot \Delta t$$
   - Dynamic floating 3D hotspots mapped to spherical coordinates $(x_s, y_s, z_s)$ that track user orientation in real-time.

3. **Ground-Truth Photographic Audits**:
   - High-resolution local image cards serving verified LPU campus photographs.
   - Lightbox modal with zoom, accessibility status tags, and architectural specifications.

4. **Live Google 3D Satellite Layer**:
   - Direct satellite perspective over Lovely Professional University ($31.2536^\circ\text{ N}, 75.7037^\circ\text{ E}$).
   - Visual verification of open corridors, trees, and ground construction.

---

## 3. Test Cases & Verification Suite

| Test ID | Module Under Test | Input Condition | Expected Output | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC1** | Dijkstra Engine | Start: Block 1, Dest: BH-6, StepFree: ON | Path avoids Block 4 kerb; routes via Block 34 & UniMall | 1,140 m, 0 steps | **PASS** |
| **TC2** | Step Exclusion | Start: UniMall, Dest: OAT, StepFree: ON | Avoids stepped amphitheatre interior; targets rim | Steps avoided | **PASS** |
| **TC3** | Barrier Obstacle | Add barrier to corridor B34-B37 | Dijkstra immediately reroutes through B30 plaza | Dynamic Reroute | **PASS** |
| **TC4** | 360 Viewer | Load `/tour` | Embeds `iviewd.com/lpu2/` without license error | HTTP 200 OK | **PASS** |
| **TC5** | VR Inertia | Mouse drag on panorama canvas | Smooth decelerating yaw/pitch rotation | 60 FPS Smooth | **PASS** |
| **TC6** | Hotspot Hit Test | Click on "North Ramp 1:12" hotspot | Expands detail drawer with slope specs & photos | Drawer Opened | **PASS** |
| **TC7** | Asset Availability | Load 52 building detail pages | All `/lpu_photos/lpu-campus-*.jpg` return status 200 | 0 Broken Links | **PASS** |
| **TC8** | Live Barrier Post | Submit report via modal form | Dispatch posted to feed with timestamp and tag | Persisted | **PASS** |
| **TC9** | Responsive Design | Viewport resized from 375px to 1920px | Header collapses to drawer; canvas scales fluidly | No Overflow | **PASS** |
| **TC10**| Next.js SSG | `npm run build` | 66 pages prerendered statically without SSR errors | Build Success | **PASS** |

---

## 4. Verification Sign-Off

- **Architect & Lead Developer:** Pravesh (12419500) — *Signed & Verified*
- **Geodata Lead:** Kartik Grewal (12406604) — *Signed & Verified*
- **Full-Stack Lead:** Konatala Naveen (12417251) — *Signed & Verified*

