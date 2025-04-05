export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  role: "user" | "admin"
  createdAt: string
  lastLogin?: string
  status: "active" | "inactive"
}

// Pour simuler une base de données, nous utiliserons localStorage côté client
// Dans une application réelle, cela serait remplacé par une vraie base de données
export const getUsers = (): User[] => {
  if (typeof window === "undefined") return []

  const users = localStorage.getItem("users")
  if (!users) {
    // Si aucun utilisateur n'existe, créons quelques utilisateurs par défaut
    const defaultUsers: User[] = [
      {
        id: "1",
        name: "Admin AGSAVN",
        email: "admin@agsavn.org",
        passwordHash: btoa("Admin123" + "salt_for_demo_only"),
        role: "admin",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: "active",
      },
      {
        id: "2",
        name: "Utilisateur AGSAVN",
        email: "user@agsavn.org",
        passwordHash: btoa("User123" + "salt_for_demo_only"),
        role: "user",
        createdAt: new Date().toISOString(),
        status: "active",
      },
    ]
    localStorage.setItem("users", JSON.stringify(defaultUsers))
    return defaultUsers
  }

  try {
    return JSON.parse(users)
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error)
    return []
  }
}

export const saveUsers = (users: User[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("users", JSON.stringify(users))
    // Déclencher un événement pour informer les autres composants que les utilisateurs ont changé
    window.dispatchEvent(new Event("storage"))
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des utilisateurs:", error)
  }
}

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers()
  const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
  return user
}

export const findUserById = (id: string): User | undefined => {
  const users = getUsers()
  return users.find((user) => user.id === id)
}

export const createUser = (user: Omit<User, "id" | "createdAt">): User => {
  const users = getUsers()

  // Vérifier si l'email existe déjà (insensible à la casse)
  if (users.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error("Cet email est déjà utilisé")
  }

  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  return newUser
}

export const updateUser = (id: string, updates: Partial<User>): User => {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === id)

  if (index === -1) {
    throw new Error("Utilisateur non trouvé")
  }

  // Si l'email est mis à jour, vérifier qu'il n'est pas déjà utilisé
  if (updates.email && updates.email.toLowerCase() !== users[index].email.toLowerCase()) {
    if (users.some((u) => u.email.toLowerCase() === updates.email?.toLowerCase() && u.id !== id)) {
      throw new Error("Cet email est déjà utilisé")
    }
  }

  const updatedUser = { ...users[index], ...updates }
  users[index] = updatedUser
  saveUsers(users)

  return updatedUser
}

export const deleteUser = (id: string): void => {
  const users = getUsers()
  const filteredUsers = users.filter((u) => u.id !== id)

  if (filteredUsers.length === users.length) {
    throw new Error("Utilisateur non trouvé")
  }

  saveUsers(filteredUsers)
}

