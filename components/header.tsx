import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <Image src="/images/logo_csa.png" alt="CSA Logo" width={40} height={40} className="h-10 w-10" />
        <span className="text-lg font-semibold">AGSAVN CSA</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link
            href="https://www.csa.gov.mr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1"
          >
            Contact Us
            <Icons.externalLink className="h-4 w-4" />
          </Link>
        </Button>
        <NotificationDropdown />
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  )
}

