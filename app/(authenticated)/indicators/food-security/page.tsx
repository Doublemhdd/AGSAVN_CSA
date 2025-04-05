import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndicatorDetail } from "@/components/indicators/indicator-detail"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

// Données fictives pour le graphique
const mockChartData = [
  { date: "2023-01-01", value: 65.5 },
  { date: "2023-02-01", value: 66.2 },
  { date: "2023-03-01", value: 66.8 },
  { date: "2023-04-01", value: 67.1 },
  { date: "2023-05-01", value: 67.3 },
  { date: "2023-06-01", value: 67.5 },
]

// Données fictives pour la carte
const mockMapData = [
  { region: "Nouakchott", value: 72.3 },
  { region: "Nouadhibou", value: 68.5 },
  { region: "Kiffa", value: 62.1 },
  { region: "Rosso", value: 65.8 },
  { region: "Atar", value: 70.2 },
  { region: "Néma", value: 59.7 },
]

export default function FoodSecurityPage() {
  const indicators = [
    {
      id: "fcs",
      name: "Score de Consommation Alimentaire (FCS)",
      description: "Mesure la fréquence et la diversité des aliments consommés par un ménage.",
      methodology:
        "Le FCS est calculé en multipliant la fréquence de consommation de chaque groupe d'aliments par un coefficient de pondération, puis en additionnant ces valeurs.",
      thresholds: [
        { value: "0-21", label: "Pauvre", color: "destructive" },
        { value: "21.5-35", label: "Limite", color: "default" },
        { value: ">35", label: "Acceptable", color: "success" },
      ],
      currentValue: 67.5,
      trend: "+2.5%",
      status: "success",
    },
    {
      id: "pia",
      name: "Prévalence de l'Insécurité Alimentaire",
      description: "Pourcentage de ménages confrontés à une insécurité modérée et sévère.",
      methodology:
        "Basé sur l'échelle de l'expérience de l'insécurité alimentaire (FIES) qui mesure la gravité de l'insécurité alimentaire vécue par les individus ou les ménages.",
      thresholds: [
        { value: "<5%", label: "Faible", color: "success" },
        { value: "5-10%", label: "Modérée", color: "default" },
        { value: ">10%", label: "Élevée", color: "destructive" },
      ],
      currentValue: 8.3,
      trend: "-0.7%",
      status: "default",
    },
    {
      id: "hhs",
      name: "Échelle de la Faim",
      description: "Indique l'intensité de la faim ressentie par la population.",
      methodology: "Basé sur trois questions relatives à l'expérience de la faim au niveau du ménage.",
      thresholds: [
        { value: "0-1", label: "Faible", color: "success" },
        { value: "2-3", label: "Modérée", color: "default" },
        { value: "4-6", label: "Sévère", color: "destructive" },
      ],
      currentValue: 1.8,
      trend: "-0.2",
      status: "default",
    },
    {
      id: "hdds",
      name: "Score de Diversité Alimentaire",
      description: "Évalue la variété des groupes alimentaires consommés.",
      methodology: "Compte le nombre de groupes alimentaires consommés par un ménage sur une période de référence.",
      thresholds: [
        { value: "≤3", label: "Faible", color: "destructive" },
        { value: "4-5", label: "Moyenne", color: "default" },
        { value: "≥6", label: "Élevée", color: "success" },
      ],
      currentValue: 5.2,
      trend: "+0.3",
      status: "default",
    },
    {
      id: "cari",
      name: "CARI",
      description: "Méthode regroupant plusieurs indicateurs pour évaluer la sécurité alimentaire.",
      methodology:
        "Combine des indicateurs de consommation alimentaire actuelle et de capacité d'adaptation pour classer les ménages.",
      thresholds: [
        { value: "1", label: "Sécurité alimentaire", color: "success" },
        { value: "2", label: "Sécurité alimentaire marginale", color: "default" },
        { value: "3", label: "Insécurité alimentaire modérée", color: "warning" },
        { value: "4", label: "Insécurité alimentaire sévère", color: "destructive" },
      ],
      currentValue: 2.3,
      trend: "-0.1",
      status: "default",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Sécurité Alimentaire</h1>
        <p className="text-muted-foreground">
          Indicateurs de consommation et d'accès à la nourriture pour évaluer la sécurité alimentaire.
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
                  <div className="text-2xl font-bold">{indicator.currentValue}</div>
                  <p className="text-xs text-muted-foreground">{indicator.trend} par rapport au mois dernier</p>
                  <p className="mt-2 text-xs text-muted-foreground">{indicator.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Évolution des indicateurs</CardTitle>
              <CardDescription>
                Tendance des indicateurs de sécurité alimentaire sur les 6 derniers mois
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <IndicatorChart
                data={mockChartData}
                category="food"
                unit="score"
                thresholds={{ normal: 35, warning: 21, alert: 15, critical: 0 }}
              />
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
              <CardDescription>Distribution géographique des indicateurs de sécurité alimentaire</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <IndicatorMap
                data={mockMapData}
                category="food"
                thresholds={{ normal: 35, warning: 21, alert: 15, critical: 0 }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

