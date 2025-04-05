// Dans une application réelle, nous utiliserions bcrypt ou argon2
// Pour cette démo, nous utiliserons une fonction de hachage simple
export const hashPassword = (password: string): string => {
  // Ceci est une implémentation simplifiée pour la démonstration
  // Dans une application réelle, utilisez bcrypt ou argon2
  return btoa(password + "salt_for_demo_only")
}

export const verifyPassword = (password: string, hash: string): boolean => {
  // Correction: Utiliser la même méthode de hachage pour la vérification
  const hashedPassword = hashPassword(password)
  return hash === hashedPassword
}

export const validatePasswordStrength = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: "Le mot de passe doit contenir au moins 8 caractères" }
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Le mot de passe doit contenir au moins une lettre majuscule" }
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Le mot de passe doit contenir au moins une lettre minuscule" }
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Le mot de passe doit contenir au moins un chiffre" }
  }

  return { valid: true }
}

