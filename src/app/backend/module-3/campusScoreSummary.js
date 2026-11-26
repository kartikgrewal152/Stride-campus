// Keep the dashboard math in one small server-side helper.
export function getCampusScoreSummary(buildingList) {
  const totalScore = buildingList.reduce((sum, building) => sum + building.accessibility.score, 0)
  const average = buildingList.length ? Math.round(totalScore / buildingList.length) : 0
  const fullyAccessible = buildingList.filter(building => building.accessibility.score >= 80).length
  const needsAttention = buildingList.filter(building => building.accessibility.score < 50).length
  const lowestScoresFirst = [...buildingList].sort(
    (first, second) => first.accessibility.score - second.accessibility.score
  )
  return { average, fullyAccessible, needsAttention, lowestScoresFirst }
}

