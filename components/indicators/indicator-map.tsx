"use client"

import { useMemo } from "react"

interface IndicatorMapProps {
  data?: {
    region: string
    value: number
  }[]
  category?: string
  thresholds?: {
    normal?: number
    warning?: number
    alert?: number
    critical?: number
  }
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

// Données fictives pour la carte
const mockData = [
  { region: "Nouakchott", value: 75 },
  { region: "Nouadhibou", value: 62 },
  { region: "Kiffa", value: 45 },
  { region: "Rosso", value: 58 },
  { region: "Atar", value: 70 },
  { region: "Néma", value: 52 },
]

// Fonction pour déterminer la couleur en fonction de la valeur et des seuils
const getColorByValue = (value: number, thresholds: IndicatorMapProps["thresholds"] = {}) => {
  if (thresholds.critical && value >= thresholds.critical) return "#ef4444" // Rouge
  if (thresholds.alert && value >= thresholds.alert) return "#f97316" // Orange
  if (thresholds.warning && value >= thresholds.warning) return "#eab308" // Jaune
  return "#22c55e" // Vert
}

export function IndicatorMap({
  data = mockData,
  category = "food",
  thresholds = { normal: 50, warning: 60, alert: 70, critical: 80 },
}: IndicatorMapProps) {
  // Déterminer la couleur en fonction de la catégorie
  const mapColor = categoryColors[category] || "#3b82f6"

  // Calculer les valeurs min et max
  const { minValue, maxValue } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        minValue: 0,
        maxValue: 100,
      }
    }

    const values = data.map((item) => item.value)
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    }
  }, [data])

  // Trier les données par valeur (décroissante)
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return mockData.sort((a, b) => b.value - a.value)
    return [...data].sort((a, b) => b.value - a.value)
  }, [data])

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 relative">
        {/* Ici, nous afficherions normalement une carte interactive avec une bibliothèque comme Leaflet ou MapBox */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-muted-foreground">Carte interactive de la Mauritanie avec données par région</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Légende</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-xs">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="text-xs">Attention</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            <span className="text-xs">Alerte</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-xs">Critique</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Valeurs par région</h4>
        <div className="max-h-[150px] overflow-y-auto pr-2">
          <div className="space-y-2">
            {sortedData.map((item) => (
              <div key={item.region} className="flex items-center justify-between">
                <span className="text-xs">{item.region}</span>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: getColorByValue(item.value, thresholds) }}
                  />
                  <span className="text-xs font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

