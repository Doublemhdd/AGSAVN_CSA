import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndicatorDetail } from "@/components/indicators/indicator-detail"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

export default function AgriculturePage() {
  const indicators = [
    {
      id: "rainfall",
      name: "Pluviométrie",
      description: "Quantité de pluie tombée par rapport à la moyenne historique.",
      methodology: "Basé sur les données des stations météorologiques et des satellites.",
      thresholds: [
        { value: ">90%", label: "Normal à excédentaire", color: "success" },
        { value: "70-90%", label: "Légèrement déficitaire", color: "default" },
        { value: "50-70%", label: "Déficitaire", color: "warning" },
        { value: "<50%", label: "Très déficitaire", color: "destructive" },
      ],
      currentValue: 65.3,
      trend: "-5.2%",
      status: "warning",
    },
    {
      id: "crop-production",
      name: "Production Agricole",
      description: "Production agricole estimée par rapport à la moyenne des 5 dernières années.",
      methodology:
        "Basé sur les évaluations de terrain, les enquêtes auprès des agriculteurs et les données satellitaires.",
      thresholds: [
        { value: ">90%", label: "Bonne", color: "success" },
        { value: "70-90%", label: "Moyenne", color: "default" },
        { value: "50-70%", label: "Faible", color: "warning" },
        { value: "<50%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 72.8,
      trend: "-3.5%",
      status: "default",
    },
    {
      id: "crop-pests",
      name: "Présence de Ravageurs",
      description: "Niveau d'infestation par les ravageurs des cultures.",
      methodology: "Basé sur les observations de terrain et les rapports des services agricoles.",
      thresholds: [
        { value: "<10%", label: "Faible", color: "success" },
        { value: "10-20%", label: "Modéré", color: "default" },
        { value: "20-30%", label: "Élevé", color: "warning" },
        { value: ">30%", label: "Très élevé", color: "destructive" },
      ],
      currentValue: 18.5,
      trend: "+2.3%",
      status: "default",
    },
    {
      id: "seed-access",
      name: "Accès aux Semences",
      description: "Pourcentage des ménages agricoles ayant accès à des semences de qualité.",
      methodology: "Basé sur les enquêtes auprès des ménages agricoles.",
      thresholds: [
        { value: ">80%", label: "Bon", color: "success" },
        { value: "60-80%", label: "Moyen", color: "default" },
        { value: "40-60%", label: "Faible", color: "warning" },
        { value: "<40%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 55.2,
      trend: "+1.8%",
      status: "warning",
    },
    {
      id: "fertilizer-access",
      name: "Accès aux Engrais",
      description: "Pourcentage des ménages agricoles ayant accès aux engrais.",
      methodology: "Basé sur les enquêtes auprès des ménages agricoles.",
      thresholds: [
        { value: ">70%", label: "Bon", color: "success" },
        { value: "50-70%", label: "Moyen", color: "default" },
        { value: "30-50%", label: "Faible", color: "warning" },
        { value: "<30%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 42.7,
      trend: "+0.5%",
      status: "warning",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Agriculture</h1>
        <p className="text-muted-foreground">
          Indicateurs liés à la production agricole, aux conditions climatiques et aux intrants agricoles.
        </p>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <CardDescription>Tendance des indicateurs agricoles sur les 6 derniers mois</CardDescription>
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
              <CardDescription>Distribution géographique des indicateurs agricoles</CardDescription>
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

