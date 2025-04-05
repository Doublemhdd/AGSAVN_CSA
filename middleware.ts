import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Désactivons temporairement la vérification d'authentification
  // pour voir si c'est bien le middleware qui cause le problème
  return NextResponse.next()

  // Code original commenté
  /*
  const token = request.cookies.get("auth_token")?.value
  const path = request.nextUrl.pathname

  // Routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ["/login", "/signup", "/forgot-password"]

  // Vérifier si l'utilisateur est sur une route publique
  if (publicRoutes.includes(path)) {
    // Si l'utilisateur est déjà connecté, rediriger vers le dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Vérifier si l'utilisateur est authentifié pour les routes protégées
  if (!token && !path.startsWith("/_next") && !path.includes(".")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Vérifier les routes d'administration
  if (path.startsWith("/admin")) {
    // Vérifier si l'utilisateur est un administrateur
    // Dans une implémentation réelle, nous décoderions le token JWT et vérifierions le rôle
    // Pour cette démo, nous allons simplement vérifier si le token contient "admin"
    try {
      const decoded = JSON.parse(atob(token || ""))
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
  */
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

