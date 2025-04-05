import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSettings } from "@/components/admin/admin-settings"

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres d'Administration</h1>
        <p className="text-muted-foreground">Configurez les paramètres généraux de la plateforme AGSAVN CSA.</p>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configurez les paramètres généraux de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminSettings section="general" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Configurez les paramètres de sécurité de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminSettings section="security" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Configurez les paramètres de notification de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminSettings section="notifications" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Intégrations</CardTitle>
              <CardDescription>Gérez les intégrations avec d'autres systèmes</CardDescription>
            </CardHeader>
            <CardContent>
              <AdminSettings section="integrations" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

