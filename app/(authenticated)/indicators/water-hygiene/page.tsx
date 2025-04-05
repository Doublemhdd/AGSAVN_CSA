import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndicatorDetail } from "@/components/indicators/indicator-detail"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

export default function WaterHygienePage() {
  const indicators = [
    {
      id: "water-access",
      name: "Accès à l'Eau Potable",
      description: "Pourcentage de la population ayant accès à une source d'eau potable améliorée.",
      methodology: "Basé sur les enquêtes auprès des ménages et les données administratives.",
      thresholds: [
        { value: ">90%", label: "Bon", color: "success" },
        { value: "70-90%", label: "Moyen", color: "default" },
        { value: "50-70%", label: "Faible", color: "warning" },
        { value: "<50%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 78.2,
      trend: "+1.1%",
      status: "default",
    },
    {
      id: "sanitation",
      name: "Accès à l'Assainissement",
      description: "Pourcentage de la population ayant accès à des installations sanitaires améliorées.",
      methodology: "Basé sur les enquêtes auprès des ménages et les données administratives.",
      thresholds: [
        { value: ">80%", label: "Bon", color: "success" },
        { value: "60-80%", label: "Moyen", color: "default" },
        { value: "40-60%", label: "Faible", color: "warning" },
        { value: "<40%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 45.7,
      trend: "+0.8%",
      status: "warning",
    },
    {
      id: "handwashing",
      name: "Pratique du Lavage des Mains",
      description: "Pourcentage de la population pratiquant le lavage des mains avec du savon aux moments critiques.",
      methodology: "Basé sur les enquêtes comportementales et les observations directes.",
      thresholds: [
        { value: ">70%", label: "Bon", color: "success" },
        { value: "50-70%", label: "Moyen", color: "default" },
        { value: "30-50%", label: "Faible", color: "warning" },
        { value: "<30%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 38.5,
      trend: "+2.3%",
      status: "warning",
    },
    {
      id: "water-quality",
      name: "Qualité de l'Eau",
      description: "Pourcentage des sources d'eau testées qui répondent aux normes de qualité.",
      methodology: "Basé sur les tests de qualité de l'eau effectués sur les sources d'eau communautaires.",
      thresholds: [
        { value: ">90%", label: "Bon", color: "success" },
        { value: "70-90%", label: "Moyen", color: "default" },
        { value: "50-70%", label: "Faible", color: "warning" },
        { value: "<50%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 65.3,
      trend: "-0.5%",
      status: "warning",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Eau et Hygiène</h1>
        <p className="text-muted-foreground">
          Indicateurs d'accès à l'eau potable, à l'assainissement et aux pratiques d'hygiène.
        </p>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {indicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{indicator.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{indicator.currentValue}%</div>
                  <p className="text-xs text-muted-foreground">{indicator.trend} par rapport au mois dernier</p>
                  <p className="mt-2 text-xs text-muted-foreground">{indicator.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Évolution des indicateurs</CardTitle>
              <CardDescription>Tendance des indicateurs d'eau et d'hygiène sur les 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent>
              <IndicatorChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="space-y-4">
          {indicators.map((indicator) => (
            <IndicatorDetail key={indicator.id} indicator={indicator} />
          ))}
        </TabsContent>
        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carte des indicateurs</CardTitle>
              <CardDescription>Distribution géographique des indicateurs d'eau et d'hygiène</CardDescription>
            </CardHeader>
            <CardContent>
              <IndicatorMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

