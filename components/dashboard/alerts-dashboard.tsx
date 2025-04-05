"use client"

import { useState } from "react"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Droplets,
  Filter,
  Home,
  Leaf,
  ShoppingBasket,
  Utensils,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categoryIcons = {
  food: Utensils,
  nutrition: Activity,
  water: Droplets,
  vulnerability: Home,
  agriculture: Leaf,
  livestock: AlertTriangle,
  market: ShoppingBasket,
  overview: BarChart3,
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
  {
    id: 6,
    indicator: "Disponibilité de pâturages",
    category: "livestock",
    region: "Tahoua",
    value: 30,
    threshold: 50,
    severity: "high",
    date: "2023-05-13",
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
  },
  {
    id: 8,
    indicator: "Prévalence de l'Insécurité Alimentaire",
    category: "food",
    region: "Agadez",
    value: 42,
    threshold: 30,
    severity: "critical",
    date: "2023-05-08",
  },
]

export function AlertsDashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")

  // Filtrer les alertes en fonction des sélections
  const filteredAlerts = alertsData.filter((alert) => {
    const categoryMatch = selectedCategory === "all" || alert.category === selectedCategory
    const severityMatch = selectedSeverity === "all" || alert.severity === selectedSeverity
    return categoryMatch && severityMatch
  })

  // Calculer les statistiques
  const totalAlerts = filteredAlerts.length
  const criticalAlerts = filteredAlerts.filter((a) => a.severity === "critical").length
  const highAlerts = filteredAlerts.filter((a) => a.severity === "high").length
  const mediumAlerts = filteredAlerts.filter((a) => a.severity === "medium").length
  const lowAlerts = filteredAlerts.filter((a) => a.severity === "low").length

  // Calculer les alertes par catégorie
  const alertsByCategory = {
    food: filteredAlerts.filter((a) => a.category === "food").length,
    nutrition: filteredAlerts.filter((a) => a.category === "nutrition").length,
    water: filteredAlerts.filter((a) => a.category === "water").length,
    vulnerability: filteredAlerts.filter((a) => a.category === "vulnerability").length,
    agriculture: filteredAlerts.filter((a) => a.category === "agriculture").length,
    livestock: filteredAlerts.filter((a) => a.category === "livestock").length,
    market: filteredAlerts.filter((a) => a.category === "market").length,
  }

  // Calculer les régions affectées
  const affectedRegions = [...new Set(filteredAlerts.map((a) => a.region))].length

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tableau de bord des alertes</CardTitle>
          <CardDescription>Suivi des alertes actives par catégorie et sévérité</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              <SelectItem value="food">Sécurité Alimentaire</SelectItem>
              <SelectItem value="nutrition">Nutrition</SelectItem>
              <SelectItem value="water">Eau et Assainissement</SelectItem>
              <SelectItem value="vulnerability">Vulnérabilité</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              <SelectItem value="livestock">Élevage</SelectItem>
              <SelectItem value="market">Marché</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sévérité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les sévérités</SelectItem>
              <SelectItem value="critical">Critique</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="low">Faible</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="list">Liste des alertes</TabsTrigger>
            <TabsTrigger value="categories">Par catégorie</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes totales</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalAlerts}</div>
                  <p className="text-xs text-muted-foreground">{affectedRegions} régions affectées</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes critiques</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{criticalAlerts}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((criticalAlerts / totalAlerts) * 100) || 0}% du total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes élevées</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{highAlerts}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((highAlerts / totalAlerts) * 100) || 0}% du total
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertes moyennes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mediumAlerts}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((mediumAlerts / totalAlerts) * 100) || 0}% du total
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Distribution par sévérité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>Critique</span>
                    </div>
                    <span>{criticalAlerts}</span>
                  </div>
                  <Progress
                    value={(criticalAlerts / totalAlerts) * 100}
                    className="h-2 bg-muted"
                    indicatorClassName="bg-red-500"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span>Élevée</span>
                    </div>
                    <span>{highAlerts}</span>
                  </div>
                  <Progress
                    value={(highAlerts / totalAlerts) * 100}
                    className="h-2 bg-muted"
                    indicatorClassName="bg-orange-500"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Moyenne</span>
                    </div>
                    <span>{mediumAlerts}</span>
                  </div>
                  <Progress
                    value={(mediumAlerts / totalAlerts) * 100}
                    className="h-2 bg-muted"
                    indicatorClassName="bg-yellow-500"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Faible</span>
                    </div>
                    <span>{lowAlerts}</span>
                  </div>
                  <Progress
                    value={(lowAlerts / totalAlerts) * 100}
                    className="h-2 bg-muted"
                    indicatorClassName="bg-green-500"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <div className="rounded-md border">
              <div className="grid grid-cols-[1fr,1fr,1fr,0.5fr,0.5fr] gap-2 p-4 font-medium">
                <div>Indicateur</div>
                <div>Région</div>
                <div>Catégorie</div>
                <div>Valeur</div>
                <div>Sévérité</div>
              </div>
              <div className="divide-y">
                {filteredAlerts.map((alert) => {
                  const CategoryIcon = categoryIcons[alert.category as keyof typeof categoryIcons]
                  return (
                    <div key={alert.id} className="grid grid-cols-[1fr,1fr,1fr,0.5fr,0.5fr] gap-2 p-4">
                      <div>{alert.indicator}</div>
                      <div>{alert.region}</div>
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-4 w-4" />
                        <span className="capitalize">{alert.category}</span>
                      </div>
                      <div>{alert.value}</div>
                      <div>
                        <Badge
                          variant="outline"
                          className={`${severityColors[alert.severity as keyof typeof severityColors]} text-white`}
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(alertsByCategory).map(([category, count]) => {
                if (count === 0) return null
                const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons]
                const categoryNames: Record<string, string> = {
                  food: "Sécurité Alimentaire",
                  nutrition: "Nutrition",
                  water: "Eau et Assainissement",
                  vulnerability: "Vulnérabilité",
                  agriculture: "Agriculture",
                  livestock: "Élevage",
                  market: "Marché",
                }

                // Calculer les alertes par sévérité pour cette catégorie
                const catAlerts = filteredAlerts.filter((a) => a.category === category)
                const catCritical = catAlerts.filter((a) => a.severity === "critical").length
                const catHigh = catAlerts.filter((a) => a.severity === "high").length
                const catMedium = catAlerts.filter((a) => a.severity === "medium").length
                const catLow = catAlerts.filter((a) => a.severity === "low").length

                return (
                  <Card key={category}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="h-5 w-5" />
                        <CardTitle className="text-sm font-medium">{categoryNames[category]}</CardTitle>
                      </div>
                      <Badge>{count}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {catCritical > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500" />
                              <span>Critique</span>
                            </div>
                            <span>{catCritical}</span>
                          </div>
                        )}
                        {catHigh > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-orange-500" />
                              <span>Élevée</span>
                            </div>
                            <span>{catHigh}</span>
                          </div>
                        )}
                        {catMedium > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-yellow-500" />
                              <span>Moyenne</span>
                            </div>
                            <span>{catMedium}</span>
                          </div>
                        )}
                        {catLow > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              <span>Faible</span>
                            </div>
                            <span>{catLow}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

