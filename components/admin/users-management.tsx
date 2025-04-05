"use client"

import { useState, useEffect } from "react"
import { Edit, MoreHorizontal, Search, Trash, UserCog, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/icons"
import { getUsers, updateUser, createUser, type User } from "@/lib/models/user"
import { useToast } from "@/hooks/use-toast"

interface UsersManagementProps {
  filterRole?: "admin" | "user"
}

export function UsersManagement({ filterRole }: UsersManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" as "user" | "admin",
  })
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    role: "user" as "user" | "admin",
    status: "active" as "active" | "inactive",
  })
  const { toast } = useToast()

  // Charger les utilisateurs depuis la base de données (localStorage)
  useEffect(() => {
    const loadUsers = () => {
      const allUsers = getUsers()
      setUsers(allUsers)
    }

    loadUsers()

    // Ajouter un écouteur d'événement pour détecter les changements dans localStorage
    const handleStorageChange = () => {
      loadUsers()
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Filtrer les utilisateurs en fonction du rôle et du terme de recherche
  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole ? user.role === filterRole : true
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return roleMatch && searchMatch
  })

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const handleAddUser = () => {
    setIsAddUserOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditedUser({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setIsEditUserOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteUserOpen(true)
  }

  const handleAddUserSubmit = () => {
    try {
      // Créer un nouvel utilisateur
      createUser({
        name: newUser.name,
        email: newUser.email,
        passwordHash: btoa(newUser.password + "salt_for_demo_only"), // Utilisation d'une fonction de hachage simple pour la démo
        role: newUser.role,
        status: "active",
      })

      // Mettre à jour la liste des utilisateurs
      setUsers(getUsers())

      // Fermer la boîte de dialogue
      setIsAddUserOpen(false)

      // Réinitialiser le formulaire
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "user",
      })

      // Afficher un message de succès
      toast({
        title: "Utilisateur ajouté",
        description: "L'utilisateur a été ajouté avec succès",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleEditUserSubmit = () => {
    if (!selectedUser) return

    try {
      // Mettre à jour l'utilisateur
      updateUser(selectedUser.id, {
        name: editedUser.name,
        email: editedUser.email,
        role: editedUser.role,
        status: editedUser.status,
      })

      // Mettre à jour la liste des utilisateurs
      setUsers(getUsers())

      // Fermer la boîte de dialogue
      setIsEditUserOpen(false)

      // Afficher un message de succès
      toast({
        title: "Utilisateur modifié",
        description: "L'utilisateur a été modifié avec succès",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUserSubmit = () => {
    if (!selectedUser) return

    try {
      // Supprimer l'utilisateur (pour cette démo, nous allons simplement le marquer comme inactif)
      updateUser(selectedUser.id, {
        status: "inactive",
      })

      // Mettre à jour la liste des utilisateurs
      setUsers(getUsers())

      // Fermer la boîte de dialogue
      setIsDeleteUserOpen(false)

      // Afficher un message de succès
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un utilisateur..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter un utilisateur
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "outline"}>
                      {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "success" : "secondary"}>
                      {user.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{user.lastLogin ? formatDate(user.lastLogin) : "Jamais"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Permissions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucun utilisateur trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogue d'ajout d'utilisateur */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogDescription>Créez un nouvel utilisateur pour la plateforme AGSAVN CSA.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rôle
              </Label>
              <Select
                value={newUser.role}
                onValueChange={(value) => setNewUser({ ...newUser, role: value as "user" | "admin" })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionnez un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="user">Utilisateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Annuler
            </Button>
            <Button type="button" onClick={handleAddUserSubmit}>
              <Icons.check className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de modification d'utilisateur */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>Modifiez les informations de l'utilisateur.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  className="col-span-3"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Rôle
                </Label>
                <Select
                  value={editedUser.role}
                  onValueChange={(value) => setEditedUser({ ...editedUser, role: value as "user" | "admin" })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Statut
                </Label>
                <Select
                  value={editedUser.status}
                  onValueChange={(value) => setEditedUser({ ...editedUser, status: value as "active" | "inactive" })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Actif</SelectItem>
                    <SelectItem value="inactive">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Annuler
            </Button>
            <Button type="button" onClick={handleEditUserSubmit}>
              <Icons.check className="mr-2 h-4 w-4" />
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de suppression d'utilisateur */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l'utilisateur</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p>
                Vous êtes sur le point de supprimer l'utilisateur <strong>{selectedUser.name}</strong> (
                {selectedUser.email}).
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteUserOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUserSubmit}>
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

