"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"
import { usePathname } from "next/navigation"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname?.() || ""
  const isAdminRoute = pathname.includes("/admin")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <UserNav isAdmin={isAdminRoute} />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        {!isAdminRoute && (
          <aside className="w-64 border-r bg-muted/40">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

