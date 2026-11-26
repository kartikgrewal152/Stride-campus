# Project Structure and Module Ownership

The project keeps three generic modules under the Next.js app. `(frontend)` and `(module-X)` are Next.js route groups, so they organize ownership without adding URL segments. Existing public paths stay `/`, `/tour`, `/profile`, `/explore`, `/buildings/[slug]`, `/dashboard`, `/report`, and `/feed`.

```text
src/app/
  (frontend)/
    (module-1)/                 # Tour, profile, hero and global navigation
      page.js                   # /
      profile/page.js           # /profile
      tour/page.js              # /tour
      components/               # Hero, 360 viewer, sign-in modal, nav/footer
    (module-2)/                 # Campus map and facility directory
      explore/page.js           # /explore
      buildings/[slug]/page.js  # /buildings/[slug]
      components/               # Map, route card, building card
    (module-3)/                 # Reports, community and campus audit view
      dashboard/page.js         # /dashboard
      feed/page.js              # /feed
      report/page.js            # /report
      components/               # Feed, report, checklist and score UI
  backend/
    module-1/                   # Auth and weighted pathfinding
    module-2/                   # Campus graph data and spatial utilities
    module-3/                   # Report service, validation, storage and score summary
  api/
    routes/route.js             # Module 1 endpoint
    buildings/route.js          # Module 2 endpoint
    reports/route.js            # Module 3 endpoint
  layout.js, globals.css        # Shared Next.js setup
```

Next.js requires API route entry files inside `src/app/api/`, so those small handlers remain there and call the backend module logic. Shared layout and global styles stay at the app root.

## Module 1 – Tour, Profile and Routing

Frontend: the home introduction, 360 tour, profile page, sign-in modal, and global navigation. Backend: authentication helpers and weighted shortest-path routing; `/api/routes` exposes route results.

## Module 2 – Campus Map and Facilities

Frontend: interactive campus map, route comparison cards, facility cards, explore and building detail pages. Backend: campus graph/facility data and spatial formatting utilities; `/api/buildings` exposes the facility registry.

## Module 3 – Reports, Community and Audit

Frontend: report form, community feed, report cards, checklist, and dashboard score/alert UI. Backend: report validation/service, report storage event helper, and campus score summary; `/api/reports` handles report requests. The current score helper summarizes existing scores; no separate four-factor scoring formula exists in the source yet.