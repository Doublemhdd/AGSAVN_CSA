"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminSettingsProps {
  section: "general" | "security" | "notifications" | "integrations"
}

export function AdminSettings({ section }: AdminSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (section === "general") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="platform-name">Nom de la plateforme</Label>
          <Input id="platform-name" defaultValue="AGSAVN CSA" />
          <p className="text-sm text-muted-foreground">
            Le nom qui sera affiché dans l'interface et les notifications.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform-description">Description</Label>
          <Textarea
            id="platform-description"
            defaultValue="Plateforme de visualisation et gestion des indicateurs de sécurité alimentaire"
          />
          <p className="text-sm text-muted-foreground">
            Une brève description de la plateforme qui sera affichée sur la page de connexion.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email de contact</Label>
          <Input id="contact-email" type="email" defaultValue="contact@agsavn.org" />
          <p className="text-sm text-muted-foreground">L'adresse email utilisée pour les communications officielles.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Langue par défaut</Label>
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
          <p className="text-sm text-muted-foreground">La langue par défaut utilisée dans l'interface.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode">Mode maintenance</Label>
            <Switch id="maintenance-mode" />
          </div>
          <p className="text-sm text-muted-foreground">
            Activez le mode maintenance pour empêcher l'accès à la plateforme pendant les mises à jour.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    )
  }

  if (section === "security") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password-policy">Politique de mot de passe</Label>
          <Select defaultValue="strong">
            <SelectTrigger id="password-policy">
              <SelectValue placeholder="Sélectionnez une politique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basique (min. 8 caractères)</SelectItem>
              <SelectItem value="medium">Moyenne (min. 10 caractères, 1 majuscule, 1 chiffre)</SelectItem>
              <SelectItem value="strong">Forte (min. 12 caractères, majuscules, chiffres, symboles)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Définissez la complexité requise pour les mots de passe des utilisateurs.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="session-timeout">Expiration de session (minutes)</Label>
          <Input id="session-timeout" type="number" defaultValue="30" min="5" max="120" />
          <p className="text-sm text-muted-foreground">
            Durée d'inactivité après laquelle les utilisateurs seront automatiquement déconnectés.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="two-factor-auth">Authentification à deux facteurs</Label>
            <Switch id="two-factor-auth" />
          </div>
          <p className="text-sm text-muted-foreground">
            Exiger l'authentification à deux facteurs pour tous les utilisateurs.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="ip-restriction">Restriction d'adresse IP</Label>
            <Switch id="ip-restriction" />
          </div>
          <p className="text-sm text-muted-foreground">Limiter l'accès à la plateforme à certaines adresses IP.</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    )
  }

  if (section === "notifications") {
    const date = new Date().toLocaleDateString()
    const alerts = "No alerts to display"

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Notifications par email</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">Envoyer des notifications par email aux utilisateurs.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notifications">Notifications par SMS</Label>
            <Switch id="sms-notifications" />
          </div>
          <p className="text-sm text-muted-foreground">Envoyer des notifications par SMS aux utilisateurs.</p>
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
          <p className="text-sm text-muted-foreground">Fréquence d'envoi des résumés d'alertes aux utilisateurs.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-template">Modèle d'email</Label>
          <Textarea
            id="email-template"
            defaultValue={`Bonjour {name},\n\nVoici votre résumé des alertes de sécurité alimentaire pour ${date}.\n\n${alerts}\n\nCordialement,\nL'équipe AGSAVN CSA`}
          />
          <p className="text-sm text-muted-foreground">
            Modèle utilisé pour les emails de notification. Utilisez {name}, {date}, {alerts} comme variables.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    )
  }

  if (section === "integrations") {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API</CardTitle>
            <CardDescription>Gérez l'accès à l'API de la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="api-enabled">Activer l'API</Label>
                <Switch id="api-enabled" defaultChecked />
              </div>
              <p className="text-sm text-muted-foreground">Permettre l'accès à l'API pour les intégrations externes.</p>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="api-key">Clé API</Label>
              <div className="flex space-x-2">
                <Input id="api-key" value="sk_live_51KdJkLJHG7..." readOnly className="flex-1" />
                <Button variant="outline">Régénérer</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Utilisez cette clé pour authentifier les requêtes à l'API.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Voir la documentation de l'API
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intégration avec les systèmes externes</CardTitle>
            <CardDescription>Connectez la plateforme à d'autres systèmes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="/placeholder.svg?height=24&width=24" alt="GIS" className="h-6 w-6" />
                  <div>
                    <p className="text-sm font-medium">Système d'Information Géographique (SIG)</p>
                    <p className="text-xs text-muted-foreground">Intégration avec les données cartographiques</p>
                  </div>
                </div>
                <Switch id="gis-integration" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="/placeholder.svg?height=24&width=24" alt="DHIS2" className="h-6 w-6" />
                  <div>
                    <p className="text-sm font-medium">DHIS2</p>
                    <p className="text-xs text-muted-foreground">Système d'information sanitaire</p>
                  </div>
                </div>
                <Switch id="dhis2-integration" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="/placeholder.svg?height=24&width=24" alt="FEWS NET" className="h-6 w-6" />
                  <div>
                    <p className="text-sm font-medium">FEWS NET</p>
                    <p className="text-xs text-muted-foreground">
                      Réseau de systèmes d'alerte précoce contre la famine
                    </p>
                  </div>
                </div>
                <Switch id="fewsnet-integration" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} className="w-full">
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return null
}

