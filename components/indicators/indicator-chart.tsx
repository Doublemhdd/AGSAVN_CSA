"use client"

import { useMemo } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine } from "recharts"
import { Card } from "@/components/ui/card"

interface IndicatorChartProps {
  data?: {
    date: string
    value: number
  }[]
  category?: string
  unit?: string
  thresholds?: {
    normal?: number
    warning?: number
    alert?: number
    critical?: number
  }
  showThresholds?: boolean
}

// Définir les couleurs par catégorie
const categoryColors: Record<string, string> = {
  food: "#ef4444",
  nutrition: "#8b5cf6",
  water: "#3b82f6",
  vulnerability: "#f97316",
  agriculture: "#22c55e",
  livestock: "#eab308",
  market: "#ec4899",
}

// Données fictives pour le graphique
const mockData = [
  { date: "2023-01-01", value: 65 },
  { date: "2023-02-01", value: 59 },
  { date: "2023-03-01", value: 62 },
  { date: "2023-04-01", value: 58 },
  { date: "2023-05-01", value: 63 },
  { date: "2023-06-01", value: 67 },
]

// Fonction pour formater la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    day: "numeric",
  }).format(date)
}

export function IndicatorChart({
  data = mockData,
  category = "food",
  unit = "%",
  thresholds = { normal: 50, warning: 60, alert: 70, critical: 80 },
  showThresholds = false,
}: IndicatorChartProps) {
  // Déterminer la couleur en fonction de la catégorie
  const chartColor = categoryColors[category] || "#3b82f6"

  // Formater les données pour le graphique
  const chartData = useMemo(() => {
    if (!data || data.length === 0)
      return mockData.map((item) => ({
        ...item,
        date: formatDate(item.date),
      }))

    return data.map((item) => ({
      ...item,
      date: formatDate(item.date),
    }))
  }, [data])

  // Calculer les valeurs min et max pour les axes
  const minValue = useMemo(() => {
    if (!data || data.length === 0) return 0

    const dataMin = Math.min(...data.map((item) => item.value))
    const thresholdMin = Math.min(
      thresholds.normal || Number.POSITIVE_INFINITY,
      thresholds.warning || Number.POSITIVE_INFINITY,
      thresholds.alert || Number.POSITIVE_INFINITY,
      thresholds.critical || Number.POSITIVE_INFINITY,
    )
    return Math.floor(Math.min(dataMin, thresholdMin !== Number.POSITIVE_INFINITY ? thresholdMin : dataMin) * 0.9)
  }, [data, thresholds])

  const maxValue = useMemo(() => {
    if (!data || data.length === 0) return 100

    const dataMax = Math.max(...data.map((item) => item.value))
    const thresholdMax = Math.max(
      thresholds.normal || 0,
      thresholds.warning || 0,
      thresholds.alert || 0,
      thresholds.critical || 0,
    )
    return Math.ceil(Math.max(dataMax, thresholdMax) * 1.1)
  }, [data, thresholds])

  // Personnaliser le tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-2 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            {payload[0].value} {unit}
          </p>
        </Card>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis
          domain={[minValue, maxValue]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={40}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip content={<CustomTooltip />} />

        {showThresholds && thresholds.warning && (
          <ReferenceLine
            y={thresholds.warning}
            stroke="#eab308"
            strokeDasharray="3 3"
            label={{
              value: "Attention",
              position: "insideTopLeft",
              fill: "#eab308",
              fontSize: 10,
            }}
          />
        )}
        {showThresholds && thresholds.alert && (
          <ReferenceLine
            y={thresholds.alert}
            stroke="#f97316"
            strokeDasharray="3 3"
            label={{
              value: "Alerte",
              position: "insideTopLeft",
              fill: "#f97316",
              fontSize: 10,
            }}
          />
        )}
        {showThresholds && thresholds.critical && (
          <ReferenceLine
            y={thresholds.critical}
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{
              value: "Critique",
              position: "insideTopLeft",
              fill: "#ef4444",
              fontSize: 10,
            }}
          />
        )}

        <Line
          type="monotone"
          dataKey="value"
          stroke={chartColor}
          strokeWidth={2}
          dot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: chartColor, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

