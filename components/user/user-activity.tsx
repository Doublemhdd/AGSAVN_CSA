"use client"

import { Activity, AlertTriangle, Check, Eye, FileText, Settings, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Données fictives pour l'activité de l'utilisateur
const activityData = [
  {
    id: 1,
    type: "login",
    description: "Connexion à la plateforme",
    date: "2023-06-15 10:23",
    icon: User,
  },
  {
    id: 2,
    type: "view",
    description: "Consultation des indicateurs de sécurité alimentaire",
    date: "2023-06-15 10:25",
    icon: Eye,
  },
  {
    id: 3,
    type: "view",
    description: "Consultation des indicateurs de nutrition",
    date: "2023-06-15 10:40",
    icon: Eye,
  },
  {
    id: 4,
    type: "download",
    description: "Téléchargement du rapport mensuel",
    date: "2023-06-15 11:05",
    icon: FileText,
  },
  {
    id: 5,
    type: "alert",
    description: "Alerte reçue: Niveau critique atteint dans la région de Nouakchott",
    date: "2023-06-15 11:30",
    icon: AlertTriangle,
  },
  {
    id: 6,
    type: "settings",
    description: "Modification des paramètres de notification",
    date: "2023-06-14 15:45",
    icon: Settings,
  },
  {
    id: 7,
    type: "view",
    description: "Consultation du tableau de bord",
    date: "2023-06-14 15:50",
    icon: Activity,
  },
  {
    id: 8,
    type: "alert_ack",
    description: "Accusé de réception d'alerte: Malnutrition Aiguë Globale dans la région de Maradi",
    date: "2023-06-14 16:10",
    icon: Check,
  },
]

export function UserActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Activité récente</h3>
        <Badge variant="outline">{activityData.length} activités</Badge>
      </div>

      <div className="space-y-6">
        {activityData.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="rounded-full bg-muted p-2">
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
              <Badge
                variant={
                  activity.type === "alert" ? "destructive" : activity.type === "alert_ack" ? "success" : "outline"
                }
              >
                {activity.type === "login"
                  ? "Connexion"
                  : activity.type === "view"
                    ? "Consultation"
                    : activity.type === "download"
                      ? "Téléchargement"
                      : activity.type === "alert"
                        ? "Alerte"
                        : activity.type === "alert_ack"
                          ? "Accusé de réception"
                          : activity.type === "settings"
                            ? "Paramètres"
                            : activity.type}
              </Badge>
            </div>
          )
        })}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Charger plus d'activités</Button>
      </div>
    </div>
  )
}

