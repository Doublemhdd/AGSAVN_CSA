import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersManagement } from "@/components/admin/users-management"

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
        <p className="text-muted-foreground">
          Gérez les utilisateurs de la plateforme, leurs rôles et leurs permissions.
        </p>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tous les utilisateurs</TabsTrigger>
          <TabsTrigger value="admins">Administrateurs</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>Gérez tous les utilisateurs de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersManagement />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Administrateurs</CardTitle>
              <CardDescription>Gérez les administrateurs de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersManagement filterRole="admin" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs</CardTitle>
              <CardDescription>Gérez les utilisateurs standard de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersManagement filterRole="user" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

