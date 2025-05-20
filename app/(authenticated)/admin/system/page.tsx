import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SystemStatus } from "@/components/admin/system-status"

export default function SystemStatusPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">État du système</h1>
        <p className="text-muted-foreground">
          Surveillez l'état des composants du système et la performance de l'application.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>État des services</CardTitle>
          <CardDescription>Vue d'ensemble de l'état des différents composants du système</CardDescription>
        </CardHeader>
        <CardContent>
          <SystemStatus />
        </CardContent>
      </Card>
    </div>
  )
} 