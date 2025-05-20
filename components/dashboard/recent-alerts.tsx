"use client"

import { AlertTriangle, ArrowRight, Droplets, Home, Leaf, ShoppingBasket, Utensils, Activity, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAlerts } from "@/hooks/use-alerts"
import { format } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

// Fallback data for when API is not available
const fallbackAlerts = [
  {
    id: "1",
    indicator: {
      id: "1",
      name: "Score de Consommation Alimentaire",
      category: {
        id: "1",
        code: "food",
        name: "Sécurité Alimentaire"
      }
    },
    region: {
      id: "1",
      name: "Tillabéri"
    },
    value: 28,
    threshold_value: 35,
    threshold_type: "low" as const,
    severity: "high" as const,
    status: "PENDING" as const,
    created_at: "2023-05-15T00:00:00Z",
  },
  {
    id: "2",
    indicator: {
      id: "2",
      name: "Malnutrition Aiguë Globale",
      category: {
        id: "2",
        code: "nutrition",
        name: "Nutrition"
      }
    },
    region: {
      id: "2",
      name: "Maradi"
    },
    value: 15.2,
    threshold_value: 10,
    threshold_type: "high" as const,
    severity: "critical" as const,
    status: "PENDING" as const,
    created_at: "2023-05-12T00:00:00Z",
  },
  {
    id: "3",
    indicator: {
      id: "3",
      name: "Accès à l'eau potable",
      category: {
        id: "3",
        code: "water",
        name: "Eau et Hygiène"
      }
    },
    region: {
      id: "3",
      name: "Diffa"
    },
    value: 45,
    threshold_value: 60,
    threshold_type: "low" as const,
    severity: "medium" as const,
    status: "PENDING" as const,
    created_at: "2023-05-10T00:00:00Z",
  },
  {
    id: "4",
    indicator: {
      id: "4",
      name: "Diversité des sources de revenus",
      category: {
        id: "4",
        code: "vulnerability",
        name: "Vulnérabilité"
      }
    },
    region: {
      id: "4",
      name: "Zinder"
    },
    value: 1.8,
    threshold_value: 3,
    threshold_type: "low" as const,
    severity: "high" as const,
    status: "PENDING" as const,
    created_at: "2023-05-14T00:00:00Z",
  },
]

export function RecentAlerts({ extended = false }: RecentAlertsProps) {
  const { alerts, isLoading, error } = useAlerts();
  
  // Use API data if available, otherwise use fallback data
  const displayData = alerts.length > 0 ? alerts : fallbackAlerts;
  
  // Limit the number of alerts displayed if not extended
  const displayedAlerts = extended ? displayData : displayData.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error && !displayData.length) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {error}. Impossible de charger les alertes.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {displayedAlerts.map((alert) => {
        const CategoryIcon = categoryIcons[alert.indicator.category.code as keyof typeof categoryIcons] || AlertTriangle;
        const formattedDate = format(new Date(alert.created_at), "dd/MM/yyyy");
        
        return (
          <div key={alert.id} className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div
                className={`mt-0.5 rounded-full p-1 ${severityColors[alert.severity as keyof typeof severityColors]}`}
              >
                <CategoryIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{alert.indicator.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {alert.region.name} - {alert.value} ({formattedDate})
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

