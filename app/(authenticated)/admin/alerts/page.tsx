import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertsManagement } from "@/components/admin/alerts-management"
import { AlertsHistory } from "@/components/admin/alerts-history"
import { AlertsSettings } from "@/components/admin/alerts-settings"

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Alertes</h1>
        <p className="text-muted-foreground">
          Gérez les alertes du système, consultez l'historique et configurez les paramètres.
        </p>
      </div>
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Alertes actives</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertes actives</CardTitle>
              <CardDescription>Gérez les alertes actives dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des alertes</CardTitle>
              <CardDescription>Consultez l'historique des alertes traitées</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres des alertes</CardTitle>
              <CardDescription>Configurez les paramètres du système d'alerte</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

