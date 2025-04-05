"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"
import { useAuth } from "@/lib/auth/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" as "user" | "admin",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une lettre majuscule"
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins une lettre minuscule"
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Le mot de passe doit contenir au moins un chiffre"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: "user" | "admin") => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      if (result.success) {
        toast({
          title: "Compte créé avec succès",
          description: "Vous êtes maintenant connecté",
          variant: "default",
        })

        // Utiliser directement window.location pour la redirection
        if (formData.role === "admin") {
          window.location.href = "/admin/dashboard"
        } else {
          window.location.href = "/dashboard"
        }
      } else {
        toast({
          title: "Erreur",
          description: result.message || "Une erreur est survenue lors de l'inscription",
          variant: "destructive",
        })
        setLoading(false)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex flex-col items-center mb-4">
            <Image src="/images/logo_csa.png" alt="CSA Logo" width={60} height={60} className="h-16 w-16 mb-2" />
            <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
          </div>
          <CardDescription>Remplissez le formulaire ci-dessous pour créer votre compte AGSAVN CSA.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre.email@exemple.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              <p className="text-xs text-muted-foreground">
                Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-2">
              <Label>Type d'utilisateur</Label>
              <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">Utilisateur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Administrateur</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Créer un compte
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">© 2023 AGSAVN CSA. Tous droits réservés.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

