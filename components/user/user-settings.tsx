"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"

interface UserSettingsProps {
  section: "account" | "appearance" | "notifications"
}

export function UserSettings({ section }: UserSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (section === "account") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
            <Switch id="two-factor" />
          </div>
          <p className="text-sm text-muted-foreground">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="session-timeout">Expiration de session</Label>
            <Select defaultValue="30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sélectionnez une durée" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 heure</SelectItem>
                <SelectItem value="120">2 heures</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground">
            Durée d'inactivité après laquelle vous serez automatiquement déconnecté.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-history">Historique de connexion</Label>
            <Button variant="outline" size="sm">
              Voir l'historique
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Consultez l'historique de vos connexions récentes.</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    )
  }

  if (section === "appearance") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Thème</Label>
          <RadioGroup defaultValue="system">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <Icons.sun className="mb-2 h-6 w-6" />
                  Clair
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <Icons.moon className="mb-2 h-6 w-6" />
                  Sombre
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <Icons.laptop className="mb-2 h-6 w-6" />
                  Système
                </Label>
              </div>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">Sélectionnez le thème de l'interface utilisateur.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Langue</Label>
          <Select defaultValue="fr">
            <SelectTrigger id="language">
              <SelectValue placeholder="Sélectionnez une langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">Anglais</SelectItem>
              <SelectItem value="ar">Arabe</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Sélectionnez la langue de l'interface utilisateur.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Animations</Label>
            <Switch id="animations" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">Activer ou désactiver les animations de l'interface.</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    )
  }

  if (section === "notifications") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Notifications par email</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">Recevoir des notifications par email.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="browser-notifications">Notifications du navigateur</Label>
            <Switch id="browser-notifications" />
          </div>
          <p className="text-sm text-muted-foreground">Recevoir des notifications dans votre navigateur.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notification-frequency">Fréquence des résumés</Label>
          <Select defaultValue="daily">
            <SelectTrigger id="notification-frequency">
              <SelectValue placeholder="Sélectionnez une fréquence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Temps réel</SelectItem>
              <SelectItem value="hourly">Toutes les heures</SelectItem>
              <SelectItem value="daily">Quotidien</SelectItem>
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Fréquence à laquelle vous recevrez des résumés d'alertes.</p>
        </div>
        <div className="space-y-2">
          <Label>Types d'alertes</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-alerts" className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span>Alertes critiques</span>
              </Label>
              <Switch id="critical-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="high-alerts" className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                <span>Alertes élevées</span>
              </Label>
              <Switch id="high-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="medium-alerts" className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                <span>Alertes moyennes</span>
              </Label>
              <Switch id="medium-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="low-alerts" className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>Alertes faibles</span>
              </Label>
              <Switch id="low-alerts" />
            </div>
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    )
  }

  return null
}

