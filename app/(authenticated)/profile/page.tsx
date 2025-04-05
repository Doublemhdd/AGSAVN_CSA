import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserProfile } from "@/components/user/user-profile"
import { UserActivity } from "@/components/user/user-activity"

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Profil Utilisateur</h1>
        <p className="text-muted-foreground">
          Gérez vos informations personnelles et consultez votre activité sur la plateforme.
        </p>
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="activity">Activité récente</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>Gérez vos informations personnelles</CardDescription>
            </CardHeader>
            <CardContent>
              <UserProfile />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>Consultez votre activité récente sur la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <UserActivity />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

