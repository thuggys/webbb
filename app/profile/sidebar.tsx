"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { name: "Dashboard", href: "/profile" },
  { name: "Achievements", href: "/profile/achievements" },
  { name: "Learning Resources", href: "/profile/resources" },
]

export default function ProfileSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r p-6">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
