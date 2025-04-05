import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndicatorDetail } from "@/components/indicators/indicator-detail"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

export default function MarketPage() {
  const indicators = [
    {
      id: "cereal-prices",
      name: "Prix des Céréales",
      description: "Prix moyen des céréales de base par rapport à la moyenne quinquennale.",
      methodology: "Basé sur les relevés de prix sur les marchés principaux.",
      thresholds: [
        { value: "<110%", label: "Normal", color: "success" },
        { value: "110-130%", label: "Élevé", color: "default" },
        { value: "130-150%", label: "Très élevé", color: "warning" },
        { value: ">150%", label: "Extrêmement élevé", color: "destructive" },
      ],
      currentValue: 128.5,
      trend: "+3.2%",
      status: "default",
    },
    {
      id: "terms-of-trade",
      name: "Termes de l'Échange",
      description: "Rapport entre le prix du bétail et celui des céréales.",
      methodology: "Basé sur les prix du bétail et des céréales sur les marchés principaux.",
      thresholds: [
        { value: ">90%", label: "Favorable", color: "success" },
        { value: "70-90%", label: "Moyen", color: "default" },
        { value: "50-70%", label: "Défavorable", color: "warning" },
        { value: "<50%", label: "Très défavorable", color: "destructive" },
      ],
      currentValue: 75.3,
      trend: "-2.1%",
      status: "default",
    },
    {
      id: "market-supply",
      name: "Approvisionnement des Marchés",
      description: "Niveau d'approvisionnement des marchés par rapport à la normale saisonnière.",
      methodology: "Basé sur les observations de terrain et les enquêtes auprès des commerçants.",
      thresholds: [
        { value: ">90%", label: "Bon", color: "success" },
        { value: "70-90%", label: "Moyen", color: "default" },
        { value: "50-70%", label: "Faible", color: "warning" },
        { value: "<50%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 82.7,
      trend: "+1.5%",
      status: "default",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Marché</h1>
        <p className="text-muted-foreground">
          Indicateurs liés aux prix des denrées alimentaires, aux termes de l'échange et à l'approvisionnement des
          marchés.
        </p>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="map">Carte</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
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
              <CardDescription>Tendance des indicateurs de marché sur les 6 derniers mois</CardDescription>
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
              <CardDescription>Distribution géographique des indicateurs de marché</CardDescription>
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

