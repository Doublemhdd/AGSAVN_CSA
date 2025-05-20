import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminOverview } from "@/components/admin/admin-overview"
import { AlertsManagement } from "@/components/admin/alerts-management"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
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

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Administrateur</h1>
        <p className="text-muted-foreground">
          Bienvenue sur le dashboard administrateur. Gérez les alertes et surveillez le système.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes actives</CardTitle>
            <Icons.alert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 nouvelles alertes cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes traitées</CardTitle>
            <Icons.check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
            <Icons.user className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 nouveaux utilisateurs ce mois-ci</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indicateurs en alerte</CardTitle>
            <Icons.warning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">-1 par rapport à la semaine dernière</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d'ensemble des alertes</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AdminOverview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alertes récentes</CardTitle>
            <CardDescription>7 alertes actives nécessitant une attention</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsManagement preview />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

