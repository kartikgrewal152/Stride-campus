const requiredFields = ["buildingId", "barrierType", "severity", "description"]

export function getMissingReportFields(report) {
  return requiredFields.filter(field => !report?.[field])
}
