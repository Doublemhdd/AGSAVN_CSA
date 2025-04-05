import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndicatorDetail } from "@/components/indicators/indicator-detail"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

export default function LivestockPage() {
  const indicators = [
    {
      id: "pasture",
      name: "Disponibilité des Pâturages",
      description: "État des pâturages par rapport à la normale saisonnière.",
      methodology: "Basé sur les observations de terrain et les données satellitaires (NDVI).",
      thresholds: [
        { value: ">80%", label: "Bon", color: "success" },
        { value: "60-80%", label: "Moyen", color: "default" },
        { value: "40-60%", label: "Faible", color: "warning" },
        { value: "<40%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 55.7,
      trend: "-3.2%",
      status: "warning",
    },
    {
      id: "livestock-health",
      name: "Santé du Bétail",
      description: "Prévalence des maladies du bétail par rapport à la normale.",
      methodology: "Basé sur les rapports vétérinaires et les enquêtes auprès des éleveurs.",
      thresholds: [
        { value: "<5%", label: "Bonne", color: "success" },
        { value: "5-10%", label: "Moyenne", color: "default" },
        { value: "10-15%", label: "Préoccupante", color: "warning" },
        { value: ">15%", label: "Critique", color: "destructive" },
      ],
      currentValue: 8.3,
      trend: "+1.5%",
      status: "default",
    },
    {
      id: "water-points",
      name: "Accès aux Points d'Eau",
      description: "Pourcentage des points d'eau pour le bétail qui sont fonctionnels.",
      methodology: "Basé sur les évaluations de terrain et les rapports des services d'élevage.",
      thresholds: [
        { value: ">80%", label: "Bon", color: "success" },
        { value: "60-80%", label: "Moyen", color: "default" },
        { value: "40-60%", label: "Faible", color: "warning" },
        { value: "<40%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 62.5,
      trend: "-2.1%",
      status: "default",
    },
    {
      id: "livestock-movement",
      name: "Mouvements du Bétail",
      description: "Niveau des mouvements anormaux du bétail (transhumance précoce, concentration inhabituelle).",
      methodology: "Basé sur les observations de terrain et les rapports des services d'élevage.",
      thresholds: [
        { value: "<10%", label: "Normal", color: "success" },
        { value: "10-20%", label: "Légèrement anormal", color: "default" },
        { value: "20-30%", label: "Anormal", color: "warning" },
        { value: ">30%", label: "Très anormal", color: "destructive" },
      ],
      currentValue: 18.9,
      trend: "+3.5%",
      status: "default",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Élevage</h1>
        <p className="text-muted-foreground">
          Indicateurs liés à la santé et à la production du bétail, aux pâturages et aux mouvements des troupeaux.
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
              <CardDescription>Tendance des indicateurs d'élevage sur les 6 derniers mois</CardDescription>
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
              <CardDescription>Distribution géographique des indicateurs d'élevage</CardDescription>
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

