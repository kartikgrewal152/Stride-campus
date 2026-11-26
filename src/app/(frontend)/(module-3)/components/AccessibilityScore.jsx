"use client"

export default function AccessibilityScore({ score, size = "md", dark = false }) {
  const radius = size === "sm" ? 22 : size === "lg" ? 42 : 32
  const stroke = size === "sm" ? 4 : size === "lg" ? 7 : 5
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444"
  const trackColor = dark ? "rgba(255, 255, 255, 0.15)" : "#E2E8F0"

  const svgSize = (radius + stroke) * 2 + 4
  const center = svgSize / 2

  const textSize = size === "sm" ? "text-xs font-bold" : size === "lg" ? "text-2xl font-black" : "text-base font-bold"

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: svgSize, height: svgSize }}>
      <svg width={svgSize} height={svgSize} className="absolute inset-0 -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span className={`${textSize} relative z-10`} style={{ color: dark ? (score >= 80 ? "#34D399" : score >= 60 ? "#FBBF24" : "#F87171") : color }}>
        {score}
      </span>
    </div>
  )
}
