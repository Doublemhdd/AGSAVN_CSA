import type React from "react"
import { Sidebar } from "@/components/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 h-full">
      <aside className="w-64 border-r bg-muted/40 h-full">
        <Sidebar isAdmin={true} />
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

