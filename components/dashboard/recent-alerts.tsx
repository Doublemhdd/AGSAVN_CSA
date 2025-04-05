"use client"

import { AlertTriangle, ArrowRight, Droplets, Home, Leaf, ShoppingBasket, Utensils, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RecentAlertsProps {
  extended?: boolean
}

const categoryIcons = {
  food: Utensils,
  nutrition: Activity,
  water: Droplets,
  vulnerability: Home,
  agriculture: Leaf,
  livestock: AlertTriangle,
  market: ShoppingBasket,
}

const severityColors = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
}

// Données fictives pour les alertes
const alertsData = [
  {
    id: 1,
    indicator: "Score de Consommation Alimentaire",
    category: "food",
    region: "Tillabéri",
    value: 28,
    threshold: 35,
    severity: "high",
    date: "2023-05-15",
  },
  {
    id: 2,
    indicator: "Malnutrition Aiguë Globale",
    category: "nutrition",
    region: "Maradi",
    value: 15.2,
    threshold: 10,
    severity: "critical",
    date: "2023-05-12",
  },
  {
    id: 3,
    indicator: "Accès à l'eau potable",
    category: "water",
    region: "Diffa",
    value: 45,
    threshold: 60,
    severity: "medium",
    date: "2023-05-10",
  },
  {
    id: 4,
    indicator: "Diversité des sources de revenus",
    category: "vulnerability",
    region: "Zinder",
    value: 1.8,
    threshold: 3,
    severity: "high",
    date: "2023-05-14",
  },
  {
    id: 5,
    indicator: "Pluviométrie",
    category: "agriculture",
    region: "Dosso",
    value: 25,
    threshold: 40,
    severity: "medium",
    date: "2023-05-11",
  },
]

export function RecentAlerts({ extended = false }: RecentAlertsProps) {
  // Limiter le nombre d'alertes affichées si non étendu
  const displayedAlerts = extended ? alertsData : alertsData.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayedAlerts.map((alert) => {
        const CategoryIcon = categoryIcons[alert.category as keyof typeof categoryIcons]
        return (
          <div key={alert.id} className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`mt-0.5 rounded-full p-1 ${severityColors[alert.severity as keyof typeof severityColors]}`}
              >
                <CategoryIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{alert.indicator}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {alert.region} - {alert.value} ({alert.date})
                  </p>
                  <Badge
                    variant="outline"
                    className={`${severityColors[alert.severity as keyof typeof severityColors]} text-white text-xs`}
                  >
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Voir les détails</span>
            </Button>
          </div>
        )
      })}
      {!extended && (
        <Button variant="outline" className="w-full" asChild>
          <a href="/alerts">Voir toutes les alertes</a>
        </Button>
      )}
    </div>
  )
}

