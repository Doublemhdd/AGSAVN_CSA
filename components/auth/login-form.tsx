"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userType, setUserType] = useState<string>("user")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simuler une authentification
    setTimeout(() => {
      setIsLoading(false)
      // Rediriger en fonction du type d'utilisateur
      if (userType === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="nom@exemple.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Type d'utilisateur</Label>
            <RadioGroup defaultValue="user" onValueChange={setUserType} className="flex space-x-4">
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
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Se connecter
          </Button>
        </div>
      </form>
    </div>
  )
}

