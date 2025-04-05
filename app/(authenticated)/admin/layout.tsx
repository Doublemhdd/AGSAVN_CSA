import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { UserNav } from "@/components/user-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <UserNav isAdmin={true} />
          </div>
        </div>
      </div>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40">
          <Sidebar isAdmin={true} />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

