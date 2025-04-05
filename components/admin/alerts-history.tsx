"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Icons } from "@/components/icons"

export function AlertsHistory() {
  const [alerts, setAlerts] = useState([
    {
      id: 101,
      title: "Sécurité Alimentaire",
      description: "Faible score de consommation alimentaire dans la région de Nouadhibou",
      severity: "high",
      date: "2023-06-15",
      status: "approved",
      comment: "Alerte confirmée après vérification sur le terrain",
    },
    {
      id: 102,
      title: "Nutrition",
      description: "Taux d'anémie élevé chez les enfants dans la région de Hodh Ech Chargui",
      severity: "medium",
      date: "2023-06-10",
      status: "rejected",
      comment: "Données insuffisantes pour confirmer l'alerte",
    },
    {
      id: 103,
      title: "Eau-Hygiène",
      description: "Contamination de l'eau dans la région de Brakna",
      severity: "high",
      date: "2023-06-05",
      status: "approved",
      comment: "Alerte confirmée, mesures d'urgence mises en place",
    },
    {
      id: 104,
      title: "Agriculture",
      description: "Dégâts importants par les ennemis de culture dans la région d'Assaba",
      severity: "medium",
      date: "2023-05-28",
      status: "approved",
      comment: "Alerte confirmée, suivi en cours",
    },
    {
      id: 105,
      title: "Élevage",
      description: "Maladie du cheptel signalée dans la région de Tagant",
      severity: "high",
      date: "2023-05-20",
      status: "approved",
      comment: "Alerte confirmée, mesures sanitaires mises en place",
    },
  ])

  const [selectedAlert, setSelectedAlert] = useState<any>(null)

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert)
  }

  const handleCloseDetails = () => {
    setSelectedAlert(null)
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`flex items-start justify-between space-x-4 p-3 ${
            alert.status === "approved"
              ? "border-green-500 bg-green-50 dark:bg-green-950/20"
              : alert.status === "rejected"
                ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                : ""
          }`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "outline"
                }
              >
                {alert.severity === "high" ? "Critique" : alert.severity === "medium" ? "Modéré" : "Faible"}
              </Badge>
              <p className="text-sm font-medium leading-none">{alert.title}</p>
            </div>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(alert.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Badge variant={alert.status === "approved" ? "success" : "destructive"}>
              {alert.status === "approved" ? "Approuvée" : "Rejetée"}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={() => handleViewDetails(alert)}>
            <Icons.arrowRight className="h-4 w-4" />
          </Button>
        </Card>
      ))}
      <div className="flex justify-center">
        <Button variant="outline">Charger plus d'alertes</Button>
      </div>

      <Dialog open={!!selectedAlert} onOpenChange={handleCloseDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l'alerte</DialogTitle>
            <DialogDescription>Informations détaillées sur l'alerte</DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedAlert.severity === "high"
                        ? "destructive"
                        : selectedAlert.severity === "medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {selectedAlert.severity === "high"
                      ? "Critique"
                      : selectedAlert.severity === "medium"
                        ? "Modéré"
                        : "Faible"}
                  </Badge>
                  <h3 className="font-medium">{selectedAlert.title}</h3>
                </div>
                <p className="text-sm">{selectedAlert.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Date de création</p>
                  <p className="text-muted-foreground">
                    {new Date(selectedAlert.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Statut</p>
                  <Badge variant={selectedAlert.status === "approved" ? "success" : "destructive"}>
                    {selectedAlert.status === "approved" ? "Approuvée" : "Rejetée"}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="font-medium">Commentaire</p>
                <p className="text-sm text-muted-foreground">{selectedAlert.comment}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

