"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { useAuth } from "@/lib/auth/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    adminEmail: "",
    adminPassword: "",
  })

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
    // Effacer l'erreur lorsque l'utilisateur modifie les champs
    setError(null)
  }

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Tentative de connexion utilisateur:", formData.userEmail)
      const result = await login({
        email: formData.userEmail,
        password: formData.userPassword,
      })

      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur la plateforme AGSAVN CSA",
          variant: "default",
        })

        // Ajouter un délai pour s'assurer que le cookie est bien défini
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 500)
      } else {
        setError(result.message || "Email ou mot de passe incorrect")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      setError("Une erreur est survenue lors de la connexion")
      setIsLoading(false)
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Tentative de connexion admin:", formData.adminEmail)
      const result = await login({
        email: formData.adminEmail,
        password: formData.adminPassword,
      })

      if (result.success) {
        if (result.user?.role !== "admin") {
          setError("Vous n'avez pas les droits d'administrateur")
          setIsLoading(false)
          return
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur la plateforme AGSAVN CSA",
          variant: "default",
        })

        // Ajouter un délai pour s'assurer que le cookie est bien défini
        setTimeout(() => {
          window.location.href = "/admin/dashboard"
        }, 500)
      } else {
        setError(result.message || "Email ou mot de passe incorrect")
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Erreur de connexion admin:", error)
      setError("Une erreur est survenue lors de la connexion")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex flex-col items-center mb-4">
            <Image src="/images/logo_csa.png" alt="CSA Logo" width={60} height={60} className="h-16 w-16 mb-2" />
            <CardTitle className="text-2xl font-bold">AGSAVN CSA</CardTitle>
          </div>
          <CardDescription>
            Plateforme de suivi des indicateurs de sécurité alimentaire et nutritionnelle
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="user">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">Utilisateur</TabsTrigger>
              <TabsTrigger value="admin">Administrateur</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="user@agsavn.org"
                    required
                    value={formData.userEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userPassword">Mot de passe</Label>
                  <Input
                    id="userPassword"
                    type="password"
                    required
                    value={formData.userPassword}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="admin@agsavn.org"
                    required
                    value={formData.adminEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Mot de passe</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    required
                    value={formData.adminPassword}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    "Se connecter"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">
              Vous n'avez pas de compte?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <Link href="/forgot-password" className="text-primary hover:underline">
                Mot de passe oublié?
              </Link>
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">© 2023 AGSAVN CSA. Tous droits réservés.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

