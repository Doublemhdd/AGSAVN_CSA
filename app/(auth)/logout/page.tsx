"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth/auth-context"

export default function LogoutPage() {
  const { logout } = useAuth()

  useEffect(() => {
    // Déconnecter l'utilisateur
    logout()

    // Rediriger vers la page de connexion
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  }, [logout])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Déconnexion en cours...</h1>
        <p className="text-muted-foreground">Vous allez être redirigé vers la page de connexion.</p>
      </div>
    </div>
  )
}

