"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "../models/user"
import {
  login as loginService,
  signup as signupService,
  verifyToken,
  type LoginData,
  type SignupData,
  type AuthResult,
} from "./auth-service"

// Get cookie expiry from environment or set default to 7 days
const COOKIE_EXPIRY_DAYS = Number(process.env.NEXT_PUBLIC_AUTH_COOKIE_EXPIRY_DAYS || 7);
const COOKIE_MAX_AGE = COOKIE_EXPIRY_DAYS * 24 * 60 * 60; // Convert to seconds

interface AuthContextType {
  user: Omit<User, "passwordHash"> | null
  loading: boolean
  login: (data: LoginData) => Promise<AuthResult>
  signup: (data: SignupData) => Promise<AuthResult>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Omit<User, "passwordHash"> | null>(null)
  const [loading, setLoading] = useState(true)

  // Fonction pour définir le token à la fois dans localStorage et dans un cookie
  const setAuthToken = (token: string) => {
    try {
      localStorage.setItem("auth_token", token)
      // Définir le cookie avec une expiration basée sur la variable d'environnement
      document.cookie = `auth_token=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
      console.log("Token d'authentification défini avec succès")
    } catch (error) {
      console.error("Erreur lors de la définition du token:", error)
    }
  }

  // Fonction pour supprimer le token à la fois de localStorage et du cookie
  const removeAuthToken = () => {
    try {
      localStorage.removeItem("auth_token")
      document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax"
      console.log("Token d'authentification supprimé avec succès")
    } catch (error) {
      console.error("Erreur lors de la suppression du token:", error)
    }
  }

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token")
        console.log("Token trouvé dans localStorage:", !!token)

        if (token) {
          const { valid, user } = await verifyToken(token)
          console.log("Vérification du token:", valid ? "valide" : "invalide")

          if (valid && user) {
            setUser(user)
            // S'assurer que le cookie est également défini
            document.cookie = `auth_token=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
          } else {
            console.log("Token invalide, suppression...")
            removeAuthToken()
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error)
        removeAuthToken()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (data: LoginData): Promise<AuthResult> => {
    console.log(`Tentative de connexion pour: ${data.email}`)
    const result = await loginService(data)

    if (result.success && result.token && result.user) {
      console.log("Connexion réussie, définition du token et de l'utilisateur")
      setAuthToken(result.token)
      setUser(result.user)
    } else {
      console.log("Échec de la connexion:", result.message)
    }

    return result
  }

  const signup = async (data: SignupData): Promise<AuthResult> => {
    console.log(`Tentative d'inscription pour: ${data.email}`)
    const result = await signupService(data)

    if (result.success && result.token && result.user) {
      console.log("Inscription réussie, définition du token et de l'utilisateur")
      setAuthToken(result.token)
      setUser(result.user)
    } else {
      console.log("Échec de l'inscription:", result.message)
    }

    return result
  }

  const logout = () => {
    console.log("Déconnexion de l'utilisateur")
    removeAuthToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

