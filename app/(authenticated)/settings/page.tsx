import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSettings } from "@/components/user/user-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Gérez vos préférences et paramètres de compte.</p>
      </div>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Compte</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du compte</CardTitle>
              <CardDescription>Gérez les paramètres de votre compte et vos préférences de connexion.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings section="account" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de l'interface utilisateur.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings section="appearance" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configurez vos préférences de notification.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings section="notifications" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

