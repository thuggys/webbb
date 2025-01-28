"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { cn } from "@/lib/utils"
import { User } from '@supabase/supabase-js'

const sidebarItems = [
  { name: "Dashboard", href: "/profile" },
  { name: "Achievements", href: "/profile/achievements" },
  { name: "Learning Resources", href: "/profile/resources" },
]

export default function ProfileSidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLoading(false)
        return
      }
      setUser(session.user)
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user session found</div>

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
