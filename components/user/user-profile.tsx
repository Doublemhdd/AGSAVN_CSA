"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function UserProfile() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg" alt="Avatar" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Utilisateur AGSAVN</h3>
            <p className="text-sm text-muted-foreground">user@agsavn.org</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Changer la photo
            </Button>
            <Button variant="ghost" size="sm">
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name">Prénom</Label>
            <Input id="first-name" defaultValue="Utilisateur" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Nom</Label>
            <Input id="last-name" defaultValue="AGSAVN" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="user@agsavn.org" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Biographie</Label>
          <Textarea
            id="bio"
            placeholder="Parlez-nous de vous..."
            defaultValue="Utilisateur de la plateforme AGSAVN CSA, spécialisé dans l'analyse des données de sécurité alimentaire."
          />
          <p className="text-sm text-muted-foreground">Brève description qui apparaîtra sur votre profil.</p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Changer le mot de passe</CardTitle>
          <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Mot de passe actuel</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nouveau mot de passe</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Changer le mot de passe</Button>
        </CardFooter>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  )
}

