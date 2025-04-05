import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"
import { IndicatorCards } from "@/components/dashboard/indicator-cards"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Droplets,
  Home,
  Leaf,
  ShoppingBasket,
  Utensils,
  Check,
  User,
  AlertCircle,
} from "lucide-react"

const Icons = {
  food: Utensils,
  nutrition: Activity,
  water: Droplets,
  vulnerability: Home,
  agriculture: Leaf,
  livestock: AlertTriangle,
  market: ShoppingBasket,
  overview: BarChart3,
  alert: AlertCircle,
  check: Check,
  user: User,
  warning: AlertTriangle,
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue sur la plateforme AGSAVN CSA. Visualisez les indicateurs de sécurité alimentaire et nutritionnelle.
        </p>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="alerts">Alertes récentes</TabsTrigger>
          <TabsTrigger value="indicators">Indicateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score de Consommation Alimentaire</CardTitle>
                <Icons.food className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67.5</div>
                <p className="text-xs text-muted-foreground">+2.5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prévalence de la Malnutrition</CardTitle>
                <Icons.nutrition className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.3%</div>
                <p className="text-xs text-muted-foreground">-0.8% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accès à l'Eau Potable</CardTitle>
                <Icons.water className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.2%</div>
                <p className="text-xs text-muted-foreground">+1.1% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
                <Icons.alert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+2 nouvelles alertes cette semaine</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Vue d'ensemble</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Alertes récentes</CardTitle>
                <CardDescription>7 alertes actives dans le système</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAlerts />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes récentes</CardTitle>
              <CardDescription>Liste des alertes récentes dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentAlerts extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="indicators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs par catégorie</CardTitle>
              <CardDescription>Vue d'ensemble des indicateurs par catégorie</CardDescription>
            </CardHeader>
            <CardContent>
              <IndicatorCards />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

