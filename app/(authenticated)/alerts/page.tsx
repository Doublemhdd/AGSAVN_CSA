import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertsDashboard } from "@/components/dashboard/alerts-dashboard"

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Alertes</h1>
        <p className="text-muted-foreground">Suivi des alertes actives par catégorie et sévérité dans le système.</p>
      </div>
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <AlertsDashboard />
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des alertes</CardTitle>
              <CardDescription>Consultez l'historique des alertes traitées</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Fonctionnalité en cours de développement.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des alertes</CardTitle>
              <CardDescription>Configurez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Fonctionnalité en cours de développement.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

