import { type User, findUserByEmail, createUser, updateUser } from "../models/user"
import { hashPassword, verifyPassword, validatePasswordStrength } from "./password"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

export const signup = async (data: SignupData): Promise<AuthResult> => {
  try {
    // Connect to the backend API for registration
    const response = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        full_name: data.name,
        role: data.role.toUpperCase()
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.log(`Erreur d'inscription: ${JSON.stringify(responseData)}`);
      return { 
        success: false, 
        message: responseData.email?.[0] || responseData.password?.[0] || responseData.detail || "L'inscription a échoué" 
      };
    }

    // If registration is successful, login the user
    return await login({
      email: data.email,
      password: data.password
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
    }
  }
}

export const login = async (data: LoginData): Promise<AuthResult> => {
  try {
    console.log(`Tentative de connexion pour l'email: ${data.email}`)

    // Connect to the backend API instead of using localStorage
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.log(`Erreur de connexion: ${JSON.stringify(responseData)}`);
      return { 
        success: false, 
        message: responseData.detail || responseData.non_field_errors?.[0] || "Email ou mot de passe incorrect" 
      };
    }

    // Extract user data and token from API response
    const user = responseData.user;
    const token = responseData.token.access;

    return {
      success: true,
      user: {
        id: user.id,
        name: user.full_name || user.email,
        email: user.email,
        role: user.role.toLowerCase() === "admin" ? "admin" : "user",
        createdAt: user.date_joined || new Date().toISOString(),
        lastLogin: user.last_login || new Date().toISOString(),
        status: user.is_active ? "active" : "inactive",
      },
      token,
    };
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion",
    }
  }
}

// Vérifier si un token est valide
export const verifyToken = async (token: string): Promise<{ valid: boolean; user?: Omit<User, "passwordHash"> }> => {
  try {
    // Connect to the backend API to verify the token
    const response = await fetch(`${API_URL}/auth/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return { valid: false };
    }

    // If we get here, the token is valid. Now get the user data
    const userResponse = await fetch(`${API_URL}/auth/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!userResponse.ok) {
      return { valid: false };
    }

    const userData = await userResponse.json();
    
    return {
      valid: true,
      user: {
        id: userData.id,
        name: userData.full_name || userData.email,
        email: userData.email,
        role: userData.role.toLowerCase() === "admin" ? "admin" : "user",
        createdAt: userData.date_joined || new Date().toISOString(),
        lastLogin: userData.last_login || new Date().toISOString(),
        status: userData.is_active ? "active" : "inactive",
      }
    };
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error)
    return { valid: false }
  }
}

