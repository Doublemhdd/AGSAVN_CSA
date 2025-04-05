"use client"

import { Activity, AlertTriangle, Droplets, Home, Leaf, ShoppingBasket, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const indicators = [
  {
    category: "food",
    title: "Sécurité Alimentaire",
    icon: Utensils,
    description: "Indicateurs liés à la consommation et à l'accès à la nourriture",
    progress: 75,
    count: 4,
    alertCount: 2,
  },
  {
    category: "nutrition",
    title: "Nutrition",
    icon: Activity,
    description: "Indicateurs liés à l'état nutritionnel de la population",
    progress: 82,
    count: 5,
    alertCount: 1,
  },
  {
    category: "water",
    title: "Eau et Assainissement",
    icon: Droplets,
    description: "Indicateurs liés à l'accès à l'eau potable et aux installations sanitaires",
    progress: 68,
    count: 3,
    alertCount: 1,
  },
  {
    category: "vulnerability",
    title: "Vulnérabilité des Ménages",
    icon: Home,
    description: "Indicateurs liés à la résilience et à la vulnérabilité des ménages",
    progress: 60,
    count: 4,
    alertCount: 1,
  },
  {
    category: "agriculture",
    title: "Agriculture",
    icon: Leaf,
    description: "Indicateurs liés à la production agricole et aux conditions climatiques",
    progress: 55,
    count: 6,
    alertCount: 1,
  },
  {
    category: "livestock",
    title: "Élevage",
    icon: AlertTriangle,
    description: "Indicateurs liés à la santé et à la production du bétail",
    progress: 70,
    count: 4,
    alertCount: 0,
  },
  {
    category: "market",
    title: "Marché",
    icon: ShoppingBasket,
    description: "Indicateurs liés aux prix et à la disponibilité des produits sur les marchés",
    progress: 85,
    count: 3,
    alertCount: 1,
  },
]

export function IndicatorCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {indicators.map((indicator) => {
        const Icon = indicator.icon
        return (
          <Card key={indicator.category} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{indicator.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{indicator.description}</CardDescription>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{indicator.count} indicateurs</span>
                {indicator.alertCount > 0 && (
                  <span className="text-sm text-red-500 font-medium">
                    {indicator.alertCount} alerte{indicator.alertCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <Progress value={indicator.progress} className="h-2" />
              <div className="mt-3 text-right">
                <a href={`/indicators/${indicator.category}`} className="text-xs text-blue-500 hover:underline">
                  Voir les détails
                </a>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

