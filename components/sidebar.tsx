"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Droplets,
  Home,
  Leaf,
  LogOut,
  Settings,
  ShoppingBasket,
  User,
  Utensils,
  Shield,
  LineChart,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdmin?: boolean
}

export function Sidebar({ className, isAdmin = false, ...props }: SidebarProps) {
  const pathname = usePathname()

  // Base user navigation items
  const userNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Sécurité Alimentaire",
      href: "/indicators/food-security",
      icon: Utensils,
    },
    {
      title: "Nutrition",
      href: "/indicators/nutrition",
      icon: Activity,
    },
    {
      title: "Eau et Assainissement",
      href: "/indicators/water-hygiene",
      icon: Droplets,
    },
    {
      title: "Vulnérabilité",
      href: "/indicators/vulnerability",
      icon: Home,
    },
    {
      title: "Agriculture",
      href: "/indicators/agriculture",
      icon: Leaf,
    },
    {
      title: "Élevage",
      href: "/indicators/livestock",
      icon: AlertTriangle,
    },
    {
      title: "Marché",
      href: "/indicators/market",
      icon: ShoppingBasket,
    },
    {
      title: "Alertes",
      href: "/alerts",
      icon: Bell,
    },
  ]

  // Admin-specific navigation items
  const adminNavItems = [
    {
      title: "Dashboard Admin",
      href: "/admin/dashboard",
      icon: Shield,
    },
    {
      title: "Gestion des alertes",
      href: "/admin/alerts",
      icon: Bell,
    },
    {
      title: "Gestion des utilisateurs",
      href: "/admin/users",
      icon: User,
    },
    {
      title: "État du système",
      href: "/admin/system",
      icon: LineChart,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  // Get the items to display based on user role
  const navItemsToDisplay = isAdmin ? adminNavItems : userNavItems;
  const indicatorItems = isAdmin ? userNavItems.filter(item => item.title !== "Dashboard") : [];

  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      <div className="flex-grow overflow-y-auto">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-6 px-2">
            <Image src="/images/logo_csa.png" alt="CSA Logo" width={32} height={32} className="h-8 w-8" />
            <h2 className="text-lg font-semibold tracking-tight">AGSAVN CSA</h2>
          </div>
          
          {isAdmin && (
            <div className="mb-6">
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">ADMINISTRATION</h3>
              <div className="space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  )
                })}
              </div>
              
              <div className="my-4">
                <div className="h-[1px] w-full bg-border"></div>
              </div>
              
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">INDICATEURS</h3>
            </div>
          )}
          
          <div className="space-y-1">
            {(isAdmin ? indicatorItems : userNavItems).map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-auto px-4 py-4 border-t">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Link>
        </Button>
      </div>
    </div>
  )
}

