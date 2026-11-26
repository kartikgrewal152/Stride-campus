/**
 * @module PathfindingEngine
 * @author Pravesh (Reg. No. 12419500) — Team Lead & Core Engine Architect
 * @subsystem Core Routing, VR & Auth Subsystem
 * @description Weighted Dijkstra pathfinding engine with gradient impedance and step-exclusion filtering.
 */

import { buildings, routes } from "@/lib/campusData"

function buildGraph(accessibleOnly) {
  const graph = {}

  buildings.forEach(b => {
    graph[b.id] = []
  })

  routes.forEach(route => {
    if (accessibleOnly && !route.accessible) return

    const weight = accessibleOnly && route.barriers.length > 0
      ? route.distance * 1.3
      : route.distance

    graph[route.from].push({ node: route.to, weight, route })
    graph[route.to].push({ node: route.from, weight, route })
  })

  return graph
}

export function findShortestPath(startId, endId, accessibleOnly = true) {
  const graph = buildGraph(accessibleOnly)

  if (!graph[startId] || !graph[endId]) return null

  const distances = {}
  const previous = {}
  const routesTaken = {}
  const visited = new Set()
  const queue = []

  buildings.forEach(b => {
    distances[b.id] = Infinity
    previous[b.id] = null
    routesTaken[b.id] = null
  })

  distances[startId] = 0
  queue.push({ node: startId, distance: 0 })

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance)
    const { node: current } = queue.shift()

    if (current === endId) break
    if (visited.has(current)) continue
    visited.add(current)

    const neighbors = graph[current] || []

    for (const neighbor of neighbors) {
      if (visited.has(neighbor.node)) continue

      const newDist = distances[current] + neighbor.weight
      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist
        previous[neighbor.node] = current
        routesTaken[neighbor.node] = neighbor.route
        queue.push({ node: neighbor.node, distance: newDist })
      }
    }
  }

  if (distances[endId] === Infinity) return null

  const path = []
  const pathRoutes = []
  let current = endId

  while (current !== null) {
    path.unshift(current)
    if (routesTaken[current]) {
      pathRoutes.unshift(routesTaken[current])
    }
    current = previous[current]
  }

  const totalBarriers = pathRoutes.reduce((acc, r) => acc + r.barriers.length, 0)

  return {
    path,
    routes: pathRoutes,
    totalDistance: Math.round(distances[endId]),
    estimatedTime: Math.ceil(distances[endId] / 60),
    totalBarriers,
    accessible: pathRoutes.every(r => r.accessible)
  }
}

export function findAllPaths(startId, endId) {
  const accessible = findShortestPath(startId, endId, true)
  const shortest = findShortestPath(startId, endId, false)

  const results = []

  if (accessible) {
    results.push({ ...accessible, label: "Accessible Route", recommended: true })
  }

  if (shortest && (!accessible || shortest.totalDistance < accessible.totalDistance * 0.8)) {
    results.push({ ...shortest, label: "Shortest Route", recommended: false })
  }

  return results
}

export function getConnectedBuildings(buildingId) {
  return routes
    .filter(r => r.from === buildingId || r.to === buildingId)
    .map(r => ({
      building: r.from === buildingId ? r.to : r.from,
      distance: r.distance,
      accessible: r.accessible,
      barriers: r.barriers
    }))
}


