import { type User, findUserByEmail, createUser, updateUser } from "../models/user"
import { hashPassword, verifyPassword, validatePasswordStrength } from "./password"

export interface SignupData {
  name: string
  email: string
  password: string
  role: "user" | "admin"
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResult {
  success: boolean
  message?: string
  user?: Omit<User, "passwordHash">
  token?: string
}

// Modifions la fonction generateToken pour s'assurer que l'expiration est correcte
const generateToken = (user: User): string => {
  return btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      // Définir l'expiration à 24 heures à partir de maintenant
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 heures
    }),
  )
}

export const signup = (data: SignupData): AuthResult => {
  try {
    // Vérifier si l'email existe déjà
    const existingUser = findUserByEmail(data.email)
    if (existingUser) {
      return { success: false, message: "Cet email est déjà utilisé" }
    }

    // Valider la force du mot de passe
    const passwordValidation = validatePasswordStrength(data.password)
    if (!passwordValidation.valid) {
      return { success: false, message: passwordValidation.message }
    }

    // Créer l'utilisateur
    const passwordHash = hashPassword(data.password)
    const user = createUser({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
      status: "active",
    })

    // Générer un token
    const token = generateToken(user)

    // Retourner le résultat sans le hash du mot de passe
    const { passwordHash: _, ...userWithoutPassword } = user
    return {
      success: true,
      user: userWithoutPassword,
      token,
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
    }
  }
}

export const login = (data: LoginData): AuthResult => {
  try {
    console.log(`Tentative de connexion pour l'email: ${data.email}`)

    // Trouver l'utilisateur par email
    const user = findUserByEmail(data.email)
    if (!user) {
      console.log(`Utilisateur non trouvé pour l'email: ${data.email}`)
      return { success: false, message: "Email ou mot de passe incorrect" }
    }

    console.log(`Utilisateur trouvé: ${user.name}, rôle: ${user.role}, statut: ${user.status}`)

    // Vérifier si l'utilisateur est actif
    if (user.status !== "active") {
      console.log(`Utilisateur inactif: ${user.email}`)
      return { success: false, message: "Ce compte est inactif" }
    }

    // Vérifier le mot de passe
    const passwordValid = verifyPassword(data.password, user.passwordHash)
    console.log(`Vérification du mot de passe: ${passwordValid ? "réussie" : "échouée"}`)

    if (!passwordValid) {
      return { success: false, message: "Email ou mot de passe incorrect" }
    }

    // Mettre à jour la date de dernière connexion
    const updatedUser = updateUser(user.id, {
      lastLogin: new Date().toISOString(),
    })

    // Générer un token
    const token = generateToken(updatedUser)

    // Retourner le résultat sans le hash du mot de passe
    const { passwordHash: _, ...userWithoutPassword } = updatedUser
    return {
      success: true,
      user: userWithoutPassword,
      token,
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion",
    }
  }
}

// Vérifier si un token est valide
export const verifyToken = (token: string): { valid: boolean; user?: Omit<User, "passwordHash"> } => {
  try {
    const decoded = JSON.parse(atob(token))

    // Vérifier si le token a expiré
    if (decoded.exp < Date.now()) {
      return { valid: false }
    }

    // Trouver l'utilisateur
    const user = findUserByEmail(decoded.email)
    if (!user) {
      return { valid: false }
    }

    // Retourner l'utilisateur sans le hash du mot de passe
    const { passwordHash: _, ...userWithoutPassword } = user
    return {
      valid: true,
      user: userWithoutPassword,
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error)
    return { valid: false }
  }
}

