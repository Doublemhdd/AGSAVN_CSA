import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IndicatorDetail } from "@/components/indicators/indicator-detail"
import { IndicatorChart } from "@/components/indicators/indicator-chart"
import { IndicatorMap } from "@/components/indicators/indicator-map"

// Données fictives pour le graphique
const mockChartData = [
  { date: "2023-01-01", value: 13.1 },
  { date: "2023-02-01", value: 12.9 },
  { date: "2023-03-01", value: 12.7 },
  { date: "2023-04-01", value: 12.5 },
  { date: "2023-05-01", value: 12.3 },
  { date: "2023-06-01", value: 12.1 },
]

// Données fictives pour la carte
const mockMapData = [
  { region: "Nouakchott", value: 10.2 },
  { region: "Nouadhibou", value: 11.5 },
  { region: "Kiffa", value: 14.3 },
  { region: "Rosso", value: 12.8 },
  { region: "Atar", value: 9.7 },
  { region: "Néma", value: 15.2 },
]

export default function NutritionPage() {
  const indicators = [
    {
      id: "gam",
      name: "Malnutrition Aiguë Globale (MAG)",
      description: "Pourcentage d'enfants de moins de 5 ans souffrant de malnutrition aiguë.",
      methodology: "Basé sur le rapport poids/taille et/ou la présence d'œdèmes bilatéraux.",
      thresholds: [
        { value: "<5%", label: "Acceptable", color: "success" },
        { value: "5-10%", label: "Précaire", color: "default" },
        { value: "10-15%", label: "Sérieuse", color: "warning" },
        { value: ">15%", label: "Critique", color: "destructive" },
      ],
      currentValue: 12.3,
      trend: "-0.8%",
      status: "warning",
    },
    {
      id: "sam",
      name: "Malnutrition Aiguë Sévère (MAS)",
      description: "Pourcentage d'enfants de moins de 5 ans souffrant de malnutrition aiguë sévère.",
      methodology:
        "Basé sur le rapport poids/taille inférieur à -3 écarts-types et/ou la présence d'œdèmes bilatéraux.",
      thresholds: [
        { value: "<1%", label: "Acceptable", color: "success" },
        { value: "1-2%", label: "Précaire", color: "default" },
        { value: "2-4%", label: "Sérieuse", color: "warning" },
        { value: ">4%", label: "Critique", color: "destructive" },
      ],
      currentValue: 2.8,
      trend: "-0.3%",
      status: "warning",
    },
    {
      id: "stunting",
      name: "Retard de Croissance",
      description: "Pourcentage d'enfants de moins de 5 ans présentant un retard de croissance.",
      methodology: "Basé sur le rapport taille/âge inférieur à -2 écarts-types.",
      thresholds: [
        { value: "<20%", label: "Faible", color: "success" },
        { value: "20-30%", label: "Moyen", color: "default" },
        { value: "30-40%", label: "Élevé", color: "warning" },
        { value: ">40%", label: "Très élevé", color: "destructive" },
      ],
      currentValue: 35.2,
      trend: "-1.1%",
      status: "warning",
    },
    {
      id: "underweight",
      name: "Insuffisance Pondérale",
      description: "Pourcentage d'enfants de moins de 5 ans présentant une insuffisance pondérale.",
      methodology: "Basé sur le rapport poids/âge inférieur à -2 écarts-types.",
      thresholds: [
        { value: "<10%", label: "Faible", color: "success" },
        { value: "10-20%", label: "Moyen", color: "default" },
        { value: "20-30%", label: "Élevé", color: "warning" },
        { value: ">30%", label: "Très élevé", color: "destructive" },
      ],
      currentValue: 22.5,
      trend: "-0.7%",
      status: "warning",
    },
    {
      id: "anemia",
      name: "Anémie",
      description: "Pourcentage d'enfants de 6-59 mois souffrant d'anémie.",
      methodology: "Basé sur le taux d'hémoglobine inférieur à 11 g/dL.",
      thresholds: [
        { value: "<20%", label: "Faible", color: "success" },
        { value: "20-40%", label: "Moyen", color: "default" },
        { value: "40-60%", label: "Élevé", color: "warning" },
        { value: ">60%", label: "Très élevé", color: "destructive" },
      ],
      currentValue: 58.3,
      trend: "-1.2%",
      status: "warning",
    },
    {
      id: "breastfeeding",
      name: "Allaitement Exclusif",
      description: "Pourcentage de nourrissons de 0-6 mois exclusivement allaités.",
      methodology: "Basé sur les déclarations des mères concernant l'alimentation des nourrissons.",
      thresholds: [
        { value: ">70%", label: "Bon", color: "success" },
        { value: "50-70%", label: "Moyen", color: "default" },
        { value: "30-50%", label: "Faible", color: "warning" },
        { value: "<30%", label: "Très faible", color: "destructive" },
      ],
      currentValue: 42.1,
      trend: "+2.3%",
      status: "default",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Nutrition</h1>
        <p className="text-muted-foreground">
          Indicateurs de l'état nutritionnel de la population, en particulier des enfants de moins de 5 ans.
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
              <CardDescription>Tendance des indicateurs de nutrition sur les 6 derniers mois</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <IndicatorChart
                data={mockChartData}
                category="nutrition"
                unit="%"
                thresholds={{ normal: 5, warning: 10, alert: 15, critical: 20 }}
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
              <CardDescription>Distribution géographique des indicateurs de nutrition</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <IndicatorMap
                data={mockMapData}
                category="nutrition"
                thresholds={{ normal: 5, warning: 10, alert: 15, critical: 20 }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

