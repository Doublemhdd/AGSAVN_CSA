"use client"

import { CheckCircle, Clock, Database, Server, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const systemComponents = [
  {
    name: "Serveur API",
    icon: Server,
    status: "operational",
    uptime: "99.98%",
    lastIncident: "Aucun",
    performance: 92,
  },
  {
    name: "Base de données",
    icon: Database,
    status: "operational",
    uptime: "99.95%",
    lastIncident: "2023-05-10",
    performance: 88,
  },
  {
    name: "Service de collecte de données",
    icon: Clock,
    status: "operational",
    uptime: "99.90%",
    lastIncident: "2023-05-05",
    performance: 95,
  },
  {
    name: "Service de notification",
    icon: CheckCircle,
    status: "degraded",
    uptime: "98.75%",
    lastIncident: "2023-05-18",
    performance: 75,
  },
]

export function SystemStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {systemComponents.map((component) => {
        const Icon = component.icon
        const isOperational = component.status === "operational"

        return (
          <Card key={component.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">{component.name}</CardTitle>
              </div>
              <div className="flex items-center gap-1">
                {isOperational ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-orange-500" />
                )}
                <span className={`text-xs ${isOperational ? "text-green-500" : "text-orange-500"}`}>
                  {isOperational ? "Opérationnel" : "Dégradé"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">Temps de fonctionnement: {component.uptime}</CardDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Performance</span>
                  <span className="text-sm font-medium">{component.performance}%</span>
                </div>
                <Progress
                  value={component.performance}
                  className="h-2"
                  indicatorClassName={
                    component.performance > 90
                      ? "bg-green-500"
                      : component.performance > 80
                        ? "bg-yellow-500"
                        : "bg-orange-500"
                  }
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Dernier incident: {component.lastIncident}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

