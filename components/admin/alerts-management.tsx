"use client"

import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  Check,
  Droplets,
  Home,
  Leaf,
  MoreHorizontal,
  ShoppingBasket,
  Utensils,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AlertsManagementProps {
  preview?: boolean
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
    status: "pending",
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
    status: "pending",
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
    status: "pending",
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
    status: "pending",
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
    status: "pending",
  },
  {
    id: 6,
    indicator: "Disponibilité de pâturages",
    category: "livestock",
    region: "Tahoua",
    value: 30,
    threshold: 50,
    severity: "high",
    date: "2023-05-13",
    status: "pending",
  },
  {
    id: 7,
    indicator: "Prix du mil",
    category: "market",
    region: "Niamey",
    value: 350,
    threshold: 300,
    severity: "low",
    date: "2023-05-09",
    status: "pending",
  },
]

export function AlertsManagement({ preview = false }: AlertsManagementProps) {
  const [alerts, setAlerts] = useState(alertsData)
  const [selectedAlerts, setSelectedAlerts] = useState<number[]>([])

  // Limiter le nombre d'alertes affichées si en mode aperçu
  const displayedAlerts = preview ? alerts.slice(0, 3) : alerts

  const handleSelectAlert = (id: number) => {
    setSelectedAlerts((prev) => (prev.includes(id) ? prev.filter((alertId) => alertId !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    if (selectedAlerts.length === displayedAlerts.length) {
      setSelectedAlerts([])
    } else {
      setSelectedAlerts(displayedAlerts.map((alert) => alert.id))
    }
  }

  const handleResolveAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
    setSelectedAlerts((prev) => prev.filter((alertId) => alertId !== id))
  }

  const handleResolveSelected = () => {
    setAlerts((prev) => prev.filter((alert) => !selectedAlerts.includes(alert.id)))
    setSelectedAlerts([])
  }

  return (
    <div className="space-y-4">
      {!preview && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedAlerts.length === displayedAlerts.length && displayedAlerts.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm">
              Sélectionner tout
            </label>
          </div>
          {selectedAlerts.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleResolveSelected} className="flex items-center gap-1">
              <Check className="h-4 w-4" />
              <span>Résoudre ({selectedAlerts.length})</span>
            </Button>
          )}
        </div>
      )}

      <div className="space-y-2">
        {displayedAlerts.map((alert) => {
          const CategoryIcon = categoryIcons[alert.category as keyof typeof categoryIcons]
          return (
            <div key={alert.id} className="flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                {!preview && (
                  <Checkbox
                    checked={selectedAlerts.includes(alert.id)}
                    onCheckedChange={() => handleSelectAlert(alert.id)}
                  />
                )}
                <div className={`rounded-full p-1 ${severityColors[alert.severity as keyof typeof severityColors]}`}>
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
              <div className="flex items-center gap-2">
                {!preview && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleResolveAlert(alert.id)}>
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Résoudre</span>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Plus d'options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                    <DropdownMenuItem>Assigner</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleResolveAlert(alert.id)}>Résoudre</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>

      {preview && (
        <Button variant="outline" className="w-full" asChild>
          <a href="/admin/alerts">Gérer toutes les alertes</a>
        </Button>
      )}
    </div>
  )
}

