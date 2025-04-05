"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/icons"

export function AlertsSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoApproval, setAutoApproval] = useState(false)

  const handleSaveGeneral = () => {
    setIsLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleSaveThresholds = () => {
    setIsLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">Général</TabsTrigger>
        <TabsTrigger value="thresholds">Seuils d'alerte</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres généraux</CardTitle>
            <CardDescription>Configurez les paramètres généraux du système d'alerte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications-enabled">Activer les alertes</Label>
                <Switch
                  id="notifications-enabled"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <p className="text-sm text-muted-foreground">Activez ou désactivez le système d'alerte</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-approval">Approbation automatique</Label>
                <Switch id="auto-approval" checked={autoApproval} onCheckedChange={setAutoApproval} />
              </div>
              <p className="text-sm text-muted-foreground">Approuver automatiquement les alertes de faible sévérité</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Intervalle de rafraîchissement (minutes)</Label>
              <Input id="refresh-interval" type="number" defaultValue="15" min="1" max="60" />
              <p className="text-sm text-muted-foreground">Définissez l'intervalle de rafraîchissement des données</p>
            </div>
            <Button onClick={handleSaveGeneral} disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="thresholds" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Seuils d'alerte</CardTitle>
            <CardDescription>Configurez les seuils d'alerte pour chaque indicateur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Catégorie d'indicateur</Label>
                <Select defaultValue="food-security">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food-security">Sécurité Alimentaire</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="water-hygiene">Eau-Hygiène</SelectItem>
                    <SelectItem value="vulnerability">Vulnérabilité</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="livestock">Élevage</SelectItem>
                    <SelectItem value="market">Marché</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Indicateur</Label>
                <Select defaultValue="fcs">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un indicateur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fcs">Score de Consommation Alimentaire (FCS)</SelectItem>
                    <SelectItem value="pia">Prévalence de l'Insécurité Alimentaire</SelectItem>
                    <SelectItem value="hhs">Échelle de la Faim</SelectItem>
                    <SelectItem value="hdds">Score de Diversité Alimentaire</SelectItem>
                    <SelectItem value="cari">CARI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="threshold-low">Seuil bas</Label>
                  <Input id="threshold-low" type="number" defaultValue="21" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold-medium">Seuil moyen</Label>
                  <Input id="threshold-medium" type="number" defaultValue="35" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold-high">Seuil élevé</Label>
                  <Input id="threshold-high" type="number" defaultValue="50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="threshold-description">Description</Label>
                <Textarea
                  id="threshold-description"
                  placeholder="Description des seuils d'alerte"
                  defaultValue="Le Score de Consommation Alimentaire (FCS) est considéré comme pauvre en dessous de 21, limite entre 21.5 et 35, et acceptable au-dessus de 35."
                />
              </div>
              <Button onClick={handleSaveThresholds} disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Enregistrer les modifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres de notification</CardTitle>
            <CardDescription>Configurez les paramètres de notification du système d'alerte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Notifications par email</Label>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <p className="text-sm text-muted-foreground">Recevoir des notifications par email</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">Notifications par SMS</Label>
                <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <p className="text-sm text-muted-foreground">Recevoir des notifications par SMS</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-recipients">Destinataires des emails</Label>
              <Textarea
                id="email-recipients"
                placeholder="Entrez les adresses email séparées par des virgules"
                defaultValue="admin@exemple.com, responsable@exemple.com"
              />
              <p className="text-sm text-muted-foreground">Liste des destinataires des notifications par email</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-recipients">Destinataires des SMS</Label>
              <Textarea
                id="sms-recipients"
                placeholder="Entrez les numéros de téléphone séparés par des virgules"
                defaultValue="+222 12345678, +222 87654321"
              />
              <p className="text-sm text-muted-foreground">Liste des destinataires des notifications par SMS</p>
            </div>
            <Button onClick={handleSaveGeneral} disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Enregistrer les modifications
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

