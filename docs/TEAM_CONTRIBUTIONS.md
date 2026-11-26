# Module Contribution Guide

The three folders use generic names (`module-1`, `module-2`, `module-3`). Their frontend pages sit inside Next.js route groups, so the existing website URLs do not change. API handler files stay under `src/app/api/` because Next.js discovers endpoints there; each handler is assigned to its module below.

## Module 1 – Tour, Profile and Routing

- Frontend: home page, `/tour`, `/profile`, `HeroSection`, `Campus360Viewer`, `GoogleSignInModal`, and shared navigation.
- Backend: `src/app/backend/module-1/auth.js` and `pathfinding.js`.
- API entrypoint: `src/app/api/routes/route.js`.

## Module 2 – Campus Map and Facilities

- Frontend: `/explore`, `/buildings/[slug]`, `CampusMap`, `RouteCard`, and `BuildingCard`.
- Backend: `src/app/backend/module-2/campusData.js` and `utils.js`.
- API entrypoint: `src/app/api/buildings/route.js`.

## Module 3 – Reports, Community and Audit

- Frontend: `/report`, `/feed`, `/dashboard`, report/community/checklist components, score display and recent alerts.
- Backend: `src/app/backend/module-3/reportService.js`, `reportValidation.js`, `reportsStorage.js`, and `campusScoreSummary.js`.
- API entrypoint: `src/app/api/reports/route.js`.
- Accuracy note: the current scoring helper averages, counts and sorts existing building scores. A separate four-factor score calculation is not present in this project yet.